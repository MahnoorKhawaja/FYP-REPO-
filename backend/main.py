from fastapi import FastAPI, File, UploadFile, Form
from fastapi.middleware.cors import CORSMiddleware
from typing import Dict
import os
import shutil

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

UPLOAD_DIR = "uploads"
os.makedirs(UPLOAD_DIR, exist_ok=True)

@app.post("/api/upload")
async def upload_images(
    front: UploadFile = File(...),
    left: UploadFile = File(...),
    right: UploadFile = File(...),
    basal: UploadFile = File(...),
):
    saved_files: Dict[str, str] = {}

    for name, file in [("front", front), ("left", left), ("right", right), ("basal", basal)]:
        file_path = os.path.join(UPLOAD_DIR, file.filename or f"{name}.jpg")
        with open(file_path, "wb") as buffer:
            shutil.copyfileobj(file.file, buffer)
        saved_files[name] = file_path

    # Later: run 3DDFA_V2 pipeline here
    # output = process_images(saved_files)

    return {
        "message": "Images uploaded successfully",
        "saved_files": saved_files
    }
