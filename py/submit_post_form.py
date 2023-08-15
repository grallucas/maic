# import csv
# import cgi

# form = cgi.FieldStorage()

# title = form.getvalue("title")
# content = form.getvalue("markdownInput")
# thumbnail = form.getvalue("thumbnail")
# summary = form.getvalue("summary")
# category = form.getvalue("category")
# author = form.getvalue("author")
# email = form.getvalue("email")

from flask import Flask, render_template, request

app = Flask(__name__)

@app.route('/', methods=['GET', 'POST'])
def index():
    print(request.method)
    if request.method == 'POST':
        # Call your Python script here
        print("AHHHHHHHH")
    return render_template('maic/index.html')



# if title and content and thumbnail and summary and category and author:
#     print([title, content, thumbnail, summary, category, author, email])
#     with open("posts.csv", "a", newline="") as csvfile:
#         csvwriter = csv.writer(csvfile)
#         csvwriter.writerow([title, content, thumbnail, summary, category, author, email])
        
#     print("Content submitted successfully.")
# else:
#     print("Please provide all the required fields...")
