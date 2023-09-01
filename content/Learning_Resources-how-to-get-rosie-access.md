summary: If you have not had a class that has used rosie yet, you will need to request access to Rosie in order to do many AI workshops
order: 1
date: 27/8/2023
title: Getting access to Rosie?
image: ./img/thumbnails/ROSIE Supercomputer.jpg
difficulty: easy
authors: Thomas Benzshawel
categories: Rosie,Topic Introduction



# Getting Started With Rosie

## Gaining Access
In order to gain access to Rosie, you must fill out the request form that is linked [on this page](https://msoe.dev/#/requestaccess).

Under the section "Please describe why you are requesting access to Rosie. In this description, please include why Rosie is needed beyond what your campus-issued laptop provides"
you may put "AI club workshops".

Under the section "Please select all of the tools you need", select Jupyter CPU-based Notebooks, Jupyter GPU-based Notebooks, Command Line, and Tensorflow/Keras. Plus any other tools you will need.
Under the section "If you plan to use GPUs, please describe what acceleration libraries you need.", enter tensorflow/keras

Under the section "How much storage do you require (list MB, GB, TB)?" Enter what amount applies to yo.u
If you do not know how much storage you will need, 10GB is a reasonable amount.

After requesting access you will likely get a response from Dr.Retert with instructions on logging in for the first time.
Logging onto Rosie for the first time sucks, see more details below 

## First Log In
**(If you are not on campus, skip down to the global protect section first!)**

In order to log in to Rosie for the first time and reset your password, you must do so via SSH.
To use SSH you will need an SSH client. Our tool of choice (that you will need for other classes as well) is Git
Start by downloading and installing git from [here](https://git-scm.com/).
Open up the new program by tyoing git in your search bar, and clicking git bash. Then enter the following command, replacing username with your username (your email without the msoe.edu)
$ ssh username@dh-mgmt2.hpc.msoe.edu
You will then see a screen like the image below, for each number in the image you will:

    1. SSH into Rosie
    2. Enter the one time password that you recieved from Dr. Retert
    3. Reenter your one time password
    4. Create a new password
    5. Enter the new password again

![Alt text](./img/thumbnails/rosie-thumbnail.jpg)

Once you see the message that it's creating directory 'home/username' followed by the big ROSIE, you're all set!

## Global Protect - Access Rosie from off campus

Rosie can only be accessed from the schools network.
Therefore if you would like to log in to Rosie from offcampus you must use a VPN.
The VPN MSOE uses is called Global Protect and can be downloaded from [here](https://vpn.msoe.edu/global-protect/getsoftwarepage.esp).
Choose the Windows 64bit download and follow the installation instructions

When you first open global protect, you will need to enter the address you wish to connect to at the bottom of the window
For us, this is vpn.msoe.edu

When you hit connect you may be asked for your msoe credentials.
Afterwards your global protect window will say you are connected. Then you're good to go! 
