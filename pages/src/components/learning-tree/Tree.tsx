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

const Tree = (props: TreeProps) => {
      const [nodes, setNodes] = useState<Node[]>([]);

      useEffect(() => {
        const fetchNodes = async () => {
            try {
                const response = await fetch('http://localhost:8000/api/v1/learning-tree/'); // Replace with your FastAPI endpoint
                if (!response.ok) {
                  throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data = await response.json();
                setNodes(data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchNodes();
    }, []);

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