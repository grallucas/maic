/**
 * Link to ReactFlow custom node documentation w/ typescript: https://reactflow.dev/learn/advanced-use/typescript
 * Link to ReactFlow custom node documentation (General): https://reactflow.dev/learn/customization/custom-nodes
 */
import React, { memo } from 'react';
import { Handle, Position } from '@xyflow/react';
import Stack from '@mui/material/Stack';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import Chip from '@mui/material/Chip';
import { CardActionArea } from '@mui/material';
import type { Node, NodeProps } from '@xyflow/react';
import "./assets/css/learningTreeNode.css";

//This type, defines the props that are able to be passed down to the treeNode
type treeNode = Node<{ 
    name: string;
    image_path: string;
    description: string;
    category: string;
    category_color: string;
    highlighted_path: string;
    position: string;
    link: string;
    }, 
    'treeNode'>;

const LearningTreeNode = ({ data }: NodeProps<treeNode>) => {

    return (
        <div className = "treeNode">
            <Card raised = {true} sx={{maxWidth: 345}}>
                <CardActionArea href = {data.link}>
                    <CardMedia
                    component="img"
                    height="200"
                    image={
                        window.location.href.includes("3000") ? data.image_path : "/api/v1/library/Sticker/image"
                      }
                    alt="Image"
                    />
                    <Divider/>
                    <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                        {data.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        {data.description}
                    </Typography>
                    </CardContent>
                    <Divider variant='middle'/>
                    <div className='tags'>
                        <Stack direction="column" spacing={1.5}>
                            <Chip size = "small" label={data.category} />
                        </Stack>
                    </div>
                </CardActionArea>
            </Card>
        </div>
    );
};

export default LearningTreeNode;