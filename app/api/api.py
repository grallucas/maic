from fastapi import APIRouter

from .routers import library, learning_tree

router = APIRouter()

router.include_router(library.router, prefix="/library", tags=["Library"])
router.include_router(
    learning_tree.router, prefix="/learning-tree", tags=["Learning Tree"]
)
