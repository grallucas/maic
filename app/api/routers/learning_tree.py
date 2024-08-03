from fastapi import APIRouter
import sys
import os

sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '../../..')))
from learning_tree.backend import LearningTree

router = APIRouter()


@router.get("/", description="Learning Tree nodes")
async def get_learning_tree():
    return {"reponse": LearningTree("learning_tree\\learning-tree-nodes").to_dict()}
