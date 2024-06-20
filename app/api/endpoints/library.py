import os
from fastapi import APIRouter, HTTPException
from ..modules.modules import Modal, SearchContent, SubmitContent
from fastapi.responses import Response
from PIL import Image
import io

router = APIRouter()


@router.get("/tags", description="Get all tags available in the library.")
async def get_tags():
    return {"response": ["tag1", "tag2", "tag3"]}


@router.get("/modals", description='Get all modals to display on the "Featured" page.')
async def get_modals():
    return {
        "response": [
            Modal(
                title="Example Modal 1",
                tags=["Example"],
                content_ids=["content-id-1", "content-id-2", "content-id-3"],
            ),
            Modal(
                title="Example Modal 2",
                tags=["Modal"],
                content_ids=["content-id-4", "content-id-5", "content-id-6"],
            ),
            Modal(
                title="Example Modal 3",
                tags=["Horay!", "Modal!"],
                content_ids=["content-id-7", "content-id-8", "content-id-9"],
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
        return {"response": read_markdown_file(content_id)}
    except FileNotFoundError:
        raise HTTPException(status_code=404, detail="Requested content not found.")
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Internal Server Error: {e}")


@router.get(
    "/{content_id}/preview",
    tags=["Content"],
    description="Get a preview image of a given piece of content.",
)
async def get_content_preview(content_id: str):
    try:
        image_bytes: bytes = read_image_to_bytes(content_id)
        return Response(content=image_bytes, media_type="image/png")
    except FileNotFoundError:
        raise HTTPException(status_code=404, detail="Requested content not found.")
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Internal Server Error: {e}")


@router.get(
    "/{content_id}/title-and-authors",
    tags=["Content"],
    description="Get the title and authors of a specific peice of content.",
)
async def get_content_title_and_authors(content_id: str):
    return {"response": "Adam Haile, Brett Storoe, Benjamin Paulson"}


@router.get(
    "/{content_id}/abstract",
    tags=["Content"],
    description="Get the abstract/description of a specific piece of content.",
)
async def get_content_abstract(content_id: str):
    return {"response": "This is the abstract"}


@router.get(
    "/{content_id}/tags",
    tags=["Content"],
    description="Get all tags associated with a specific piece of content.",
)
async def get_content_tags(content_id: str):
    return {"response": ["tag1", "tag2", "tag3"]}


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
    with open(f"{os.getcwd()}\\content\\{file_name}.md", "r", encoding="utf-8") as file:
        return file.read()


def read_image_to_bytes(file_name: str):
    with Image.open(f"{os.getcwd()}\\img\\article_content\\{file_name}.png") as img:
        img_byte_arr = io.BytesIO()
        img.save(img_byte_arr, format=img.format)
        img_bytes = img_byte_arr.getvalue()

        return img_bytes
