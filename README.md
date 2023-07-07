# MAIC SITE

Requirements:
* `pip install markdown`
* `pip install pandas` (you probably have this already)

Usage:
* Make changes in these folders:
    * img (images)
    * js-css (javascript and styling)
    * md (site markdown content)
    * templates (html+python files to be filled)
* run `python ./build.py`
* repeat

---

Markdown format:

The markdown files start with metadata formatted like `<name>:<data>` followed by `===` and then end with the "body" which is just regular markdown.

---

HTML template format:

The template files are regular html, except anything between two paris of dollar signs (`$$...$$`) should be a python expression that evaluates to a string.