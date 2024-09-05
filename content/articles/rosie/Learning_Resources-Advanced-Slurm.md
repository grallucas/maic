summary: There are often cases where you need to know how to use Rosie's job scheduling software: Slurm.
type: md
date: 4/9/2024
title: Advanced Slurm Usage
image: 
difficulty: advanced
authors: Lucas Gral
categories: Rosie,Slurm

## Why Read?

[Slurm](https://slurm.schedmd.com/) is the job scheduling software that Rosie uses, so understanding how to use it is crucial to getting the most effective use out of Rosie. You may already know the basics - using the `squeue` command to see everyone's currently running jobs, using `srun` to start jobs - and even if you don't know the basics, you're already using Slurm under the hood of Jupyter notebooks running on the Rosie dashboard. That being said, knowing the more advanced aspects of Slurm can come in handy when you need more flexibility in how you run code. Furthermore, you *need* to manually run slurm commands to use the better GPUs on Rosie!

## Quick Review of Rosie's Architecture

[msoe.dev](https://msoe.dev/#/about) supplies a diagram (also shown below) showing how the Rosie cluster is arranged. However, it might not be clear how the concept of a "Slurm job" plays into this structure.

![diagram]()

When you initially connect to Rosie (e.g., via SSH, or the web-based dashboard), you connect from the "Campus Network" cloud in the diagram to the "Login and management servers." Rosie is actually made up of multiple separate computers connected over a private network, and several of these computers are the management nodes. `dh-mgmt2` is an example of a specific management node.

It's worth noting that all computers in the Rosie cluster share some storage via the node labeled "Cluster Storage" in the diagram. Specifically, the `/data` directory will be the same on all nodes, and your user data `/home/$USER/...` will be the same as well.

Management nodes do not have any GPUs, and they're not meant for general purpose computaiton. Because of this, you need to use one of the speciailized compute-specific types of nodes:
- General-use, less powerful T4 nodes (labeled "Teaching/Research Partition" in the diagram)
- AI-focused, more powerful DGX nodes (labeled "Machine Learning Partition" in the diagram)
- AI-focused, most powerful H100 nodes (not included in the diagram)

To use one of these specialized nodes, you use slurm to start a `job`. When you start a job with slurm, the job takes some specified code (like a Python script) and runs it on a chosen type of compute node that can supply your code with GPUs to use.

## `srun`

The easiest way to run a job on a node is via `srun`. Using this command looks like this: `srun [options] CMD` where `CMD` is the command you want to run in the job. If you ssh into `dh-mgmt2` and run `echo hello`, then the echo command will run on the management node. However, if you instead run `srun echo hello`, then that management node will start a job (on a teaching node by default) and then run the echo command on the teaching node!

### Interactive Mode

If you run `srun --pty bash`, then any command you run after will be computed on a teaching node (until you run the `exit` command). For instance, these two sets of commands are two ways to do the same thing:

```bash
srun echo hello
```

```bash
srun --pty bash
echo hello
exit
```

### Additional Options

There are additional options you can specify to control: what node you use, how many GPUs/CPUs you use, the name of your job in the `squeue` list, and more!

- partition - specifies what type of node to use. One of `teaching` (for the T4 nodes [the default]), `.` (for the DGX nodes), or `.` (for the H100 nodes). **NOTE: do not run interactive jobs `srun --pty bash` on DGX or H100 nodes.** Example: `srun --partition=dgx --gpus=1 python script.py # runs script.py on a dgx node with 1 gpu`
- gpus - specifies the number of GPUs to use. Any integer 0 or greater. Example: `srun --partition=dgx --gpus=2 python script.py # runs script.py on a dgx node with 2 gpus`
- nodelist - specifies specific nodes to run the job on. For instance, `dh-node3` and `dh-node15` are both teaching nodes, but if `dh-node3` is already running a lof of jobs, then you could do `srun --nodelist=dh-node15 python script.py` to avoid that busy node.
- cpus-per-gpu - specifies the number of cpus to use per gpu. You will end up using this many GPUs: (number of GPUs)*(cpus-per-gpu). Example: `srun --gpus=2 --cpus-per-gpu=8 python script.py`
- cpus-per-task - if you have 0 GPUs in a job, you can use this to specify the overall number of cpus to use. example: `srun --cpus-per-task=8 python script.py`
- job-name - the job name that will show up when you run `squeue`. Example: `srun --job-name="my job" python script.py`
- time - the maximum runtime for the job; longer jobs will be forced to stop. The time is in the format of `DAYS-HOURS:MINUTES`. Example: `srun --time=0-5:0 python script.py # runs a job for up to 5 hours`

## `sbatch`

There is a downside to `srun`: you need to leave your terminal open for the job to finish. If you want to run a 10 hour job without leaving a terminal open, then `sbatch` can help.

...

## `scancel`



## `salloc`

## Using Singularity Containers

(connection to container selection on ood)

## `squeue` tips
