summary: Now that you have access to ROSIE with your own password, you can start using the online ROSIE interface!
type: md
date: 5/9/2024
title: ROSIE Pt4: Starting Your First ROSIE Job
image: ./img/thumbnails/ROSIE Tutorial Icon 4.png
difficulty: easy
authors: John Cisler, Thomas Benzshawel, Ben Paulson
categories: ROSIE

<br>
<a href='/learning-tree?node=8' style='
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

<p style='color: white; margin-top: 2px;'>By reading this article, you will learn how to use ROSIE within a Jupyter notebook, allowing you to annotate and write code in Python, using ROSIE's resources.
</p>

</div>

<br/>

<br/>

## Starting a Jupyter Notebook
To start a job, you should go to the My Interactive Sessions tab on the home-screen of the ROSIE web portal. This will open the following menu:

![alt text](./img/rosie_article_images/empty_interactive_sessions.png)

The section highlighted in blue is what we will be interacting with most of the time. The other sections are for more advanced users, and we will not be covering them in this article. However, here is a breakdown for the different types of Jupyter Notebooks:

Jupyter Lab - Rosie: This will start a Jupyter LAB instance, not a Jupyter NOTEBOOK instance. Jupyter Lab is an integrated development environment (IDE) for interactive computing, offering a more versatile interface with tabs and extensions, while Jupyter Notebook provides a simpler, single-document interface for interactive code and data exploration. We use Jupyter Notebooks more frequently both in AI-Club and in industry, so we don't recommend this option.

Jupyter Notebook - Containerized: This will start a Jupyter Notebook instance on one of the ROSIE teaching nodes. However, with this option, you have an additional dropdown for which container you would like to use with your ROSIE instance. A container is important because it comes with pre-installed packages that we will be commonly using throughout AI-Club. We recommend using this option.

Jupyter Notebook - Rosie: Simply start up a Jupyter Notebook with your own packages on one of the ROSIE teaching nodes -- no container will be made and your Jupyter Notebook will be running directly on a ROSIE node. Use this option if you're having dependency issues.



Composing Your Project Jupyter Server
Now that we've broken-down each of the three Jupyter-Server options, we'll select the Jupyter Notebook - Containerized option. This will open the following menu:

![alt text](./img/rosie_article_images/jupyter-containerized.png)


The info filled in for each text box and drop down may look different depending on the project you're starting an instance for. However, the info I've added is usually the configuration we will use for AI-Club. Here is a breakdown of each of the text boxes and drop downs:

Number of GPUs: This is the number of GPUs you would like to use for your Jupyter Notebook. We recommend using 1 GPU, unless you're just walking through -- then use ZERO

Time: This is the amount of time you would like to have your Jupyter Notebook running. We recommend using 2 hour.

Container Image: This is the container you would like to use for your Jupyter Notebook. We recommend using Tensorflow 2.x.

Job Description: This is the description of your job. We recommend using AI Club Project or Other.

But wait, I can only start an instance with the T4 GPU! Where are the DGX options??
Aha! Yes, you are correct that you can only start an instance with the T4 GPU. However, this is because the DGX nodes are reserved for more advanced users. If you would like to use a DGX node, you must make a more custom Slurm job that requests a DGX partition, or follow this article for info about how you can start a Jupyter Notebook on a DGX node. (Advanced Users ONLY)


Once you've configured your Jupyter Notebook appropriately, click the Launch button at the bottom of the page.



## Connecting To Your Jupyter Notebook
After you've clicked the Launch button, you will be taken to the following page:

![alt text](./img/rosie_article_images/jupyter-not-started.png)


Just like the notify says, you must wait for your instance to start. After waiting a bit (usually less than a minute), you should see the following page:

![alt text](./img/rosie_article_images/jupyter-started.png)

To connect, simply click the Connect to Jupyter Notebook button.



## The ROSIE File-Explorer
After you've clicked the Connect to Jupyter Notebook button, you will be taken to the following page:

![alt text](./img/rosie_article_images/jupyter_launch.png)


This is the ROSIE file explorer! Specifically, your Home Directory! On ROSIE, there are two different file systems: Home Directory and Shared Data. I'm sure you can guess the purpose of each, but Home Directory is where all your personal/private files are stored, and Shared Data is where you can share other folders to the rest of MSOE (or keep it partially private, like for the other members in your research team!).

For now, we'll be focusing on the Home Directory file system. Don't worry if yours doesn't look like the photo above (that's after a few years of use), but I do recommend you make an MAIC folder in your Home Directory to store all your AI-Club related files. To do this, click the New dropdown at the top right of the file explorer, and select Folder. To rename it, click the checkbox next to the folder, and click the Rename button that appears at the top of the file explorer.

Once that folder is made, open it and we can start creating your first Jupyter Notebook! To do this, click the New dropdown at the top right of the file explorer, and select Python 3 (ipykernel). This will open a new Jupyter Notebook in your browser!



## Using Jupyter Notebooks
If you've never interacted with a Jupyter Notebook before, this artice we put together is a great overview of the purpose of the technology and how you can use them on your local system (laptop).

However, we're talking about ROSIE Jupyter Notebooks, which have the exact-same interface as Jupyter Notebooks you can use with Anaconda, but there are some important notes you should know when using them on ROSIE.

![alt text](./img/rosie_article_images/jupyter-notebook-page.png)



## Running Command-Line Code in Jupyter Notebooks
You can run command-line commands with ! before your code. For example, !ls will list all other files in the directory you put your Jupyter Notebook!

Another command is `!nvidia-smi`, which will list all the GPUs you currently have reserved for your current Jupyter Notebook. This is important because you can see if you have the correct number of GPUs reserved for your Jupyter Notebook. If you don't, you can go back to the ROSIE web portal and start a new Jupyter Notebook with the correct number of GPUs.

Knowing all this, you are now ready to start making projects using ROSIE! Have fun! We hope to see you at future AI-Club events to learn even more about how ROSIE can accelerate your future AI projects!