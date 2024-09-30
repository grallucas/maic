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
        if ".md" not in folder and folder != ".DS_Store":
            folders.append(folder)

    tags = []
    for folder in folders:
        tags.extend(os.listdir(f"{os.getcwd()}/content/{folder}"))

    return {"response": sorted([tag.strip() for tag in tags if ".md" not in tag and tag != ".DS_Store"])}


@router.get(
    "/tags/{subsection}",
    description="Get all tags associated with a particular subsection.",
)
async def get_subsection_tags(subsection: str):
    folders = []
    for folder in os.listdir(f"{os.getcwd()}/content"):
        if folder == subsection.lower().strip():
            folders.append(folder)

    if ".DS_Store" in folders:
        folders.remove(".DS_Store")

    tags = []
    for folder in folders:
        tags.extend(os.listdir(f"{os.getcwd()}/content/{folder}"))

    if ".DS_Store" in tags:
        tags.remove(".DS_Store")

    return {"response": sorted([tag.strip() for tag in tags if ".md" not in tag])}


@router.get("/modals", description='Get all modals to display on the "Featured" page.')
async def get_modals():
    return {
        "response": [
            Modal(
                title="Featured Research",
                tags=["Research"],
                content_ids=[
                    {"Research-1NourishNet": (await get_content_title_and_authors("Research-1NourishNet"))["response"]},
                    {"Research-1Silent-Sound-Synthesizers": (await get_content_title_and_authors("Research-1Silent-Sound-Synthesizers"))["response"]},
                    {"Research-1Brain-Alignment-Innovators": (await get_content_title_and_authors("Research-1Brain-Alignment-Innovators"))["response"]},
                ],
                type="decorative",
            ),
            Modal(
                title="Featured Articles",
                tags=["Articles"],
                content_ids=[
                    {"001_What_is_the_Learning_Tree": (await get_content_title_and_authors("001_What_is_the_Learning_Tree"))["response"]},
                    {"010_What_is_a_NN": (await get_content_title_and_authors("010_What_is_a_NN"))["response"]},
                    {"Learning_Resources-how-to-use-jupyter-notebooks": (await get_content_title_and_authors("Learning_Resources-how-to-use-jupyter-notebooks"))["response"]},
                ],
                type="decorative",
            ),
            Modal(
                title="Featured Videos",
                tags=["Videos"],
                content_ids=[
                    {"Video-Rosie_23_Competiton": (await get_content_title_and_authors("Video-Rosie_23_Competiton"))["response"]},
                    {"Video-Rosie_24_Competiton": (await get_content_title_and_authors("Video-Rosie_24_Competiton"))["response"]},
                    {"Video-NVIDIA_QA_Panel_MAIC_Speaker_Series": (await get_content_title_and_authors("Video-NVIDIA_QA_Panel_MAIC_Speaker_Series"))["response"]},
                ],
                type="decorative",
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
        file_path = markdown[4].replace("image:", "").strip()[2:].replace('"', "")
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
                file_path = f"img/{folder}/{content_id}.{option.upper()}"
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
        type = markdown[1].replace("type:", "").strip()
        img = markdown[4].replace("image:", "").strip()
        return {"response": {"title": title, "authors": authors, "type": type, "img": img}}

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
            for sub_folder in os.listdir(f"{os.getcwd()}/content/{folder}"):
                if (
                    sub_folder.lower().strip() == tag or tag == "all"
                ) and ".md" not in sub_folder and os.path.isdir(f"{os.getcwd()}/content/{folder}/{sub_folder}"):
                    items = os.listdir(f"{os.getcwd()}/content/{folder}/{sub_folder}")
                    content.extend([item.replace(".md", "") for item in items])

        response = {"response": sorted(content)}
        response["response"] = [{content_id: (await get_content_title_and_authors(content_id))["response"]} for content_id in response["response"]]
        return response

    return None


@router.get(
    "/{content_id}/content-type",
    tags=["Content"],
    description="Get the content type for proper display/rendering.",
)
async def get_content_type(content_id: str):
    if content_id and content_id != "":
        markdown = read_markdown_file(content_id).split("\n")
        content_type = markdown[1].replace("type:", "").strip()
        if content_type == "link":
            return {
                "response": {
                    "type": content_type,
                    "link": markdown[8].replace("link:", "").strip(),
                }
            }
        if content_type == "pdf":
            return {
                "response": {
                    "type": content_type,
                    "pdf": markdown[8].replace("pdf:", "").strip(),
                }
            }
        if content_type == "video":
            return {
                "response": {
                    "type": content_type,
                    "id": markdown[8].replace("id:", "").strip(),
                }
            }
        return {"response": {"type": content_type}}

    return None


@router.get(
    "/subsection/{subsection_name}",
    description="Get all modals and content associated with a specific subsection.",
)
async def get_subsection(subsection_name: str):
    if subsection_name and subsection_name != "null":
        if subsection_name == "Featured":
            return await get_modals()
        elif subsection_name == "Research":
            files = [
                file
                for file in os.listdir(f"{os.getcwd()}/content/research")
                if ".md" in file
            ]
            modals = []
            for file in files:
                markdown = read_markdown_file(file)
                if not markdown:
                    print(f"File {file} is empty or could not be read.")
                    continue
                
                lines = markdown.split("\n")
                print(f"Processing file: {file} with {len(lines)} lines.")  # Debug output
                
                content_ids = []
                
                # Check if the file has at least 8 lines before accessing lines[7]
                if len(lines) > 7:
                    if "files:" in lines[7]:
                        content_ids.extend(
                            [
                                file.strip()
                                for file in lines[7]
                                .replace("files:", "")
                                .strip()
                                .split(",")
                            ]
                        )
                else:
                    print(f"File {file} has fewer than 8 lines.")
                    continue  # Skip this file if it's too short
                
                # Fetch content titles and authors
                content_ids = [{content_id: (await get_content_title_and_authors(content_id))["response"]} for content_id in content_ids]
                
                # Construct and append modal
                modals.append(
                    Modal(
                        title=lines[3].replace("title: ", "").strip(),
                        tags=[],
                        type="descriptive",
                        content_ids=content_ids,
                        img=lines[4].replace("image: ", "").strip(),
                        date=lines[2].replace("date:", "").strip(),
                        description=lines[0].replace("summary:", "").strip().replace("<br/>", "\n\n"),
                        authors=lines[6].replace("authors:", "").strip(),
                    )
                )
                
            # Sort modals by date
            modals = sorted(modals, key=(lambda x: x.date), reverse=True)
            return {"response": modals}
        else:
            tags = os.listdir(f"{os.getcwd()}/content/{subsection_name.lower()}")
            tags = [tag for tag in tags if ".md" not in tag]
            response = {"response": []}
            for tag in tags:
                if tag != ".DS_Store":
                    content_ids = [content.replace(".md", "") for content in os.listdir(f"{os.getcwd()}/content/{subsection_name.lower()}/{tag}")]
                    content_ids = [{content_id: (await get_content_title_and_authors(content_id))["response"]} for content_id in content_ids]
                    response["response"].append(Modal(
                        title=tag,
                        tags=[],
                        content_ids=content_ids
                    ))
            return response

    return None


def read_markdown_file(file_name: str):
    folders = []
    for folder in os.listdir(f"{os.getcwd()}/content"):
        if ".md" not in folder:
            folders.append(folder)

    for folder in folders:
        for sub_folder in os.listdir(f"{os.getcwd()}/content/{folder}"):
            temp_file_name = file_name if ".md" in file_name else f"{file_name}.md"
            if sub_folder == temp_file_name:
                print(f"Found file: {sub_folder}")  # Debugging output
                with open(
                    f"{os.getcwd()}/content/{folder}/{temp_file_name}", "r", encoding="utf-8"
                ) as file:
                    content = file.read()
                    print(f"File content: {content[:100]}")  # Print first 100 characters for inspection
                    return content
            if os.path.isdir(f"{os.getcwd()}/content/{folder}/{sub_folder}"):
                if ".md" not in sub_folder:
                    for file in os.listdir(f"{os.getcwd()}/content/{folder}/{sub_folder}"):
                        if file_name in file:
                            print(f"Found file in subdirectory: {file}")
                            with open(
                                f"{os.getcwd()}/content/{folder}/{sub_folder}/{file_name}.md",
                                "r",
                                encoding="utf-8",
                            ) as file:
                                content = file.read()
                                print(f"File content from subdirectory: {content[:100]}")  # Print first 100 characters
                                return content
    print(f"File {file_name} not found")  # If no match found
    return None


def read_image_to_bytes(file_name: str):
    with Image.open(f"{os.getcwd()}/img/article_content/{file_name}.png") as img:
        img_byte_arr = io.BytesIO()
        img.save(img_byte_arr, format=img.format)
        img_bytes = img_byte_arr.getvalue()

        return img_bytes


def calculate_reading_speed(
    text: str, words_per_minute: int = 300, content_type: str = "md"
) -> int:
    words = text.split()
    num_words = len(words)
    reading_time = num_words / words_per_minute
    return math.ceil(reading_time)


def calculate_pages(
    text: str, words_per_length: int = 250, content_type: str = "md"
) -> int:
    if content_type == "pdf":
        markdown = text.split("\n")
        pages = int(markdown[0].replace("pages:", "").strip())
        return math.ceil(pages)

    img_count = text.count("<img")
    words = text.split()
    num_words = len(words)
    pages = num_words / words_per_length + (img_count * 0.5)
    return math.ceil(pages)
