summary: Now that you have access to ROSIE with your own password, you can start using the online ROSIE interface!
type: md
date: 14/9/2023
title: Intro to ROSIE (Pt 4): Starting Your First ROSIE Job
image: ./img/thumbnails/ROSIE Tutorial Icon 4.png
difficulty: normal
authors: Ben Paulson
categories: Rosie,VPN

## Starting a Jupyter Notebook

To start a job, you should go to the `My Interactive Sessions` tab on the [home-screen of the ROSIE web portal](https://dh-ood.hpc.msoe.edu/pun/sys/dashboard). This will open the following menu:<br>

<img height = '500px' src = ./img/article_content/empty_interactive_sessions.png><br><br>

The section highlighted in blue is what we will be interacting with most of the time. The other sections are for more advanced users, and we will not be covering them in this article. However, here is a breakdown for the different types of Jupyter Notebooks:<br>

- **Jupyter Lab - Rosie:** This will start a Jupyter LAB, not a Jupyter NOTEBOOK instance. Jupyter Lab is an integrated development environment (IDE) for interactive computing, offering a more versatile interface with tabs and extensions, while Jupyter Notebook provides a simpler, single-document interface for interactive code and data exploration. **We use Jupyter Notebooks more frequently both in AI-Club and in industry, so we don't recommend this option.**

- **Jupyter Notebook - Containerized:** This will start a Jupyter Notebook instance on one of the ROSIE teaching nodes. However, with this option, you have an additional dropdown for which container you would like to use with your ROSIE instance. A container is important because it comes with pre-installed packages that we will be commonly using throughout AI-Club. **We recommend using this option.**

- **Jupyter Notebook - Rosie:** Simply start up a Jupyter Notebook with your own packages on one of the ROSIE teaching nodes -- no container will be made and your Jupyter Notebook will be running directly on a ROSIE node. **Use this option if you're having dependency issues.**
  <br><br><br>

## Composing Your Project Jupyter Server

Now that we've broken-down each of the three Jupyter-Server options, we'll select the **Jupyter Notebook - Containerized** option. This will open the following menu:<br>

<img height = '400px' src = ./img/article_content/jupyter-containerized.png><br><br>

The info filled in for each text box and drop down may look different depending on the project you're starting an instance for. However, the info I've added is usually the configuration we will use for AI-Club. Here is a breakdown of each of the text boxes and drop downs:<br>

- **Number of GPUs:** This is the number of GPUs you would like to use for your Jupyter Notebook. **We recommend using 1 GPU, unless you're just walking through -- then use ZERO**

- **Time:** This is the amount of time you would like to have your Jupyter Notebook running. **We recommend using 2 hour.**

- **Container Image:** This is the container you would like to use for your Jupyter Notebook. **We recommend using Tensorflow 2.x.**

- **Job Description:** This is the description of your job. **We recommend using AI Club Project or Other.**
  <br><br>
  **But wait, I can only start an instance with the T4 GPU! Where are the DGX options??**<br>
  Aha! Yes, you are correct that you can only start an instance with the T4 GPU. However, this is because the DGX nodes are reserved for more advanced users. If you would like to use a DGX node, you must make a more custom `Slurm` job that requests a DGX partition, or follow [this article](articles-Learning_Resources-RunningJupyterLabOnADGXNode copy.html) for info about how you can start a Jupyter Notebook on a DGX node. **(Advanced Users ONLY)**<br><br>

Once you've configured your Jupyter Notebook appropriately, click the **Launch** button at the bottom of the page.
<br><br><br>

## Connecting To Your Jupyter Notebook

After you've clicked the **Launch** button, you will be taken to the following page:<br>
<img height = '300px' src = ./img/article_content/jupyter-not-started.png><br><br>
Just like the notify says, you must wait for your instance to start. After waiting a bit (usually less than a minute), you should see the following page:<br>
<img height = '300px' src = ./img/article_content/jupyter-started.png><br>
To connect, simply click the **Connect to Jupyter Notebook** button.<br><br><br>

## The ROSIE File-Explorer

After you've clicked the **Connect to Jupyter Notebook** button, you will be taken to the following page:<br>
<img height = '300px' src = ./img/article_content/jupyter-started.png><br><br>

This is the ROSIE file explorer! Specifically, your `Home Directory`! On ROSIE, there are two different file systems: `Home Directory` and `Shared Data`. I'm sure you can guess the purpose of each, but `Home Directory` is where all your personal/private files are stored, and `Shared Data` is where you can share other folders to the rest of MSOE (or keep it partially private, like for the other members in your research team!).<br>

For now, we'll be focusing on the `Home Directory` file system. Don't worry if yours doesn't look like the photo above (that's after a few years of use), but I do recommend you make an `MAIC` folder in your `Home Directory` to store all your AI-Club related files. To do this, click the `New` dropdown at the top right of the file explorer, and select `Folder`. To rename it, click the checkbox next to the folder, and click the `Rename` button that appears at the top of the file explorer.<br>

Once that folder is made, open it and we can start creating your first Jupyter Notebook! To do this, click the `New` dropdown at the top right of the file explorer, and select `Python 3 (ipykernel)`. This will open a new Jupyter Notebook in your browser!<br><br><br>

## Using Jupyter Notebooks

If you've never interacted with a Jupyter Notebook before, [this article](/library?nav=Articles&article=Learning_Resources-how-to-use-jupyter-notebooks) we put together is a great overview of the purpose of the technology and how you can use them on your local system (laptop).<br>

However, we're talking about ROSIE Jupyter Notebooks, which have the exact-same interface as Jupyter Notebooks you can use with Anaconda, but there are some important notes you should know when using them on ROSIE.<br><br>

<img height = '300px' src = ./img/article_content/jupyter-notebook-page.png><br><br>

### Running Command-Line Code in Jupyter Notebooks

You can run command-line commands with `!` before your code. For example, `!ls` will list all other files in the directory you put your Jupyter Notebook!<br>

Another command is `!nvidia-smi`, which will list all the GPUs you currently have reserved for your current Jupyter Notebook. This is important because you can see if you have the correct number of GPUs reserved for your Jupyter Notebook. If you don't, you can go back to the ROSIE web portal and start a new Jupyter Notebook with the correct number of GPUs.<br>

Knowing all this, you are now ready to start making projects using ROSIE! Have fun! We hope to see you at future AI-Club events to learn even more about how ROSIE can accelerate your future AI projects!<br><br><br><br><br>
