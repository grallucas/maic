import os
from fastapi import FastAPI
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse
from fastapi.middleware.cors import CORSMiddleware

from api.api import router as api_router
from mangum import Mangum

app = FastAPI()

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
@app.get("/{full_path:path}")
async def serve_index(full_path: str = ""):
    file_path = os.path.join(path_static, "index.html")
    return FileResponse(file_path)


# Include the API router
app.include_router(api_router, prefix="/api/v1")

# Handler for deployment
handler = Mangum(app)
