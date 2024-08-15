import { useState, useEffect } from "react";
import {
    ReactFlow, 
    Background, 
    Controls,
    MiniMap,
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
import LearningTreeNode from "./LearningTreeNode";
import "./assets/css/tree.css";
import { colors } from "@mui/material";

interface TreeProps {}

// Custom node data type with index signature
interface CustomNodeData {
    name: string;
    local_image_path: string;
    description: string;
    category: string;
    category_color: string;
    link: string;
    [key: string]: unknown;  // Index signature to satisfy the constraint
}

// Custom node type extending ReactFlow's Node with a children attribute
interface CustomNode extends Node<CustomNodeData> {
    children?: string[];
}

/**
 * Link to ReactFlow fitViewOptions documentation: https://reactflow.dev/api-reference/types/fit-view-options
 * This object sets the default node(s) to fit the view to when the Learning Tree is first loaded, as well as setting
 * the default zoom too.
 */
const fitViewOptions: FitViewOptions = {
    minZoom: 0.00000000000000000000000000000000000000000000000000000000000000001, 
    maxZoom: 2000,
    nodes: [{ id: 'root'}, {id: 'computerVision3'}], // Node(s) to fit in the screen on page load {id: 'rosie0'}
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
 * Sets up initial nodes: used for initial testing, may be scrapped later on.
 * Note: type should always be the custom node type, which currently is 'treeNode'
 * 
 * Blank Format:
 * 
 *
 {
    id: '',
    type: 'treeNode',
    position: { x: 0, y: 0 },
    data: {
        name: "",
        local_image_path: "/tree-thumbnails/",
        api_image_path: 'string',
        description: "",
        category: "Introduction",
        category_color: "gray",
        link: '/learning-tree',
    },
    children: [],
},
*/
const initialNodes: CustomNode[] = [
    /* INTRODUCTION LEARNING MODULES */
    {
        id: 'root',
        type: 'treeNode',
        position: { x: 0, y: 0 },
        data: {
            name: "What is the Learning Tree?",
            local_image_path: "/tree-thumbnails/learning-tree.png",
            api_image_path: '/api/v1/library/learning-tree/image',
            description: "The learning tree is a visual representation of the world of AI, built by pulling from reliable sources students before you have identified as useful and structure in an easy-to-visualize way.",
            category: "Introduction",
            category_color: "gray",
            link: '/learning-tree',
        },
        children: ['intro1'],
    },
    {
        id: 'intro1',
        type: 'treeNode',
        position: { x: 0, y: 500 },
        data: {
            name: "What is Programming?",
            local_image_path: "/tree-thumbnails/",
            api_image_path: 'string',
            description: "Before getting to AI development, let's start with the basics of programming. We'll also dive into how learning about programming works at college!",
            category: "Introduction",
            category_color: "gray",
            link: '/learning-tree',
        },
        children: ['intro2'],
    },
    {
        id: 'intro2',
        type: 'treeNode',
        position: { x: 0, y: 1000 },
        data: {
            name: "What is AI?",
            local_image_path: "/tree-thumbnails/",
            api_image_path: 'string',
            description: "Let's get some contextual info on AI and how it's used in the real world!",
            category: "Introduction",
            category_color: "gray",
            link: '/learning-tree',
        },
        children: ['intro3'],
    },
    {
        id: 'intro3',
        type: 'treeNode',
        position: { x: 0, y: 1500 },
        data: {
            name: "AI at MSOE",
            local_image_path: "/tree-thumbnails/",
            api_image_path: 'string',
            description: "Given you understand the basics of AI's history and applications, let's now dive into how you would typically learn about AI at MSOE given you don't join MAIC.",
            category: "Introduction",
            category_color: "gray",
            link: '/learning-tree',
        },
        children: ['rosie0', 'vsc0'],
    },

    /* INITIAL SPLIT FOR ROSIE AND VSCODE */
    {
        id: 'rosie0',
        type: 'treeNode',
        position: { x: -250, y: 2000 },
        data: { 
            name: "ROSIE: Getting Access",
            local_image_path: "/tree-thumbnails/ROSIE Tutorial Icon 1.png",
            api_image_path: "/api/v1/library/ROSIE Tutorial Icon 1/image",
            description: "Let's get you access to that fancy supercomputer in Diercks Hall, no matter your major/year!",
            category: "ROSIE",
            category_color: "red",
            link: "/library?nav=Articles&article=Learning_Resources-pt1-how-to-get-rosie-access"
        },
        children: ['rosie1']
    },
    {
        id: 'vsc0',
        type: 'treeNode',
        position: { x: 250, y: 2000 },
        data: {
            name: "How to Use Visual Studio Code",
            local_image_path: "/tree-thumbnails/VSC_Tutorial_1.png",
            api_image_path: '/api/v1/library/VSC_Tutorial_1/image',
            description: "Visual Studio Code is a powerful tool for coding, but it can be a bit overwhelming at first. Let's get you started!",
            category: "Local Development",
            category_color: "blue",
            link: '/learning-tree',
        },
        children: ['vsc1'],
    },
    {
        id: 'rosie1',
        type: 'treeNode',
        position: { x: -250, y: 2500 },
        data: { 
            name: "ROSIE: First-Time Login",
            local_image_path: "/tree-thumbnails/ROSIE Tutorial Icon 2.png",
            api_image_path: "/api/v1/library/ROSIE Tutorial Icon 2/image",
            description: "Now you have an email from ROSIE, let's get you logged in for the first time!",
            category: "ROSIE",
            category_color: "red",
            link: "/library?nav=Articles&article=Learning_Resources-pt2-first-login"
        },
        children: ['rosie2']
    },
    {
        id: 'vsc1',
        type: 'treeNode',
        position: { x: 250, y: 2500 },
        data: {
            name: "Installing Languages / Extensions in VSC",
            local_image_path: "/tree-thumbnails/VSC_Tutorial_2.png",
            api_image_path: '/api/v1/library/VSC_Tutorial_2/image',
            description: "VSC is a powerful tool, but it's even better when you have the right tools installed. Let's get you set up!",
            category: "Local Development",
            category_color: "blue",
            link: '/learning-tree',
        },
        children: ['vsc2'],
    },
    {
        id: 'rosie2',
        type: 'treeNode',
        position: { x: -250, y: 3000 },
        data: { 
            name: "ROSIE: Using ROSIE Web Portal",
            local_image_path: "/tree-thumbnails/ROSIE Tutorial Icon 3.png",
            api_image_path: "/api/v1/library/ROSIE Tutorial Icon 3/image",
            description: "Now that you have access to ROSIE with your own password, you can start using the online ROSIE interface!",
            category: "ROSIE",
            category_color: "red",
            link: "/library?nav=Articles&article=Learning_Resources-pt3-using-ROSIE-webportal"
        },
        children: ['rosie3']
    },
    {
        id: 'vsc2',
        type: 'treeNode',
        position: { x: 250, y: 3000 },
        data: {
            name: "Using VSC's Terminal",
            local_image_path: "/tree-thumbnails/VSC_Tutorial_3.png",
            api_image_path: '/api/v1/library/VSC_Tutorial_3/image',
            description: "VSC is a powerful tool, but it's even better when you have the right tools installed. Let's get you set up!",
            category: "Local Development",
            category_color: "blue",
            link: '/learning-tree',
        },
        children: ['vsc3'],
    },
    {
        id: 'rosie3',
        type: 'treeNode',
        position: { x: -250, y: 3500 },
        data: { 
            name: "ROSIE: Starting your first ROSIE Job",
            local_image_path: "/tree-thumbnails/ROSIE Tutorial Icon 4.png",
            api_image_path: "/api/v1/library/ROSIE Tutorial Icon 4/image",
            description: "Now that you have access to ROSIE with your own password, you can start using the online ROSIE interface!",
            category: "ROSIE",
            category_color: "red",
            link: "/library?nav=Articles&article=Learning_Resources-pt4-starting-your-first-ROSIE-job",
        },
        children: ['rosie4']
    },
    {
        id: 'vsc3',
        type: 'treeNode',
        position: { x: 250, y: 3500 },
        data: {
            name: "Using an Environment in VSC",
            local_image_path: "/tree-thumbnails/VSC_Tutorial_4.png",
            api_image_path: '/api/v1/library/VSC_Tutorial_4/image',
            description: "Getting an environment set up in VSC is crucial for development because it allows you to run your code in a controlled environment.",
            category: "Local Development",
            category_color: "blue",
            link: '/learning-tree',
        },
        children: ['vsc4'],
    },
    {
        id: 'rosie4',
        type: 'treeNode',
        position: { x: -250, y: 4000 },
        data: { 
            name: "ROSIE: Using the ROSIE Terminal",
            local_image_path: "/tree-thumbnails/ROSIE Tutorial Icon 5.png",
            api_image_path: "/api/v1/library/ROSIE Tutorial Icon 5/image",
            description: "Now that you have access to ROSIE with your own password, you can start using the online ROSIE interface!",
            category: "ROSIE",
            category_color: "red",
            link: "/library?nav=Articles&article=Learning_Resources-pt5-the-ROSIE-terminal"
        },
        children: ['rosie5', 'basicAI0']
    },
    {
        id: 'vsc4',
        type: 'treeNode',
        position: { x: 250, y: 4000 },
        data: {
            name: "Using VSC's Version Control",
            local_image_path: "/tree-thumbnails/VSC_Tutorial_5.png",
            api_image_path: '/api/v1/library/VSC_Tutorial_5/image',
            description: "VSC is a powerful tool, but it's even better when you have the right tools installed. Let's get you set up!",
            category: "Local Development",
            category_color: "blue",
            link: '/learning-tree',
        },
        children: ['vsc5', 'basicAI0']
    },

    /* ADVANCED ROSIE AND VSC LEARNING MODULES */
    {
        id: 'rosie5',
        type: 'treeNode',
        position: { x: -500, y: 4500 },
        data: { 
            name: "ROSIE: Running Jobs While Away",
            local_image_path: "/tree-thumbnails/ROSIE Tutorial Icon 6.png",
            api_image_path: "/api/v1/library/ROSIE Tutorial Icon 6/image",
            description: "Now that you can run jobs, there may be some that take a few days and you don't want to keep your computer open.",
            category: "ROSIE",
            category_color: "red",
            link: "https://www.msoe.edu/about-msoe/news/details/meet-rosie/"
        },
        children: ['rosie6']
    },
    {
        id: 'vsc5',
        type: 'treeNode',
        position: { x: 500, y: 4500 },
        data: {
            name: "Using VSC's Debugging Tools",
            local_image_path: "/tree-thumbnails/VSC_Tutorial_6.png",
            api_image_path: 'string',
            description: "VSC is a powerful tool, but it's even better when you have the right tools installed. Let's get you set up!",
            category: "Local Development",
            category_color: "blue",
            link: '/learning-tree',
        },
        children: ['vsc6']
    },
    {
        id: 'rosie6',
        type: 'treeNode',
        position: { x: -750, y: 5000 },
        data: { 
            name: "ROSIE: DGX and H100 GPU Usage",
            local_image_path: "/tree-thumbnails/ROSIE Tutorial Icon 6.png",
            api_image_path: "/api/v1/library/ROSIE Tutorial Icon 6/image",
            description: "All your work so far has been using ROSIE's standard GPU (T4), but there are even more powerful options available!",
            category: "ROSIE",
            category_color: "red",
            link: "https://www.msoe.edu/about-msoe/news/details/meet-rosie/"
        },
        children: []
    },
    {
        id: 'vsc6',
        type: 'treeNode',
        position: { x: 750, y: 5000 },
        data: {
            name: "Connecting to ROSIE from VSC",
            local_image_path: "/tree-thumbnails/VSC_Tutorial_7.png",
            api_image_path: 'string',
            description: "If you prefer to use VSC for development, you can still connect to ROSIE to run your code!",
            category: "Local Development",
            category_color: "blue",
            link: '/learning-tree',
        },
        children: []
    },

    /* BASICS OF AI LEARNING MODULES */
    {
        id: 'basicAI0',
        type: 'treeNode',
        position: { x: 0, y: 4500 },
        data: {
            name: "What is a Neural Network?",
            local_image_path: "/tree-thumbnails/",
            api_image_path: 'string',
            description: "Before diving into how AI learns, let's get a general understanding of what a neural network is.",
            category: "AI Basics",
            category_color: "violet",
            link: '/learning-tree',
        },
        children: ['basicAI1'],
    },
    {
        id: 'basicAI1',
        type: 'treeNode',
        position: { x: 0, y: 5000 },
        data: {
            name: "How do Models Know How to Learn?",
            local_image_path: "/tree-thumbnails/",
            api_image_path: 'string',
            description: "AI is all about learning, but how do models interpret data and actually learn from it?",
            category: "AI Basics",
            category_color: "violet",
            link: '/learning-tree',
        },
        children: ['basicAI2'],
    },
    {
        id: 'basicAI2',
        type: 'treeNode',
        position: { x: 0, y: 5500 },
        data: {
            name: "How do Models Improve Themselves?",
            local_image_path: "/tree-thumbnails/",
            api_image_path: 'string',
            description: "Given our model understands what's right and wrong, how does it improve itself over time?",
            category: "AI Basics",
            category_color: "violet",
            link: '/learning-tree',
        },
        children: ['basicAI3'],
    },
    {
        id: 'basicAI3',
        type: 'treeNode',
        position: { x: 0, y: 6000 },
        data: {
            name: "Model Evaluation Metrics",
            local_image_path: "/tree-thumbnails/",
            api_image_path: 'string',
            description: "Understand how to evaluate a model's performance using different metrics like accuracy, precision, recall, and F1-score.",
            category: "AI Basics",
            category_color: "violet",
            link: '/learning-tree',
        },
        children: ['basicAI4'],
    },
    {
        id: 'basicAI4',
        type: 'treeNode',
        position: { x: 0, y: 6500 },
        data: {
            name: "Overfitting and Underfitting",
            local_image_path: "/tree-thumbnails/",
            api_image_path: 'string',
            description: "Learn about the common problems of overfitting and underfitting in machine learning models, and how to prevent them.",
            category: "AI Basics",
            category_color: "violet",
            link: '/learning-tree',
        },
        children: ['basicAI5'],
    },
    {
        id: 'basicAI5',
        type: 'treeNode',
        position: { x: 0, y: 7000 },
        data: {
            name: "Common Machine Learning Algorithms",
            local_image_path: "/tree-thumbnails/",
            api_image_path: 'string',
            description: "Explore some of the most commonly used machine learning algorithms like Decision Trees, SVM, and K-Nearest Neighbors.",
            category: "AI Basics",
            category_color: "violet",
            link: '/learning-tree',
        },
        children: ['classification0', 'regression0'],
    },

    /* CLASSIFICATION BRANCH */
{
    id: 'classification0',
    type: 'treeNode',
    position: { x: -800, y: 7500 },
    data: {
        name: "Introduction to Classification",
        local_image_path: "/tree-thumbnails/",
        api_image_path: 'string',
        description: "Learn what classification is and how it is used in AI to categorize data into different classes.",
        category: "Classification",
        category_color: "green",
        link: '/learning-tree',
    },
    children: ['classification1'],
},
{
    id: 'classification1',
    type: 'treeNode',
    position: { x: -900, y: 8000 },
    data: {
        name: "Binary vs. Multiclass Classification",
        local_image_path: "/tree-thumbnails/",
        api_image_path: 'string',
        description: "Explore the differences between binary and multiclass classification problems and how to approach each.",
        category: "Classification",
        category_color: "green",
        link: '/learning-tree',
    },
    children: ['classification2'],
},
{
    id: 'classification2',
    type: 'treeNode',
    position: { x: -1000, y: 8500 },
    data: {
        name: "Classification Algorithms",
        local_image_path: "/tree-thumbnails/",
        api_image_path: 'string',
        description: "Dive into popular classification algorithms such as Logistic Regression, Decision Trees, and Random Forests.",
        category: "Classification",
        category_color: "green",
        link: '/learning-tree',
    },
    children: ['generativeAI0', 'computerVision0', 'nlp0', 'timeSeries0', 'reinforcementLearning0', 'ethicsAI0'],
},

/* REGRESSION BRANCH */
{
    id: 'regression0',
    type: 'treeNode',
    position: { x: 800, y: 7500 },
    data: {
        name: "Introduction to Regression",
        local_image_path: "/tree-thumbnails/",
        api_image_path: 'string',
        description: "Learn what regression is and how it's used to predict continuous outcomes in machine learning.",
        category: "Regression",
        category_color: "orange",
        link: '/learning-tree',
    },
    children: ['regression1'],
},
{
    id: 'regression1',
    type: 'treeNode',
    position: { x: 900, y: 8000 },
    data: {
        name: "Linear Regression",
        local_image_path: "/tree-thumbnails/",
        api_image_path: 'string',
        description: "Understand the basics of linear regression, one of the simplest and most widely used regression models.",
        category: "Regression",
        category_color: "orange",
        link: '/learning-tree',
    },
    children: ['regression2'],
},
{
    id: 'regression2',
    type: 'treeNode',
    position: { x: 1000, y: 8500 },
    data: {
        name: "Advanced Regression Techniques",
        local_image_path: "/tree-thumbnails/",
        api_image_path: 'string',
        description: "Explore more advanced regression models such as polynomial regression, ridge regression, and lasso regression.",
        category: "Regression",
        category_color: "orange",
        link: '/learning-tree',
    },
    children: ['generativeAI0', 'computerVision0', 'nlp0', 'timeSeries0', 'reinforcementLearning0', 'ethicsAI0'],
},

/* GENERATIVE AI LEARNING MODULES */
{
    id: 'generativeAI0',
    type: 'treeNode',
    position: { x: -1200, y: 9000 },
    data: {
        name: "Introduction to Generative AI",
        local_image_path: "/tree-thumbnails/",
        api_image_path: 'string',
        description: "Explore what generative AI is and how it is transforming industries by creating new data from existing data.",
        category: "Generative AI",
        category_color: "violet",
        link: 'https://www.example.com/generative-ai-introduction', // replace with actual resource
    },
    children: ['generativeAI1'],
},
{
    id: 'generativeAI1',
    type: 'treeNode',
    position: { x: -1300, y: 9500 },
    data: {
        name: "Generative Adversarial Networks (GANs)",
        local_image_path: "/tree-thumbnails/",
        api_image_path: 'string',
        description: "Learn how GANs work, from the basics to their applications in generating images, video, and more.",
        category: "Generative AI",
        category_color: "violet",
        link: 'https://www.example.com/gan-tutorial', // replace with actual resource
    },
    children: ['generativeAI2'],
},
{
    id: 'generativeAI2',
    type: 'treeNode',
    position: { x: -1400, y: 10000 },
    data: {
        name: "Generative Pre-trained Transformers (GPT)",
        local_image_path: "/tree-thumbnails/",
        api_image_path: 'string',
        description: "Understand the GPT model and its impact on natural language processing and text generation.",
        category: "Generative AI",
        category_color: "violet",
        link: 'https://www.example.com/gpt-introduction', // replace with actual resource
    },
    children: [],
},

/* COMPUTER VISION LEARNING MODULES */
{
    id: 'computerVision0',
    type: 'treeNode',
    position: { x: -1600, y: 9000 },
    data: {
        name: "Introduction to Computer Vision",
        local_image_path: "/tree-thumbnails/",
        api_image_path: 'string',
        description: "Get started with computer vision, understanding how machines interpret and analyze visual data.",
        category: "Computer Vision",
        category_color: "teal",
        link: 'https://www.example.com/computer-vision-introduction', // replace with actual resource
    },
    children: ['computerVision1'],
},
{
    id: 'computerVision1',
    type: 'treeNode',
    position: { x: -1700, y: 9500 },
    data: {
        name: "Convolutional Neural Networks (CNNs)",
        local_image_path: "/tree-thumbnails/",
        api_image_path: 'string',
        description: "Learn about CNNs, the backbone of modern computer vision applications like image classification and object detection.",
        category: "Computer Vision",
        category_color: "teal",
        link: 'https://www.example.com/cnn-tutorial', // replace with actual resource
    },
    children: ['computerVision2'],
},
{
    id: 'computerVision2',
    type: 'treeNode',
    position: { x: -1800, y: 10000 },
    data: {
        name: "Object Detection and Segmentation",
        local_image_path: "/tree-thumbnails/",
        api_image_path: 'string',
        description: "Delve into more advanced topics like object detection, image segmentation, and their applications.",
        category: "Computer Vision",
        category_color: "teal",
        link: 'https://www.example.com/object-detection-segmentation', // replace with actual resource
    },
    children: [],
},
{
    id: 'computerVision3',
    type: 'treeNode',
    position: { x: -1800, y: 15000 },
    data: {
        name: "Object Detection and Segmentation",
        local_image_path: "/tree-thumbnails/",
        api_image_path: 'string',
        description: "Delve into more advanced topics like object detection, image segmentation, and their applications.",
        category: "Computer Vision",
        category_color: "teal",
        link: 'https://www.example.com/object-detection-segmentation', // replace with actual resource
    },
    children: [],
},

/* NATURAL LANGUAGE PROCESSING (NLP) LEARNING MODULES */
{
    id: 'nlp0',
    type: 'treeNode',
    position: { x: -600, y: 9000 },
    data: {
        name: "Introduction to Natural Language Processing",
        local_image_path: "/tree-thumbnails/",
        api_image_path: 'string',
        description: "Learn the basics of how machines understand and process human language.",
        category: "Natural Language Processing",
        category_color: "lime",
        link: 'https://www.example.com/nlp-introduction', // replace with actual resource
    },
    children: ['nlp1'],
},
{
    id: 'nlp1',
    type: 'treeNode',
    position: { x: -700, y: 9500 },
    data: {
        name: "Text Preprocessing Techniques",
        local_image_path: "/tree-thumbnails/",
        api_image_path: 'string',
        description: "Dive into text preprocessing techniques like tokenization, stemming, and lemmatization.",
        category: "Natural Language Processing",
        category_color: "lime",
        link: 'https://www.example.com/text-preprocessing', // replace with actual resource
    },
    children: ['nlp2'],
},
{
    id: 'nlp2',
    type: 'treeNode',
    position: { x: -800, y: 10000 },
    data: {
        name: "Language Models (RNNs, LSTMs)",
        local_image_path: "/tree-thumbnails/",
        api_image_path: 'string',
        description: "Understand the fundamentals of language models like RNNs and LSTMs and how they are used for sequence prediction.",
        category: "Natural Language Processing",
        category_color: "lime",
        link: 'https://www.example.com/rnn-lstm-tutorial', // replace with actual resource
    },
    children: ['nlp3'],
},
{
    id: 'nlp3',
    type: 'treeNode',
    position: { x: -900, y: 10500 },
    data: {
        name: "Transformers and Attention Mechanisms",
        local_image_path: "/tree-thumbnails/",
        api_image_path: 'string',
        description: "Explore transformers and how attention mechanisms revolutionized NLP.",
        category: "Natural Language Processing",
        category_color: "lime",
        link: 'https://www.example.com/transformers-attention' // replace with actual resource
    },
    children: ['nlp4']
},
{
    id: 'nlp4',
    type: 'treeNode',
    position: { x: -1000, y: 11000 },
    data: {
        name: "Applications of NLP (Chatbots, Translation, etc.)",
        local_image_path: "/tree-thumbnails/",
        api_image_path: 'string',
        description: "Learn about real-world applications of NLP like chatbots, translation, and sentiment analysis.",
        category: "Natural Language Processing",
        category_color: "lime",
        link: 'https://www.example.com/nlp-applications' // replace with actual resource
    },
    children: ['nlpToGenerativeAI']
},

// TIME-SERIES ANALYSIS LEARNING MODULES
{
    id: 'timeSeries0',
    type: 'treeNode',
    position: { x: 200, y: 9000 },
    data: {
        name: "Introduction to Time-Series Analysis",
        local_image_path: "/tree-thumbnails/",
        api_image_path: 'string',
        description: "Understand what time-series data is and why it's important for predicting trends over time.",
        category: "Time-Series Analysis",
        category_color: "orange",
        link: 'https://www.example.com/time-series-introduction' // replace with actual resource
    },
    children: ['timeSeries1']
},
{
    id: 'timeSeries1',
    type: 'treeNode',
    position: { x: 300, y: 9500 },
    data: {
        name: "ARIMA Models",
        local_image_path: "/tree-thumbnails/",
        api_image_path: 'string',
        description: "Learn about ARIMA models and their applications in time-series forecasting.",
        category: "Time-Series Analysis",
        category_color: "orange",
        link: 'https://www.example.com/arima-tutorial' // replace with actual resource
    },
    children: ['timeSeries2']
},
{
    id: 'timeSeries2',
    type: 'treeNode',
    position: { x: 400, y: 10000 },
    data: {
        name: "LSTM for Time-Series Prediction",
        local_image_path: "/tree-thumbnails/",
        api_image_path: 'string',
        description: "Explore how LSTMs are applied to predict time-series data.",
        category: "Time-Series Analysis",
        category_color: "orange",
        link: 'https://www.example.com/lstm-time-series' // replace with actual resource
    },
    children: ['timeSeries3']
},
{
    id: 'timeSeries3',
    type: 'treeNode',
    position: { x: 500, y: 10500 },
    data: {
        name: "Anomaly Detection in Time-Series",
        local_image_path: "/tree-thumbnails/",
        api_image_path: 'string',
        description: "Understand how to detect anomalies in time-series data.",
        category: "Time-Series Analysis",
        category_color: "orange",
        link: 'https://www.example.com/time-series-anomaly-detection' // replace with actual resource
    },
    children: []
},

// REINFORCEMENT LEARNING (RL) LEARNING MODULES
{
    id: 'reinforcementLearning0',
    type: 'treeNode',
    position: { x: 1200, y: 9000 },
    data: {
        name: "Introduction to Reinforcement Learning",
        local_image_path: "/tree-thumbnails/",
        api_image_path: 'string',
        description: "Get introduced to the basics of reinforcement learning, where agents learn by interacting with their environment.",
        category: "Reinforcement Learning",
        category_color: "pink",
        link: 'https://www.example.com/reinforcement-learning-introduction' // replace with actual resource
    },
    children: ['reinforcementLearning1']
},
{
    id: 'reinforcementLearning1',
    type: 'treeNode',
    position: { x: 1300, y: 9500 },
    data: {
        name: "Markov Decision Processes (MDPs)",
        local_image_path: "/tree-thumbnails/",
        api_image_path: 'string',
        description: "Learn about MDPs, the mathematical framework for modeling decision-making.",
        category: "Reinforcement Learning",
        category_color: "pink",
        link: 'https://www.example.com/mdp-tutorial' // replace with actual resource
    },
    children: ['reinforcementLearning2']
},
{
    id: 'reinforcementLearning2',
    type: 'treeNode',
    position: { x: 1400, y: 10000 },
    data: {
        name: "Q-Learning and Deep Q-Networks (DQNs)",
        local_image_path: "/tree-thumbnails/",
        api_image_path: 'string',
        description: "Understand Q-Learning and how DQNs are used to solve complex problems in reinforcement learning.",
        category: "Reinforcement Learning",
        category_color: "pink",
        link: 'https://www.example.com/q-learning-dqn' // replace with actual resource
    },
    children: ['reinforcementLearning3']
},
{
    id: 'reinforcementLearning3',
    type: 'treeNode',
    position: { x: 1500, y: 10500 },
    data: {
        name: "Policy Gradients",
        local_image_path: "/tree-thumbnails/",
        api_image_path: 'string',
        description: "Explore policy gradients, a family of algorithms used in reinforcement learning.",
        category: "Reinforcement Learning",
        category_color: "pink",
        link: 'https://www.example.com/policy-gradients' // replace with actual resource
    },
    children: ['reinforcementLearning4']
},
{
    id: 'reinforcementLearning4',
    type: 'treeNode',
    position: { x: 1600, y: 11000 },
    data: {
        name: "Applications of RL (Robotics, Game AI, etc.)",
        local_image_path: "/tree-thumbnails/",
        api_image_path: 'string',
        description: "Learn how RL is applied in real-world scenarios like robotics, game AI, and more.",
        category: "Reinforcement Learning",
        category_color: "pink",
        link: 'https://www.example.com/reinforcement-learning-applications' // replace with actual resource
    },
    children: []
},

// ETHICS AND BIAS IN AI LEARNING MODULES
{
    id: 'ethicsAI0',
    type: 'treeNode',
    position: { x: 2200, y: 9000 },
    data: {
        name: "Introduction to AI Ethics",
        local_image_path: "/tree-thumbnails/",
        api_image_path: 'string',
        description: "Explore the ethical considerations and implications of AI in society.",
        category: "AI Ethics",
        category_color: "cyan",
        link: 'https://www.example.com/ai-ethics-introduction' // replace with actual resource
    },
    children: ['ethicsAI1']
},
{
    id: 'ethicsAI1',
    type: 'treeNode',
    position: { x: 2300, y: 9500 },
    data: {
        name: "Bias in AI Models",
        local_image_path: "/tree-thumbnails/",
        api_image_path: 'string',
        description: "Understand how bias can be introduced into AI models and the impact it has.",
        category: "AI Ethics",
        category_color: "cyan",
        link: 'https://www.example.com/bias-in-ai' // replace with actual resource
    },
    children: ['ethicsAI2']
},
{
    id: 'ethicsAI2',
    type: 'treeNode',
    position: { x: 2400, y: 10000 },
    data: {
        name: "Fairness in AI Systems",
        local_image_path: "/tree-thumbnails/",
        api_image_path: 'string',
        description: "Learn about fairness in AI and techniques to reduce bias and improve equity.",
        category: "AI Ethics",
        category_color: "cyan",
        link: 'https://www.example.com/fairness-in-ai' // replace with actual resource
    },
    children: ['ethicsAI3']
},
{
    id: 'ethicsAI3',
    type: 'treeNode',
    position: { x: 2500, y: 10500 },
    data: {
        name: "AI and Society",
        local_image_path: "/tree-thumbnails/",
        api_image_path: 'string',
        description: "Explore the broader societal implications of AI, including privacy, security, and job displacement.",
        category: "AI Ethics",
        category_color: "cyan",
        link: 'https://www.example.com/ai-and-society' // replace with actual resource
    },
    children: ['ethicsAI4']
},


];

/**
 * Generates edges based on the children attribute of each node.
 */
const generateEdges = (nodes: CustomNode[]): Edge[] => {
    const edges: Edge[] = [];
    nodes.forEach(node => {
        if (node.children && node.children.length > 0) {
            node.children.forEach((childId, index) => {
                const targetNode = nodes.find(n => n.id === childId);
                if (targetNode) {
                    edges.push({
                        type: 'bezier',
                        source: node.id,
                        target: childId,
                        id: `${node.id}-${childId}-${index}`,
                        animated: true,
                        style: { stroke: targetNode.data.category_color, strokeWidth: 6 },
                    });
                }
            });
        }
    });
    return edges;
};

const initialEdges: Edge[] = generateEdges(initialNodes);

const Tree = (props: TreeProps) => {
    const [nodes, setNodes] = useState<CustomNode[]>(initialNodes);
    const [edges, setEdges] = useState<Edge[]>(initialEdges);

    return (
        <div className='tree'>
            <ReactFlow 
                nodes={nodes} 
                edges={edges}
                nodeTypes={nodeTypes}
                fitView={true}
                fitViewOptions={fitViewOptions}
                colorMode="dark"
            >
                <Background />
                <MiniMap 
                    nodeColor={(node) => {
                        return node.data.category_color as string;
                    }}
                />
                <Controls 
                    showInteractive={false}
                />
            </ReactFlow>
        </div>
    );
};

export default Tree;