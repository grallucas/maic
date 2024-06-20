from fastapi import APIRouter
from ..modules.modules import ArticleCard

router = APIRouter()


@router.get("/")
async def get_learning_tree():
    nodes = [
        ArticleCard(
            title="title1",
            description="description1",
            image="image1",
            category="category1",
            child_id=3,
            parent_id=1,
            node_id=2,
            highlighted_path=False,
        ).to_dict(),
        ArticleCard(
            title="title2",
            description="description2",
            image="image2",
            category="category2",
            child_id=4,
            parent_id=2,
            node_id=3,
            highlighted_path=False,
        ).to_dict(),
    ]

    return {"response": {"root_id": 1, "nodes": nodes}}


@router.get("/catagory_colors")
async def catagory_colors():
    return {"response": {"rosie": "red", "theory": "green"}}
