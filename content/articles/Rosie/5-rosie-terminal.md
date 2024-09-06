summary: Now that you have access to ROSIE with your own password, you can start using the online ROSIE interface!          
type: md
date: 5/9/2024
title: ROSIE Pt5: Using the ROSIE Terminal
image: ./img/thumbnails/ROSIE Tutorial Icon 5.png
difficulty: easy
authors: John Cisler, Thomas Benzshawel, Ben Paulson
categories: ROSIE

<br>
<a href='/learning-tree?node=9' style='
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

<p style='color: white; margin-top: 2px;'>By reading this article, you will be able to run jobs, create files, and more using the Command Line. Knowing this will allow you to take advantage of and finetune the resources you use to run jobs on ROSIE.  
</p>

</div>

<br/>

<br/>

## Understanding How To Move Via Command Line
There are a few conceptual commands you must know to even start interacting with this Linux-based terminal. Those commands are:

cd - Change Directory
ls - List files in current directory
pwd - Print Working Directory
mkdir - Make Directory
touch - Create File
rm - Remove File

bash - Run a bash script

python - Run a python script
sbatch - Run a slurm script
For example cd ../home/my_stuff will take you "up" one folder, then go into the home and my_stuff folder from that "up" (Parent) folder.

## Useful SLURM Commands
SLURM is the job scheduler that ROSIE uses to manage jobs. It is a very powerful tool that allows you to run jobs on ROSIE without having to keep your laptop running for the job to continue going. Here are some useful commands:

- squeue
This command will show details on all currently running jobs. This is useful for finding details on jobs you've started. To filter jobs to only your, you can add the following arguements to the command replacing username with your username. squeue -l -u username

- scancel
This will cancel a job, enter the command followed by the jobid as can be found with squeue

- sbatch script.sh
This will submit a batch script to be run. This is useful for creating job templates and submitting multiple jobs at once

An example can be downloaded [here](https://drive.google.com/file/d/1Nu-_6Oa1_iZV2gFkuhSLheB7cEtXfEmM/view?usp=sharing). Unzip the folder and drop it's contents somewhere onto Rosie In a Rosie connected terminal, cd into the directory that you dropped the files Run the command sbatch batch.sh You'll notice that you not have a .out file with the name of your job id that has the output of the python file. You can view this file by running the command $ tail -f slurm-(job-id).out which will show the output in real time. You can also use the squeue command to see that your job is running