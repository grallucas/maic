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
import LearningTreeNode from "./LearningTreeNode";
import "./assets/css/tree.css";
import { colors } from "@mui/material";

interface TreeProps {}

// Custom node data type with index signature
interface CustomNodeData {
    name: string;
    image_path: string;
    description: string;
    category: string;
    category_color: string;
    link: string;
    [key: string]: unknown;  // Index signature to satisfy the constraint
}

// Custom node type extending ReactFlow's Node with a children attribute
interface CustomNode extends Node<CustomNodeData> {
    children?: string[];
}

/**
 * Link to ReactFlow fitViewOptions documentation: https://reactflow.dev/api-reference/types/fit-view-options
 * This object sets the default node(s) to fit the view to when the Learning Tree is first loaded, as well as setting
 * the default zoom too.
 */
const fitViewOptions: FitViewOptions = {
    minZoom: 0.1, 
    maxZoom: 1,
    nodes: [{ id: 'root' }], // Node(s) to fit in the screen on page load
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
 * Sets up initial nodes: used for initial testing, may be scrapped later on.
 * Note: type should always be the custom node type, which currently is 'treeNode'
 */
const initialNodes: CustomNode[] = [
    {
        id: 'root',
        type: 'treeNode',
        position: { x: 0, y: 0 },
        data: {
            name: "What is the Learning Tree?",
            image_path: "/tree-thumbnails/learning-tree.png",
            description: "The learning tree is a visual representation of the world of AI, built by pulling from reliable sources students before you have identified as useful and structure in an easy-to-visualize way.",
            category: "Introduction",
            category_color: "gray",
            link: '/learning-tree',
        },
        children: ['child r', 'child l'],
    },
    {
        id: 'rosie 1',
        type: 'treeNode',
        position: { x: 400, y: 0 },
        data: { 
            name: "Who is ROSIE?",
            image_path: "/tree-thumbnails/ROSIE Supercomputer.jpg",
            description: "Rosie is MSOE's supercomputer! Learn more here!",
            category: "ROSIE",
            category_color: "red",
            link: "https://www.msoe.edu/about-msoe/news/details/meet-rosie/"
        },
        children: []
    },
    {
        id: 'child r',
        type: 'treeNode',
        position: { x: 200, y: 500 },
        data: { 
            name: "Child Node Test",
            image_path: "string",
            description: "string",
            category: "ROSIE",
            category_color: "orange",
            link: '/learning-tree',
        },
        children: ['3'], 
    },
    {
        id: 'child l',
        type: 'treeNode',
        position: { x: -200, y: 500 },
        data: { 
            name: "Child Node Test",
            image_path: "string",
            description: "string",
            category: "ROSIE",
            category_color: "yellow",
            link: '/learning-tree',
        },
        children: [], 
    },
    {
        id: '3',
        type: 'treeNode',
        position: { x: 200, y: 1500 },
        data: { 
            name: "Child Node Test",
            image_path: "string",
            description: "string",
            category: "ROSIE",
            category_color: "green",
            link: '/learning-tree',
        },
        children: ['4'], 
    },
    {
        id: '4',
        type: 'treeNode',
        position: { x: 0, y: 2000 },
        data: { 
            name: "Child Node Test",
            image_path: "string",
            description: "string",
            category: "ROSIE",
            category_color: "blue",
            link: '/learning-tree',
        },
        children: ['5'], 
    },
    {
        id: '5',
        type: 'treeNode',
        position: { x: 200, y: 2500 },
        data: { 
            name: "Child Node Test",
            image_path: "string",
            description: "string",
            category: "ROSIE",
            category_color: "indigo",
            link: '/learning-tree',
        },
        children: ['6'],
    },
    {
        id: '6',
        type: 'treeNode',
        position: { x: 0, y: 3000 },
        data: { 
            name: "Child Node Test",
            image_path: "string",
            description: "string",
            category: "ROSIE",
            category_color: "violet",
            link: '/learning-tree',
        },
        children: ['7'], 
    },
    {
        id: '7',
        type: 'treeNode',
        position: { x: 200, y: 3500 },
        data: { 
            name: "Child Node Test",
            image_path: "string",
            description: "string",
            category: "ROSIE",
            category_color: "default",
            link: '/learning-tree',
        },
        children: [], 
    },
];

/**
 * Generates edges based on the children attribute of each node.
 */
const generateEdges = (nodes: CustomNode[]): Edge[] => {
    const edges: Edge[] = [];
    nodes.forEach(node => {
        if (node.children && node.children.length > 0) {
            node.children.forEach((childId, index) => {
                const targetNode = nodes.find(n => n.id === childId);
                if (targetNode) {
                    edges.push({
                        type: 'bezier',
                        source: node.id,
                        target: childId,
                        id: `${node.id}-${childId}-${index}`,
                        animated: true,
                        style: { stroke: targetNode.data.category_color, strokeWidth: 6 },
                    });
                }
            });
        }
    });
    return edges;
};

const initialEdges: Edge[] = generateEdges(initialNodes);

const Tree = (props: TreeProps) => {
    const [nodes, setNodes] = useState<CustomNode[]>(initialNodes);
    const [edges, setEdges] = useState<Edge[]>(initialEdges);

    return (
        <div className='tree'>
            <ReactFlow 
                nodes={nodes} 
                edges={edges}
                nodeTypes={nodeTypes}
                fitView={true}
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