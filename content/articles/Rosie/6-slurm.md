summary: There are often cases where you need to know how to use Slurm (Rosie's job scheduling software). This article details some basic and more advanced use cases.
type: md
date: 4/9/2024
title: Advanced Slurm Usage
image: ./img/thumbnails/advabced_slurm.webp
difficulty: advanced
authors: Lucas Gral
categories: Rosie,Slurm

<br>
<a href='/learning-tree?node=16' style='
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

<p style='color: white; margin-top: 2px;'>[Slurm](https://slurm.schedmd.com/) is the job scheduling software that Rosie uses, so understanding how to use it is crucial to getting the most effective use out of Rosie. You may already know the basics - using the `squeue` command to see everyone's currently running jobs, using `srun` to start jobs - and even if you don't know the basics, you're already using Slurm under the hood of Jupyter notebooks running on the Rosie dashboard. That being said, knowing the more advanced aspects of Slurm can come in handy when you need more flexibility in how you run code. Furthermore, you *need* to manually run Slurm commands to use the better GPUs on Rosie!</p>

</div>

<br/>

<br/>


## Quick Review of Rosie's Architecture

[msoe.dev](https://msoe.dev/#/about) supplies a diagram (also shown below) showing how the Rosie cluster is arranged. However, it might not be clear how the concept of a "Slurm job" plays into this structure.

![diagram](./img/article_content/cluster_overview.png)

When you initially connect to Rosie (e.g., via SSH, or the web-based dashboard), you connect from the "Campus Network" cloud in the diagram to the "Login and management servers." Rosie is actually made up of multiple separate computers connected over a private network, and several of these computers are the management nodes. `dh-mgmt2` is an example of a specific management node.

It's worth noting that all computers in the Rosie cluster share some storage via the node labeled "Cluster Storage" in the diagram. Specifically, the `/data` directory will be the same on all nodes, and your user data `/home/$USER/...` will be the same as well.

Management nodes do not have any GPUs, and they're not meant for general-purpose computation. Because of this, you need to use one of the specialized compute-specific types of nodes:
- General-use, less powerful T4 nodes (labeled "Teaching/Research Partition" in the diagram)
- AI-focused, more powerful DGX nodes (labeled "Machine Learning Partition" in the diagram)
- AI-focused, most powerful H100 nodes (not included in the diagram)

To use one of these specialized nodes, you use Slurm to start a `job`. When you start a job with Slurm, the job takes some specified code (like a Python script) and runs it on a chosen type of compute node that can supply your code with GPUs to use.

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

- partition - specifies what type of node to use. One of `teaching` (for the T4 nodes [the default]), `dgx` (for the DGX nodes), or `dgxh100` (for the H100 nodes). (**NOTE: do not run interactive jobs using `srun --pty bash` on DGX or H100 nodes.**) Example: `srun --partition=dgx --gpus=1 python script.py # runs script.py on a dgx node with 1 gpu`
- gpus - specifies the number of GPUs to use. Any integer 0 or greater. Example: `srun --partition=dgx --gpus=2 python script.py # runs script.py on a dgx node with 2 gpus`
- nodelist - specifies specific nodes to run the job on. For instance, `dh-node3` and `dh-node15` are both teaching nodes, but if `dh-node3` is already running a lot of jobs, then you could run `srun --nodelist=dh-node15 python script.py` to avoid that busy node.
- cpus-per-gpu - specifies the number of cpus to use per gpu. You will end up using this many GPUs: (number of GPUs)*(cpus-per-gpu). Example: `srun --gpus=2 --cpus-per-gpu=8 python script.py`
- cpus-per-task - if you have 0 GPUs in a job, you can use this to specify the overall number of cpus to use. example: `srun --cpus-per-task=8 python script.py`
- job-name - the job name that will show up when you run `squeue`. Example: `srun --job-name="my job" python script.py`
- time - the maximum runtime for the job; longer jobs will be forced to stop. The time is in the format of `DAYS-HOURS:MINUTES`. Example: `srun --time=0-5:0 python script.py # runs a job for up to 5 hours`

## `sbatch`

There is a downside to `srun`: you need to leave your terminal open for the job to finish. If you want to run a 10 hour job without leaving a terminal open, then `sbatch` can help.

To use sbatch, first you need to create a shell script file somewhere on Rosie. To make it in your home directory, you can run these commands:
```bash
cd ~
touch job-script.sh
```

Next, edit the file however you prefer. This could mean making changes on your local machine and re-uploading it onto Rosie. If you're connecting to Rosie on VS Code via SSH, then you can run this command in the terminal to open the file in VS Code:
```bash
code job-script.sh
```

Next, add this text to the file:
```bash
#!/bin/bash
#SBATCH --job-name=example_job       # Job name
#SBATCH --output=output_%j.txt       # Output file (%j will be replaced with the job ID)
#SBATCH --error=error_%j.txt         # Error file (%j will be replaced with the job ID)
#SBATCH --time=0-1:0                 # Time limit (DD-HH:MM)
#SBATCH --partition=teaching         # Partition to submit to. `teaching` (for the T4 GPUs) is default on Rosie, but it's still being specified here

# Run your code here
python script.py # example
```

The first line of the file `#!/bin/bash` is typical in scripts, and it tells the shell what program to run the script with. The next lines after that starting with `#SBATCH` look like comments. *However*, these lines actually specify options to pass to Slurm. All of the options you can specify here are the same as those detailed in the `srun` section.

Once your script is ready to be started, run `sbatch job-script.sh`. This command will start a Slurm job with your specified options, and the job will run all of the commands you wrote in the script (in this case, `python script.py`). At this point, you could close the terminal if you wanted and your job would remain running!

It's important to note that your job will not output anything to the terminal when using `sbatch`. Instead, all output is saved to a file specified in the sbatch script so that you can look at it later, even after the job ends.

## `scancel`

By default, your jobs will run until either your specified time runs out or the code finishes running. If you want to close a job before it finishes - maybe you realized you used the `teaching` partition, but actually needed the `dgx` partition - you can stop the job early by using `scancel`.

To run `scancel`, you have to know the ID of the job you want to cancel. `sbatch` outputs the ID of the jobs it starts. Otherwise, running `squeue` usually provides enough information to know the desired ID; the leftmost column contains job IDs, and the other columns can inform you about which job you might intend to stop.

Once you have a job ID, simply run `scancel <JOB ID>`. For instance, `scancel 12345`.

## Using Singularity Containers

If you start a containerized notebook on the Rosie dashboard, you are provided with the option to run your code in a certain environment:
![Dashboard Environments](./img/article-content/dashboard-singularity-options.png)

Each of these options correspond to a **singularity** container image. What is singularity? Singularity provides a way to run a fully self-contained environment with its own libraries/software that your code can use without depending on anything being globally-installed. You may be thinking this sounds familiar to Docker or virtual machines if you're familiar with those tools, and you would be correct to think so.

[This article](/library?nav=Articles&article=Learning_Resources-SetupLocalSingularity) details how you can make your own singularity containers, but the focus for now will only be on using existing singularity images. 

Existing container images are located at `/data/containers`, and the options include machine learning libraries such as Pytorch and Tensorflow, among other things. To use one of these containers and use its libraries, run this command: `singularity exec --nv -B /data,/home/$USER <CONTAINER> <COMMAND>` where `<COMMAND>` is the command you want to run in the container (e.g., `echo hello`), and `<CONTAINER>` is the path to the container you want to use in `/data/containers`. Here is a complete example:
```bash
singularity exec --nv -B /data,/home/$USER /data/containers/msoe-tensorflow-24.05-tf2-py3.sif echo test
# should print "test" after some debug messages
```

Using containers only provides libraries and tools, they cannot provide access to GPUs without the use of Slurm. To start a container in a Slurm job using a GPU, you could start an interactive job and then run your script with a singularity container:
```bash
srun --pty bash
singularity exec --nv -B /data,/home/$USER /data/containers/msoe-tensorflow-24.05-tf2-py3.sif python my-tensorflow-script.py
```

Alternatively, you could do this all in one big command:
```bash
srun --pty bash --login -c "singularity exec --nv -B /data,/home/$USER /data/containers/msoe-tensorflow-24.05-tf2-py3.sif python my-tensorflow-script.py"
```

... but at that point you're better off setting up an `sbatch` script:
```bash
#!/bin/bash
#SBATCH --job-name=example_job
#SBATCH --output=output_%j.txt
#SBATCH --error=error_%j.txt
#SBATCH --time=0-1:0
#SBATCH --partition=teaching
#SBATCH --gpus=1

singularity exec --nv -B /data,/home/$USER /data/containers/msoe-tensorflow-24.05-tf2-py3.sif python my-tensorflow-script.py
```