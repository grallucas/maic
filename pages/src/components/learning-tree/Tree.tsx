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

const nodeTypes: NodeTypes = {
    treeNode: LearningTreeNode,
  };

const defaultViewport = { x: 0, y: 0, zoom: 1.5 };

const initialNodes = [
    {
      id: 'node-1',
      type: 'treeNode',
      position: { x: 0, y: 0 },
      data: { name: 'Testing123' },
    },
  ];

const Tree = (props: TreeProps) => {
      const [nodes, setNodes] = useState(initialNodes);
    return (
        <div className = 'tree'>
                <ReactFlow
                nodes = {nodes}
                nodeTypes={nodeTypes}
                >
                    <Background />
                    <Controls />
                </ReactFlow>
        </div>
    );
};

export default Tree;