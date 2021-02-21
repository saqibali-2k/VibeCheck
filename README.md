# VibeCheck
<p align="center">
  <img src = https://github.com/nikolamarunic/images/blob/master/splash_screen.png>
</p>

A web app for discerning the emotions behind text messages and images, intended to help people with ASD who are struggling with the remote nature of the COVID-19 Pandemic.

This app was made with **React** and **Flask**, and makes use of **Google Cloud Computing NLP API & Tensorflow** to analyze the seniments of text and images.

# Overview

The app allows users to analyze any text they wish, i.e a text they received from a friend. 
<p align="center">
  <img src = https://github.com/nikolamarunic/images/blob/master/text_analysis.png>
</p>

Upon submitting, the user can see whether there may be strong emotion behind it or whether it is likely positive or negative.

<p align="center">
  <img src = https://github.com/nikolamarunic/images/blob/master/vibescore.png>
</p>

A larger absolute number means it is likely a stronger emotion behind the text. 

Users may also upload images, or take a live picture from their own webcam. 

<p align="center">
  <img src = https://github.com/nikolamarunic/images/blob/master/img_analysis.png>
</p>

<p align="center">
  <img src = https://github.com/nikolamarunic/images/blob/master/screenshot.png>
</p>

Upon submitting their image they can see a bar chart breakdown displaying the likelihood that their picture shows each emotion. There are 7 possible emotions that the model checks for.

<p align="center">
  <img src = https://github.com/nikolamarunic/images/blob/master/barchart.png>
</p>

# LICENSE
MIT
