summary: Inferencing is the process of an algorithm reaching a final answer -- the important part is if it's right or wrong.
order: 3
date: 22/8/2023
title: Learning AI (Pt. 3): Inferencing
image: ./img/thumbnails/what_is_ai_3.png
difficulty: easy
authors: Ben Paulson
categories: AI,Walkthrough,Overview

Artificial Intelligence (AI) is transforming the way we interact with technology and the world around us. One of the fundamental processes that powers AI systems is inferencing. As a student just starting to explore the world of AI, understanding inferencing is crucial to grasp how AI systems make decisions, draw conclusions, and provide valuable insights. In this article, we will delve into the concept of inferencing, examples of applications in industry, and its significance in the field of AI.

**Warning: This article is still a work in progress -- we plan to complete this module before our first Introductory workshop on (9/7)**

# What is Inferencing?
Inferencing can be thought of as the cognitive process of drawing conclusions, making predictions, or forming interpretations based on available information and using previously-compiled knowledge. Just like humans make informed decisions by considering various factors, AI systems employ inferencing to reach logical outcomes. In essence, **inferencing enables AI to bridge the gap between input data and meaningful output.**

To connect this concept to real-world applications, let's consider the example of a self-driving car. The car's sensors collect data about the surrounding environment, such as the distance of other vehicles, the speed limit, and the presence of pedestrians. The AI system uses inferencing to analyze this data and make decisions about the car's speed, direction, and other driving actions. In this case, the input data is the information collected by the sensors, and the output is the car's driving decision.

Basically, "inferencing" is the process of an algorithm reaching a final answer -- what we do as AI developers is make sure that answer is right.

## Types of Input (And Output) Data
While inferencing is a fairly basic concept, different AI models can be made to get interesting inference-results which allows AI to be such a powerful tool across across many industries.

**1. Structured Data:**<br>
Structured data refers to information that is organized into a predefined format. This format could be rows and columns in a relational database or a spreadsheet. Structured data is highly organized and is easy for both humans and machines to understand. Examples of structured data include numerical values, dates, categories, and identifiers. In inferencing, structured data is often used in applications such as financial analysis, business forecasting, and customer segmentation.

**2. Unstructured Data:**<br>
Unstructured data, on the other hand, lacks a specific structure and can come in various formats like text, images, audio, and video. Inferencing with unstructured data is more complex because the AI system needs to extract meaningful patterns and information from the data. Natural language processing (NLP) is a prominent example of inferencing with unstructured data, where AI systems analyze text data to understand sentiment, extract entities, and generate coherent responses.

**3. Semi-structured Data:**<br>
Semi-structured data falls between structured and unstructured data. It has some organization, often through tags or metadata, but doesn't conform to the rigid structure of structured data. Examples include XML and JSON files. Inferencing with semi-structured data requires understanding both the underlying structure and the content itself. This type of data is commonly encountered in web scraping, data integration, and certain IoT applications.

**4. Temporal Data:**<br>
Temporal data includes a time component, making it valuable for analyzing trends and patterns over time. Time series data, for instance, represents values at specific time intervals. Inferencing with temporal data involves recognizing patterns, identifying seasonality, and making predictions about future values. This type of inferencing is crucial in areas like financial market predictions, weather forecasting, and supply chain management.

**5. Spatial Data:**<br>
Spatial data relates to geographical information and is often represented using coordinates, polygons, or grids. Geographic Information Systems (GIS) use inferencing with spatial data to analyze geographical patterns, plan routes, and make location-based decisions. For instance, an AI-powered navigation app employs spatial inferencing to suggest the fastest route to a destination based on real-time traffic data.

**6. Meta Data:**<br>
Meta data provides context and information about other data. It describes the characteristics and attributes of the primary data, such as the source, creation date, and data format. Inferencing with metadata involves understanding the context and using it to enhance the interpretation of the primary data. This can be seen in applications like content recommendation, where metadata helps personalize suggestions based on user preferences.
