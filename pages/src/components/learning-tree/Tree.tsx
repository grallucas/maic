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
      category: "ROSIE",
      category_color: "red",
      highlighted_path: "null",
      position: "null",
      link: "https://www.msoe.edu/about-msoe/news/details/meet-rosie/"
      },
  },
  {
    id: 'child r',
    type: 'treeNode',
    position: { x: 200, y: 500},
    data: { 
      name: "Child Node Test",
      image_path: "string",
      description: "string",
      category: "ROSIE",
      category_color: "orange",
      highlighted_path: "string",
      position: "string",
      link: '/learning-tree',
    },
  },
  {
    id: 'child l',
    type: 'treeNode',
    position: { x: -200, y: 500},
    data: { 
      name: "Child Node Test",
      image_path: "string",
      description: "string",
      category: "ROSIE",
      category_color: "yellow",
      highlighted_path: "string",
      position: "string",
      link: '/learning-tree',
    },
  },
  {
    id: '3',
    type: 'treeNode',
    position: { x: 200, y: 1500},
    data: { 
      name: "Child Node Test",
      image_path: "string",
      description: "string",
      category: "ROSIE",
      category_color: "green",
      highlighted_path: "string",
      position: "string",
      link: '/learning-tree',
    },
  },
  {
    id: '4',
    type: 'treeNode',
    position: { x: 0, y: 2000},
    data: { 
      name: "Child Node Test",
      image_path: "string",
      description: "string",
      category: "ROSIE",
      category_color: "blue",
      highlighted_path: "string",
      position: "string",
      link: '/learning-tree',
    },
  },
  {
    id: '5',
    type: 'treeNode',
    position: { x: 200, y: 2500},
    data: { 
      name: "Child Node Test",
      image_path: "string",
      description: "string",
      category: "ROSIE",
      category_color: "indigo",
      highlighted_path: "string",
      position: "string",
      link: '/learning-tree',
    },
  },
  {
    id: '6',
    type: 'treeNode',
    position: { x: 0, y: 3000},
    data: { 
      name: "Child Node Test",
      image_path: "string",
      description: "string",
      category: "ROSIE",
      category_color: "violet",
      highlighted_path: "string",
      position: "string",
      link: '/learning-tree',
    },
  },
  {
    id: '7',
    type: 'treeNode',
    position: { x: 200, y: 3500},
    data: { 
      name: "Child Node Test",
      image_path: "string",
      description: "string",
      category: "ROSIE",
      category_color: "default",
      highlighted_path: "string",
      position: "string",
      link: '/learning-tree',
    },
  },
];

const initialEdges = [
  {
    type: 'bezier',
    source: 'root',
    target: 'child r',
    id: '4',
    animated: true,
    style: { stroke: '#606060', strokeWidth: 6,  },
  },
  {
    type: 'bezier',
    source: 'root',
    target: 'child l',
    id: '5',
    animated: true,
    style: { stroke: '#606060', strokeWidth: 6 },
  },
];

const Tree = (props: TreeProps) => {
    const [nodes, setNodes] = useState(initialNodes);
    const [edges, setEdges] = useState(initialEdges);


// const Tree = (props: TreeProps) => {
//       const [nodes, setNodes] = useState<Node[]>([]);

//       useEffect(() => {
//         const fetchNodes = async () => {
//             try {
//                 const response = await fetch('http://localhost:8000/api/v1/learning-tree/'); // Replace with your FastAPI endpoint
//                 if (!response.ok) {
//                   throw new Error(`HTTP error! status: ${response.status}`);
//                 }
//                 const data = await response.json();
//                 setNodes(data);
//             } catch (error) {
//                 console.error('Error fetching data:', error);
//             }
//         };

//         fetchNodes();
//     }, []);

    return (
        <div className = 'tree'>
                <ReactFlow 
                nodes = {nodes} 
                edges = {edges}
                nodeTypes={nodeTypes}
                fitView = {true}
                fitViewOptions={fitViewOptions}
                colorMode="dark"
                >
                    <Background />
                    <Controls />
                </ReactFlow>
        </div>
    );
};

export default Tree;