summary: MICS Presentation from the Brain Alignment Team lead by Bart Gebka.
type: pdf
date: 24/9/2024
title: Mind Over (Gray) Matter Presentation
image: ./img/thumbnails/gray-matter-preso.png
difficulty: easy
authors: Caleb Gray, Alexander Neher, Sonia Grade, Mikolaj Sordyl, Abigail Draper, John Bukowy, Bart Gebka
categories: Transfer Learning, Medical Imaging, Previous Paper
pdf: https://drive.google.com/file/d/1t4pyVAFvtybcNKCWB_59Um2NXOYalb9l/view?usp=sharing
pages: 8

Mind Over (Gray) Matter: Homologous Point
Transform Applications to Brain Histology and MR

Domains

Caleb Gray, Alexander Neher, Sonia
Grade, Mikolaj Sordyl, Abigail
Draper, John Bukowy, Bart Gebka
Department of Electrical Engineering
and Computer Science
Milwaukee School of Engineering
Milwaukee, WI 53202
{grayc, nehera, grades, sordylm,
drapera, bukowy,
gebkab}@msoe.edu

Peter LaViolette

Department of Radiology

Medical College of Wisconsin
Milwaukee, WI 53226
plaviole@mcw.edu

Abstract

The homologous point transformer (HPT) [1] represents a methodology for image
registration designed for transforming prostate histology slides to magnetic resonance
images (MRI). Image registration is a critical tool for aligning multimodal images of the
same organ. The HPT model offers context in the MR domain from the features of the
histology image and has shown that it can register prostate histology slides to the MR
domain, but its application to other organs, including brain, has been left untested. This

experiment evaluates the use of the HPT model on brains through transfer learning. Fine-
tuning the HPT model with a limited set of brain histology slices produced a mean

control point deviation of 17.7 pixels. While these results are encouraging, introducing
more data may allow the HPT model to better adjust to brain data, reducing the mean
control point deviation towards the performance seen in prostate tissues.

1

1. Introduction
In 2019, the total number of deaths from brain cancer worldwide was 246,253 [2].
Current methods for identifying brain tumors rely on magnetic resonance imaging (MRI)
techniques that produce 3D high-contrast images of the brain and the tumor inside. Fluid
Attenuated Inversion Recovery (FLAIR) is an MRI sequence that minimizes contrast
between gray and white matter and increases lesion to background contrast. [3]

Detecting the tumors size and placement requires a high resolution of detail and context
that can be enhanced by combining MRIs with histology - the study of tissue through
microscopic histochemistry. In research contexts, a brain can be thinly sliced and stained,
then examined under a microscope to find tumor placement, if any, along with
morphological indicators of prognosis. Once the tumor is found and labeled, the histology
slide can be aligned with the MRI to indicate the location in MR space.
Brain cancer histology slides are obtained from those who donate their brains after death
to further scientific research. Aligning histology slides to MR space is challenging
because of variable slice thickness, tissue shrinkage, and alterations after processing. [4]
The research goal of this study was to use MRI data and histology slides from past
patients to train an AI (Artificial Intelligence) model to align the two imaging domains
using a homologous point transformer as previously described in the prostate [1].
2. Prior Work
Image processing is an active field of machine learning research, and image registration
is often used in cancer research. Combining two images that come from different medical
imaging techniques using transformers has already been established by Ruchti et al. in
their paper “Homologous Point Transformer for Multi-Modality Prostate Image
Registration” [1] in which they align prostate histology slides with their correct location
in MR space. Their research focused on automating alignment of annotated histology
Figure 1: Sample data point. The two images represent an axially paired histology slice (left) with the corresponding MR
axial slice (right).

2

slides to the MRIs of prostates, and the experiment presented in the remainder of this
paper uses the same model for brain histology point registration.

