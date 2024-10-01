summary: Our team is working on incorporating computer vision on a drone in order to assist in autonomous movement. We hope to apply this in both searching and tracking applications. Currently we are working on a tracking proof of concept, where we will have a drone be able to follow a soccer ball during a game.
type: link
date: 30/6/2024
title: Deep Learning in Embedded Systems with an Emphasis on Convolutional Drone Intelligence
image: ./img/thumbnails/drone_front.png
difficulty: easy
authors: Salvin Chowdhury, Aidan Holcombe, Braden Everson, Christian Zastrow
categories: Embedded Systems, Computer Vision, Drones
link: https://drive.google.com/file/d/1teHkmdCgRK-JI7MFyBSCdxHvp3LdCApo/view?usp=sharing
pages: 15

Deep Learning in Embedded Systems with an Emphasis on Convolutional Drone Intelligence
Salvin Chowdhury, Aidan Holcombe, Braden Everson, Christian Zastrow April 1, 2024
Abstract
This research paper ultimately explores the challenges and advancements in implement- ing Machine Learning, specifically Deep Learning models, within embedded systems. The paper highlights the gap in existing solutions for running Deep Learning models on embedded devices, often limited by hardware constraints and the lack of optimized libraries. It introduces the development of a new library, Unda, built in the Rust pro- gramming language, designed for efficient Deep Learning on embedded systems by sep- arating the concerns of Deep Learning into full model training on resource rich systems and only forward propagation on limited embedded devices.
Unda addresses the limitations of current TinyML approaches by leveraging Rust’s performance and memory safety features, offering an alternative to MicroPython and cloud-connected systems, which either suffer from large library dependencies or require external compute resources. The library utilizes a compute graph backend for efficient tensor operations and automatic differentiation, essential for training Neural Networks. Furthermore, it integrates with the XLA library for CPU, GPU, and TPU support, optimizing compute operations across different hardware platforms.
A significant contribution of the work is the development of esp-idf-unda, a version of the library designed for bare-metal embedded systems, demonstrating the feasibility of deploying trained models on devices with limited resources. The paper showcases the application of the library in a drone intelligence context, emphasizing the potential for embedded Deep Learning in real-world scenarios.
1

1 Problem
There currently exist few Machine Learning systems that are aimed entirely at the world of embed- ded systems. This is both due to the recent emergence of embedded AI’s practical usages, alongside the computational disadvantages that a bare metal system provides. Several of the current solu- tions to TinyML, the term used for embedded ML models, all either rely on large libraries that can limit memory or are cloud based and connect to a larger computer through WiFi. Therefore, there currently exists a gap in the Deep Learning world in terms of embedded libraries that can run forward propagation of pre-compiled models.
2 Current Embedded Solutions
Currently, the primary solutions for TinyML consist primarily of MicroPython and WiFi based cloud computing solutions. Both of these solutions have their benefits and disadvantages, however neither of them truly embody fully embedded Deep Learning.
2.1 MicroPython
MicroPython provides a cut down implementation of the Python language specifically targetted towards the world of embedded development. It’s lightweight nature makes it a very valuable asset for developing in the embedded world, but there are several drawbacks when considering its use in TinyML. To begin, the support for many of Python’s AI libraries is drastically cut. MicroPython does not support TensorFlow or Keras out of the box, and any implementations are left in the hands of the open source community. Even when these libraries can be used, however, they come at the downside of large library sizes that can be restrictive in a low memory environment. This ultimately leads to the need to increase memory on the embedded system, which can greatly increase power draw and cost of maintaining the device. Furthermore, even if this memory uptick is ignored, there still is in some cases the need for an intermediary operating system to allow for the correct usage of these libraries. This leads to the dependency on the OS and doesn’t make the system truly a bare metal TinyML model. Ultimately, although currently one of the industry standards for tiny ML systems, MicroPython provides several bottlenecks to the entire system that ultimately could be optimized with the use of a different library.
2.2 Cloud Connected Embedded Systems
Aside from MicroPython, another heavily used approach to TinyML is through developing and running the model on a third party. This could be through a web server, a supercomputer or even just a larger computer the device is manually connected to. This approach leads to many unnecessary dependencies on either WiFi or a direct connection to the device, ultimately limiting the usefulness of the system. Further, when using a computation server such as AWS, Google Cloud or IBM Cloud, there comes a significant service cost for any time spent using the cloud service to train a model. This can make what was meant to be a centrally localized project extremely expensive, as any request to the cloud model can come at a cost. The principle of relying on another device to do the computation necessary for Machine Learning is counter-intuitive to what TinyML is attempting to achieve, and ultimately limits the usefulness of what is truly a groundbreaking concept.
2

