summary: Evaluate the performance of different deep learning models in detecting COVID-19 from chest X-ray images. Through the use of a large and recent dataset of segmented lung images we evaluated two deep learning architectures: Resnet-50 and InceptionV3. Both models achieve high test accuracy, above 99%, suggesting that deep learning can be a useful tool for COVID-19 screening. We also look at some possible ways to improve the results, such as using different data processing techniques and model architectures.
type: link
date: 30/6/2024
title: Reading Between the Lungs: Evaluation of Deep Learning Model Architectures for COVID-19 Classification on Segmented Chest X-rays
image: ./img/thumbnails/between_lungs_front.png
difficulty: easy
authors: Evan Schubert, William Sebelik-Lassiter, Mitchell Mahnke, Theodore Colwell
categories: Embedded Systems, Computer Vision, Drones
link: https://drive.google.com/file/d/1AfvrSssBzguIFJ_G5akitkx8t9-gmKQH/view?usp=sharing
pages: 9

  MSOE Artificial Intelligence Research Paper
Reading Between the Lungs:
Evaluation of Deep Learning Model Architectures for COVID-19 Classification on Segmented Chest X-rays
Evan Schubert, William Sebelik-Lassiter, Mitchell Mahnke*, Theodore Colwell*
Department of Electrical Engineering and Computer Science Milwaukee School of Engineering
1025 N Broadway St, Milwaukee, WI 53202
* Team Leads

 Abstract
The COVID-19 pandemic presented significant challenges for healthcare, particularly in efficiently screening a vast number of symptomatic patients to ascertain their infection status. Typically, trained radiologists manually analyzed patients' chest X-rays to accomplish this [1]. This research aims to enhance and evaluate different deep learning models using recent data to determine their effectiveness in identifying COVID-19 from chest X-ray images. We utilized the updated COVIDx CXR-4 dataset [2], which includes 67,863 images of patient X-rays that we split 4:1 into train and test sets. These images were prepared by making them all the same size and then applying a pre-trained TorchXRayVision [3] model to segment the lungs. Our evaluations involved two deep learning architectures: ResNet-50 [4] and Inception-V3 [5], each undergoing training over 50 epochs, selecting the best-performing model based on testing loss. Inception-V3 and ResNet-50 achieved high test accuracies of 99.09% and 99.68%, respectively, underscoring the potential of deep learning in accurately classifying COVID-19 from X-rays. Future directions might explore different models, input variations, data augmentation strategies, and hyperparameter adjustments to enhance predictive accuracy.
1

 1. Introduction
During the recent global pandemic of the COVID-19 respiratory virus, the common chest X-ray (CXR) emerged as a fast, powerful, and reliable tool for diagnosing COVID infection status in patients [1]. This was especially true before the widespread availability of reverse transcriptase polymerase chain reaction (RT-PCR) tests. As a result, the volume of CXR’s performed and submitted to review by radiologists ballooned.
The recent introduction of convolutional neural network (CNN) models, a form of deep learning artificial intelligence (AI), offers an additional tool to augment radiological assessment practices. Potential applications include augmenting professional radiologist assessment by providing an automatic “second opinion” that could be easily incorporated into existing diagnostic workflows, as well as review of historical images for additional insights that a human could have missed. Of course, an AI model’s assessment is only valid or trustworthy enough to inform real-world clinical decisions if the accuracy of its diagnoses can match or exceed the accuracy exhibited by human radiologists.
In this study, we fine tune the performance of two CNN networks, ResNet-50 [4] and Inception-V3 [5], on publicly available CXR data from the COVIDx CXR-4 dataset [2] and evaluate their performance over time when fed relevant patient X-rays. We also compare the performance of the two models to previously collected performance data of human radiologists [6] to determine if our models would be useful in the real world for classifying patient COVID-19 infection status.
2. Methods
To begin research, a large up-to-date dataset that contained quality data from reputable sources was needed. Ultimately the COVIDx CXR-4 dataset [2] was selected, which contains 84,818 CXR images from 45,342 subjects. The distribution of COVID-19 positive radiography images represented 77.44% of the total images, while negative images accounted for 22.56%. This yields a ratio of approximately 3.43 to 1, indicating a significantly higher prevalence of positive cases in our dataset. It's important to note that there was no patient overlap across the sets during preprocessing.
In the data exploration, our first main focus was to understand what the dataset contained. It was found that the dataset contained the test identification, filename, test result, as well as the source of the image. Next, the distribution of image sizes within the dataset was analyzed. It was noted
2

 that a significant portion of images displayed dimensions typically centered around 1000 pixels in width and had two prominent spikes at 850 and 1000 pixels in height.