3. Methodologies
3.1 Data set
The data set for this project was obtained from the Medical College of Wisconsin which
contained MRIs, ground truths, and histology slide images of five patients. Three of the
patients were in the training set, and then there was a patient each in both the validation
and testing set. We initially pretrain the model on the prostate model presented in the
“Homologous Point Transformer for Multi-Modality Prostate Image Registration,” before
fine-tuning it on the brain data. The transformation and registration of the brain's soft
tissue is more susceptible to deformations and disruptions during the histology
preparation process, like slicing, sectioning, and staining. The prostate's firmer
composition means it undergoes less distortion. All patients were recruited prospectively
with institutional review board approval and written consent.
3.2 Histology Landmark Generation Algorithm
To ensure that the generated points have uniform density, the category of “high info” was
created to distinguish what data points are valuable. For example, the edge of the brain
and any significant structure features fit in this category. All the points are collected and
compared using the Gaussian-method SIFT (Scale-Invariant Feature Transform) [5]. An
empirically derived threshold of 0.04 was chosen, and any points below 0.04 were
discarded. Points in the top 19 percentile are labeled as edge points and everything else is
labeled as an interior feature. The objective was to solve a non-linear registration
transform using predicted homologous points from histology in MR space, which meant
that edge points were given priority in the sorting process. Edge point nomination is
made more difficult where the background color of the histology slide doesn’t match with
the surface the image was taken on, leading to some erroneous edge point nominations,
harming the performance of registration. For example, in Figure 2, points on the edge of
the image rather than the tissue are identified. After preprocessing, there was a uniform
density of landmark points with uniform density that completely covered the histological
surface [1].

3

Figure 2: Predicted homologous points between histology domain (left) and MR domain (right). Each point is
represented by a unique color that is matched to its homologous point between domains.

3.3 Homologous Point Prediction Network
Histology slides and MRIs needed to be preprocessed first by defining the histology
images as moving and the MR images as fixed. Both sets of images were configured to a
single layer float tensor shape of 512 x 512. The histology images were converted to gray
scale to simplify registration. To minimize discrepancies between the border of the
images, the image was automatically centered on the brain and then 50 pixels of padding
were added on each edge and side. However, the methodology presented in this paper
could be applied to images of varying sizes given sufficient data and the dimensions of X
and Y match as described in section 3.4.

3.4 Network Architecture
The network architecture of the HPT Model used in this experiment is the same that
Ruchti et al. described in “Homologous Point Transformer for Multi-Modality Prostate
Image Registration” [1]. There are three inputs: the histology (moving) images labeled
M, the MR images (fixed) labeled F, and the generated landmark points of the histology
labeled X. The output of the model is the predicted location of histology defined points in
MR space. The number of points (called L) generated per slide differs, but since L needs
to be constant across all inputs, the number 75 was empirically chosen to allow for
enough points to approximate the density in the ground truth data.
Both the fixed and moving images went through patch slicing - slicing the image into
manageable chunks - before sending each image through a CNN. Then the embedded
patches go through normalization, a multi-head attention layer, followed by an add layer,
another round of normalization, and embedding convolutions before being passed

4

through an add layer again. The goal was to preserve locality in a transformer encoder
block that uses convolution as opposed to global multi-head mechanisms [1]. While both
the fixed and moving images went through the same process, they each are processed
through a different sub model – with independent weights – simplifying the problem of
multi-modal translation.
After both the fixed and moving images had been processed through encoder blocks, both
images and the landmark points, X, had their distance between the landmarks and the
center of their patches calculated along with the dot product between landmark
embeddings and the total number of embeddings. This indicates where the center
coordinates are at the highest similarity between the embedded patches. Lastly, the point
selection produced offsets that went into the last add layer to produce the nominated
homologous points in MR space, Y.
3.5 Model Training
The model was trained with the ground truth of histology and MR images that had points
annotated by hand. The model used control point deviation and mean absolute error as its
objective function. The brain implementation of the HPT model was trained for 10
epochs, only allowing the last layer to train about 100,000 parameters and had 5,371,904
total parameters using the TensorFlow and PyTorch libraries. However, identical results
were preserved by freezing all parameters and running a single epoch on the brain
training data.
3.6 Data Augmentation
Since there is a small number of available samples, data augmentation provided an
increased amount of data that the model could be trained on. A 16-pixel random
translation was added in the histology and MR images, and a random float from -20 to 20
degrees was performed.

3.7 Evaluation Metrics
To determine the quality of the model, an evaluation metric of average control point
deviation was defined. Control point deviation of a point is calculated by solving for the
moving transform (Thin-Plate-Spline) using the model predicted homologous points,
applying the solved transform to the ground truth histology points, then calculating
average distance of the transformed points to human annotated homologous points within
the MR domain. Control point deviation captures errors on the interior of the tissue
section introduced by nonlinear deformations that a DICE coefficient would not be
sensitive to.

5