Ultimately, all of these current solutions to Machine Learning on the embedded level either fall short in the optimizations they are able to make for memory or are far too dependent on a third party computation device. This leads to the conclusion that what the Machine Learning community is currently missing, is a library that can train models on a large server, and perform forward operations in a low cost embedded setting.
3 Creating a ML Library in Rust
When faced with developing a Deep Learning library from the ground up, it can be intimidating to choose a language. For the world of embedded development, Rust is arguably one of the better languages to choose due to its safe yet high performing runtime. Initially chosen as a language merely as a means of learning Deep Learning principles from the ground up, Rust ultimately became fundamental to the embedded goal at hand.
3.1 Why Rust
Rust is arguably one of the most controversial languages. Many developers believe it to be too strict in its borrow checker1 memory sharing rules, and others find that it has become far too feature intensive. As a memory safe alternative to C, however, Rust does excel.
Rust provides a modern language that supplies the performance of C and C++ without the ability to write destructive code through an unintentional memory leak. It provides zero cost abstractions that allow for the usage of higher level programming concepts without the overhead or loss of performance. Furthermore, the community behind Rust is a quickly growing ecosystem that is very easy to contribute to. Creating libraries (or crates as they’re called in Rust) and deploying them to Rust’s package management service is an extremely intuitive and easy process, and the community is very welcoming to new contributors. All of these factors made Rust a very clear contender for creating a new Neural Network library.
3.2 The Unda Crate
The first goal our embedded Rust library team wanted to achieve was a functional proof of concept that Rust could perform the matrix computation required to perform Neural Network training. In the earliest stages of this project, all of this was done in an unoptimized CPU context. The early stages of this crate, named Triton, was a primitive implementation of basic Deep Learning mech- anisms. The library contained an internal Matrix structure that had implemented the Strassen Algorithm alongside a concurrent CPU crate (Rayon) to perform fast matrix multiplication. The crate utilized Adam Optimization in weight updates to provide momentum in the backpropagation stage and implemented both traditional stochastic gradient descent alongside minibatch gradient descent that was also executed in parallel. Finally, with the usage of Rust’s Trait2 objects, an abstract list of objects implemented this Layer trait could be collected through a frontend API in the library’s Network struct.
1The borrow checker provides a rigorous set of rules within a Rust program that enforce memory safety and minimize runtime errors. The borrow checker provides rules such as banning the simultaneous use of a mutable and immutable pointer, and the sole memory ownership principle.
3
  
