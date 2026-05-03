from fastapi import FastAPI, File, UploadFile, Form
from fastapi.middleware.cors import CORSMiddleware
from score_calculation.frontal_score import get_nose_coords
from score_calculation.basal_scores import basal_scores
from score_calculation.saddle_hump import get_nose_saddle_hump
from score_calculation.tip_rot_proj import get_tip_rotation_score,get_tip_projection_score
from score_calculation.radix import get_radix_score
from score_calculation.nasal_length import get_nasal_length_score
from typing import Dict
import os
import shutil
import subprocess
import uuid
import glob
from bson import ObjectId
from datetime import datetime
from db.connection import patients_collection


# =====================================================
# Full Prediction Pipeline using Heuristic Features 
# =====================================================

def predict_scores(img_front,img_right=None,img_left=None,img_basal=None):
   
   #dorsal hump and width scores from frontal image
    d,w = get_nose_coords(img_front)
    print('Dorsal Hump Score:', d, 'Width Score:', w)

    #basal scores from basal image
    alar_flaring,tip_lobule,tip_shape = basal_scores(img_basal)
    print('Basal Scores:', alar_flaring, tip_lobule, tip_shape)

    #saddle and hump scores from lateral image
    saddle_score, hump_score = get_nose_saddle_hump(img_left)
    print('Saddle Score:', saddle_score, 'Hump Score:', hump_score)
    

    #tip rotation and projection scores from lateral image
    tip_rotation = get_tip_rotation_score(img_left,tip_lobule_score=tip_lobule)
    tip_projection = get_tip_projection_score(img_left,tip_lobule_score=tip_lobule)
    print('Tip Rotation:', tip_rotation, 'Tip Projection:', tip_projection)

    #radix score from lateral image
    radix_score = get_radix_score(img_left)
    print('Radix Score:', radix_score)

    #nasal length score from lateral image
    nasal_length_score = get_nasal_length_score(img_front,radix_score=radix_score)
    print('Nasal Length Score:', nasal_length_score)

    final_scores = [d, w, tip_shape, saddle_score, hump_score, nasal_length_score,radix_score,4,tip_projection,tip_rotation,alar_flaring,tip_lobule]
   
    print(final_scores)

    return final_scores  # length = 12


def generate_3d_obj(image_path):
    """
    Runs 3DDFA_V2 pipeline on an input image to produce .obj and uv_tex.jpg
    """

    # Make sure the image exists
    if not os.path.exists(image_path):
        raise FileNotFoundError(f"Image not found: {image_path}")
    
    win_results_dir = "/mnt/c/Amal/FYP_REPO/FYP-REPO-/m-frontend-rhino/public/results"
    os.makedirs(win_results_dir, exist_ok=True)

    # Generate unique filename
    image_name = f"{uuid.uuid4().hex}.jpg"
    input_dir = os.path.expanduser("~/3DDFA_V2/examples/inputs")
    os.makedirs(input_dir, exist_ok=True)

    # Copy or rename to inputs folder
    new_image_path = os.path.join(input_dir, image_name)
    subprocess.run(["cp", image_path, new_image_path], check=True)

    # Define working directory
    work_dir = os.path.expanduser("~/3DDFA_V2")

    # Activate virtual environment and run demo twice (obj + uv_tex)
    commands = [
        f"source venv/bin/activate && python3 demo.py -f examples/inputs/{image_name} -o obj --onnx",
        f"source venv/bin/activate && python3 demo.py -f examples/inputs/{image_name} -o uv_tex --onnx"
    ]

    for cmd in commands:
        subprocess.run(cmd, cwd=work_dir, shell=True, executable="/bin/bash", check=True)

    # Return result paths
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

print("APP STARTED")

@app.get("/")
def root():
    print("ROOT HIT")
    return {"status": "ok"}

