import os
from fastapi import FastAPI, APIRouter
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse
from fastapi.middleware.cors import CORSMiddleware

from api.api import router as api_router
from mangum import Mangum

app = FastAPI()

router = APIRouter()

# Path to the React build directory
path_static = "pages/build"

# Mount the static files directory
app.mount(
    "/static", StaticFiles(directory=os.path.join(path_static, "static")), name="static"
)

# Add CORS middleware if your React app and API are served from different origins
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Adjust this as needed for your security requirements
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# Serve the index.html for the base route and all other routes
@router.get("/{full_path:path}")
async def serve_index(full_path: str):
    if full_path != "":
        if full_path == "library" or full_path == "learning-tree":
            file_path = os.path.join(path_static, "index.html")
        elif not os.path.exists(f"./{full_path}"):
            return None
        else:
            file_path = full_path
        return FileResponse(file_path)
    return FileResponse("index.html")


# Include the API router
app.include_router(api_router, prefix="/api/v1")
app.include_router(router)

# Handler for deployment
handler = Mangum(app)
