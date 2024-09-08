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

//This type, defines the props that are able to be passed down to the treeNode
type treeNode = Node<{ 
    name: string;
    api_image_path: string;
    description: string;
    category: string;
    category_color: string;
    highlighted_path: string;
    position: string;
    link: string;
    }, 
    'treeNode'>;

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
    case 'limegreen': {
        baseColor = '#32CD32'; // Brighter lime green
        gradientTop = '#2EB82E'; // Lighter lime green for the top gradient
        gradientBottom = '#28A428'; // Slightly darker lime green for the bottom gradient
        textColor = '#fff'; // White text for better readability
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
      gradientTop = '#636363';
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
    case 'pink': {
        baseColor = '#FFC0CB';
        gradientTop = '#FFA07A';
        gradientBottom = '#FF6347';
        textColor = '#fff';
        break;
    }
    case 'lime': {
        baseColor = '#00FF00';
        gradientTop = '#00FF00';
        gradientBottom = '#00FF00';
        textColor = '#fff';
        break;
    }
    case 'teal': {
        baseColor = '#008080';
        gradientTop = '#008080';
        gradientBottom = '#008080';
        textColor = '#fff';
        break;
    }
    case 'brown': {
        baseColor = '#8B4513';
        gradientTop = '#5C2E06';
        gradientBottom = '#2E1A03';
        textColor = '#fff';
        break;
    }
    case 'beige': {
    baseColor = '#F5F5DC';
    gradientTop = '#E1DAB6';
    gradientBottom = '#C7B899';
    textColor = '#000';
    break;
    }
    case 'black': {
    baseColor = '#000000';
    gradientTop = '#2C2C2C';
    gradientBottom = '#1A1A1A';
    textColor = '#fff';
    break;
    }
    case 'white': {
    baseColor = '#FFFFFF';
    gradientTop = '#E5E5E5';
    gradientBottom = '#CCCCCC';
    textColor = '#000';
    break;
    }
    case 'olive': {
    baseColor = '#808000';
    gradientTop = '#6B6B00';
    gradientBottom = '#4C4C00';
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

  const [state, setState] = useState({raised: false, className: 'smalltreenode'})
    
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
                  data.api_image_path
                }
                alt="Image"
                sx={{ borderRadius: 2 }}
              />
            </Grid>
            <Grid item>
              <CardContent>
                <div className="title">
                  {data.name}
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
                    sx={{ mb: 3, fontSize: 14, fontStyle: 'italic', fontWeight: 'bold' }}
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
      <CardActionArea href={data.link} sx = {{}}>
        <CardMedia
          component="img"
          height="150"
          image={
            data.api_image_path
          }
          alt="Image"
          sx= {{mb: -1.5}}
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
          border: 2,
          borderRadius: 2,
          borderColor: baseColor,
          background: `linear-gradient(to top, ${gradientBottom}, ${gradientTop})`,
          color: textColor,
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