@app.post("/api/upload/{patient_id}")
async def upload_images(
    patient_id: str,
    front: UploadFile = File(...),
    left: UploadFile = File(...),
    right: UploadFile = File(...),
    basal: UploadFile = File(...),
):
    saved_files: Dict[str, str] = {}
    print(patient_id)

    for name, file in [("front", front), ("left", left), ("right", right), ("basal", basal)]:
        file_path = os.path.join(UPLOAD_DIR, file.filename or f"{name}.jpg")
        with open(file_path, "wb") as buffer:
            shutil.copyfileobj(file.file, buffer)
        saved_files[name] = file_path
    print(saved_files)   
    result = generate_3d_obj(r"/mnt/c/Amal/FYP_REPO/FYP-REPO-/backend" + "/" + saved_files['front'])
    print(result)
    scores = predict_scores(r"/mnt/c/Amal/FYP_REPO/FYP-REPO-/backend" + "/" + saved_files['front'],r"/mnt/c/Amal/FYP_REPO/FYP-REPO-/backend" + "/" + saved_files['right'],r"/mnt/c/Amal/FYP_REPO/FYP-REPO-/backend" + "/" + saved_files['left'],r"/mnt/c/Amal/FYP_REPO/FYP-REPO-/backend" + "/" + saved_files['basal'])
    filename = result.split('/')[-1]
    print(filename)

    # =============================
    # SAVE RESULT TO MONGODB
    # =============================

    result_data = {
        "scores": scores,
        "obj_file": filename,   
        "images": {
            "front": saved_files["front"],
            "left": saved_files["left"],
            "right": saved_files["right"],
            "basal": saved_files["basal"],
        },
        "created_at": datetime.utcnow()
    }

    await patients_collection.update_one(
        {"_id": ObjectId(patient_id)},
        {"$set": {"preop": result_data}}
    )

     # =============================
    # DELETE ALL FILES IN UPLOAD_DIR
    # =============================
    
    for f in glob.glob(os.path.join(UPLOAD_DIR, "*")):
        try:
            os.remove(f)
        except Exception as e:
            print("Failed to delete:", f, e)
    
    return {
        "message": "Images uploaded successfully",
        "saved_files": saved_files,
        "3d_results": filename,
        "nose_scores": scores
    }


# ------------------------------
# Helper to save uploaded files
# ------------------------------
def save_uploaded_files(files: Dict[str, UploadFile]) -> Dict[str, str]:
    saved_files = {}
    for name, file in files.items():
        file_path = os.path.join(UPLOAD_DIR, file.filename or f"{name}.jpg")
        with open(file_path, "wb") as buffer:
            shutil.copyfileobj(file.file, buffer)
        saved_files[name] = file_path
    return saved_files

#-----------------------------------------------------------------------

@app.post("/api/upload_comparison/{patient_id}")
async def upload_comparison(
    patient_id: str,
    front: UploadFile = File(...),
    left: UploadFile = File(...),
    right: UploadFile = File(...),
    basal: UploadFile = File(...),
    post_front: UploadFile = File(...),
    post_left: UploadFile = File(...),
    post_right: UploadFile = File(...),
    post_basal: UploadFile = File(...),
):
    """
    Accepts 8 images:
      - Pre-Op: front, left, right, basal
      - Post-Op: post_front, post_left, post_right, post_basal
    Returns:
      - nose scores for pre-op and post-op
      - 3D OBJ filename (generated only for first pre-op image)
    """

    try:
        # -----------------------------
        # Save all uploaded files
        # -----------------------------
        files_dict = {
            "front": front,
            "left": left,
            "right": right,
            "basal": basal,
            "post_front": post_front,
            "post_left": post_left,
            "post_right": post_right,
            "post_basal": post_basal,
        }
        saved_files = save_uploaded_files(files_dict)

        # -----------------------------
        # Predict nose scores
        # -----------------------------
        pre_scores = predict_scores(r"/mnt/c/Amal/FYP_REPO/FYP-REPO-/backend" + "/" + saved_files['front'],r"/mnt/c/Amal/FYP_REPO/FYP-REPO-/backend" + "/" + saved_files['right'],r"/mnt/c/Amal/FYP_REPO/FYP-REPO-/backend" + "/" + saved_files['left'],r"/mnt/c/Amal/FYP_REPO/FYP-REPO-/backend" + "/" + saved_files['basal'])
        post_scores = predict_scores(r"/mnt/c/Amal/FYP_REPO/FYP-REPO-/backend" + "/" + saved_files['post_front'],r"/mnt/c/Amal/FYP_REPO/FYP-REPO-/backend" + "/" + saved_files['post_right'],r"/mnt/c/Amal/FYP_REPO/FYP-REPO-/backend" + "/" + saved_files['post_left'],r"/mnt/c/Amal/FYP_REPO/FYP-REPO-/backend" + "/" + saved_files['post_basal'])
        # -----------------------------
        # Generate 3D OBJ 
        # -----------------------------
        obj_file_path = generate_3d_obj(saved_files["front"])
        obj_filename = os.path.basename(obj_file_path)

        obj_file_path1 = generate_3d_obj(saved_files["post_front"])
        obj_filename1 = os.path.basename(obj_file_path1)

        result_data = {
            "preop": {
                "scores": pre_scores,
                "obj_file": obj_filename,
                "images": {
                    "front": saved_files["front"],
                    "left": saved_files["left"],
                    "right": saved_files["right"],
                    "basal": saved_files["basal"],
                }
            },
            "postop": {
                "scores": post_scores,
                "obj_file": obj_filename1,
                "images": {
                    "front": saved_files["post_front"],
                    "left": saved_files["post_left"],
                    "right": saved_files["post_right"],
                    "basal": saved_files["post_basal"],
                }
            }
        }

        await patients_collection.update_one(
            {"_id": ObjectId(patient_id)},
            {
                "$set": {
                    "comparison": result_data
                }
            }
        )

        # -----------------------------
        # Cleanup uploaded files
        # -----------------------------
        for f in glob.glob(os.path.join(UPLOAD_DIR, "*")):
            try:
                os.remove(f)
            except Exception as e:
                print("Failed to delete:", f, e)

        

        # -----------------------------
        # Return structured response
        # -----------------------------
        return {
            "message": "Pre & Post images processed successfully",
            "3d_results_pre": obj_filename,
            "3d_results_post": obj_filename1,
            "nose_scores": {
                "pre": pre_scores,   
                "post": post_scores   
            }
        }

    except Exception as e:
        return {"error": str(e)}


