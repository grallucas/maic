import os
import re
import base64
from io import BytesIO
from PIL import Image

# TODO how to convert image to something I can pass through a fastapi

class LearningTree():
    """
    A class to build and represent a learning tree structure based on node files in a directory.
    """
    REQUIRED_KEYS = None
    # have this build tree
    def __init__(self, path):
        """
        Initializes the LearningTree instance by reading node names from the specified directory,
        and removing the template file from the list of node names.
        :param path: The path where all the node files are stored. 
        """
        self.path = path
        self.node_names = os.listdir(self.path)
        self.node_names.remove('TEMPLATE') # removing the template file.
        if LearningTree.REQUIRED_KEYS is None:
            LearningTree.REQUIRED_KEYS = self._load_required_keys()
        
        # print(self.node_names)
        
    def to_dict(self):
        """
        Converts the learning tree structure into a dictionary format.
        :return: A dictionary where each key is a node ID and the value is a list containing parent IDs and the node's key-value pairs.
        """
        final_dict = {}
        # print(self.node_names)
        for node in self.node_names:
            _, node_id, parent_ids = self._split_string(node)
            final_dict[node_id] = [parent_ids, self._file_to_dict(node)]
        sorted(final_dict) # sorts by the node id
        return final_dict
            

    def _split_string(self, input_string):
        """
        Splits the input string into three sections:
        1. file_name (e.g., 'what-is-ai' or 'intro')
        2. node_id (e.g., '1' or '2')
        3. parent_ids (e.g., ['2', '3'] or ['3']), or an empty list if the middle number is '1'
        :param input_string: The string to be split
        :return: A tuple containing the first part, the middle number, and a list of remaining numbers
        """
        pattern_with_remaining = r'^([a-zA-Z-]+)-(\d)-([\d-]+)$'
        pattern_without_remaining = r'^([a-zA-Z-]+)-(\d)$'
        
        match = re.match(pattern_with_remaining, input_string)
        
        if match:
            file_name = match.group(1)
            node_id = match.group(2)
            parent_ids = match.group(3).split('-')
            
            parent_ids = [num for num in parent_ids if num]
            
            if node_id == '1':
                if parent_ids: 
                    raise ValueError('The head node should have no parents')
                parent_ids = []
            
            return file_name, node_id, parent_ids
        else:
            # If the first pattern doesn't match, try the pattern without remaining numbers
            match = re.match(pattern_without_remaining, input_string)
            
            if match:
                file_name = match.group(1)
                node_id = match.group(2)
                parent_ids = []
                
                return file_name, node_id, parent_ids
            else:
                raise ValueError("Input string does not match the expected format.")

    def _file_to_dict(self, path):
        """
        Converts a file with key-value pairs into a dictionary.
        :param filepath: Path to the file to be read
        :return: Dictionary with key-value pairs from the file
        """
        result_dict = {}
        exact_path = self.path + '\\' + path
        with open(exact_path, 'r') as file:
            for line in file:
                line = line.strip()

                if not line:
                    continue
                key, value = line.split('=', 1)
                key = key.strip()
                value = value.strip()
                if value.startswith('"') and value.endswith('"'):
                    value = value[1:-1]

                result_dict[key] = value
        if set(result_dict.keys()) != LearningTree.REQUIRED_KEYS:
            raise ValueError(f"File {path} does not contain exactly the required keys: {LearningTree.REQUIRED_KEYS}")

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