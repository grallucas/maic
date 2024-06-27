from fastapi import FastAPI

from api.api import router as api_router
from mangum import Mangum

app = FastAPI()


@app.get("/")
async def root():
    return {"status": "OK"}


app.include_router(api_router, prefix="/api/v1")
handler = Mangum(app)
