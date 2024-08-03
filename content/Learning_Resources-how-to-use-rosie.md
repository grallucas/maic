summary: Using Rosie has a bit of a learning curve, so make sure you read this guide before trying to use it!
order: 1
date: 27/8/2023
title: How to use Rosie
image: ./img/thumbnails/ROSIE_Dashboard.png
difficulty: easy
authors: Thomas Benzshawel
categories: Rosie,Topic Introduction



## Working with the Rosie GUI

The simplest way to interact with Rosie (what you'll likely learn in classes) is via the web portal.
If you are off campus, make sure to VPN onto MSOE's network with Global Protect as described in the Global Protect section in the gaining Rosie access section.
First, open the Rosie web portal [here](https://dh-ood.hpc.msoe.edu/pun/sys/dashboard).
You'll have to enter your Rosie login credentials as well (note that these are not the same as your msoe email login unless you set them that way).

Next you'll want to select the Interactive Apps dropdown at the top of the page and select the Jupyter Notebook - Containerized option.

Then you can select your number of GPUs (only do one unless you know what you're doing), and time to have your allocation (pick something reasonable, you can always start another).
For container image, select Tensorflow 2.x
For Job Description, select AI Club Project or Other
Finally hit launch

Once you hit launch, wait for your resources to be allocated (the blue stuff will turn green), then hit Connect to Jupyter Notebook

After hitting launch you'll see a file explorer which will show your Rosie home directory. From here you can select a notebook to run.
I would suggest first creating a repos folder, and then a subfolder for maic (this is also a good spot to put folders for different classes like CS 2300)

To create new directories, go to the New dropdown at the top right of the file explorer and select Folder
Afterwards you can check the box next to the new Untitled directory on the left and select Rename which will appear under the Files | Running | Clusters tabs.

You can use the Upload button to upload your own files, or hit New > Python 3 (ipykernel) to create a new jupyter notebook.

When you open a notebook, if you go back to the file explorer you'll notice that the notebook icon on the left has turned green, this means you Rosie session is using resources to have that notebook running.
If you hit the Running tab at the top of the page you can check if you have multiple notebooks running. Having multiple notebooks running is a bad idea so this menu can help you shut down all notebooks but the one you want to run.

Once you open a notebook, you can start running cells like normal.
Type some code in and hit Shift+Enter to run the cell (or the play icon by the top of the screen), you can tell a cell is running because a "*" will be displayed next to the cell, when it finishes the * will be replaced with a number.
To insert a new cell, use the Alt+Enter command or hit the plus by the top of the screen.
To delete a cell, highlight the cell (so it is highlighted blue and not green), and press the D key twice, or hit the scissors by the top of the screen.
If you run into issues running code, you can restart by opening the kernel menu and selecting restart.
Make sure to periodically hit Ctrl+S to save your notebook as well, you can see when your notebook was last saved at the top of the screen.


## Using SSH To Connect To Rosie In VS Code

IFrom here on everything is completely optional and more difficult than just using the GUI from the section above, but these tools can be nice.

First you'll need to install the SSH extension for VSCode, open up the extensions panel, search SSH, and install the Remote - SSH extension.
![Alt text](../img/misc/sshextension.png)

Next, you'll want to hit the small green (it might be blue for you) icon on the bottom left of the VSCode window to bring up the SSH menu,
then select Connect to Host,
then hit + Add New SSH Host...
Then enter dh-mgmt2.hpc.msoe.edu
If prompted for the platform of the remote host, select Linux
You should see a popup on the bottom right of the screen saying Host Added!

You can then go back to the small green (or blue) icon, select Connect Current Window to Host..., and select dh-mgmt2.hpc.msoe.edu
You will then be prompted for your password, enter your Rosie password
Your VSCode may take a few seconds to do some setup, once it's done the file explorer should open on the left of the VSCode window
In the file explorer, select Open Folder, and choose the folder you'd like to work in (I usually just open my home folder), you will be prompted for your password again
From here you can edit files and use the Rosie terminal right in VSCode!

**IMPORTANT, This is running on a management node, do not run python files or jupyter notebooks from here, use slurm jobs or follow the guide below**

## Start a Jupyter Kernel For Easy VSCode Development

This is a (better) alternative to the Rosie dashboard and Google Collab for running Jupyter notebooks. Start by opening a terminal in VSCode AFTER connecting via ssh.
You can open a terminal by going to the toolbar and pressing Terminal > New Terminal, or by holding ctrl and the key to the left of 1 (the tilde key).

Once a terminal is open, run this command if you haven't already:
/data/ai_club/util/setup
This command lets you use more commands made by MAIC (jernel in this case). After running this command, you have to exit this terminal and start a new one for this to work.

Afterwards, you need to install the "Jupyter" extension within VSCode. Even if you've already installed it locally, you'll have to go through the installation process once again to install it on the Rosie side of things.
Next, open or create a Jupyter notebook (.ipynb extention) in vscode. With the notebook open, in the bottom bar of VSCode and towards the right, you should see a button that says something like "Jupyter Server: Local." Take note of its existence, but there is no need to press it yet.

Now, with a new terminal open, run this command:
jernel
"Jernel (Jupyter kERNEL)" is a MAIC-made tool for starting juyter servers on rosie. The default options should be fine for most cases, but you can run jernel -h to see what options you have. An example usage of options could be jernel --time 0-2:0 to run the server for two hours instead of one.

Once Jernel outputs a URL, ensure your notebook is open and press the "Jupyter Server: Local" button. You will be prompted to enter a URI, and this is where Jernel's output should go. After copying and pasting, press enter and the prompt should go away.
There is one more thing to do before running Juyter notebook cells. You have to set the notebook's kernel to use the server. To do this, press the button near the upper right which should say a python version. Doing so should allow you to select a kernel; select the one which says "Remote" in the same row as the kernel name.

In general, this process only involves running jernel and connecting a notebook once all setup has been done.



## TL;DR
1. Run this command if you haven't already: /data/ai_club/util/setup
2. Restart your terminal.
3. Use the command jernel to start a jupyter server.
4. Connect an open Jupyter notebook to your server.

Ask the eboard if you have any questions. We are happy to help.