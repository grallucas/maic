summary: A starting point for learning about how to use VSCode for machine learning on your local machine. 
type: md
date: 5/9/2024
title: VSC Pt1: How to Use Visual Studio Code
image: ./img/thumbnails/VSC_Tutorial_1.png
difficulty: easy
authors: John Cisler
categories: VSCode

<br>
<a href='/learning-tree?node=10' style='
    background-color: #31313a;
    color: gainsboro;
    padding: 6px 16px;
    border: none
    border-radius: 4px;
    text-transform: uppercase;
    font-family: "Roboto", sans-serif;
    font-size: 1em;
    font-weight: bold;
    cursor: pointer;
    text-decoration: none;
    display: inline-block;'
>
  View in Learning Tree
</a>

<br>
<br>
<br>

<div style='
  position: relative;
  padding: 10px; 
  border-radius: 5px;
  background-color: rgba(0, 0, 0, 0.85); 
  border: 4px solid transparent;
  background-image: linear-gradient(90deg, rgba(0, 0, 0, 0.85), rgba(0, 0, 0, 0.85)), linear-gradient(90deg, gold, orange, gold);
  background-origin: border-box;
  background-clip: padding-box, border-box;
'>

<svg width='200' height='50' style='display: block; margin-bottom: 5px;'>
  <text x='0' y='35' font-size='35' font-family='Arial' font-weight='bold' fill='gold'>
    Why Read?
    <animate attributeName='fill' values='gold; orange; gold' dur='3s' repeatCount='indefinite' />
  </text>
</svg>

<p style='color: white; margin-top: 2px;'>By reading this article, you will gain a fundamental understanding of Visual Studio Code (VSCode) and why it is widely used in industry for machine learning workflows.  
</p>

</div>

<br/>

<br/>

## Quickstart
If you would like an explaination of VSCode from the people who made it, go [here](https://code.visualstudio.com/docs).

## What is Visual Studio Code?
Visual Studio Code, often referred to as VSCode, is a free and powerful source code editor developed by Microsoft. It is lightweight, highly customizable, and supports a wide range of programming languages and workflows. Whether you’re a beginner or an experienced developer, VSCode offers the flexibility and tools to fit into your coding environment.

Unlike full-fledged integrated development environments (IDEs) such as PyCharm or Visual Studio, VSCode is a code editor, which means it’s designed to be fast and lightweight while providing essential features like debugging, syntax highlighting, intelligent code completion, and version control integration. It strikes a perfect balance between performance and functionality, making it one of the most popular editors in the programming world today.

## Installing Visual Studio Code
To download and install it on your system, follow these simple steps:

Download VSCode:
Visit [Visual Studio Code’s official website](https://code.visualstudio.com/) and download the appropriate installer for your operating system (Windows, macOS, or Linux).

Install:
Run the installer and follow the prompts to install VSCode on your machine.

Launch VSCode:
Once the installation is complete, open VSCode. 

## Getting Familiar with the Interface
VSCode has an interface with multiple sections that provide easy access to various tools. Let’s explore the main components:

Activity Bar:
Located on the left side, the Activity Bar provides quick access to important features:

Explorer: To browse files and folders in your project.
Search: To search for keywords in your project.
Source Control: To manage version control with Git.
Run & Debug: For debugging and running applications.
Extensions: To browse and install extensions from the marketplace.

Side Bar:
This panel shows the content relevant to the selected activity from the Activity Bar. For example, when you click on the Explorer icon, it shows your project’s folder structure.

Editor Area:
The main area where you write code. You can open multiple files in tabs, and split the editor into side-by-side views.

Terminal:
Integrated at the bottom, the terminal allows you to run commands directly from VSCode without switching to another window.

Status Bar:
Located at the bottom of the window, it provides useful information such as the current programming language, Git branch, errors, and warnings in your code.


## Why Use VSCode for Machine Learning?
Machine learning projects often involve working with large datasets, experimenting with algorithms, and frequently testing code. VSCode is a fantastic choice for machine learning because it offers all the tools necessary to streamline this process:

### Python Support
Python is one of the most popular programming languages for machine learning. VSCode’s Python extension provides features such as intelligent code completion, linting (error checking), and Jupyter notebook integration, all of which are essential when building and testing machine learning models.

### Jupyter Notebook Integration
Jupyter notebooks are an essential tool for data scientists and machine learning engineers. They allow you to run code in blocks and see the output immediately, which is helpful for tasks like data visualization and iterative testing. VSCode offers native support for Jupyter notebooks, meaning you can create and run notebooks directly in the editor.

### Easy Virtual Environment Management
Machine learning projects often require managing dependencies in virtual environments or Conda environments. VSCode makes it simple to activate and manage these environments, ensuring that your projects use the correct versions of Python libraries without interfering with system-wide installations.

### Collaboration and Version Control
Machine learning projects are often collaborative, requiring multiple people to work on the same codebase. VSCode’s Git integration makes it easy to collaborate with others by pulling in changes, committing your work, and resolving merge conflicts, all from within the editor.