/**
 * Link to ReactFlow custom node documentation w/ typescript: https://reactflow.dev/learn/advanced-use/typescript
 * Link to ReactFlow custom node documentation (General): https://reactflow.dev/learn/customization/custom-nodes
 */
import React, { useState } from 'react';
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
            chip.push(<Chip color = "error" size = "small" label={data.category} />)
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
        <CardActionArea href = {data.link} sx={{p: 1}}>
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
                <Grid xs={6}>
                    <CardContent>
                    <Typography variant="body2" color="text.secondary">
                        {data.description}
                    </Typography>
                    </CardContent>
                </Grid>
                <Grid xs={6}>
                    <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                        {data.name}
                    </Typography>
                    </CardContent>
                </Grid>
                <Grid xs={6}>
                    <div className='tags'>
                        <Stack direction="column" spacing={1.5}>
                            {chip}
                        </Stack>
                    </div>
                </Grid>
            </Grid>
        </CardActionArea>)
    } else {
        card.push(
        <CardActionArea href = {data.link} sx={{p: 0.75}}>
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
            sx={{border: 3, borderRadius: 4, borderColor: 'error.main'}}
            onMouseOver = {()=>setState({raised: true, className: "bigtreenode"})}
            onMouseOut = {()=>setState({raised: false, className: "smalltreenode"})}
            raised = {state.raised}
            >
                <div className="border">
                    {card}
                </div>
            </Card>
        </div>
    );
};

export default LearningTreeNode;