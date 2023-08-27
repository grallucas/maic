# img: ./img/thumbnails/Transformer-Troubadours.png
# date: 8/8/2023
not_in_recent:
title: XprospeCT​
# summary: ...

Members

- Ben Paulson
- Sydney Balboni
- Theodore Colwell
- Natalia Bukowski
- Joshua Goldshteyn
- John Cisler
- Julia Kalish
- Andrew Crisler

<img src="./img/thumbnails/XProspeCT.png">

Problem​

- Getting CT scans is expensive and exposes patients to significant levels of radiation​
- This is especially problematic is patients have chronic conditions that require scans often​
- However, Chest X-rays are one of the lowest radiation imaging forms available​
- What if there was a way to create a more helpful view from just two chest X-rays?​

Approach​

- We are planning on using a complex CNN with residual connections to create a 2D view to 3D view converter​
- The 2D views will be created by using a CycleGAN style transfer to convert from Averaged CT scan views to X-ray style, and the main model will use 2D to 3D upscaling convolution layers​

Progress​

- Currently working on the final model architecture, and have some examples going from CT to X-Ray​
​