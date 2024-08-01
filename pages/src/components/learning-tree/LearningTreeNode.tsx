import React, { memo } from 'react';
import { Handle, Position } from '@xyflow/react';
import Stack from '@mui/material/Stack';
import type { Node, NodeProps } from '@xyflow/react';
import "./assets/css/learningTreeNode.css";
 
type treeNode = Node<{ 
    name: string;
    image_path: string;
    description: string;
    category: string;
    category_color: string;
    highlighted_path: string;
    position: string;
    x: number;
    y: number; }, 
    'treeNode'>;

const LearningTreeNode = ({ data }: NodeProps<treeNode>) => {

    console.log(data.name);
    return (
        <div className = "treeNode">
            <Stack spacing={0.5}>
                <img src = "logo.png" ></img>
                <h1>{data.name}</h1>
            </Stack>
        </div>
    );
};

export default LearningTreeNode;