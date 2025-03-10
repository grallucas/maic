# How to Work With the MAIC Site

## API (New)

The API serves all data for the website, however only the Library and Learning Tree have their own additional endpoints for data retrieval. These endpoints can be found in the [`learning_tree.py`](./app/api/routers/learning_tree.py) and [`library.py`](./app/api/routers/library.py) router folders.

How to setup the API environment locally

1. Install pipenv with `pip install pipenv`
2. Install the dependencies with `pipenv install`
3. Run the virtual environment with `pipenv shell`

How to run the API locally

1. To boot up the API while in the virtual environment (`pipenv shell`), run: `pipenv run start`
   > Executing the API in this manner allows for the application to automatically relaunch on edits to the scripts
2. Application should open on `http://localhost:8000`
3. To access the API docs, go to `http://localhost:8000/docs` or `http://localhost:8000/redoc`
   > The docs are a way to see what endpoints are available, and make test calls to the given endpoints.

Additional API scripts:

- format: `pipenv run format` - Reformats the API code to be in PEP 8 standard formatting
- lint: `pipenv run lint` - Checks for formatting errors and flags lines

## React Frontend Development

How to make setup development for the React pages

1. Ensure [Node.js](https://nodejs.org/en) is installed
2. From the root directory, run `cd pages`
3. While in the pages directory, run `npm install`

To run the React pages locally, run `npm start`. Any changes made will automatically be refreshed.

> If API calls are needed, ensure the API is running in the background. (See [API (New)](#api-new)

How to build the React pages for the API.

1. While in the pages directory, run `npm run build`
   > All pages built should be output to `pages/build`
2. Run the API and go to the corresponding page's route. Ex: [localhost:8000/library](http://localhost:8000/library)

The build pages will be visible from their corresponding endpoints.

### Library
The library pulls all it's articles from the [`./content`](./content) directory. It will only use content that is in a folder, anything not foldered will not show up in the library. The folders make up the subsections that immediately show on the left side of the library.

An article of the library should start with the following header:
```
summary: Long format summary of the article that gives a high level description.
type: md (also: link, video, pdf)
date: 31/8/2024 (dd/mm/yyyy)
title: What is the Learning Tree? 
image: ./img/tree-thumbnails/learning-tree.png (the relative location in accordance to the project root of where the image is)
difficulty: easy
authors: Ben Paulson
categories: Tutorial, AI-Club, Getting Started
```

After this, most have the following button added on which provides a link back in the Learning Tree to the article
```
<br>
<a href='/learning-tree?node=1' style='
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
```

Make sure to change out the `?node=1` to the correct ID for the article in the Learning Tree (more on this later).

Most articles also have a "Why to Read" section that details some more information pertaining to what the article is about.
```
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

<p style='color: white; margin-top: 2px;'>At the start of every article, we'll provide a brief overview of WHY you should read the article. This is a great way to quickly determine if the article is right for you, and our goal as student writers is to provide you with resources we believe are extremely credible, rather than just our own opinions.</p>

</div>
```

### Learning Tree
The Learning Tree requires setting up a node in the [`./learning_tree`](./learning_tree/learning-tree-nodes) folder for it to exist. Nodes following the following format
```
name-id-child_ids
```
- `name`: The name of the node, not really used for anything other than to more easily find nodes in the folder
- `id`: The ID of this node (use this in the Library article to refer it back to)
- `child_ids`: This can be any number of children which this node has. Keep in mind, to connect this node to a specific one, the parent of this node has to have it's ID in it's children IDs.

Nodes following the following structure:
```
name="Why Learn AI with AI-Club?"
description="Given you understand the basics of AI's history and applications, let's now dive into how you would typically learn about AI at MSOE given you don't join MAIC."
category="Introduction"
category_color="gray"
highlighted_path="True"
horizontal_displacement=""
vertical_displacement="500"
api_image_path="./img/tree-thumbnails/ai_in_school.png"
link="/library?nav=Articles&article=004_Learning_AI_at_School"
```
The primary pieces to note are:
- `category_color`: Background color of the node
- `horizontal_displacement`: How far to shift the node left/right from the parent
- `vertical_displacement`: How far to shift the node up/down globally
- `api_image_path`: The relative path from root to the thumbnail image
- `link`: The relative link to the article in the library

## Old Website - Requirements

The old website contains things such as the leaderboard, sponsors, contact info for eboard etc. Anything that is not the Library or Learning tree goes through the old website code.
Reasoning for the migration was due to the inflexiblity of the old website and wanting a system that we could make updates to without re-rendering everything. Also standardizes the website more
with what people would expect. Unfortunately, we did not have the time to migrate everything over so all old code is still used somewhere, just not actively maintained by eBoard as strongly.

All of the website is served via the FastAPI, just only the new React code actually makes use of any of the endpoints.

- `pip install markdown`
- `pip install pandas` (you probably have this already)

---

## Usage

Make changes in these folders:

- ./content - markdown files that contain most site content. [See "Markdown Format"](#markdown-format)
- ./data - user data and user awards. [See "User Data"](#user-data)
- ./img - site images.
- ./js-css - Javascript and CSS web resources. [See "JS and CSS"](#js-and-css)
- ./py - python files that generate the site, [See "Python to HTML"](#python-to-html)

Run `python ./py/build.py` to generate the site files after every change. (You have to run it from the root of the repo)

IMPORTANT: All paths to site resources are relative to the root of the repo (E.G, you would use `./img/my-image.png` in a markdown file, even if it's in ./content)

CODING CONVENTIONS:

- `SCREAMING_SNAKE_CASE` for global variables used in the html or elsewhere
- `hyphenated-case` for css class names and file names

---

### Markdown Format

The markdown (`.md`) files start with metadata formatted like `<name>:<data>`. Everything after the first empty line is just [regular markdown.](https://www.markdownguide.org/cheat-sheet/) You can also write inline HTML in the markdown files.

These are the metedata tags used:

- `date: <D>/<M>/<Y>` - used to order content
- `order: <any positive or negative integer>` - Orders content with a higher priority than date. Higher = sooner.
- `not_in_recent:` - don't display this content in "Recent" on the home page.
- `img: <path>` - thumbnail or a primary image next to or above content.
- `summary: <text>` - on the home page in "Recent" and in learning resource article previews.
- `title: <text>` - in previews and in the content itself.
- `difficulty: <positive integer>` - Appears next to learning resources
- `categories: <text>, ...` - Comma-separated strings that appear next to learning resources. The first category is the **main** one, and it determines which section of the learning resources page to place content in.

Other metadata tags are ignored.

The markdown file names are formatted like `<page name>-<content name>.md`.

---

### User Data

a

---

### JS and CSS

Each page uses a corresponding CSS file at `./js-css/<page-name>.css` if it exists.

You can also use these resources normally. E.G, `script(src='./js-css/delay-animation.js')`.

---

### Python to HTML

For each site page to be generated and included in the toolbar:

- create a file `./py/page-<page name>.py` which contains a python expression that results in an HTML string.
- add the page name to TOP_PAGES in `./py/build.py`.

To generate HTML in the python code, there are python functions for most HTML elements that might be needed (div, span, p, img, etc). Each function takes strings as arguments, and named arguments become HTML element tags (`class` is `class_` as a named argument).

All of these functions work like this: `<elment name>(html_string, ..., tag_name=tag_data, ...) -> html_string`.

Some examples might help:

    p('Hello') => '<p>hello</p>'

    div( p('Hello') ) =>
        '''
        <div>
            <p>Hello</p>
        </div>
        '''

    div(p('Hello'), style='background: red;') =>
        '''
        <div style="background: red;">
            <p>Hello</p>
        </div>
        '''

Global variables in `./py/build.py` are usable in the page code.

Other useful things for page code:

- `elems(arg: html_string|list_of_html_strings|generator_of_html_strings, ...) -> html_string` - a nicer alternative to dealing with lists of elements.
- `CURRENT_PAGE_NAME` - a variable accessible in page code containing the page name
- common funcs:
  - `common_metadata(page_name)` - generate stuff to go in the header
  - `common_toolbar(page_name)` - generate the toolbar
  - `common_content_to_card(content_dict)` - generate a common type of content representation - a "card" which consists of the title, image, and body.
  - `common_content_to_body(page_name, opt_content_list)` - generate a common page format: toolbar and cards (E.G, the merch page, the workshops page)

---

## How to Preview The Website

**Extension Method**
Download the `Live Server` extension
Right click the `index.html` file and select "Open With Live Server".

**Tasks.json Method (More Advanced)**
Based on the details outlined in the `./.vscode/tasks.json` file, you can execute the command `ctrl+shift+b` while in the `index.html` file and it will open a preview of the webpage.

- If a pop-up appears asking which software to use, open it using your preferred browser
- If a pop-up does not appear, ensure `"version": "0.1.0"` is in the `tasks.json` file, NOT 2.0.0

Alternatively, you can open `./index.html` in any browser to navigate the site. You have to reload the site after any changes.
