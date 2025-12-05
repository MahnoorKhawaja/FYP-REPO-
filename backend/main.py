from fastapi import FastAPI, File, UploadFile, Form
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from typing import Dict
import os
import shutil
import subprocess
import uuid

def generate_3d_obj(image_path):
    """
    Runs 3DDFA_V2 pipeline on an input image to produce .obj and uv_tex.jpg
    """

    # 1️⃣ Make sure the image exists
    if not os.path.exists(image_path):
        raise FileNotFoundError(f"Image not found: {image_path}")
    
    win_results_dir = "/mnt/c/Amal/FYP_REPO/FYP-REPO-/m-frontend-rhino/public/results"
    os.makedirs(win_results_dir, exist_ok=True)

    # 2️⃣ Generate unique filename
    image_name = f"{uuid.uuid4().hex}.jpg"
    input_dir = os.path.expanduser("~/3DDFA_V2/examples/inputs")
    os.makedirs(input_dir, exist_ok=True)

    # Copy or rename to inputs folder
    new_image_path = os.path.join(input_dir, image_name)
    subprocess.run(["cp", image_path, new_image_path], check=True)

    # 3️⃣ Define working directory
    work_dir = os.path.expanduser("~/3DDFA_V2")

    # 4️⃣ Activate virtual environment and run demo twice (obj + uv_tex)
    commands = [
        f"source venv/bin/activate && python3 demo.py -f examples/inputs/{image_name} -o obj --onnx",
        f"source venv/bin/activate && python3 demo.py -f examples/inputs/{image_name} -o uv_tex --onnx"
    ]

    for cmd in commands:
        subprocess.run(cmd, cwd=work_dir, shell=True, executable="/bin/bash", check=True)

    # 5️⃣ Return result paths
    results_dir = os.path.join(work_dir, "examples")
    results_dir = os.path.join(results_dir, "results")
    for file in os.listdir(results_dir):
        if file.startswith(os.path.splitext(image_name)[0]):
            subprocess.run(["cp", os.path.join(results_dir, file), win_results_dir], check=True)

    obj_file = os.path.join(win_results_dir, f"{os.path.splitext(image_name)[0]}.obj")

    return obj_file
    



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
    print(saved_files)   
    result = generate_3d_obj(r"/mnt/c/Amal/FYP_REPO/FYP-REPO-/backend" + "/" + saved_files['front'])
    print(result)
    filename = result.split('/')[-1]
    print(filename)
    
    return {
        "message": "Images uploaded successfully",
        "saved_files": saved_files,
        "3d_results": filename
    }


