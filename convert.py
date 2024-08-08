# Used to convert the old Research markdown to new format

import os

files = [file for file in os.listdir(f"{os.getcwd()}/content/research") if ".md" in file]

for file in files:
    text = ""
    new_text = ""
    with open(f"{os.getcwd()}/content/research/{file}", "r", encoding="utf-8") as rfile:
        text = rfile.read()

    split_text = text.split("\n")
    if "# img:" in split_text[0]:
        summary = " ".join(split_text[8:]).replace("**", "")
        title = split_text[3].replace("title:", "").strip()
        img = split_text[4].replace("img:", "").strip()
        authors = split_text[6].replace("**Members:**", "").replace("**Members**", "").replace("<br/>", "").strip()
        new_text = "summary: " + summary + "\ntype: md\ndate: 2022-2023\ntitle: " + title + "\nimage: " + img + "\ndifficulty: easy\nauthors: " + authors + "\n"
    else:
        summary = " ".join(split_text[9:])
        title = split_text[2].replace("title:", "").strip()
        img = split_text[3].replace("img:", "").strip()
        authors = split_text[6].replace("**Team Lead:**", "").replace("<br/>", "").strip()
        new_text = "summary: " + summary + "\ntype: md\ndate: 2023-2024\ntitle: " + title + "\nimage: " + img + "\ndifficulty: easy\nauthors: " + authors + "\n"

    with open(f"{os.getcwd()}/content/research/{file}", "w", encoding="utf-8") as wfile:
        wfile.write(new_text)