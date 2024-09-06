summary: Before getting to AI development, let's start with the basics of programming. We'll also dive into how learning about programming works at college!
type: md
date: 31/8/2024
title: What is Programming?
image: ./img/tree-thumbnails/what_is_programming.png
difficulty: easy
authors: Ben Paulson
categories: Tutorial, AI-Club, Getting Started

<br>
<a href='/learning-tree?node=2' style='
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

<p style='color: white; margin-top: 2px;'>By reading this article, you'll be able to understand the purpose of programming and ultimately how it fits into the education you're receiving at MSOE or some other educational institution. In college, learning how to be a developer isn't about the number of languages you can use, but rather understanding the concepts behind programming and how to apply them to different languages and use-cases. We'll touch on what languages are typically done to teach this, and how you can apply this knowledge to the field of AI.</p>

</div>

<br/>

<br/>

## What is Programming?
Programming is the process of creating a set of instructions that tell a computer how to perform a task. Programming can be done using a variety of computer "languages", such as Python, Java, C++, and many others. These languages are used to create software, websites, and other applications that can be used on a computer or other devices.

Now, you may be asking yourself: "why do different languages exist?" The answer is that each language is designed to be used for different purposes. For example, Python is a great language for beginners because it is not "strictly typed" and has a massive open-source community. Java is a popular language for its Object-Oriented nature while simultaneously having a large community, while C/C++ is often used for creating software that needs to run quickly due to its explicit syntax. Basically, different languages have different specialization, and it's important to understand the strengths and weaknesses of each language to know when to use them.

To help understand the "type" the language you're working with, typically naming them either: **high-level** or **low-level** languages. High-level languages are easier to read and write, while low-level languages are closer to the computer's language and are more difficult to read and write. The advantage of low-level languages is that they are often faster and more efficient than high-level languages, but they are also more difficult to work with.

Beyond these "types", there are several concepts which are present in vritually every language, and understanding them is key to becoming a successful programmer. These concepts include:
- **Variables**: A way to store data in a program
- **Loops**: A way to repeat a set of instructions
- **Conditionals**: A way to make decisions in a program
- **Functions**: A way to group a set of instructions together
- **Classes**: A way to group functions and variables together

<br/>

## Understanding Programming Concepts
By understanding the core concepts of programming (listed above), you'll be able to write code in virtually any language. This is why AI-Club believes that ANYONE is capable of working with AI, even if they have no prior coding experience. While it may take time to learn to explicit syntax of a language, we recommend using tools like Chat-GPT to aid in your development process or answer questions you have. Beyond this, truly the most difficult part of programming is "thinking programmatically" -- that is, understanding how to break down a problem into a series of steps that a computer can understand.

With that context out of the way, let's dive into the different concepts and how you can think about them at a high-level. For our examples, we'll use the language **Python** as it is the most popular language for AI development and is the language we use in AI-Club:

<br/>

### Variables
Variables are used to store data in a program. In Python, you can create a variable by typing the name of the variable followed by an equals sign and the value you want to store. For example, to create a variable called `x` and store the value 5 in it, you would write:

```python
x = 5
```

You can then use this variable in your program to perform calculations or make decisions. For example, you could write:

```python
y = x + 3
```

This would create a new variable called "y" and store the value 8 in it.

<br/>

### Conditionals
Conditionals are used to make decisions in a program. In Python, you can create a conditional using the `if`, `elif`, and `else` keywords. For example, to check if a variable is equal to 5, you could write:

```python
x = 5
if x == 5:
    print("x is equal to 5")
elif x < 5:
    print("x is less than 5")
else:
    print("x is greater than 5")
```

This code would print "x is equal to 5" to the user because the variable `x` is equal to 5. Each of the "conditionals" (the `if`, `elif`, and `else` blocks) are used to check different conditions and only execute the code inside them if the condition is `True`. The `elif` will check some conditional if the prior `if` or `elif` statements were `False`, and the `else` will execute if all prior conditionals were `False` and doesn't check any specific condition itself. 

<br/>

### Loops
Loops are used to repeat a set of instructions in a program. In Python, you can create a loop using the `for` or `while` keywords. These loops can perform the same tasks, though may be used in different situations. For example, to print the numbers 1 through 5 to the user, you could write:

```python
for i in range(1, 6):
    print(i)
```

Or, you could use a `while` loop to do the same thing:

