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

const fitViewOptions = {
  minZoom: 0.1,
  maxZoom: 1,
  nodes: [{id: 'root'}], // node(s) to fit
 };

const nodeTypes: NodeTypes = {
    treeNode: LearningTreeNode,
  };

const initialNodes = [
    {
      id: 'root',
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