from fastapi import APIRouter
from backend import LearningTree

router = APIRouter()


@router.get("/", description="Learning Tree nodes")
async def get_learning_tree():
    return {"reponse": LearningTree("content\\learning-tree-nodes").to_dict()}
