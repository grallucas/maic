/**
 * Link to ReactFlow custom node documentation w/ typescript: https://reactflow.dev/learn/advanced-use/typescript
 * Link to ReactFlow custom node documentation (General): https://reactflow.dev/learn/customization/custom-nodes
 */
import React, { useState } from 'react';
import { Background, Handle, Position } from '@xyflow/react';
import Stack from '@mui/material/Stack';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import Chip from '@mui/material/Chip';
import { CardActionArea, useThemeProps } from '@mui/material';
import type { Node, NodeProps } from '@xyflow/react';
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

    // const useStyles = makeStyles({
    //     root: {
    //       maxWidth: 310,
    //       transition: "transform 0.15s ease-in-out"
    //     },
    //     cardHovered: {
    //       transform: "scale3d(1.05, 1.05, 1)"
    //     }
    //   });

    const [state, setState] = useState({
        raised:false, 
        className: 'smalltreenode',
    })
    
    //This switch statement below dynamically sets the color of the tags for each node based on data.category_color
    //This statement will be added to when needed to add in more colors
    const chip = [];
    switch(data.category_color) { 
        case 'red': { 
            chip.push()
            break; 
        } 
        default: { 
            chip.push(<Chip color = "default" size = "small" label={data.category} />)
            break; 
        } 
    }
    
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
                            window.location.href.includes("3000") ? data.image_path : "/api/v1/library/Sticker/image"
                        }
                        alt="Image"
                        sx={{borderRadius: 2}}
                    />
                </Grid>
                <Grid xs={6} sx={{mt:7, p:3}}>
                    <CardContent >
                        <Typography variant="body2" >
                            {data.description}
                        </Typography>
                    </CardContent>
                </Grid>
                <Grid xs={6} sx={{mt:2}}>
                    <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                        {data.name}
                    </Typography>
                    </CardContent>
                </Grid>
                <Grid xs={6} container direction={'column'} justifyContent={'flex-end'} alignItems={'stretch'}>
                        <Chip sx={{position: 'relative', right: -8, bottom: -10, borderRadius: 4, borderBottomRightRadius: 0, borderTopRightRadius: 0, borderBottomLeftRadius: 0, backgroundColor: "#9A031E", color: '#fff'}} size = "small" label={data.category}/>
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
                        window.location.href.includes("3000") ? data.image_path : "/api/v1/library/Sticker/image"
                    }
                    alt="Image"
                    sx={{borderRadius: 2}}
                />
            
            <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                    {data.name}
                </Typography>
            </CardContent>
        </CardActionArea>)
    }

    return (
        <div className={state.className}>
            <Card 
            sx={{border: 3, borderRadius: 4, borderColor:'#9A031E', background: 'linear-gradient(to top, #0c0d0e, #750000)', color: '#fff'}}
            onMouseOver = {()=>setState({raised: true, className: "bigtreenode"})}
            onMouseOut = {()=>setState({raised: false, className: "smalltreenode"})}
            raised = {state.raised}
            >
                {card}
            </Card>
        </div>
    );
};

export default LearningTreeNode;