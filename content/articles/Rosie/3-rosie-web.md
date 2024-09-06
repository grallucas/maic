summary: Now that you have access to ROSIE with your own password, you can start using the online ROSIE interface!
type: md
date: 5/9/2024
title: ROSIE Pt3: Using ROSIE Web Portal
image: ./img/thumbnails/ROSIE Tutorial Icon 3.png
difficulty: easy
authors: John Cisler, Thomas Benzshawel, Ben Paulson
categories: ROSIE

<br>
<a href='/learning-tree?node=7' style='
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

<p style='color: white; margin-top: 2px;'>By reading this article, you will become familiar with how to navigate the ROSIE web portal, the easiest way to interact with ROSIE.</p>

</div>

<br/>

<br/>

## Getting Started with the Web Portal
The simplest way to interact with Rosie (what you'll likely learn in classes) is via the web portal.
If you are off campus (or at the ITC), make sure to VPN onto MSOE's network with Global Protect as described in the Global Protect article as described [here](/library?nav=Articles&article=global-protect).

Once you are all set, you can open the Rosie web portal [here](https://dh-ood.hpc.msoe.edu/pun/sys/dashboard).
NOTE: You may be prompted to enter your ROSIE credentials again. It is the same username and password you set up in the previous article.


You should see a page like this:
![alt text](./img/rosie_article_images/rosie_portal.png)

Tab Overview
From here, you will interact with ROSIE using the five tabs at the top of the screen, here's a breakdown of each:

Files: This is how you both access your own files (Home Directory) and public files (Shared Data) on ROSIE. Whenever you create a new Jupyter notebook, it will go to your Home Directory by default; however, you do have the option of sharing it publicly. Types of files that are shared publicly include AI-Club workshops, class projects, AI-Club research projects, and more.

Jobs: This tab isn't used often by students, but it's where you can see the status of your jobs. If you're running a job, you can see the status of it here. If you're not running a job, you'll see a blank screen unless you view the status of all jobs. The Job Composer is used even less frequently -- do not use this screen unless you know what you are doing. This screen is NOT how you start up your own ROSIE instance for a Jupyter Notebook.

Interactive Apps: Lists the different kinds of apps that you can start an interactive session with ROSIE with. We'll talk about these more once we discuss Jupyter Notebooks & My Interactive Sessions.

Clusters: Rosie Shell Access is an incredibly powerful and helpful tool. This is the command terminal you can use to move throughout all of ROSIE. You can use this to create new files, move files, delete files, and more. This is also where you can start up a job you made (using Slurm) without having to keep your laptop running for the job to continue going.

My Interactive Sessions: This is where you can start up your own ROSIE instance for a Jupyter Notebook. This is the most common way to use ROSIE, and we'll talk about this more in the next section.

## What's Next?
If you're wanting to understand how you can immediately start coding and getting your projects to run on ROSIE, move onto Part 4: Starting Your First ROSIE Job.

