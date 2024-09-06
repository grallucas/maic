import os
import re
import base64
from io import BytesIO
from PIL import Image
from typing import List, Dict

class Node():
        def __init__(
            self,
            file_path: str = "learning_tree\\learning-tree-nodes\\what-is-ai-2-1"
            ):

            if filt_path == "learning_tree\\learning-tree-nods\\TEMPLATE":
                raise Exception("Cannot input the TEMPLATE path")

            
            self.type = 'treeNode' # constant

            self.id = int(id)
            self.description = description
            self.category = category
            self.category_color = category_color
            self.local_image_path = local_image_path
            self.api_image_path = api_image_path
            self.highlighted_path = highlighted_path
            self.horizontal_displacement = int(horizontal_displacement)
            # information scraped from the template ^


            # self.position = {}
            # self.children = []
            # self.parent = []

class TreeBuilder():
        def __init__(self, path = "learning_tree\\learning-tree-nodes"):
            self.path = path
            if TreeBuilder.REQUIRED_KEYS == None:
                TreeBuilder.REQUIRED_KEYS = self._load_required_keys()

            self.nodes: List[Node] = None

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
            
            
            


#       id: 'root',
#       type: 'treeNode',
#          position: { x: 0, y: 0 },
#          data: {
#              name: "What is the Learning Tree?",
#              local_image_path: "/tree-thumbnails/learning-tree.png",
#              api_image_path: 'string',
#              description: "The learning tree is a visual representation of the world of AI, built by pulling from reliable sources students before you have identified as useful and structure in an easy-to-visualize way.",
#              category: "Introduction",
#              category_color: "gray",
#              link: '/learning-tree',
#          },
#          children: ['intro1'],
