import os
import math
import requests
from fastapi import APIRouter, HTTPException
from ..modules.modules import Modal, SearchContent, SubmitContent
from fastapi.responses import Response, FileResponse
from PIL import Image
import io

router = APIRouter()



@router.get("/tags", description="Get all tags available in the library.")
async def get_tags():
    folders = []
    for folder in os.listdir(f"{os.getcwd()}/content"):
        if ".md" not in folder:
            folders.append(folder)

    tags = []
    for folder in folders:
        tags.extend(os.listdir(f"{os.getcwd()}/content/{folder}"))        

    return {"response": sorted([tag.strip() for tag in tags if ".md" not in tag])}



@router.get("/tags/{subsection}", description="Get all tags associated with a particular subsection.")
async def get_subsection_tags(subsection: str):
    folders = []
    for folder in os.listdir(f"{os.getcwd()}/content"):
        if folder == subsection.lower().strip():
            folders.append(folder)

    tags = []
    for folder in folders:
        tags.extend(os.listdir(f"{os.getcwd()}/content/{folder}"))        

    return {"response": sorted([tag.strip() for tag in tags if ".md" not in tag])}


@router.get("/modals", description='Get all modals to display on the "Featured" page.')
async def get_modals():
    return {
        "response": [
            Modal(
                title="Featured Research",
                tags=["Research"],
                content_ids=[
                    "Learning_Resources-RunningJupyterLabOnADGXNode copy",
                    "Learning_Resources-global-protect",
                    "Learning_Resources-how-to-use-jupyter-notebooks",
                ],
                decorative=True
            ),
            Modal(
                title="Featured Articles",
                tags=["Articles"],
                content_ids=[
                    "Learning_Resources-RunningJupyterLabOnADGXNode copy",
                    "Learning_Resources-global-protect",
                    "Learning_Resources-how-to-use-jupyter-notebooks",
                ],
                decorative=True
            ),
            Modal(
                title="Featured Videos",
                tags=["Videos"],
                content_ids=[
                    "Learning_Resources-RunningJupyterLabOnADGXNode copy",
                    "Learning_Resources-global-protect",
                    "Learning_Resources-how-to-use-jupyter-notebooks",
                ],
                decorative=True
            ),
        ]
    }


@router.get(
    "/{content_id}",
    tags=["Content"],
    description="Get the textual content of a specific article.",
)
async def get_content(content_id: str):
    if content_id and content_id != "":
        try:
            return read_markdown_file(content_id)
        except FileNotFoundError:
            raise HTTPException(status_code=404, detail="Requested content not found.")
        except Exception as e:
            raise HTTPException(status_code=500, detail=f"Internal Server Error: {e}")

    return None


@router.get(
    "/{content_id}/thumbnail",
    tags=["Content"],
    description="Get the thumbnail of an article located in the img folder",
)
async def get_thumbnail(content_id: str) -> FileResponse:
    if content_id and content_id != "":
        markdown = read_markdown_file(content_id).split("\n")
        file_path = markdown[4].replace("image:", "").strip("")[3:]
        if os.path.exists(file_path):
            return FileResponse(file_path)

        raise HTTPException(status_code=404, detail="Image not found.")
    
    return None


@router.get(
    "/{content_id}/image",
    tags=["Content"],
    description="Get an image located in the img folder",
)
async def get_image(content_id: str) -> FileResponse:
    if content_id and content_id != "":
        file_options = ["png", "jpg", "gif"]

        for folder in os.listdir("img/"):
            for option in file_options:
                file_path = f"img/{folder}/{content_id}.{option}"
                if os.path.exists(file_path):
                    return FileResponse(file_path)

        raise HTTPException(status_code=404, detail="Image not found.")
    
    return None


@router.get(
    "/{content_id}/title-and-authors",
    tags=["Content"],
    description="Get the title and authors of a specific peice of content.",
)
async def get_content_title_and_authors(content_id: str):
    if content_id and content_id != "":
        markdown = read_markdown_file(content_id).split("\n")
        title = markdown[3].replace("title:", "").strip()
        authors = markdown[6].replace("authors:", "").strip().replace(",", ", ")
        return {"response": {"title": title, "authors": authors}}
    
    return None