Figure 1: Histogram of image widths.
Figure 2: Histogram of image heights.
Furthermore, a comprehensive review of the dataframe was carried out to detect any instances of missing data, yet none were found.
The next objective involved establishing and implementing an extraction, transformation, and loading (ETL) pipeline to facilitate the seamless importing of data into the Inception-V3 [5] and ResNet-50 [4] models. Dataframes were created to store the train, validation, and test datasets. Enrichment occurred to make available the image dimensions in the dataframe for easy access later in the code. Images were converted into tensors that were then passed through the PSPNet architecture, a pre-trained model specifically tailored for chest X-ray feature detection, obtained
  3

 from the xrv.baseline_models.chestx_det library component [3]. The model effectively isolates lung anatomy by segmenting it from the CXR image. This was done in order to focus the model onto relevant sections of the lung related to respiratory illness.
Figure 3: Segmentation process
Figure 3 is an example of utilizing the pre-trained model to generate a mask that is mapped back on the original image. The top 2 images are the original X-Ray along with the generated mask, and the bottom image is the overlapping section of the mask where only the relevant sections of the X-Ray are present. Subsequently, these images of isolated lungs are inputted into the networks under investigation, enabling them to prioritize the analysis of critical pixels. The segmented lungs were mapped back onto the original images which were then zero-padded to be a consistent size of 1024x1024 pixels. This process did ensure that we were using quality X-ray images, however it also struggled with a significant portion of the dataset. Any images which did
   4

 not make it through the segmentation preprocessing step were removed. Using multiple methods for segmentation could be beneficial for future training purposes.
After meticulous preprocessing to ensure seamless compatibility with the chosen CNN architectures, ResNet-50 and Inception-V3, the training phase commenced. It's worth noting that the values selected for the model architectures, such as batch size and optimizer parameters, were default values, and no hyperparameter tuning was performed. ResNet-50 was configured with a batch size of 16 and employed the SGD optimizer with a learning rate of 0.001 and momentum of 0.9, along with the CrossEntropy loss function. Inception-V3, on the other hand, utilized a batch size of 16, the Adam optimizer with a learning rate of 0.001, and employed the BCEWithLogits loss function. Both models underwent 50 epochs of training, with weights selected from the epoch exhibiting the best validation loss for subsequent testing.
3. Results
The initial performance of the ResNet-50 model at epoch 1 registered a testing loss of 0.242551, with an accuracy of 90.9967%. As training progressed to epoch 50, the model exhibited a decrease in loss to 0.010351, while accuracy rose to 99.6316%. Notably, the acceleration of accuracy improvements for the ResNet-50 model began to taper around epoch 30.
Simultaneously, the Inception-V3 model commenced its training with a higher initial testing loss of 0.320582 and a lower accuracy of 87.0064% at epoch 1. Upon reaching epoch 50, Inception-V3 demonstrated significant improvement, achieving a reduced loss of 0.026613 and an enhanced accuracy of 99.06%. The rate of improvement for the Inception-V3 model showed signs of deceleration after approximately epoch 35.
Comparing the performance, ResNet-50 had an initial advantage over Inception-V3 by an accuracy margin of 3.9903%. However, by the 50th epoch, this margin had narrowed, with ResNet-50 maintaining a smaller lead of 0.5717% in accuracy over Inception-V3.
Throughout the training period of 50 epochs, both models exhibited a consistent general pattern in their learning curves. The rate and shape of progress, when charted, appeared relatively parallel for both models.
5

   Figure 4: Loss and Accuracy metrics over time, on testing data for both model architectures
4. Discussion
Observing the performance of both models, ResNet-50 started with a higher accuracy and had lower loss compared to Inception-V3. ResNet-50 maintained a higher accuracy and lower loss for the entire training duration. Both models’ accuracies began to taper around epoch 30. Overall, ResNet-50 outperformed Inception-V3. In the context of the COVID-19 classification problem. It appears that ResNet-50 would be a better fit due to the higher starting and final accuracy. The model is also less likely to overfit when achieving similar accuracies to Inception-V3.
Figure 5: ResNet-50 Confusion Matrix (Epoch 30)
 6

 The confusion matrix (Figure 5) illustrates the performance of the ResNet-50 model after 30 epochs. In the context of COVID-19 detection using chest X-rays, the 'True label' 0 corresponds to the negative class (not COVID-19), and the 'True label' 1 corresponds to the positive class (COVID-19). The 'Predicted label' 0 and 1 indicate the model's predictions for negative and positive cases, respectively.
