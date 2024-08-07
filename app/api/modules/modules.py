from pydantic import BaseModel
from typing import List
from fastapi import UploadFile, File


class SearchContent(BaseModel):
    """Contract model to search content"""

    query: str


class SubmitContent(BaseModel):
    """Contract model to submit content"""

    content: UploadFile = File(...)
    submitter_email: str


class Modal(BaseModel):
    """Contract model to return a modal to the frontend"""

    title: str
    tags: List[str]
    content_ids: List[str]
    decorative: bool = False

    def to_dict(self):
        return {"title": self.title, "tags": self.tags, "content_ids": self.content_ids, "decorative": self.decorative}


class ArticleCard(BaseModel):
    """Contract model to return an article card to the frontend"""

    title: str
    description: str
    image: str
    category: str
    child_id: int
    parent_id: int
    node_id: int
    highlighted_path: bool

    def to_dict(self):
        return {
            "title": self.title,
            "description": self.description,
            "image": self.image,
            "category": self.category,
            "child_id": self.child_id,
            "parend_id": self.parent_id,
            "node_id": self.node_id,
            "hightlighted_path": self.highlighted_path,
        }
