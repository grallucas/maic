summary: Now you have an email from ROSIE, let's get you logged in for the first time!
type: md
date: 5/9/2024
title: ROSIE Pt2: First Login
image: ./img/thumbnails/ROSIE Tutorial Icon 2.png
difficulty: easy
authors: John Cisler, Thomas Benzshawel, Ben Paulson
categories: ROSIE

<br>
<a href='/learning-tree?node=6' style='
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

<p style='color: white; margin-top: 2px;'>By reading this article, you will be able to successfully log into ROSIE for the first time by reseting your password, allowing you to use ROSIE through the web portal.</p>

</div>

<br/>

<br/>

## Logging In For the First Time

Logging into ROSIE for the first time is a bit of a pain and requires a few steps. This guide will walk you through the process of logging in for the first time and resetting your password.

ROSIE can only be accessed through MSOE's campus network. If you are anywhere else, including the ITC, you need to use Global Protect, MSOE's VPN. This should come with your MSOE issued laptop, however if you would rather use a personal machine, you can install Global Protect [here](https://vpn.msoe.edu/global-protect/getsoftwarepage.esp). 


In order to log in to Rosie for the first time and reset your password, you must do so via SSH (Secure Shell)
SSH-ing to a computer cluster provides secure remote access, enabling efficient management, data analysis, and collaboration, crucial for scalable, high-performance computing and research in various fields.

However, in order to use SSH, you will need an SSH client. Our tool of choice (that you'll later learn to use in-class as well) is Git.

Start by downloading and installing Git from [here](https://git-scm.com/downloads). Please download the corresponding version for your machine. If using the MSOE provided laptop, use the 64-bit Git for Windows Setup under the section Standalone Installer. Below are instructions on what you should make sure to check off when installing git. 

If on Mac, git might already by installed if you have xcode. If you are not sure, the easiest way to check is to open terminal and run the command "git --version". If it shows a version number, you are good to go, if not, it should prompt you to install git via Xcode Command Line Tools. 


### Installing Git Bash Correctly 
Open the download and accept all changes, you will then see the below screen...

![alt text](./img/rosie_article_images/git_bash_setup.png)


In the following screens, accept all default selections


## Logging into ROSIE

Here's an overview of what we will be doing throughout the rest of the article:

1. SSH into Rosie (ssh username@dh-mgmt2.hpc.msoe.edu)
2. Enter the one time password that you recieved from Dr. Retert, then reenter this password
3. Create a new password, then confirm this new password

### 1. SSH Into ROSIE
Once you have Git Bash open, type the following command, replacing username with your username (your email without the msoe.edu)
Look at the console entries next to the red stars *

#### Using Git Bash (if on Windows)
Open up the new program by typing git in your search bar, and clicking git bash. Then enter the following command, replacing username with your username (your email without the msoe.edu)
'ssh username@dh-mgmt2.hpc.msoe.edu'

#### Using Terminal (if on mac)
Open up terminal if not already open and then enter the following command, replacing username with your username (your email without the msoe.edu)
'ssh username@dh-mgmt2.hpc.msoe.edu'


Regardless of your machine's OS, you should be shown something like the following, where you are prompted for your password: 

![alt text](./img/rosie_article_images/ssh_1.png)


### 2. Enter the One Time Password
You should have recieved an email from Dr. Retert, our ROSIE admin, containing your one time password. It might have a subject along the lines of "Rosie Access Request." Enter this password into your terminal/git bash. As you're entering your password you will not see you password appear. That's OK, the characters will not appear due to security reasons, so please keep entering your password and hit enter when you're done. You will then be prompted to reenter your password, do so and hit enter again.

### 3. Create a New Password & Confirm
Perform the same steps as above, writing your new password instead. Again, you will not see your password appear as you type it in due to the security features on ROSIE. 

## You're In!
You should see the following screen! You're in! You can now use ROSIE!

![alt text](./img/rosie_article_images/rosie_success.png)


Once you see the message that it's creating directory 'home/username' followed by the big ROSIE, you're all set!


## What To Do Moving Forward?
Now, we aren't actually going to use this terminal interface to interact with ROSIE (that's gross 🤧); instead, we'll be using the online interface, using Jupyter Notebooks and starting up your own ROSIE instances. Find out more in the next article: Using The ROSIE Dev Page.