from pydantic import BaseModel
import google.generativeai as genai
import os
from typing import Optional

genai.configure(api_key='API KEY')

class Feature(BaseModel):
    name: str
    score: Optional[float] = None
    preScore: Optional[float] = None
    postScore: Optional[float] = None

class RequestData(BaseModel):
    features: list[Feature]
    mode: str

@app.post("/analyze-nose")
async def analyze_nose(data: RequestData):

    if data.mode == "comparison":
        feature_text = "\n".join([
            f"{f.name}: Before={f.preScore}, After={f.postScore}, Change={(f.postScore or 0) - (f.preScore or 0)}"
            for f in data.features
        ])

        prompt = f"""
You are a facial aesthetics expert.

Nasal feature comparison:
{feature_text}

Task:
- Evaluate surgical improvement
- Highlight successful corrections
- Point out remaining issues
- Keep each point one line, concise, surgeon-focused
"""

    else:  # preop
        feature_text = "\n".join([
            f"{f.name}: {f.score}"
            for f in data.features
        ])

        prompt = f"""
You are a facial aesthetics expert.

Nasal feature scores:
{feature_text}

Task:
- Suggest pre-operative improvements
- Keep each point one line, actionable
"""

    model = genai.GenerativeModel("gemini-2.5-flash")
    response = model.generate_content(prompt)

    return {"analysis": response.text}


class Patient(BaseModel):
    name: str
    age: int
    gender: str
    notes: str
    surgeon_id: str

@app.post("/patients")
async def create_patient(patient: Patient):
    data = patient.dict()
    data["created_at"] = datetime.utcnow()

    result = await patients_collection.insert_one(data)

    return {
        "_id": str(result.inserted_id)
    }

from fastapi import Query

@app.get("/patients_list")
async def get_patients(surgeon_id: str = Query(None)):

    query = {}

    if surgeon_id:
        query["surgeon_id"] = surgeon_id

    patients = await patients_collection.find(query).to_list(100)

    for p in patients:
        p["_id"] = str(p["_id"])

    return patients


@app.get("/patients_details")
async def get_patients(patient_id: str = Query(None)):

    query = {}

    if patient_id:
        query["_id"] = ObjectId(patient_id)

    patient = await patients_collection.find_one(query)

    if patient:
        patient["_id"] = str(patient["_id"])
        patient["name"] = str(patient["name"])
        patient["age"] = str(patient["age"])
        patient["gender"] = str(patient["gender"])
        patient["notes"] = str(patient["notes"])
    print(patient)
    print(f"Returning patient for ID {patient_id}: {patient}") 
    if patient:
      return patient 

    return {"error": "Patient not found"}