4. Results
The homologous point pipeline using brains was compared to the pipeline using prostates
in the “Homologous Point Transformer for Multi-Modality Prostate Image Registration”.
Figure 3 illustrates a successful homologous point transfer. The image on the left
illustrated our input, with key points labeled by the SIFT algorithm. The image on the
right is the result of inference and shows the predicted locations of the identified points in
MR space.

Figure 3: The registration of a validation histology slide into MR space during training. Qualitatively, the patterns
visible in the histology slide are visible in the corresponding MR space prediction. Since images are traditionally hard
to compare using standard loss functions, control point deviation was used as the base of the objective function.
The figure above is the second patient’s image of the homologous point transfer. The
registration shows some of the weaknesses of the landmark point generation algorithm.
Due to the white histology slide being transposed onto a black background, there are
points identified that are not related with the histology (see the edge of image one in
Figure 3). A larger data set may allow for the model to better generalize brain data, and
fixing the background to be white may help improve the quality of points identified by
the landmark point identification algorithm.

6

The data in Table 1 shows the results from our testing set, a single patient with 3
histology slides. The mean control point deviation of the testing set is 17.7 ± 2.52. It is
worth noting that although there are differences between registration of brains and
prostates, both problems are similar. This may explain the performance observed from
the HPT on brains given a small data set.

Slide Control Point Deviation
S16 18.9
S14 19.4
S15 14.8
Table 1: Control Point Deviation per Histology Slide of Testing Set.
While our results are based on human annotations of homologous points, the process of
identification is still impressive. With more data, the control point deviation could be
reduced further improving the performance of the developed model. As shown in Figure
4, the small sample size meant that even slight changes in model training such as
shuffling a test set drastically affected model performance. This is a sign of a lack of data
required to develop a generalized understanding of brain image registration.

Figure 4: Two examples of comparison between human placed and model predicted points. It is worth noting that
human predicted points still have some errors. Blue points were annotated by hand and yellow points were generated
by the model with the red line showing the distance between the human placed and model predicted points.
5. Interpretation
The basis of the homologous point transfer was to predict the location of histology points
in MR space. While the presented results are based on a small sample size, they are
indicative of the power that transformers possess in medical imaging. With more data, a
more accurate and generalized model could be developed that can transfer points from
the histology domain to the MR domain. The results presented in this paper demonstrate

7

that image registration across modalities is not only possible for multiple organs but
could become more effective as machine learning techniques advance.
6. Conclusion

The Homologous Point Transform (HPT) is a deep learning pipeline designed for multi-
modality brain image registration using transformers. The approach outlined by Ruchti et

al. predicts homologous points on two image modalities, histology slides, and MRI in
prostates. By focusing on aligning images captured with different scanning
methodologies, this method offers a promising solution for accurate cross-modality,
radiology-pathology image registration in human brain image samples as well as
prostates. The HPT’s ability to predict point locations in MR space reduces the time
needed to annotate histology slides manually. Although the model possesses a high
variance in control point deviation across samples, this can be improved with a larger
data set for training to ensure the best point prediction. The HPT represents an

advancement in medical image registration by addressing the challenges of cross-
modality alignment effectively using deep learning. The results of this experiment

suggest that automatic image registration across modalities is possible for multiple
organs, with only slight variations in models.

8

References
[1] Ruchti et al. (2022). Homologous point transformer for multi-modality prostate image
registration PeerJ Computer Science 2022; doi: 10.7717/peerj-cs.1155
[2] Ilic, I., & Ilic, M. (2023). International patterns and trends in the brain cancer
incidence and mortality: An observational study based on the global burden of
disease. Heliyon, 2023;9(7) doi;10..1016e18222
[3] Kates, R., Atkinson, D., & Brant-Zawadzki, M. (1996). Fluid-attenuated inversion
recovery (FLAIR): clinical prospectus of current and future applications. Topics in
Magnetic Resonance Imaging : TMRI 1996;10(6), 389–396.
[4] Khodanovich. M (2022) Challenges and Practical Solutions to MRI and Histology
Matching and Measurements Using Available ImageJ Software Tools The Society for
Regenerative Medicine and BioMedicines 2022;10(7) doi:
10.3390/biomedicines10071556
[5] Lowe. D (2004) Distinctive image features from scale-invariant key points
International Journal of Computer Vision 2004;60(2): 91-
110.doi:10.1023/B:VISI.0000029664.99615.94
