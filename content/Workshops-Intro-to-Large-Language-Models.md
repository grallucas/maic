img: ./img/thumbnails/llm.jpg
summary: Learn the basics of LLama, ChatGPT, and how to use them in your projects
date: 9/11/2023
title: Basics of Large Language Models
authors: Lucas Gral, Thomas Benzshawel

Follow along in the LLM notebook [HERE](https://drive.google.com/file/d/1C1xPki6FL7EoMrb3AXO2X7j280y-MyxQ/view?usp=drive_link)!

# Methods of running LLMs locally

[Llama.cpp](https://github.com/ggerganov/llama.cpp) is a solution for running LLMs locally!  
It could only run Llama initially, but it can now run most open source LLMs.
Fun fact: llama.cpp does not depend on any machine learning or tensor libraries (like Tensorflow or Pytorch, each of which are hundereds of megabytes); it was written from scratch in C/C++.

Another solution for running LLMs locally: [Hugging Face Transformers](https://huggingface.co/docs/transformers/index).

## Loading Llama on Rosie with pre-trained weights


llm = Llama('/data/ai_club/llms/llama-2-7b-chat.Q5_K_M.gguf', n_gpu_layers=-1, verbose=False)



- You can make predictions, a lot of them, through: result = llm('Text')
- The model result is a dictionary -- like an array, but you can index it at things other than numbers. The thing you index it at is called the key, and the thing the key stores is called the value.
- The key can be almost any datatype, and the value can be *any* datatype.
- result['choices'] is an array of dictionaries
- Use result['choices'][0]['text'] to get the text of the result



**What about chatting?**

On top of text-completion abilities, we can also do chat-like inputs with the `create_chat_completion` method.

The input to this method is the chat history, which is a list of dictionaries. Each dictionary is a message which stores a `role` ("who" said the message), and some `content` (the message itself).

There are only a few possible message roles. You can't specify your own.
- `system` tells the model what to do (the "boss" of the model).
- `user` can say anything to the model, and this is what the model is actually responding to.
- `assistant` the model itself. You usually dont specify this manually; the model generates these.

Below is a simple input history to prompt the LLM. The system message is giving the LLM a personality, and a user message is making a request.

```
**Here is a history input:**

history = [
    {
        'role': 'system',
        'content': 'You spell in an unintelligibly strong British accent and have a habit of talking about MAIC (MSOE AI Club) in every response' # You can change this.
    },
    {
        'role': 'user',
        'content': 'Write a recursive factorial function in Python.'
    }

]
response = llm.create_chat_completion(history) # as mentioned, we use the `create_chat_completion` method with the history

Like before, the result is a complex data structure.
When doing chat completion, the response is in `message` instead of `text`. `message` is a dictionary with a role and content.
response = response['choices'][0]['message']

print(response['content'])

```


**Making ChatLlama...**

```
### Let's make a function for this process.

def continue_conversation(user_prompt):
    # add user prompt to history
    history.append(
        {
            'role':'user',
            'content':user_prompt
        }
    )
    # run the model on the entire history
    response = llm.create_chat_completion(history)['choices'][0]['message']
    # add the model output to the history
    history.append(response) # `response` already includes the role

    # also return the LLM's latest response text
    return response['content']



print(continue_conversation('Write a recursive factorial function in Haskell'))

```

# See the attached notebook for the challenge problems!