```python
i = 1
while i <= 5:
    print(i)
    i += 1
```

A `while` loop will continue to run as long **as the condition is true**, while a `for` loop will run **a set number of times**.

<br/>

### Functions
Functions are used to group a set of instructions together in a program so that it can be reused later extremely easily. This is where you can start defining "custom words" that personalize your program to you specific needs -- these "custom words" are simply you defining different function names! In Python, you can create a function using the `def` keyword. For example, to create a function that adds two numbers together, you could write:

```python
def add_numbers(a, b):
    return a + b
```

This function is called `add_numbers` and takes two arguments, `a` and `b`. It returns the sum of `a` and `b`. You can then use this function in your program to add two numbers together, rather than explicity saying `c = a + b`. For example, you could write:

```python
result = add_numbers(3, 5)
print(result)
```

This would print `8` to the user. 

<br/>

### Classes
Classes are used to group functions and variables together in a program. This is a way to create "objects" in your program that have specific attributes and behaviors. In Python, you can create a class using the `class` keyword. For example, to create a class called `Person` that has a `name` attribute and a `say_hello` method, you could write:

```python
class Person:
    def __init__(self, name):
        self.name = name

    def say_hello(self):
        print(f"Hello, my name is {self.name}")
```

This class is called `Person` and has an `__init__` method that takes a `name` argument and sets the `name` attribute of the object to that value. It also has a `say_hello` method that prints a greeting to the user. You can then create an instance of this class and use it in your program. For example, you could write:

```python
person = Person("Alice")
person.say_hello()
```

This would print `Hello, my name is Alice` to the user.

<br/>

## How Does Programming Relate to AI?
Programming is a fundamental skill for anyone interested in AI. AI is all about creating algorithms that can learn from data and make decisions, and programming is how you create those algorithms. By learning to program, you'll be able to create your own AI models, work with existing models, and understand how AI works at a deep level.

Python is the most popular language for AI development because it is easy to read and write, has a large open-source community, and has many libraries that make it easy to work with data and create AI models. By learning Python, you'll be able to work with AI models, create your own models, and understand how AI works. 

By "open-source community", this is truly the power of Python and ultimately programming with AI. While in the previous section we explicitly looked at defining custom functions and classes, a lot of modern development is using custom functions and classes that others have made, compiled in what we call "packages" or "libraries". These libraries are often open-source, meaning that anyone can contribute to them, and are often maintained by a large community of developers. This is why Python is so powerful for AI -- you can use these libraries to create complex AI models without having to write all the code yourself.

For example, if I wanted to make a simple neural network in Python, I could use the `tensorflow` library to do so. This library has pre-built functions and classes that make it easy to create neural networks, train them on data, and make predictions. By using this library, I can create a neural network in just a few lines of code, rather than having to write all the code myself! Below is an example of this code (it's not important you understand the meaning, but rather see how little we had to write to make an AI model!):
    
```python
import tensorflow as tf

model = tf.keras.Sequential([
    tf.keras.layers.Dense(10, activation='relu', input_shape=(4,)),
    tf.keras.layers.Dense(10, activation='relu'),
    tf.keras.layers.Dense(3, activation='softmax')
])

model.compile(optimizer='adam',
                loss='sparse_categorical_crossentropy',
                metrics=['accuracy'])
```

Ultimately, programming is a fundamental skill for anyone interested in AI, but it should not be seen as the limiter to your success! While you can spend years studying the specific syntac of a language, the most important part is understanding the concepts and even ultimately the libraries/packages that are available to you to help solve your problem.

<br/>

## How Can I Learn More?
If you're interested in learning more about programming, there are many online resources out there. From our experience in AI-Club, we've found the best way to learn is by doing -- that is, by working on our hands-on projects and solving actual problems. This is why we've developed our Innovation Labs and Research Groups, to provide you with a real-world problem to solve and the guidance you need to solve it.

If you're looking for specific links to get started, here are a few resources we recommend:
* **Understanding Python Basics QUICKLY:** [Whirlwind Tour of Python](https://jakevdp.github.io/WhirlwindTourOfPython/)
* **Programming Online Course:** [Codecademy](https://www.codecademy.com/learn/learn-python-3)
* **Video 1HR Python Tutorial:** [Learning Python in 1HR (YouTube)](https://youtu.be/kqtD5dpn9C8)