From the matrix, we see that the model correctly identified 10,615 negatives (true negatives) and 44,211 positives. There are 48 false positives and 222 false negatives.
In the context of a pandemic, such as COVID-19, it is considered to be more beneficial to prefer false positives than false negatives, as accidentally quarantining someone who is not sick for a week or two causes less risk to the general public than a false negative, where the disease can still be spread. Therefore, the lower number of false negatives in this confusion matrix is a crucial aspect of the model's utility in public health, as it reduces the risk of infected individuals being overlooked and ensures that anyone potentially infected receives further medical evaluation and quarantine if necessary.
One interesting note is that, by the numbers, the CNN model architectures evaluated in this study exhibited notably stronger diagnostic accuracy on this dataset than a baseline score for human radiologists. One study characterized the overall accuracy of radiologists with >10 years of experience determining COVID-19 infection status based purely on CXR’s as 83.7%, while radiologists with <10 years of experience exhibited an overall accuracy of 76.0% [6]. By the end of model training however, the strongest CNN model architecture evaluated (ResNet-50) exhibited an overall diagnostic accuracy score of 99.6%.
This jump in accuracy is significant (15.9% improvement over the best human readers), but comes with a heavy risk of not being applicable in all situations. A trained radiologist reading a CXR will be able to give a reasonably accurate diagnosis on basically any image under any conditions, whereas the image classification models evaluated here will only give remotely accurate diagnoses on clean images of a specific size and resolution, that have been properly segmented and preprocessed, and even then, they can only tell if the patient has COVID-19 or not. This leads to the conclusion that AI classification of CXR’s could be a fast and effective supplemental tool under ideal conditions, but should only be relied upon as an additional resource after initial CXR review by a professional human radiologist.
Moving forward, we would want to bring in the entire pre-made validation and testing data into our pool in order to make sure these models scale well with the extra data. Also, as the dataset seems to be continuously updated with new data as it becomes available, it would be interesting to see if the performance of these models can stand the test of time, or if retraining would be required to stay up to date with the new data. Some limitations of our research include the use of just the training dataset, and making our own test split from this training dataset, along with not
7

 performing a grid search of the hyper parameters in order to try and optimize training speed and stability. One of the major downsides to our process is the dependence on preprocessing in order to segment out the lungs. Our segmentation method seems to struggle with a statistically significant portion of the training data, which requires us to only use data which is clean enough for preprocessing to work as expected. This means that our models are being trained on better, and likely newer data, which may not apply to legacy datasets. This is not optimal, however we do not expect the quality of X-ray imaging techniques to backtrack anytime soon. This puts models like ResNet-50 in a good position to be a potential supplemental resource for radiologists.
8

 References
[1]
E. Saez, A. Portella, J. M. Escudero-Fernández, and J Andreu Soriano, “Usefulness of chest X-rays for detecting COVID 19 pneumonia during the SARS-CoV-2 pandemic,” Radiología (English Edition), vol. 64, no. 4, pp. 310–316, Jul. 2022, doi: https://doi.org/10.1016/j.rxeng.2021.11.003.
[2]
A. Zhao, “COVIDx CXR-4,” Kaggle.com, 2023. https://www.kaggle.com/datasets/andyczhao/covidx-cxr2 (accessed Feb. 26, 2024).
[3]
J. P. Cohen et al., “TorchXRayVision: A library of chest X-ray datasets and models,” arXiv.org, 2021. https://arxiv.org/abs/2111.00595 (accessed Feb. 27, 2024).
[4]
S. Azizi et al., “Big Self-Supervised Models Advance Medical Image Classification,” arXiv (Cornell University), Jan. 2021, doi: https://doi.org/10.48550/arxiv.2101.05224.
[5]
M. Mujahid, Furqan Rustam, R. Álvarez, J. Luis, Isabel, and I. Ashraf, “Pneumonia Classification from X-ray Images with Inception-V3 and Convolutional Neural Network,” Diagnostics, vol. 12, no. 5, pp. 1280–1280, May 2022, doi: https://doi.org/10.3390/diagnostics12051280.
[6]
A. Cozzi et al., “Chest x-ray in the COVID-19 pandemic: Radiologists’ real-world reader performance,” European Journal of Radiology, vol. 132, p. 109272, Nov. 2020, doi: https://doi.org/10.1016/j.ejrad.2020.109272.
 9
