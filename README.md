# How to Work With the MAIC Site

## API (New)

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

## Requirements

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
