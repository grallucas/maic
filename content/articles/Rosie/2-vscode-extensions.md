summary: A starting point for learning about how to use VSCode for machine learning on your local machine. 
type: md
date: 5/9/2024
title: VSC Pt2: Installing Languages / Extensions in VSCode
image: ./img/thumbnails/VSC_Tutorial_2.png
difficulty: easy
authors: John Cisler
categories: VSCode

<br>
<a href='/learning-tree?node=11' style='
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

<p style='color: white; margin-top: 2px;'>By reading this article, you will get an understaning of why VSCode uses extensions and the useful ones to install for machine learning work.  
</p>

</div>

<br/>

<br/>

## Why Do You Need Extensions?
Visual Studio Code (VSCode) is widely regarded as one of the best code editors available, and much of its appeal stems from its flexibility and adaptability through extensions. Rather than bundling all features into the core application, VSCode allows developers to install extensions that fit their specific needs. This modular approach keeps the editor lightweight, fast, and versatile

## Useful Extensions

### 1. Python Extension
- Why It’s Important: Python is the go-to language for machine learning, and this extension adds essential features to support Python development. It provides IntelliSense, linting, debugging, and integrated Jupyter notebook support, making it ideal for working on machine learning projects.

- Key Features:
    - IntelliSense for Python, offering code suggestions and completions.
    - Auto-detection of Python environments (virtual environments, Conda).
    - Debugging tools tailored to Python.
    - Jupyter notebook integration for running machine learning experiments interactively.

Installation: Search for "Python" by Microsoft in the Extensions view.


### 2. Jupyter Extension
- Why It’s Important: Jupyter notebooks are widely used for data exploration, model training, and experimentation in machine learning. This extension allows you to create, edit, and run Jupyter notebooks directly inside VSCode.

- Key Features:
    - Full support for .ipynb files, with the ability to run cells and view outputs.
    - Integration with Python environments for seamless execution of machine learning code.
    - Visualization support for inline charts and plots, crucial for data analysis.

Installation: Search for "Jupyter" by Microsoft in the Extensions view.



## Download More As You Go
As you go along your machine learning journey in VSCode, a lot of times the application itself will recommend a useful extension when opening a new file type for example. Feel free to test different extensions out, you can always uninstall them later. 