@router.get(
    "/{content_id}/abstract",
    tags=["Content"],
    description="Get the abstract/description of a specific piece of content.",
)
async def get_content_abstract(content_id: str):
    if content_id and content_id != "":
        markdown = read_markdown_file(content_id).split("\n")
        summary = markdown[0].replace("summary:", "").strip()
        response = await get_content_type(content_id)
        content_type = response["response"]["type"]

        text = markdown[9:]
        time = calculate_reading_speed("\n".join(text), content_type=content_type)
        pages = calculate_pages("\n".join(text), content_type=content_type)

        return {"response": {"abstract": summary, "reading_time": time, "pages": pages}}
    
    return None


@router.get(
    "/{content_id}/tags",
    tags=["Content"],
    description="Get all tags associated with a specific piece of content.",
)
async def get_content_tags(content_id: str):
    if content_id and content_id != "":
        markdown = read_markdown_file(content_id).split("\n")
        tags = markdown[7].replace("categories:", "").strip().split(",")
        return {"response": tags}
    
    return None


@router.get(
    "/{tag}/tagged-content",
    tags=["Content"],
    description="Get all content associated with a specific tag.",
)
async def get_tag_content(tag: str):
    if tag and tag != "":
        tag = tag.lower().strip()
        folders = []
        for folder in os.listdir(f"{os.getcwd()}/content"):
            if ".md" not in folder:
                folders.append(folder)

        content = []
        for folder in folders:
            for subfolder in os.listdir(f"{os.getcwd()}/content/{folder}"):
                if (subfolder.lower().strip() == tag or tag == "all") and ".md" not in subfolder:
                    items = os.listdir(f"{os.getcwd()}/content/{folder}/{subfolder}")
                    content.extend([item.replace(".md", "") for item in items])

        return {"response": sorted(content)}
    
    return None


@router.get(
        "/{content_id}/content-type",
        tags=["Content"],
        description="Get the content type for proper display/rendering."
)
async def get_content_type(content_id: str):
    if content_id and content_id != "":
        markdown = read_markdown_file(content_id).split("\n")
        content_type = markdown[1].replace("type:", "").strip()
        if content_type == "link":
            return {"response": {"type": content_type, "link": markdown[8].replace("link:", "").strip()}}
        if content_type == "pdf":
            return {"response": {"type": content_type, "pdf": markdown[8].replace("pdf:", "").strip()}}
        return {"response": {"type": content_type}}
    
    return None

@router.get(
    "/subsection/{subsection_name}",
    description="Get all modals and content associated with a specific subsection.",
)
async def get_subsection(subsection_name: str):
    if subsection_name and subsection_name != "":
        if subsection_name == "Featured":
            return await get_modals()
        else:
            print(os.listdir(f"{os.getcwd()}/content/{subsection_name.lower()}"))
            tags = os.listdir(f"{os.getcwd()}/content/{subsection_name.lower()}")
            contents = []
            for tag in tags:
                if ".md" not in tag:
                    contents.extend(os.listdir(f"{os.getcwd()}/content/{subsection_name.lower()}/{tag}"))
            return {
                "response": [
                    Modal(
                        title=subsection_name,
                        tags=[],
                        content_ids=[content.replace(".md", "") for content in contents]
                    )
                ]
            }
        
    return None


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
    folders = []
    for folder in os.listdir(f"{os.getcwd()}/content"):
        if ".md" not in folder:
            folders.append(folder)
    
    for folder in folders:
        for sub_folder in os.listdir(f"{os.getcwd()}/content/{folder}"):
            if ".md" not in sub_folder:
                for file in os.listdir(f"{os.getcwd()}/content/{folder}/{sub_folder}"):
                    if file_name in file:
                        with open(f"{os.getcwd()}/content/{folder}/{sub_folder}/{file_name}.md", "r", encoding="utf-8") as file:
                            return file.read()


def read_image_to_bytes(file_name: str):
    with Image.open(f"{os.getcwd()}/img/article_content/{file_name}.png") as img:
        img_byte_arr = io.BytesIO()
        img.save(img_byte_arr, format=img.format)
        img_bytes = img_byte_arr.getvalue()

        return img_bytes


def calculate_reading_speed(text: str, words_per_minute: int = 300, content_type: str = "md") -> int:
    words = text.split()
    num_words = len(words)
    reading_time = num_words / words_per_minute
    return math.ceil(reading_time)


def calculate_pages(text: str, words_per_length: int = 250, content_type: str = "md") -> int:
    if content_type == "pdf":
        markdown = text.split("\n")
        pages = int(markdown[0].replace("pages:", "").strip())
        return math.ceil(pages)
    
    img_count = text.count("<img")
    words = text.split()
    num_words = len(words)
    pages = num_words / words_per_length + (img_count * 0.5)
    return math.ceil(pages)
