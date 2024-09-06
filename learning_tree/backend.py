import os
import re
import base64
from io import BytesIO
from PIL import Image
from typing import List, Dict

# TODO how to convert image to something I can pass through a fastapi

class LearningTree():
    """
    A class to build and represent a learning tree structure based on node files in a directory.
    """
    REQUIRED_KEYS = None
    # have this build tree
    def __init__(self, path = None):
        """
        Initializes the LearningTree instance by reading node names from the specified directory,
        and removing the template file from the list of node names.
        :param path: The path where all the node files are stored. 
        """
        self.path = path if path else os.path.join('learning_tree', 'learning-tree-nodes')
        self.node_names = os.listdir(self.path)
        self.node_names.remove('TEMPLATE') # removing the template file.
        if LearningTree.REQUIRED_KEYS is None:
            LearningTree.REQUIRED_KEYS = self._load_required_keys()
        self.nodes = {}

    def builder(self):
        """
        Converts the learning tree structure into a dictionary format.
        :return: list containing nodes
        """
        def extract_first_number(s):
            parts = s.split('-')
            for part in parts:
                if part.isdigit():
                    return int(part)
            raise Exception('failed to find number in filename')

        self.node_names = sorted(self.node_names, key=extract_first_number) 
        temp_list = []
        for node in self.node_names:
            _, node_id, parent_ids = self._split_string(node)
            # final_dict[node_id] = [parent_ids, self._file_to_dict(node)]
            temp_list.append(self._file_to_dict(node, node_id, parent_ids))
        sorted_list = sorted(temp_list, key=lambda x: int(x['id']))
        final_list = self.add_children(sorted_list)
        return self._remove_unneeded_keys(final_list)

    def _remove_unneeded_keys(self, final_list: list):
        # I will change this later, but it just formats the dict so it looks exactly how the frontend expects it
        # I will probably rewrite this entire class but this is an ugly mvp
        for node_dict in final_list:
            node_dict.pop('parent')
            node_dict['data'].pop('horizontal_displacement')

        return final_list

    def _split_string(self, input_string):
        """
        Splits the input string into three sections:
        1. file_name (e.g., 'what-is-ai' or 'intro') Never gets used, but stored if wanted for future use.
        2. node_id (e.g., '1' or '2')
        3. parent_ids (e.g., ['2', '3'] or ['3']) or [] if no parent
        :param input_string: The string to be split
        :return: A tuple containing the file_name, the node_id, and a list of parent_ids
        """

        pattern_with_parent = r'^([a-zA-Z-]+)-(\d+)-([\d-]+)$'
        pattern_without_parent = r'^([a-zA-Z-]+)-(\d)$'        

        match = re.match(pattern_with_parent, input_string)

        if match:
            file_name = match.group(1)
            node_id = match.group(2)
            parent_ids = match.group(3).split('-')

            parent_ids = [num for num in parent_ids if num]
            return file_name, node_id, parent_ids
        else:
            # If the first pattern doesn't match, try the pattern without remaining numbers
            match = re.match(pattern_without_parent, input_string)

            if match:
                file_name = match.group(1)
                node_id = match.group(2)
                parent_ids = []

                return file_name, node_id, parent_ids
            else:
                raise ValueError("Input string does not match the expected format.")

    def _file_to_dict(self, path, node_id, parent_ids):
        """
        Converts a file with key-value pairs into a dictionary.
        :param filepath: Path to the file to be read
        :param node_id: The node id for this specific node. 
        :param parent_ids: The parent ids for that specific node
        :return: Dictionary with key-value pairs from the file
        """
        result_dict = {}

        result_dict['id'] = node_id
        result_dict['type'] = 'treeNode'
        result_dict['parent'] = parent_ids

        data_dict = {}
        exact_path = os.path.join(self.path, path)
        with open(exact_path, 'r') as file:
            for line in file:
                line = line.strip()
                if not line:
                    continue

                key, value = line.split('=', 1) # 1 means it only splits once at the first '='
                key = key.strip()
                value = value.strip()
                if value.startswith('"') and value.endswith('"'):
                    value = value[1:-1]
                data_dict[key] = value
        if set(data_dict.keys()) != LearningTree.REQUIRED_KEYS:
            raise ValueError(f"File {path} does not contain exactly the required keys: {LearningTree.REQUIRED_KEYS}")

        result_dict['data'] = data_dict
        self.nodes[int(node_id)] = result_dict

        # formatting position
        if int(node_id) == 1:
            result_dict['position'] = {
                'x': 0,
                'y': 0,
            }
        else:
            parent_ids = [int(parent) for parent in parent_ids]
            result_dict['position'] = self.generate_position(int(node_id), parent_ids, data_dict['horizontal_displacement'], data_dict['vertical_displacement'])
            # {
            #     'x': (int)(data_dict['x_position']), 
            #     'y': (int)(data_dict['y_position']),
            # }

        # data_dict.pop('horizontal_displacement') # removing this because it was only needed to calculate position

        result_dict['data']['api_image_path'] = result_dict['data']['api_image_path'].replace('./', 'https://maic-fastapi-lambda.s3.amazonaws.com/', 1)
        self.nodes[int(node_id)] = result_dict

        # TODO PROBABLY HAVE TO FIX THIS SOMEWHERE

        return result_dict

    def _load_required_keys(self):
        """
        Loads the required keys from the TEMPLATE file.
        :return: A set of keys required in each node file.
        """
        template_path = os.path.join(self.path, 'TEMPLATE')
        with open(template_path, 'r') as file:
            required_keys = set()
            for line in file:
                line = line.strip()
                if not line:
                    continue
                key, _ = line.split('=', 1)
                required_keys.add(key.strip())
        return required_keys

    def generate_position(self, node_id: int, parent_ids: List[int], horizontal_displacement, vertical_displacement) -> Dict[str, int]:
        total = 0
        for parent in parent_ids:
            temp = self.nodes[parent]['data']['horizontal_displacement']
            if temp != '':
                total += int(temp)
        average_horizontal_position = total // len(parent_ids)
        if horizontal_displacement == '':
            x_position = average_horizontal_position
        else:
            x_position = average_horizontal_position + int(horizontal_displacement)
        y_position = self.nodes[parent_ids[0]]['position']['y']
        if vertical_displacement != '': 
            y_position += int(vertical_displacement)
        else: y_position += 500 # THIS IS DEFAULT CASE IF USER DOES NOT INPUT

        pos = {
            'x': x_position,
            'y': y_position,
        }

        self.nodes[node_id]['position'] = pos
        return pos

    def add_children(self, sorted_list):
        for node in sorted_list:
            children = []
            node_id = node['id']
            for node2 in sorted_list:
                node2_id = node2['id']
                if node != node2 and node_id in node2['parent']:
                    children.append(node2_id)

            node['children'] = children

        return sorted_list

x = LearningTree().builder()
print(x)
# for key, value in x[1].items():
#     print(f"{key}: {value}")
 