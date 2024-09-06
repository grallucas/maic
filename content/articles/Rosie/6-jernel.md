summary: This article is for you if you find that VSCode is a better tool than Rosie's dashboard for running Jupyter notebooks.
type: md
date: 4/9/2024
title: Jernel: Running VSCode Jupyter Notebooks on Rosie
image: ./img/thumbnails/jernel.png
difficulty: intermediate
authors: Lucas Gral
categories: Rosie,SSH,Jupyter

## Why Read?

You've likely run Jupyter notebooks on Rosie via the dashboard website. If you've also run notebooks on VSCode, then you're likely aware of how much better the experience is compared to using the Rosie dashboard. Jernel is a tool that allows you to run Jupyter Notebooks connected to Rosie on VSCode. It gives you all the benefits of working with notebooks in VSCode, and it also gives you the benefits of running notebooks on Rosie.

## Making a Notebook File

The first step is to connect to Rosie in VSCode (see [this article](/library?nav=Articles&article=Learning_Resources-SSH-into-Rosie-vsc) if you're not familiar with that process). Next, create a notebook or open an existing one. To create one, make a file called `my-notebook.ipynb` in a directory opened in the left-side VSCode file browser. Alternatively, you can create a notebook in the terminal: first, navigate to the directory in which you wish to create the notebook, then run the command `code my-notebook.ipynb` to create it and open it as a tab in VSCode.

Once the notebook is open, write `print('hello')` in the first default cell and save the notebook. When you initially try to run the notebook, VSCode will prompt you to select a **kernel**.

## Jupyter Notebook Kernels

If you run a newly opened notebook or press the upper-right "Select Kernel" button, you can select the Kernel that's used to execute the code in your notebook. The distinction between notebook and kernel is important in this case, because the notebook interface can be open on your local machine while the kernel can be running on a completely different computer - in this case that could be one of Rosie's teaching nodes. On top of that, this interaction is facilitated by a management node, because since VSCode can only establish SSH connections to management nodes. Below is a diagram of what this optimal setup would look like.

![jupyter kernel on Rosie diagram](./img/article_content/jupyter-kernel.png)

However, if you click "Select Kernel" and then choose "Python Environments..." you will only be presented with kernels that would run on the management node you are SSH-ed into. This is not ideal; management nodes are not meant for general computation, and they don't even have GPUs!

To manually use a kernel on a compute node, these are roughly the steps you'd have to take:
- start a job,
- optionally start a singularity container in that job,
- start a jupyter kernel in that container or job, and correctly set up the network configuration,
- connect your notebook to that kernel.

Luckily, all steps except the last can be handled by a tool called **Jernel**.

## Jernel

Jernel (which stands for Jupyter kernel) is a command you can run that automatically creates a Jupyter kernel on a teaching node.

### Setup

Run the following command: `/data/ai_club/util/setup`. This script will allow you to use the `Jernel` command once you close and re-open your terminal. `jernel` will **not** work until your terminal is re-opened.

### Usage

After re-opening your terminal, run `jernel -t 0-1:0` to start a Jupyter kernel job for an hour. The command will output a URL. Now click "Select Kernel" in your notebook, and choose "Existing Jupyter Server". If any old servers from previous runs of Jernel are listed, they are likely invalid, and you can remove them. Next, select "Enter the URL of a Running Jupyter Server ..." and enter the URL you obtained from Jernel (you can copy from the terminal with Ctrl-C). Press enter again to use the default display name if it prompts for one. Finally, select the kernel with a star next to it. After this point, all code you execute in your notebook will use a teaching node on Rosie!

### Jernel Options

You can run `jernel -h` to see available options, many of which are the same as those you might pass to `srun` (read [this article](/library?nav=Articles&article=Learning_Resources-Advanced-Slurm) to see `srun` options). Additionally, you can specify a singularity container to use with the `-C` flag. Reach out to a MAIC eboard member if you encounter any errors, or if you need access to additional Jernel options, such as creating kernels on nodes other than the teaching nodes.