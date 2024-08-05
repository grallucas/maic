summary: How to set up a local singularity container.
type: md
date: 25/9/2023
title: Setting up Your Local Singularity Container
image: ./img/thumbnails/singularity_icon.png
difficulty: hard
authors: Alex Moran
categories: Rosie,DGX,Jupyter

Steps: [Source 1: Sylabs Docs](https://docs.sylabs.io/guides/latest/admin-guide/installation.html), [Source 2: Github Issue](https://github.com/apptainer/singularity/issues/5390)

## 1. Install WSL2

### a. WSL2 can be installed from the command line

WSL can be installed with the command

```CMD
wsl --install -d Ubuntu-20.04
```

The official Microsoft WSL2 Install guide can be found [here](https://docs.microsoft.com/en-us/windows/wsl/install).

If the first command does not work, you may be on an older version of windows, in which case either update or follow the steps on this [official guide](https://docs.microsoft.com/en-us/windows/wsl/install-manual#step-3---enable-virtual-machine-feature) for older Windows versions.

## 2. Install Singularity Inside of WSL2:

### a. Move to the Home Directory

```bash
cd ~
```

### b. Install Dependencies

#### Ensure repositories are up-to-date

```bash
sudo apt-get update
```

#### Install debian packages for dependencies

```bash
sudo apt-get install -y \
   build-essential \
   libseccomp-dev \
   libglib2.0-dev \
   pkg-config \
   squashfs-tools \
   cryptsetup \
   runc
```

### c. Install Go

```bash
export VERSION=1.18.1 OS=linux ARCH=amd64 && \
    wget https://dl.google.com/go/go$VERSION.$OS-$ARCH.tar.gz && \
    sudo tar -C /usr/local -xzvf go$VERSION.$OS-$ARCH.tar.gz && \
    rm go$VERSION.$OS-$ARCH.tar.gz
```

### d. Set your environment for go

```bash
echo 'export GOPATH=${HOME}/go' >> ~/.bashrc && \
    echo 'export PATH=/usr/local/go/bin:${PATH}:${GOPATH}/bin' >> ~/.bashrc && \
    source ~/.bashrc
```

### e. Download SingularityCE from a release

```bash
export VERSION=3.10.0 && # adjust this as necessary \
    wget https://github.com/sylabs/singularity/releases/download/v${VERSION}/singularity-ce-${VERSION}.tar.gz && \
    tar -xzf singularity-ce-${VERSION}.tar.gz && \
    cd singularity-ce-${VERSION}
```

### f. Generate the deb with alien

```bash
sudo alien -d singularity-ce-3.10.0.rc.2-1.el8.x86_64.rpm
```

### g. Install the deb with alien

```bash
sudo apt-get install ./singularity-ce_3.10.0~rc.2-2_amd64.deb
```

### h. Verify singularity installation

```bash
singularity --version
```

## 3. Download Singularity Container.

### Option 1: a. Pull the latest tensorflow docker container from NVIDIA (Latest version can be found [here](https://catalog.ngc.nvidia.com/orgs/nvidia/containers/tensorflow/tags)):

```bash
singularity pull tensorflow22.06-tf2-py3.sif docker://nvcr.io/nvidia/tensorflow:22.06-tf2-py3
```

### Option 2: a. Install SHPC

```bash
git clone https://github.com/singularityhub/singularity-hpc
cd singularity-hpc
pip install -e .
```

### b. Pull the latest tensorflow singularity container from [SHPC](https://singularityhub.github.io/singularity-hpc/r/nvcr.io-nvidia-tensorflow/)

```
shpc install nvcr.io/nvidia/tensorflow
```

### Troubleshooting:

If you encounter an error from either option, such as [this one](https://github.com/apptainer/singularity/issues/2352):

```bash
INFO:    Converting OCI blobs to SIF format
FATAL:   While making image from oci registry: error fetching image to cache: while building SIF from layers: unable to create new build: while searching for mksquashfs: exec: "/usr/sbin/mksquashfs": stat /usr/sbin/mksquashfs: no such file or directory
```

Try running the commands

```bash
which mksquashfs
```

Which should result in something like `/usr/bin/mksquashfs`

Then try running with root priviledge with

```bash
sudo which mksquashfs
```

Which may again result in something like `/usr/bin/mksquashfs`
and if it does, the issue here is that as you can see in the error above, we need this file in the `/usr/sbin/` directory, not the `/usr/bin/` directory.

To fix this we need to make a copy of the program from `/usr/bin/` and place it into `/usr/sbin/` since it requires root access to run. This can be done with the following command:

```bash
sudo cp -r /usr/bin/mksquashfs /usr/sbin/mksquashfs
```

Now you should be able to run the above commands for downloading the singularity container, from either option 1, pulling the docker image into a .sif, or option 2, downloading the singularity image from shpc.

## 4. Transferring the `.sif` file to ROSIE

### a. Connect to rosie using SFTP with the command

```bash
sftp username@dh-mgmt.hpc.msoe.edu
```

If it is your first time it may ask if you want to continue, just type `yes` and hit enter.

It will also ask you for your password, this is your ROSIE password, enter and then you should have a blank terminal with `sftp>`

### b. Navigate on ROSIE where you would like to place the singularity container

In our case I will be placing it in `/data/ai_club/containers/`. Running `ls` will list the files and directories within the HPC, `lls` will list off the _local_ files and directories.

```bash
cd /data/ai_club/containers/
```

### c. Copy the `.sif` file over to ROSIE

Using the put command we are uploading the local file to the HPC

```bash
put tensorflow22.06-tf2-py3.sif
```

## 5. Accessing the `.sif` file from Windows (Only for WSL2)

This option is provided as another means of saving the file, in the event that you do not want to upload the `.sif` directly to the HPC.

### a. Navigate to the WSL2 Home directory from Windows

#### Option 1: Inside of a Windows command prompt enter the command

```CMD
explorer \\wsl$\Ubuntu-20.04\home\ubuntu
```

#### Option 2: Open up Windows explorer and enter the following into the address bar

```bash
\\wsl$\Ubuntu-20.04\home\ubuntu
```

### b. Locate the `.sif` file that was created, and copy it over to your local machine, it is now ready to upload to a HPC, such as [ROSIE](dh-ood.hpc.msoe.edu)

## 6. Singularity Container Modification

### a. Creating a Writable Container instead of `.sif`

[Instructions](https://docs.sylabs.io/guides/3.9/user-guide/build_a_container.html)
