summary: Now that you have access to ROSIE with your own password, you can start using the online ROSIE interface!
order: 94
date: 27/8/2023
title: Intro to ROSIE (Pt 5): Using the ROSIE Terminal
image: ./img/thumbnails/ROSIE Tutorial Icon 5.png
difficulty: normal
authors: Thomas Benzshawel,Ben Paulson
categories: Rosie,VPN


The ROSIE Command line is an important tool for students who want to become advanced users of ROSIE. The command line is extremely powerful, allowing you to run jobs, create files, and more. This is an advanced topic, and we recommend you start with part 4 no matter your skill level since we will be referencing a lot of the knowledge you get from that article in this lesson.

## Understanding How To Move Via Command Line
There are a few conceptual commands you must know to even start interacting with this Linux-based terminal. Those commands are:

- `cd` - Change Directory
- `ls` - List files in current directory
- `pwd` - Print Working Directory
- `mkdir` - Make Directory
- `touch` - Create File
- `rm` - Remove File

- `bash` - Run a bash script
- `python` - Run a python script
- `sbatch` - Run a slurm script

For example `cd ../home/my_stuff` will take you "up" one folder, then go into the home and my_stuff folder from that "up" (Parent) folder.

## Useful SLURM Commands
SLURM is the job scheduler that ROSIE uses to manage jobs. It is a very powerful tool that allows you to run jobs on ROSIE without having to keep your laptop running for the job to continue going. Here are some useful commands:

### - squeue
This command will show details on all currently running jobs.
This is useful for finding details on jobs you've started.
To filter jobs to only your, you can add the following arguements to the command replacing username with your username.
squeue -l -u username

### - scancel <jobid>
This will cancel a job, enter the command followed by the jobid as can be found with squeue 

### - sbatch script.sh
This will submit a batch script to be run. This is useful for creating job templates and submitting multiple jobs at once

An example can be downloaded [here](http://msoe-maic.com/data/downloads/sbatch.zip).
Unzip the folder and drop it's contents somewhere onto Rosie
In a Rosie connected terminal, cd into the directory that you dropped the files
Run the command sbatch batch.sh
You'll notice that you not have a .out file with the name of your job id that has the output of the python file.
You can view this file by running the command $ tail -f slurm-(job-id).out which will show the output in real time.
You can also use the squeue command to see that your job is running
