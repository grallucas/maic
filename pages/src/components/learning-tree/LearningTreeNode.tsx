/**
 * Link to ReactFlow custom node documentation w/ typescript: https://reactflow.dev/learn/advanced-use/typescript
 * Link to ReactFlow custom node documentation (General): https://reactflow.dev/learn/customization/custom-nodes
 */
import React, { useState } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Chip from '@mui/material/Chip';
import { CardActionArea, useThemeProps } from '@mui/material';
import type { Node, NodeProps} from '@xyflow/react';
import {Position, Handle} from '@xyflow/react'
import Grid from '@mui/material/Grid'; // Grid version 1
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

    //Default colors to use if nothing to specified
    let baseColor = '#fff';
    let gradientColor = '#fff';
    let textColor = '#fff';

    //Will eventually be a switch statement for each supported color
    if(data.category_color === 'red'){
        baseColor = '#9A031E'
        gradientColor= '#750000'
        textColor='#fff'
    }

    const [state, setState] = useState({raised: false, className: 'smalltreenode'})
    
    const card = [];
    if(state.raised){
        card.push(
        <CardActionArea href = {data.link} sx={{p: 1}} >
            <Grid container spacing={0.5}>
                <Grid xs={6}>
                    <CardMedia
                        component="img"
                        height='200'
                        image={
                            window.location.href.includes("3000") ? data.image_path : "/api/v1/library/ROSIE Supercomputer/image"
                        }
                        alt="Image"
                        sx={{borderRadius: 2}}
                    />
                </Grid>
                <Grid xs={6} sx={{mt:10}}>
                    <CardContent>
                        <div>
                        {data.description}
                        </div>
                    </CardContent>
                </Grid>
                <Grid xs={6} sx={{mt:2}}>
                    <CardContent>
                        <div className='title'>
                        {data.name}
                        </div>
                    </CardContent>
                </Grid>
                <Grid xs={3}></Grid>
                <Grid xs={3} container direction={'column'} justifyContent={'flex-end'} alignItems={'stretch'}>
                    <Chip sx={{position: 'relative', right: -8, bottom: -10, borderRadius: 4, borderBottomRightRadius: 0, borderTopRightRadius: 0, borderBottomLeftRadius: 0, backgroundColor: baseColor, color: textColor}} size = "small" label={data.category}/>
                </Grid>
            </Grid>
        </CardActionArea>)
    } else {
        card.push(
        <CardActionArea href = {data.link} sx={{p: 0.5}}>
                <CardMedia
                    component="img"
                    height="200"
                    image={
                        window.location.href.includes("3000") ? data.image_path : "/api/v1/library/ROSIE Supercomputer/image"
                    }
                    alt="Image"
                    sx={{borderRadius: 2}}
                />
            <CardContent>
                <div>
                    {data.name}
                </div>
            </CardContent>
        </CardActionArea>)
    }

    return (
        <div className={state.className}>
            <Handle 
                type="target"
                position={Position.Top}
                style={{ background: baseColor, visibility: 'hidden'}}
                onConnect={(params) => console.log('handle onConnect', params)}
                isConnectable={true}>
            </Handle>
            <Card className='card'
            sx={{border: 3, borderRadius: 4, borderColor: baseColor, background: `linear-gradient(to top, #0c0d0e, ${gradientColor})`, color: textColor}}
            onMouseOver = {()=>setState({raised: true, className: "bigtreenode"})}
            onMouseOut = {()=>setState({raised: false, className: "smalltreenode"})}
            raised = {state.raised}
            >
                {card}
            </Card>
            <Handle 
                type="source"
                position={Position.Bottom}
                style={{ background: baseColor, visibility: 'hidden'}}
                onConnect={(params) => console.log('handle onConnect', params)}
                isConnectable={true}>
            </Handle>
        </div>
    );
};

export default LearningTreeNode;