import React, { useState } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Chip from '@mui/material/Chip';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import Grid from '@mui/material/Grid';
import { Node, NodeProps } from '@xyflow/react';
import { Position, Handle } from '@xyflow/react';
import './assets/css/learningTreeNode.css';

<<<<<<< HEAD
// This type defines the props that are able to be passed down to the treeNode
type treeNode = Node<{
  name: string;
  image_path: string;
  description: string;
  category: string;
  category_color: string;
  highlighted_path: string;
  position: string;
  link: string;
}, 'treeNode'>;
=======
//This type, defines the props that are able to be passed down to the treeNode
type treeNode = Node<{ 
    name: string;
    local_image_path: string;
    api_image_path: string;
    description: string;
    category: string;
    category_color: string;
    highlighted_path: string;
    position: string;
    link: string;
    }, 
    'treeNode'>;
>>>>>>> 370d118821362dd4045328e0f998ad30555d8f82

const LearningTreeNode = ({ data }: NodeProps<treeNode>) => {
  // Default colors to use if nothing is specified
  let baseColor = '#fff';
  let gradientTop = '#fff';
  let gradientBottom = '#0c0d0e';
  let textColor = '#fff';

  // Colors
  switch (data.category_color) {
    case 'red': {
      baseColor = '#9A031E';
      gradientTop = '#650000';
      gradientBottom = '#380000';
      textColor = '#fff';
      break;
    }
    case 'orange': {
      baseColor = '#FB8B24';
      gradientTop = '#C85A00';
      gradientBottom = '#7A3100';
      textColor = '#fff';
      break;
    }
    case 'yellow': {
      baseColor = '#F7B801';
      gradientTop = '#C79500';
      gradientBottom = '#7A5A00';
      textColor = '#fff';
      break;
    }
    case 'green': {
      baseColor = '#008148';
      gradientTop = '#005D32';
      gradientBottom = '#00361C';
      textColor = '#fff';
      break;
    }
    case 'blue': {
      baseColor = '#005F73';
      gradientTop = '#004257';
      gradientBottom = '#002638';
      textColor = '#fff';
      break;
    }
    case 'indigo': {
      baseColor = '#1A365D';
      gradientTop = '#122446';
      gradientBottom = '#0A122F';
      textColor = '#fff';
      break;
    }
    case 'violet': {
      baseColor = '#6A0572';
      gradientTop = '#49004F';
      gradientBottom = '#2A002D';
      textColor = '#fff';
      break;
    }
    case 'gray': {
      baseColor = '#B5B5B5';
      gradientTop = '#8C8C8C';
      gradientBottom = '#636363';
      textColor = '#fff';
      break;
    }
    case 'cyan': {
        baseColor = '#00A6A6';
        gradientTop = '#007474';
        gradientBottom = '#004242';
        textColor = '#fff';
        break;
    }
    default: {
      baseColor = '#fff';
      gradientTop = '#fff';
      gradientBottom = '#0c0d0e';
      textColor = '#fff';
      break;
    }
  }

<<<<<<< HEAD
  const [state, setState] = useState({ raised: false, className: 'smalltreenode' });

  const card = [];
  if (state.raised) { // Big Node Content
    card.push(
      <CardActionArea href={data.link}>
        <Grid container spacing={0.5}>
          {/* Left Side: Image and Title */}
          <Grid item xs={6} container direction="column" justifyContent="space-between" sx={{maxWidth: 200}}>
            <Grid item>
              <CardMedia
                component="img"
                height="200"
                image={
                  window.location.href.includes("3000")
                    ? data.image_path
                    : "/api/v1/library/ROSIE Supercomputer/image"
                }
                alt="Image"
                sx={{ borderRadius: 2 }}
              />
            </Grid>
            <Grid item>
              <CardContent>
                <div className="title">
                  {data.name}
=======
    const [state, setState] = useState({raised: false, className: 'smalltreenode'})
    
    const card = [];
    if(state.raised){ // Big Node Content
        card.push(
            <CardActionArea href={data.link} sx={{ p: 1 }}>
                <Grid container spacing={0.5}>
                    {/* Left Side: Image and Title */}
                    <Grid item xs={6} container direction="column" justifyContent="space-between">
                        <Grid item>
                            <CardMedia
                                component="img"
                                height="200"
                                image={
                                window.location.href.includes("3000")
                                    ? data.local_image_path
                                    : data.api_image_path
                                }
                                alt="Image"
                                sx={{ borderRadius: 2 }}
                            />
                        </Grid>
                        <Grid item sx={{ mt: 2 }}>
                            <CardContent>
                                <div className="title">
                                {data.name}
                                </div>
                            </CardContent>
                        </Grid>
                    </Grid>
                    
                    {/* Right Side: Description and Category */}
                    <Grid item xs={6} container direction="column" justifyContent="space-between">
                        <Grid item sx={{ mb: 0 }}>
                            <CardContent>
                                <div style={{marginBottom: '-50px'}}>
                                {data.description}
                                </div>
                            </CardContent>
                        </Grid>
                        <Grid item sx={{ mb: 4 }}>
                            <Chip
                                sx={{
                                position: "relative",
                                borderRadius: 4,
                                backgroundColor: baseColor,
                                color: textColor,
                                }}
                                size="small"
                                label={data.category}
                            />
                        </Grid>
                    </Grid>

                    {/* On Bottom In Middle: "Click to Learn More" */}
                    <Grid item xs={12}>
                        <CardContent>
                            <div className="learn-more">
                                Click to Learn More
                            </div>
                        </CardContent>
                    </Grid>
                </Grid>
            </CardActionArea>)
    } else { // Small Node Content
        card.push(
        <CardActionArea href = {data.link} sx={{p: 0.5}}>
                <CardMedia
                    component="img"
                    height="200"
                    image={
                        window.location.href.includes("3000") ? data.local_image_path : "/api/v1/library/ROSIE Supercomputer/image"
                    }
                    alt="Image"
                    sx={{borderRadius: 2}}
                />
            <CardContent>
                <div>
                    {data.name}
>>>>>>> 370d118821362dd4045328e0f998ad30555d8f82
                </div>
              </CardContent>
            </Grid>
          </Grid>

          {/* Right Side: Description and Category */}
          <Grid item xs={6} container direction="column" justifyContent="space-between" sx={{maxWidth: 200}}>
            <Grid item>
              <CardContent>
                <div>
                  {data.description}
                </div>
              </CardContent>
            </Grid>
            <Grid item>
                <Chip
                    sx={{
                    backgroundColor: baseColor,
                    color: textColor,
                    borderRadius: 4,
                    mb: 0 // Reduced margin-bottom to bring the text closer to the chip
                    }}
                    size="medium"
                    label={data.category}
                />
                <Typography
                    variant="body2" // Adjust this variant to change the font size and style
                    sx={{ mb: 3, fontSize: 14, fontStyle: 'italic' }}
                >
                    Click to learn more!
                </Typography>
            </Grid>
          </Grid>
        </Grid>
      </CardActionArea>
    );
  } else { // Small Node Content
    card.push(
      <CardActionArea href={data.link} sx = {{maxHeight: 300, maxWidth: 200}}>
        <CardMedia
          component="img"
          image={
            window.location.href.includes("3000") ? data.image_path : "/api/v1/library/ROSIE Supercomputer/image"
          }
          alt="Image"
        />
        <CardContent>
          <div className="title">
            {data.name}
          </div>
        </CardContent>
      </CardActionArea>
    );
  }

  return (
    <div className={state.className}>
      <Handle
        type="target"
        position={Position.Top}
        style={{ background: baseColor, visibility: 'hidden' }}
        onConnect={(params) => console.log('handle onConnect', params)}
        isConnectable={true}
      />
      <Card
        className='card'
        sx={{
          border: 3,
          borderRadius: 4,
          borderColor: baseColor,
          background: `linear-gradient(to top, ${gradientBottom}, ${gradientTop})`,
          color: textColor,
          height: '310px',  // Fixed height for the card
        }}
        onMouseOver={() => setState({ raised: true, className: "bigtreenode" })}
        onMouseOut={() => setState({ raised: false, className: "smalltreenode" })}
        raised={state.raised}
      >
        {card}
      </Card>
      <Handle
        type="source"
        position={Position.Bottom}
        style={{ background: baseColor, visibility: 'hidden' }}
        onConnect={(params) => console.log('handle onConnect', params)}
        isConnectable={true}
      />
    </div>
  );
};

export default LearningTreeNode;