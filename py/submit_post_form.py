import csv
import cgi

form = cgi.FieldStorage()

title = form.getvalue("title")
content = form.getvalue("content")

if title and content:
    with open("posts.csv", "a", newline="") as csvfile:
        csvwriter = csv.writer(csvfile)
        csvwriter.writerow([title, content])
        
    print("Content submitted successfully.")
else:
    print("Please provide title and content.")
