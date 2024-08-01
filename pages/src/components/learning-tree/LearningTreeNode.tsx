import React, { memo } from 'react';
import { Handle, Position } from '@xyflow/react';
import Stack from '@mui/material/Stack';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import CardActions from '@mui/material/CardActions';
import { CardActionArea } from '@mui/material';
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
            <Card sx={{ maxWidth: 345 }}>
                <CardActionArea href = "./library">
                    <CardMedia
                    component="img"
                    height="200"
                    image={
                        window.location.href.includes("3000") ? "/tree-thumbnails/ROSIE Supercomputer.jpg" : "/api/v1/library/Sticker/image"
                      }
                    alt="Picture of ROSIE"
                    />
                    <Divider/>
                    <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                        Who is ROSIE?
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        Rosie is MSOE's supercomputer! Learn more here!
                    </Typography>
                    </CardContent>
                </CardActionArea>
            </Card>
        </div>
    );
};

export default LearningTreeNode;