This abstract process for collecting layer types allowed for the dynamic dispatch of layer forward and backward pass rules as the data traveled through the network and the gradient traveled backwards. This meant all that was needed to be implemented was the forward pass rules for a single layer, and that logic itself would set the data up to be ready for the next layers rules. This made it easy to implement several layer types, including Input, Flatten, Conv and Dense layers. Finally, an Enum type was used to distinguish what activation function was used on each layer alongside a second Enum type for error method. This allowed for the implementation of the Activation functions ReLu, Sigmoid, Tanh, Elu, LeakyReLu and Softmax, alongside the error types MeanSquaredError, MeanAbsoluteError and CategoricalCrossEntropy.
As an initial proof of concept, this crate was tasked with solving several demo problems. To begin, the most simple XoR problem was chosen to test early stages. The XoR, or Exclusive OR, gate can be defined as the following piece-wise function:
(1 ifx1̸=x2 XoR(x1,x2)= 0 ifx1=x2
This problem is extremely useful for testing the correctness of ML implementations because it is the first logic gate problem that cannot be solved in simply 1 input and 1 output layer. This requires the usage of Deep Learning and more specifically, hidden layers. After just 4 epochs of training on a 2-6-1 network with relu hidden activations and a sigmoid output, the model was able to fit itself to the XoR model with complete accuracy. Overall, training off of the XoR dataset and fitting to the problem proved that backpropagation was able to derive a global minimum and properly move the weights of the model towards it, thus proving the Deep Learning logic was functional.
Epoch 1: [========================================] Loss: 0.02459908
Epoch 2: [========================================] Loss: 0.015499001834
Epoch 3: [========================================] Loss: 0.012694010243
Epoch 4: [========================================] Loss: 0.000114308896
Trained to a loss of 0.01%
Error on layer 1: +/- 1.00
1 and 0: [0.99999964]
0 and 1: [0.9999995]
1 and 1: [3.9765905e-7]
0 and 0: [3.922952e-7]
This initial crate implementation was a great proof that Rust’s principles could create a functional and cohesive Neural Network library, but it definitely had its flaws. For one, the name itself. Triton exists not only in the tech world, but the AI world through two different services; both NVIDIA’s inference server and OpenAI’s GPU DSL. In order to stand out and to provide a name
2Rust does not implement traditional OOP principles, but it does contain types and behaviors that can closely mimic these. Although Rust does not have support for a true interface type system, its traits and trait objects behave in almost the same way. In a Rust trait, behavior can be defined through functions and method headers. These methods can be given initial ’default’ implementations, but can also be implemented by any struct that you designate as ’deriving’ from that trait
4
 
that isn’t confusing, the crate was ultimately renamed to Unda. Furthermore, although the trait based frontend allowed for a developer experience comparable to Keras’ plug-and-play construction experience, the backend was far from industry standard. The Matrix structs did not support GPU acceleration, they were not optimized in the way they stored data due to being stored as truly 2D arrays rather than a 1D array with dimensional metadata; because of Rust’s borrow checker system, they had to be cloned or referenced in unoptimal ways almost any time matrix multiplication had to be done. This is when it was decided to keep the frontend, but move towards a more dynamic backend that could support higher efficiencies.
3.3 Compute Graph Backend
This new backend eventually became that of a Compute Graph. Compute graphs are intuitive mathematical data structures that operate exactly like a traditional graph. In their context specifi- cally, however, the nodes all represent operations or parameters of operations and their edges define relationships between these operations downstream. Conceptually, a compute graph can be thought of as separating the concerns of a complex mathematical statement into its order of operations, so the expression y = 13x − ln(x2) would compile into a compute graph like:
13 mul
x pow ln sub y
2
In the Unda implementation of a compute graph, the backing data structure is a SlotMap that acts similar to a HashMap but without providing a key. Rather, upon insertion into the SlotMap, a key is generated and returned back. This key through the SlotMap crate in Rust, is able to assume the form of any struct defined to be a key. Therefore, when a node is inserted into the SlotMap, a nodeIdentifier struct is returned. The nodeIdentifier can be used to access the node and mutate its operations or elements from there without needing to own the memory of the node, making it a great choice of data structure in Rust. A node itself is composed of several attributes, primarily a shape, a data type and an Operation Enum. The shape defines whether the node is passing forward data in the form of a scalar, vector, matrix or arbitrary tensor structure. The data type of the node is used when determining compatibility with other nodes. The currently implemented data types include floating point values, signed integers and unsigned integers ranging in increments of 8, 16, 32, and 64 bits. Further, the bf16 data type has also recently been implemented.
The Operation Enum of a node is much more interesting than the data type and shape, however. Using Rust’s algebraic Enum type system, each operation not only contains the name of what oper- ation it is performing, but also references to the nodeIdentifier(s) the operation is being performed
5
         
on. This allows for unary, binary and even more complex operations to all be contained under the same umbrella, allowing for cleaner code and more cohesive compilation. Currently, all basic mathematical operations are supported, with Deep Learning centered operations such as transpose, matmul, reduce argmax, etc also being supported.
3.4 Automatic Differentiation
One of the superpowers of compute graphs is their ability to perform automatic differentiation on their operations. This allows for automatically obtaining the derivative of any node in the graph with respect to any other node in a way that takes advantage of simple derivative rules and the principle of the chain rule. Because every node is computed as a single operation, the derivative of that operation can be calculated using new nodes, and this final derivative can be multiplied by the derivative of the next pullback, or the deeper operations rooting back to what variable we are deriving with respect to. This embodies the chain rule of calculus, as it is this rule that allows compute graphs to so gracefully perform automatic differentiation. This principle is especially useful when it comes to Machine Learning as it allows the gradient to be calculated and the Jacobian to be found without using excessive computation or additional structures, ultimately making getting the derivative of activation functions simpler once basic derivative rules are implemented.
In the Unda crate, automatic differentiation is performed within the recursive diff() function imple- mented for the Context struct. Because all Operations are expressed as Enums, another superpower of Rust’s can be used to quickly behave according to what operation the current node is: the match3 statement. The diff function takes in the output nodeIdentifier and a with respect to nodeIdenti- fier. It first checks if these two are the same, in which case the derivative is 1. If not, the function begins pattern matching the Operation. For example, here is how the branch for the Pow Rule is implemented given its two subnodes: a and b:
    Operation::Pow(a, b) => {
        let next_pullback = self.diff(output, dependent_node)?;
        if a == with_respect_to {
            let one = self.scalar(1, wrt_dtype)?;
            let b_min_one = self.sub(b, one)?;
            let new_pow = self.pow(a, b_min_one)?;
            let power_rule = self.mul(b, new_pow)?;
            let this_pullback = self.mul(power_rule, next_pullback)?;
            dependent_pullbacks.push(this_pullback);
        }
        if b == with_respect_to {
            let log_a = self.log(a)?;
            let log_times_orig = self.mul(log_a, dependent_node)?;
            let this_pullback = self.mul(log_times_orig, next_pullback)?;
            dependent_pullbacks.push(this_pullback);
        }
}
6

This match branch ultimately provides the derivative behavior for both the power rule and the exponential rule. To begin, the next pullback is recursively obtained by finding the derivative of the output with respect to the operation we are currently at, which acts by traveling downwards in the compute graph to whatever node is still dependent on our current node. From here, we need to check which node is the one we are deriving with respect to. Because the Pow operation has the schema ab, the derivative will behave differently depending on this. If we are deriving with respect to a, the derivative is created as a secondary compute graph that defines the relationship bab−1. If instead b is what we are deriving with respect to, the resultant compute graph would then be abln(a). In either of these cases, the derivative computed is then multiplied by either a′ or b′ respectively.
For example, consider the following compute graph that computes y = x2 : 2 Constant
 pow y
Output4
  x
Parameter
Op
If we wanted to calculate the derivative of y with respect to x, we could apply the logic of our diff() function accordingly. To begin, we would start at y and find all nodes that depended on the node we want to give respect to. In this case, Pow is the only node where this holds true. In this situation, a = 2 and b = x, so we are deriving with respect to b. This would create the secondary compute graph 2x1 or just 2x. The next pullback in this situation would then be the parameter node x, and since x is x, the derivative would be 1 so we are complete. Therefore, this compute graph would have a derivative of y with respect to x of 2x
In much more complex situations, such as that of matrix multiplication of several weights or acti- vation functions that are comprised of collections of several operations, the differentiation process becomes much more complicated as well. Thanks to autodifferentiation and compute graphs, how- ever, this complexity is still easily manageable and can be compiled and differentiated extremely quickly in comparison to traditional methods.
3Match statements in Rust behave very similarly to the switch statement in C. It can be used to compare a value against a series of other values and is extremely useful when using Enums. Because Enums are algebraic data types in Rust, the only way we can obtain the inner values of a certain type of an Enum is through performing a match statement and pulling the data out for each type accordingly.
4Note: in this compute graph’s implementation, y does not really exist and the final node would really be the pow operation. The derivative of y with respect to x would really be the derivative of pow with respect to x.
7
 
For example, the Sigmoid activation function can be modeled using intermediary operations, making its differentiation arbitrary to the Unda compiler. This is how Sigmoid is built as an extensive method:
    pub fn sigmoid(&mut self, a: nodeIdentifier) -> Result<nodeIdentifier> {
        let a_dtype = self.nodes[a].dtype;
        let one = self.scalar(1, a_dtype)?;
        let neg_x = self.neg(a);
        let exp_x = self.exp(neg_x)?;
        let one_p_exp_x = self.add(one, exp_x)?;
        self.div(one, one_p_exp_x)
    }
Which can also be mathematically interpreted as
1 add
1 1+e−x
or as the compute graph:
output
    neg   exp div
x
3.5 XLA for CPU, GPU and TPU Support
  This compute graph backend is much more intuitive than the initial matrix backend, but it still only can run unoptimized on the CPU. This is where the XLA, and more specifically XLA-RS, libraries come in. XLA is an accelerated linear algebra library written in C that acts as a mediator between computational math and the compute hardware used to run it. When it is run on a computer that only has access to a CPU, it performs its operations in the most optimized and accelerated way, typically through parallelism and mathematical shortcuts. When the host instead has access to a NVIDIA GPU, the same accelerated math is used, but instead with CUDA bindings for even faster parallelism. The library even has support for the TPU architecture, and dynamically calls bindings for this system when present and optimal. This allows for an abstractive layer between the mathematical models being run and the actual system being used to compute them. The initial XLA library exists, as previously mentioned, as a C library, but many eager Rust developers have been creating a sister package that uses these bindings in a Rust-safe manner. Developer Laurent Mazare created the XLA-RS repository, which allows these exact bindings. The library itself holds functions that can be called for several traditional operations alongside linear algebra operations such as the transpose, matmul, dot product, and einsum.
8
 
In order to harness the power of XLA-RS, the compute graph backend of Unda is used as a wrapper to compile an inner XLA-RS binding. All operations that exist either exist as primitive operation functions that XLA-RS supports, or can be composed as systems of these primitive operations. Some operations, such as scatter and one hot, did need to be added in a pull request to the original library. Through creating this wrapper interface, all of the computation and autodifferentiation can be expressed as nodes in the Unda compute graph, and are then compiled into XLA during usage. This allows for an easy interface between the C library that provides the most optimized powers of the CPU, the GPU, and even the TPU.
Once Unda was revamped to the initial state that Triton had been at, we were able to test it yet again using some simple ML problems. Upon benchmarking, it was even found that the XLA backend was actually slightly faster than TensorFlow was in training. The alpha version of Unda was used alongside a Breast Cancer dataset on Kaggle that provided dimensionality data and texture approximations of abnormal lumps alongside their categorization as malignant or benign. Using Unda and the XLA-RS backend, the dataset was first formatted using logarithmic normalization. From there, 479 out of 569 entries in the dataset was used to train the model in the following code:
 9

    fn main() -> Result<(), Box<dyn Error>>{
    let mut models: Vec<(MedModel, f32)> = MedModel
        ::get_from_path("examples/breast_cancer/data/data.csv")?;
    let mut rng = rand::thread_rng();
    models.shuffle(&mut rng);
    let mut inputs: Vec<&dyn Input> = vec![];
    let mut outputs: Vec<Vec<f32>> = vec![];
    models.iter_mut().for_each(|model| {
        outputs.push(vec![model.1]);
        inputs.push(&model.0);
    });
    let mut network = Sequential::new(128);
    network.set_input(InputTypes::DENSE(inputs[0].to_param().len()));
    network.add_layer(LayerTypes::DENSE(16, Activations::RELU, 0.001));
    network.add_layer(LayerTypes::DENSE(1, Activations::SIGMOID, 0.001));
    network.compile();
    network.fit(&inputs[10..inputs.len()-100].to_vec(),
    &outputs[10..outputs.len()-100].to_vec(), 1,
    ErrorTypes::CategoricalCrossEntropy);
    for i in inputs.len()-10..inputs.len(){
        println!("Model output: {:?}\nActual: {:?}",
        network.predict(&inputs[i].to_param()), outputs[i]);
}
Ok(()) }
This model, after training for about a second and was able to correctly identify malignant tumors with a loss of only 0.0003 on the testing data:
10

Malignant:212
Normal:357
Epoch 1: [========================================] Loss: 0.0002773756
Trained to a loss of 0.03%
Error on layer 1: +/- 1.00
Model output: [1.0]
Actual: [1.0]
Model output: [1.6059258e-11]
Actual: [0.0]
Model output: [1.0]
Actual: [1.0]
Model output: [2.4281247e-13]
Actual: [0.0]
Model output: [5.0391405e-12]
Actual: [0.0]
Model output: [5.034568e-12]
Actual: [0.0]
Model output: [1.0]
Actual: [1.0]
Model output: [2.915947e-12]
Actual: [0.0]
Model output: [1.0]
Actual: [1.0]
3.6 ROSIE
Upon gaining the power of the GPU through XLA, it was time to test the Unda library on ROSIE itself. The initial setup process took a bit more precaution than beginning with a Jupyter Notebook or running Python code off of ROSIE, as the proper libraries were not installed and needed to be reconfigured upon every enter. Primarily, the Rust language compiler had to be installed upon each clean SSH, and the path pointing to the XLA library had to be re-exported on the user level each time. After this, however, running Rust code on ROSIE was extremely straightforward. Using srun to perform smaller ML tasks, a new instance could be run on the Teaching partition simply by running srun -J name cargo run –release within the project directory. Through ROSIE, an Unda instance was able to train on the XoR problem, the Breast Cancer dataset and even MNIST in runtimes all comparable to that of JAX. Being able to see the massive improvements that GPU acceleration through ROSIE that XLA-RS was able to bring to the Unda crate was extremely rewarding, and proves the ability to train Rust based models off of ROSIE.
Upon successfully training a model upon ROSIE, the entire project seemed far closer to being able to successfully achieve its goal of creating a library that can run embedded ML models on bare metal systems. The implications of being able to train a model on a high compute powered system such as ROSIE and then offload them into a board the size of a quarter are immense, and could provide improvements to the world of robotics, medical imaging, and in the case of this project, drones.
11

3.7 Embedded Runtime
With the training process in Rust being completed, it was time to move towards the primary goal of this project: embedded forward propagation. The first thing necessary for this goal was to create a serializer method that could export the Unda network to a file that could be used on the esp32. This was achieved by creating the .unda file format, which contained information on weights, biases, layer types and activation functions at each respective layer. This file currently exports as a serialized string that can be interpreted by the Unda network, but eventually a goal of our project is to move towards a binary file format and to use a Numpy file instead to hold compute graph constants and to allow for potential cross-neural-network-support.
One of the more difficult decisions to make with the embedded runtime is whether XLA-RS should be used as the backend, or if we should opt towards the matrix method. XLA has many benefits, and would have provided a quicker compilation of forward passes, but ultimately wouldn’t fully align with the goals of the project. If XLA was included in the embedded library, then the XLA- Library would have to be downloaded to the board, a library that is by no means small. This would likely require the usage of an operating system such as on the Raspberry Pi, in which situation TensorFlow and Keras can already be used. In order to opt towards a more full range of support and a truly baremetal implementation, the initial matrix backend was used to compute forward passes in a more optimized yet still slower method. This decision ultimately came at the cost of performance on a small scale, but provided support for truly embedded Machine Learning.
When creating embedded Rust libraries, a certain naming convention must be used. If the library doesn’t use the standard library, you name your crate with the conjecture esp-{name}. If you are instead using the standard library, esp-idf-{name} is used. Because our crate used vectors for matrix data holding and uses Rust’s standard macros, a new crate named esp-idf-unda was created. esp-idf-unda is an extremely stripped down version of the Unda crate, implementing only Matrix math and a network struct that has only two methods: forward and deserialize unda fmt string. These two methods allow for a network to be constructed from a .unda file and a forward pass given a series of inputs. This allows for a completely baremetal runtime that can successfully run ML models trained on the Unda library. This in turn meant that we could successfully train a larger model on ROSIE, export its .unda file, and run it on as something as small as an esp32.
In order to test that the esp-idf-unda crate behaved properly, a sample circuit was built to model the XoR problem. This board contained an Espressif esp32-S3 board alongside two buttons that contained the input parameters to the model and an LED representing the model state. The two buttons in their off states represented 0s being inputted to the model, and when pressed that button state would be a 1. An Unda model was compiled in the source code for the esp32, and ever 500 milliseconds the state of the buttons were used to feed into the model and derive an output. If that output was greater than 0.8, the LED was turned on, and if not it was turned off. This provided an interactive proof that the Unda library was able to compile, train, evalulate and serialize models, and that the esp-idf-unda library was able to deserialize and forward propagate these models.
12
 
   Figure 1: Three images representing the several states of the esp32 XoR demo. From left to right: The board initially set with two 0 inputs, resulting in a 0 from the model and therefore no LED, a model state of [1,0] being sent to the network, resulting in a predicted 1 and therefore the LED being turned on, a model state of [1,1] being sent to the network, resulting in a predicted 0 and no LED again.
4 Applications of Embedded Unda
With the software functionality being in a good stage with both model training/general use Machine Learning and forward passes on the embedded level, another key place to look towards is the applications for which this technology has.
4.1 Medical Technology
With the ability to host ML models on the device level of embedded systems, there exists large improvements that can be made in the world of medical technology. Without the dependency on networks outside of the hospital’s control, there is no longer a risk of losing connection to a ML system while performing real time medical predictions. This could take the form of a device that can automatically identify likely tumors based on a single automated screening process, similar to the data collected with the Kaggle Breast Cancer dataset used earlier as a proof of concept. Systems like these could help improve the speed and efficiency of real-time blood screenings to identify the risk of critical diseases, and could ultimately save time that could be crucial to the survival of a patient. Being able to host efficient embedded ML models on the medical level ultimately aids in the overall efficiency of these medical systems.
4.2 Low Cost Security Systems
Currently, many security screening systems at Airports and other high security facilities still perform facial recognition on the cloud level. This leads to a high influx of daily requests, and ultimately comes at the cost of larger costs for a system that could be performed at the in-house level. If Airports were able to implement a screening system that is only retrained once a day off of any new entries and then locally exported to all embedded screening devices, company costs could be cut immensely for the same performance and user experience.
13

More specifically in the context of what our team has been researching and working towards this previous year, however, is the applications that embedded ML holds for the future of drone tech- nologies.
5 Drone Case Study
Drones are changing the world on their own, but when combined with AI, they become unparalleled tools of innovation. These advanced devices have already made their mark and continue to be utilized across a variety of fields including agriculture, cinematography, industry, and urban search and rescue, among others. These applications contribute to the vast drone market, which was valued at USD 35.28 billion in 2024 and is projected to reach USD 67.64 billion by 2029, according to a report by Mordor Intelligence. Moreover, drones encompass an intriguing range of engineering disciplines—electrical, mechanical, aerospace, software, and machine learning. Inspired by this multidisciplinary nature and vast potential, we, along with a few students with backgrounds in diverse types of engineering from the Honors floor, decided to embark on a project to build our own MSOE AI Machine Learning drone. This drone would be able to autonomously capture images and interpret the scene for object, gesture, or obstacle recognition followed by appropriate action in real time.
The project was split into three steps:
1. Develop and Train Library: Create the custom AI library, train it using ROSIE, and upload the finalized code to the ESP32-S3 board.
2. Build the Drone: After securing funding through the Honors Program, construct the drone using 3D-printed parts, and mount the ESP32-S3 board and camera.
3. Control Mechanism: Establish a method for sending signals to the drone, enabling it to move based on specific inputs or conditions.
Currently, we have developed and trained the library, as well as constructed the drone. Our current focus is on enabling the drone to autonomously capture photos and generate outputs after analyzing the scene. Moving forward, we aim to achieve full autonomy for the drone, enabling it to operate independently without human intervention. These exciting advancements in drone technology would significantly expand the potential applications and opportunities for further innovation.
14

6 Conclusion
Overall, the development of the Unda crate and its sister crate esp-idf-unda hold heavy implications for the future of ML and Rust, especially in the context of embedded systems. Being able to construct a GPU accelerated compute graph model has greatly improved the runtime of this crate, and has made ROSIE a very powerful tool for performing Deep Learning in not just the traditional Python workflow. Although the drone’s model has still not been completed, the development of the embedded forward propagation library holds the power to host and interpret this convolutional network upon subsequent training on ROSIE. Today, the Unda crate holds a total download count of more than 12,000, proving that there is most definitely a demand for a library of this caliber in the world of Rust.
source code: https://github.com/BradenEverson/unda
 15
