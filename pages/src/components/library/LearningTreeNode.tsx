import React, { memo } from 'react';
import { Handle, Position } from '@xyflow/react';
import Grid from '@mui/material/Grid'; // Grid version 1
import Stack from '@mui/material/Stack';


interface TreeNodeProps {
    name: string;
    image_path: string;
    description: string;
    category: string;
    category_color: string;
    highlighted_path: string;
    position: string;
    x: number;
    y: number;
}

const LearningTreeNode = (props: TreeNodeProps) => {

    console.log(props.name);
    return (
        <div>
            <Stack spacing={2}>
                <img src = "logo.png"></img>
                <h1>{props.name}</h1>
            </Stack>
        </div>
    );
};

export default LearningTreeNode;