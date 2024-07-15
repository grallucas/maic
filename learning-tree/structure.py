# TODO VERIFY IF THIS WORKS
# LOOK AT OTHER TODOS
# ADD AN ADDING METHOD THAT ADDS EXACTLY WHERE IT NEEDS TO ADD WITH SPECIFIC INPUT
    # SUCH AS LIST OF PARENTS. 

class TreeNode:
    def __init__(
        self, 
        name,
        id,
        image, 
        category, 
        orientation, 
        highlighted_path
        ):

        self.name: str = name
        self.id: str = id
        self.image: str = image
        self.category: str = category
        self.left_child_ids: List[str] = []
        self.right_child_ids: List[str] = []
        self.center_child_id: str = None
        self.parent_ids: List[str] = []
        self.orientation: str = orientation
        self.highlighted_path: bool = highlighted_path

    def add_child(self, child_node, position: str, index: None | int = None):
        """
        Adding a child. Position should be able to be left, right, or center. 
        """
        if position == 'right':
            if index is None:
                self.right_child_ids.append(child_node.id)
            else:
                self.right_child_ids.insert(index, child_node.id)
                # TODO add a checker for being acceptable index
        if position == 'left':
            if index is None:
                    self.right_child_ids.append(child_node.id)
            else:
                self.right_child_ids.insert(index, child_node.id)
            # TODO SAME AS ABOVE
        if position == 'center':
            self.center_child_id = child_node.id

        if self.id not in child_node.parent_ids:
            child_node.parent_ids.append(self.id)

    def remove_child():
        # TODO

    def __repr__(self):
        return (f"TreeNode(name={self.name}, category={self.category}, "
                f"orientation={self.orientation}, highlighted_path={self.highlighted_path})")


class Tree:
    def __init__(self):
        self.nodes = {}
        self.root = None

    def add_node(self, node):
        if node.id in self.nodes:
            raise ValueeError(f"Node with id {node.id} is already in the Learning Tree")
        self.nodes[node.id] = node
        if self.root is None:
            self.root = node

    def get_node_by_id(self, node_id):
        return self.nodes.get(node_id, None)
    
    def __repr__(self):
        return f"Tree(nodes={list(self.nodes.keys())}, root={self.root.name if self.root else 'None'})"

    def print_tree(self):
            for node_id, node in self.nodes.items():
                print(f"Node ID: {node_id}")
                print(f"  Name: {node.name}")
                print(f"  Image: {node.image}")
                print(f"  Category: {node.category}")
                print(f"  Orientation: {node.orientation}")
                print(f"  Highlighted Path: {node.highlighted_path}")
                print(f"  Left Child IDs: {node.left_child_ids}")
                print(f"  Right Child IDs: {node.right_child_ids}")
                print(f"  Center Child ID: {node.center_child_id}")
                print(f"  Parent IDs: {node.parent_ids}")
                print()


# Example usage
tree = Tree()

# Create nodes
root = TreeNode(name="root", id="root", image="root.jpg", category="root_category", orientation="center", highlighted_path=True)
child1 = TreeNode(name="child1", id="child1", image="child1.jpg", category="child_category", orientation="right", highlighted_path=False)
child2 = TreeNode(name="child2", id="child2", image="child2.jpg", category="child_category", orientation="left", highlighted_path=False)
child3 = TreeNode(name="child3", id="child3", image="child3.jpg", category="child_category", orientation="center", highlighted_path=False)
parent2 = TreeNode(name="parent2", id="parent2", image="parent2.jpg", category="parent_category", orientation="left", highlighted_path=False)

# Add nodes to the tree
tree.add_node(root)
tree.add_node(child1)
tree.add_node(child2)
tree.add_node(child3)
tree.add_node(parent2)

# Create parent-child relationships
root.add_child(child1, position='right')
parent2.add_child(child1, position='right', index=0)
root.add_child(child2, position='left', index=1)
root.add_child(child3, position='center')

tree.__repr__

tree.print_tree()