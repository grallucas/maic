summary: How to run a Jupyter Notebook while using a DGX node on ROSIE.
order: 1
date: 2/8/2023
title: Developing with Jupyter Notebooks on DGX Nodes
image: ../maic/img/thumbnails/DGX Node.png
difficulty: hard
authors: Bart Gebka
categories: Rosie,DGX,Jupyter

## Introduction
ROSIE offers a remarkable platform for executing python scripts and functions via a web browser interface. Nonetheless, the current interface lacks the capability for users to run tasks on high-performance computing in an interactive jupyter notebook environment. This guide aims to demonstrate the process of initiating a jupyter instance server on a ROSIE compute node and establishing a tunnel between said node and your local computer, enabling seamless interaction with the server.

## After following this guide you'll be able to...
- Develop software on a DGX node from the comfort of a jupyter notebook
- Run a job with custom compute parameters
- Interface with programs running on ROSIE with your local computer via an SSH tunnel
- Run a job with any container you wish (a good way of getting around apt install)


## Rosie Architecture
ROSIE's firewall does not allow direct connections to compute nodes meaning that we will need to connect to our job via a managment node. We can do this via an SSH tunnel.

<img src = '../maic/img/thumbnails/ROSIE Architecture.png' height = 600>


## DGX Notebook Steps
1. Start a SLURM job with desired compute
2. SSH into the node the job is running on 
3. Run the job inside a singularity container
4. Start up an instance of jupyter notebook
5. Create an SSH tunnel from your local computer to the jupyter notebook instance.
6. Access your page on localhost


## 1. Start a SLURM job with desire compute
The first step of connecting a job to jupyter notebook is actually running a job. The GUI web application doesn't have the functionality that we need to we have to perform all of these steps from the command line. When on MSOE's network or connected to the the GlobalProtect VPN open up a terminal. Any terminal with SSH capabilities should work (like Git Bash). Then run:
```sh
ssh username@dh-mgmt4.hpc.msoe.edu
```
You'll know you have successfully connected when you see the ROSIE banner. 

ROSIE uses SLURM (used to stand for Simple Linux Utility for Resource Managment) to allocate compute resources. For our use case, lets allocate one DGX GPU.
```sh
salloc --partition=dgx -G 1
```
For more information on how to use salloc see the [official salloc documentation](https://slurm.schedmd.com/salloc.html) and [MSOE Rosie documentation](https://msoe.dev/#/cli/SLURM) for the partition names.

You can view your running job with
```sh
squeue
```

Make sure to note which node you are running your job on (for this example my job was running on `dh-dgx1-1`)


## 2. SSH into the node the job is running on

From the same terminal you ran the previous commands, run
```
ssh dg-dgx1-1
```

You can verify your connected by listing the GPUs available on the linux device with

```
nvidia-smi
```


## 3. Run the job inside a singularity container

Containers allow you to develop in precreated enviornments. You can make your own singularity container or use one already on ROSIE. To list all the containers type

```
ls /data/containers
```

For this example, we'll use `msoe-pytorch.sif`

Bind your shell to the container with
```
singularity shell --bind /data:/data /data/containers/msoe-pytorch.sif
```

You know it has worked when your shell cursor changes to `Singularity>`


## 4. Start up an instance of jupyter notebook

It's time to run the server. When runnning the server, it is important to select a port that is not already in use. In this example we use port 8888 but you can use any port as long as you are consistent. You also need to pass in a token. Consider this your password. Anyone with your token can access your job. In this case we choose "MegaFish777" but you should choose your own. Run the server with:
```
jupyter-notebook --no-browser --port=8888 --ip=0.0.0.0 --NotebookApp.base_url="" --NotebookApp.token='MegaFish777'
```

It is important that you do not close this terminal as it will kill the server and end your SLURM job.


## 5. Create an SSH tunnel from your local computer to the jupyter notebook instance.

In a seperate terminal run
```
ssh -N -L 8888:localhost:8888 -J username@dh-mgmt4.hpc.msoe.edu gebkab@dh-dgx1-1
```
It will look like nothing is happening but a tunnel should be created from your local machine to the DGX node.


## 6. Access your page on localhost

In a browser access `localhost:8888`, enter your password, and you should be running a jupyter notebook on a DGX node. Congratulations!


## 7. Cleanup

Once your done with your instance, you can press `Ctrl+D` on every terminal you have opened. This will log out of any nodes and relinquish any allocated resources.