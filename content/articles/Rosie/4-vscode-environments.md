summary: A starting point for learning about how to use VSCode for machine learning on your local machine. 
type: md
date: 5/9/2024
title: VSC Pt4: Using an Environment in VSCode
image: ./img/thumbnails/VSC_Tutorial_4.png
difficulty: easy
authors: John Cisler
categories: VSCode

<br>
<a href='/learning-tree?node=13' style='
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

<p style='color: white; margin-top: 2px;'>By reading this article, you will learn how to install python for your machine and get started with using python environments, an easy way to group dependencies together for specific projects. 
</p>

</div>

<br/>

<br/>


## Explaination from the Source
If you want an explaination by the people who made VSCode, use [this link](https://code.visualstudio.com/docs/python/environments).

## Installing Python
Before we go any further, you will want to install Python for your machine:

## On Windows
- Simply look up python in the microsoft store and download the latest version availible. In the future, know there might be libraries that aren't compatible with certain versions of Python. When you run into this situtation, install the version required for your use case. 


## On Mac
- The process is a little more involved
- Follow [this walkthough](https://docs.python-guide.org/starting/install3/osx/

The first time you open a python file or jupyter notebook, you will be prompted to select an interpreter in the lower right, select Python. 


## Python Environments
When working on Python projects, managing dependencies across different projects is crucial. Each project may require different versions of libraries, and using Python environments helps you isolate these dependencies. Visual Studio Code (VSCode) makes it easy to work with Python environments, whether they are virtual environments, Conda environments, or system-wide Python installations.


## Creating and Using Python Virtual Environments

### Using venv and pip

A virtual environment is a self-contained directory that contains a Python installation and project-specific libraries. Here’s how to create and use virtual environments in VSCode:

#### Step 1: Creating a Virtual Environment
Open the Terminal:
Open VSCode’s integrated terminal using Ctrl+ (Cmd+on macOS) or go toView > Terminal`.

Navigate to Your Project Folder:
Use the cd command to navigate to the root folder of your project. For example

`cd path/to/your/project`

Create the Virtual Environment:
To create a virtual environment, run the following command:

`python -m venv venv`

This command creates a virtual environment in a folder called venv. You can name the environment anything, but venv is a common convention.


#### Step 2: Activating the Virtual Environment
Before you can use the virtual environment, you need to activate it:

On Windows:
`.\venv\Scripts\activate`

On Linux/macOS:
`source venv/bin/activate`


#### Step 3: Selecting Python Interpreter
After activating the virtual environment, you need to tell VSCode to use the Python interpreter from that environment:

1. Open the Command Palette (Ctrl+Shift+P or Cmd+Shift+P on macOS).
2. Type "Python: Select Interpreter" and select it from the list.
3. Choose the interpreter from your virtual environment (it should be listed under your project directory’s venv folder).

Now, VSCode will use the Python interpreter from the virtual environment for running scripts, linting, and other Python-related tasks.

#### Step 4: Installing Packages
With the virtual environment activated, you can now install packages specific to your project. Use the integrated terminal to install libraries like numpy, pandas, or scikit-learn:

`pip install numpy pandas scikit-learn`

These packages will be installed in your virtual environment and will not affect your global Python installation or other projects.


## Managing Multiple Python Environments in VSCode
When working on multiple projects with different dependencies, you may need to switch between environments frequently. VSCode makes it easy to manage and switch between environments:

### Checking the Current Environment:
The currently active Python environment is shown in the bottom-left corner of VSCode. Clicking on it will bring up the interpreter selection menu, where you can switch to another environment.

### Deactivating a Virtual Environment:
To deactivate a virtual environment, simply type `deactivate` in the terminal.

### Listing Installed Packages:
You can list all installed packages within an environment by running:

`pip list`

Freezing Requirements:
To share your environment with others, you can create a requirements.txt file that lists all dependencies. Run the following command in the terminal:

`pip freeze > requirements.txt`

Other users can then recreate the environment by running:

`pip install -r requirements.txt`