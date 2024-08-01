import { useState, useEffect } from "react";
import {
    ReactFlow, 
    Background, 
    Controls,
    addEdge,
    applyNodeChanges,
    applyEdgeChanges,
    type Node,
    type Edge,
    type FitViewOptions,
    type OnConnect,
    type OnNodesChange,
    type OnEdgesChange,
    type OnNodeDrag,
    type NodeTypes,
    type DefaultEdgeOptions,
  } from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import LearningTreeNode from "./LearningTreeNode"
import "./assets/css/tree.css";

interface TreeProps {

}

/**
 * Link to ReactFlow fitViewOptions documentation: https://reactflow.dev/api-reference/types/fit-view-options
 * This object sets the default node(s) to fit the view to when the Learning Tree is first loaded, as well as setting
 * the default zoom too.
 */
const fitViewOptions = {
  minZoom: 0.1, 
  maxZoom: 1,
  nodes: [{id: 'root'}], // Node(s) to fit in the screen on page load
 };

/**
 * Link to ReactFlow custom node documentation w/ typescript: https://reactflow.dev/learn/advanced-use/typescript
 * Link to ReactFlow custom node documentation (General): https://reactflow.dev/learn/customization/custom-nodes
 * This defines the custom node type we created, allowing it to be used in the flow.
 */
const nodeTypes: NodeTypes = {
    treeNode: LearningTreeNode,
  };

/**
 * Sets up initial nodes: used for inital testing, may be scraped later on.
 * Note: type should always be the custom node type, which currently is 'treeNode'
 */
const initialNodes = [
    {
      id: 'root',
      type: 'treeNode',
      position: { x: 0, y: 0 },
      data: { 
        name: "Who is ROSIE?",
        image_path: "/tree-thumbnails/ROSIE Supercomputer.jpg",
        description: "Rosie is MSOE's supercomputer! Learn more here!",
        category: "rosie",
        category_color: "red",
        highlighted_path: "null",
        position: "null",
        },
    },
    {
      id: 'child',
      type: 'treeNode',
      position: { x: 0, y: 500},
      data: { 
        name: "Child Node Test",
        image_path: "string",
        description: "string",
        category: "string",
        category_color: "string",
        highlighted_path: "string",
        position: "string",
      },
    },
  ];

const Tree = (props: TreeProps) => {
      const [nodes, setNodes] = useState(initialNodes);
    return (
        <div className = 'tree'>
                <ReactFlow 
                nodes = {nodes} 
                nodeTypes={nodeTypes}
                fitView = {true}
                fitViewOptions={fitViewOptions}
                >
                    <Background />
                    <Controls />
                </ReactFlow>
        </div>
    );
};

export default Tree;