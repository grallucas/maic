summary: If you have not had a class that has used rosie yet, you will need to request access to Rosie in order to do many AI workshops
type: md
date: 13/9/2023
title: Intro to ROSIE (Pt 2): First-Time Login
image: ./img/thumbnails/ROSIE Tutorial Icon 2.png
difficulty: easy
authors: Ben Paulson,Thomas Benzshawel
categories: Rosie,Topic Introduction

Logging into ROSIE for the first time is a bit of a pain and requires a few steps. This guide will walk you through the process of logging in for the first time and resetting your password.

## First Log In

**As a reminder, if you are NOT on-campus, you will need to [install Global Protect first!](articles-Learning_Resources-global-protect.html)**

### In order to log in to Rosie for the first time and reset your password, you must do so via SSH

SSH-ing to a computer cluster provides secure remote access, enabling efficient management, data analysis, and collaboration, crucial for scalable, high-performance computing and research in various fields.
<br>
However, in order to use SSH, you will need an SSH client. Our tool of choice _(that you'll later learn to use in-class as well)_ is Git.
<br>
Start by downloading and installing Git from [here](https://git-scm.com/downloads). Please download **64-bit Git for Windows Setup** under the section **Standalone Installer**.
<br>
<br>

### Installing Git Bash Correctly

Open the download and accept all changes, you will then see the below screen...<br><br>

![Alt text](./img/article_content/git_bash.png)

**In the following screens, accept all default selections**
<br><br>

### Using Git Bash

Open up the new program by tyoing git in your search bar, and clicking git bash. Then enter the following command, replacing username with your username (your email without the msoe.edu)<br>
`ssh username@dh-mgmt2.hpc.msoe.edu`<br><br>
Here's an overview of what we will be doing throughout this article:

    1. SSH into Rosie (`ssh username@dh-mgmt2.hpc.msoe.edu`)
    2. Enter the one time password that you recieved from Dr. Retert
    3. Reenter your one time password
    4. Create a new password
    5. Enter the new password again

#### 1. SSH Into ROSIE

Once you have Git Bash open, type the following command, replacing username with your username (your email without the msoe.edu)<br>
Look at the console entries next to the <a style = 'color:red; font-weight: bold;'>red stars \*</a>
<br>
![](./img/article_content/ssh_1.png)
<br><br>

### 2/3. Enter the One Time Password & Confirm

You will then be prompted to enter your one time password, which you should have recieved from Dr. Retert. As you're entering your password **you will not see you password appear**. That's OK, the characters will not appear due to security reasons, please just keep entering your password and hit enter when you're done. You will then be prompted to reenter your password, do so and hit enter again.
<br><br>

### 4/5. Create a New Password & Confirm

Do the same steps as above, writing you new password instead. **you will not see your password appear**. That's OK, the characters will not appear due to security reasons, please just keep entering your password and hit enter when you're done. You will then be prompted to reenter your password, do so and hit enter again.
<br><br>

### 6. You're In!

You should see the following screen! You're in! You can now use ROSIE!
<br>
![](./img/article_content/ssh_2.png)

Once you see the message that it's creating directory 'home/username' followed by the big ROSIE, you're all set!<br><br>
<br><br>

## What To Do Moving Forward?

Now, we aren't actually going to use this terminal interface to interact with ROSIE (that's gross 🤧); instead, we'll be using the online interface, using Jupyter Notebooks and starting up your own ROSIE instances. Find out more in the next article: [Using The ROSIE Dev Page](articles-Learning_Resources-pt3-using-ROSIE-webportal.html).
<br><br><br><br><br>
