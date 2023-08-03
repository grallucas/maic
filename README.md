# MAIC SITE

### Requirements
---
* `pip install markdown`
* `pip install pandas` (you probably have this already)
<br/>
<br/>
### Usage
---
* Make changes in these folders:
    * img (images)
    * js-css (javascript and styling)
    * md (site markdown content)
    * templates (html+python files to be filled)
* run `python ./build.py`
* repeat
<br/>
<br/>
### Markdown Format
---
The markdown files start with metadata formatted like `<name>:<data>` followed by `===` and then end with the "body" which is just regular markdown.
<br/>
<br/>
### HTML template format
---
The template files are regular html, except anything between two paris of dollar signs (`$$...$$`) should be a python expression that evaluates to a string.
<br/>
<br/>
### How to Preview The Website
---
Based on the details outlined in the `tasks.json` file, you can execute the command `ctrl+shift+b` while in the `index.html` file and it will open a preview of the webpage.
- If a pop-up appears asking which software to use, open it using your preferred browser
- If a pop-up does not appear, ensure `"version": "0.1.0"` is in the `tasks.json` file, NOT 2.0.0
