import os
import math
from fastapi import APIRouter, HTTPException
from ..modules.modules import Modal, SearchContent, SubmitContent
from fastapi.responses import Response, FileResponse
from PIL import Image
import io

router = APIRouter()


@router.get("/tags", description="Get all tags available in the library.")
async def get_tags():
    tags = []
    for item in os.listdir(f"{os.getcwd()}/content"):
        if "Learning_Resources" in item:
            markdown = read_markdown_file(item.replace(".md", "")).split("\n")
            md_tags = markdown[7].replace("categories:", "").strip().split(",")
            for tag in md_tags:
                if tag not in tags:
                    tags.append(tag)

    return {"response": [tag.strip() for tag in tags]}


@router.get("/modals", description='Get all modals to display on the "Featured" page.')
async def get_modals():
    return {
        "response": [
            Modal(
                title="ROSIE Competition 2024",
                tags=["ROSIE 24'"],
                content_ids=[
                    "Learning_Resources-RunningJupyterLabOnADGXNode copy",
                    "Learning_Resources-global-protect",
                    "Learning_Resources-how-to-use-jupyter-notebooks",
                    "Learning_Resources-how-to-use-rosie",
                    "Learning_Resources-Pt1_LearningAI copy",
                    "Learning_Resources-pt1-how-to-get-rosie-access",
                ],
            ),
            Modal(
                title="MICS 2024",
                tags=["MICS 24'"],
                content_ids=[
                    "Learning_Resources-RunningJupyterLabOnADGXNode copy",
                    "Learning_Resources-global-protect",
                    "Learning_Resources-how-to-use-jupyter-notebooks",
                    "Learning_Resources-how-to-use-rosie",
                    "Learning_Resources-Pt1_LearningAI copy",
                    "Learning_Resources-pt1-how-to-get-rosie-access",
                ],
            ),
            Modal(
                title="23-24 Research Groups",
                tags=["RG-24"],
                content_ids=[
                    "Learning_Resources-RunningJupyterLabOnADGXNode copy",
                    "Learning_Resources-global-protect",
                    "Learning_Resources-how-to-use-jupyter-notebooks",
                    "Learning_Resources-how-to-use-rosie",
                    "Learning_Resources-Pt1_LearningAI copy",
                    "Learning_Resources-pt1-how-to-get-rosie-access",
                ],
            ),
        ]
    }


@router.get(
    "/{content_id}",
    tags=["Content"],
    description="Get the textual content of a specific article.",
)
async def get_content(content_id: str):
    try:
        return read_markdown_file(content_id)
    except FileNotFoundError:
        raise HTTPException(status_code=404, detail="Requested content not found.")
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Internal Server Error: {e}")


@router.get(
    "/{content_id}/image",
    tags=["Content"],
    description="Get an image located in the img folder",
)
async def get_image(content_id: str) -> FileResponse:
    file_options = ["png", "jpg", "gif"]

    for folder in os.listdir("img/"):
        for option in file_options:
            file_path = f"img/{folder}/{content_id}.{option}"
            if os.path.exists(file_path):
                return FileResponse(file_path)

    raise HTTPException(status_code=404, detail="Image not found.")


@router.get(
    "/{content_id}/title-and-authors",
    tags=["Content"],
    description="Get the title and authors of a specific peice of content.",
)
async def get_content_title_and_authors(content_id: str):
    markdown = read_markdown_file(content_id).split("\n")
    title = markdown[3].replace("title:", "").strip()
    authors = markdown[6].replace("authors:", "").strip().replace(",", ", ")
    return {"response": {"title": title, "authors": authors}}


@router.get(
    "/{content_id}/abstract",
    tags=["Content"],
    description="Get the abstract/description of a specific piece of content.",
)
async def get_content_abstract(content_id: str):
    markdown = read_markdown_file(content_id).split("\n")
    summary = markdown[0].replace("summary:", "").strip()

    text = markdown[9:]
    time = calculate_reading_speed("\n".join(text))
    pages = calculate_pages("\n".join(text))

    return {"response": {"abstract": summary, "reading_time": time, "pages": pages}}


@router.get(
    "/{content_id}/tags",
    tags=["Content"],
    description="Get all tags associated with a specific piece of content.",
)
async def get_content_tags(content_id: str):
    markdown = read_markdown_file(content_id).split("\n")
    tags = markdown[7].replace("categories:", "").strip().split(",")
    return {"response": tags}

@router.get(
    "/{tag}/tagged-content",
    tags=["Content"],
    description="Get all content associated with a specific tag.",
)
async def get_tag_content(tag: str):
    tag = tag.strip().lower()
    articles = []
    for item in os.listdir(f"{os.getcwd()}/content"):
        if "Learning_Resources" in item:
            if tag == "all":
                articles.append(item.replace(".md", ""))
                continue
            markdown = read_markdown_file(item.replace(".md", "")).split("\n")
            tags = [tag.strip() for tag in markdown[7].replace("categories:", "").strip().lower().split(",")]
            if tag in tags:
                articles.append(item.replace(".md", ""))
    return {"response": articles}


@router.get(
    "/subsection/{subsection_name}",
    description="Get all modals and content associated with a specific subsection.",
)
async def get_subsection(subsection_name: str):
    return {"response": subsection_name}


@router.post("/search", description="Search for content in the library.")
async def search(searching: SearchContent):
    return {"response": searching.query}


@router.post(
    "/submit-content", description="Submit content to be added to the library."
)
async def submit_content(submission: SubmitContent):
    if submission.content is None:
        raise HTTPException(
            status_code=400, detail="Bad Request. Incorrect contract. No content"
        )
    if submission.submitter_email is None:
        raise HTTPException(
            stauts_code=400,
            detail="Bad Request. Incorrect contract. No submitter email",
        )

    MAX_SIZE = 128 * 1024 * 1024
    if len(await submission.content.read()) > MAX_SIZE:
        raise HTTPException(status_code=422, detail="Too large of a file size")

    # TODO save file content somewhere

    return {
        "response": """Your content was successfully submitted!
        It will be reviewed by the Head of Research, and you will be
        notified about when your content has been added to the library!"""
    }


def read_markdown_file(file_name: str):
    with open(f"{os.getcwd()}/content/{file_name}.md", "r", encoding="utf-8") as file:
        return file.read()


def read_image_to_bytes(file_name: str):
    with Image.open(f"{os.getcwd()}/img/article_content/{file_name}.png") as img:
        img_byte_arr = io.BytesIO()
        img.save(img_byte_arr, format=img.format)
        img_bytes = img_byte_arr.getvalue()

        return img_bytes


def calculate_reading_speed(text: str, words_per_minute: int = 300) -> int:
    words = text.split()
    num_words = len(words)
    reading_time = num_words / words_per_minute
    return math.ceil(reading_time)


def calculate_pages(text: str, words_per_length: int = 250) -> int:
    img_count = text.count("<img")
    words = text.split()
    num_words = len(words)
    pages = num_words / words_per_length + (img_count * 0.5)
    return math.ceil(pages)
