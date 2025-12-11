from fastapi import FastAPI, File, UploadFile, Form
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from typing import Dict
import os
import shutil
import subprocess
import uuid
import cv2
import glob
import numpy as np
import math
import torch
import mediapipe as mp
import torch.nn as nn
INPUT_FEATURES = 42
NUM_CLASSES = 4
NUM_TASKS = 12
OUTPUT_FEATURES = NUM_TASKS * NUM_CLASSES

BATCH_SIZE = 16
EPOCHS = 200
LR = 0.001

device = "cuda" if torch.cuda.is_available() else "cpu"


# =====================================================
# 1. Load scaler + trained model
# =====================================================

scaler_mean = np.load(r"/mnt/c/Amal/FYP_REPO/FYP-REPO-/backend/scaler_mean.npy")          # shape: (42,)
scaler_scale = np.load(r"/mnt/c/Amal/FYP_REPO/FYP-REPO-/backend/scaler_scale.npy") 

class NoseScoreClassifier(nn.Module):
    def __init__(self):
        super().__init__()

        self.backbone = nn.Sequential(
            nn.Linear(INPUT_FEATURES, 64),
            nn.ReLU(),
            nn.Linear(64, 128),
            nn.ReLU(),
            nn.Linear(128, 64),
            nn.ReLU(),
        )

        # 12 output heads
        self.heads = nn.ModuleList(
            [nn.Linear(64, NUM_CLASSES) for _ in range(NUM_TASKS)]
        )

        self.apply(self._init_weights)

    def _init_weights(self, m):
        if isinstance(m, nn.Linear):
            nn.init.kaiming_normal_(m.weight)
            nn.init.zeros_(m.bias)

    def forward(self, x):
        shared = self.backbone(x)

        outputs = []
        for head in self.heads:
            outputs.append(head(shared))

        return outputs  

model = NoseScoreClassifier()
model.load_state_dict(torch.load(r"/mnt/c/Amal/FYP_REPO/FYP-REPO-/backend/nose_classification_model.pth", map_location="cpu"))
model.eval()

# ---------------------------
# MediaPipe Setup
# ---------------------------
mp_face_mesh = mp.solutions.face_mesh
face_mesh = mp_face_mesh.FaceMesh(static_image_mode=True, max_num_faces=1, refine_landmarks=True)

# ---------------------------
# Landmark Mapping
# ---------------------------
landmarks_to_index = {
    1: 168, 2: 4, 3: 94, 4: 115, 5: 279, 6: 59, 7: 439,
    8: 60, 9: 290, 10: 0, 11: 9, 12: 362, 13: 133, 14: 454, 15: 234
}

labelnum_to_name = {
    1: "N", 2: "Prn", 3: "Sn", 4: "Al_R", 5: "Al_L", 6: "Ac_R", 7: "Ac_L",
    8: "Sbal_R", 9: "Sbal_L", 10: "Ls", 11: "G", 12: "En_R", 13: "En_L",
    14: "Tr_R", 15: "Tr_L"
}

# ---------------------------
# Helper Functions
# ---------------------------
def point_from_landmark(landmark, img_w, img_h):
    return np.array([landmark.x * img_w, landmark.y * img_h], dtype=float)

def dist(a, b):
    return float(np.linalg.norm(a - b))

def angle_between(u, v):
    u = np.array(u, dtype=float)
    v = np.array(v, dtype=float)
    nu, nv = np.linalg.norm(u), np.linalg.norm(v)
    if nu == 0 or nv == 0:
        return float("nan")
    cosang = np.dot(u, v) / (nu * nv)
    cosang = np.clip(cosang, -1.0, 1.0)
    return float(math.degrees(math.acos(cosang)))

def midpoint(a, b):
    return (a + b) / 2.0

def compute_features(pts):
    """Compute 12 nasal geometry features from landmarks."""
    def p(name): return pts.get(name, None)
    Sbalmid = midpoint(p("Sbal_R"), p("Sbal_L")) if p("Sbal_R") is not None and p("Sbal_L") is not None else None
    out = {}

    try: out["Nasofrontal_angle_deg"] = angle_between(p("G") - p("N"), p("Prn") - p("N"))
    except: out["Nasofrontal_angle_deg"] = float("nan")

    try: out["Nasolabial_angle_deg"] = angle_between(p("Sn") - p("Ls"), Sbalmid - p("Sn")) if Sbalmid is not None else float("nan")
    except: out["Nasolabial_angle_deg"] = float("nan")

    try: out["Nasal_tip_angle_deg"] = angle_between(p("Ac_L") - p("Prn"), p("Ac_R") - p("Prn"))
    except: out["Nasal_tip_angle_deg"] = float("nan")

    try: out["Dorsal_angle_deg"] = angle_between(p("G") - p("N"), p("Prn") - p("N"))
    except: out["Dorsal_angle_deg"] = float("nan")

    try: out["Columellar_angle_deg"] = angle_between(p("Sn") - p("Prn"), Sbalmid - p("Sn")) if Sbalmid is not None else float("nan")
    except: out["Columellar_angle_deg"] = float("nan")

    try: out["Alar_base_width_px"] = dist(p("Al_L"), p("Al_R"))
    except: out["Alar_base_width_px"] = float("nan")

    try: out["Interalar_angle_deg"] = angle_between(p("Ac_L") - p("Prn"), p("Ac_R") - p("Prn"))
    except: out["Interalar_angle_deg"] = float("nan")

    try:
        denom = dist(p("N"), p("Sn"))
        out["Projection_ratio"] = dist(p("N"), p("Prn")) / denom if denom != 0 else float("nan")
    except: out["Projection_ratio"] = float("nan")

    try:
        denom = dist(p("Al_L"), p("Al_R"))
        out["Tip_projection_index"] = dist(p("Prn"), p("Sn")) / denom if denom != 0 else float("nan")
    except: out["Tip_projection_index"] = float("nan")

    try: out["Nasal_dorsum_angle_deg"] = angle_between(p("N") - p("Prn"), p("Sn") - p("Prn"))
    except: out["Nasal_dorsum_angle_deg"] = float("nan")

    try:
        denom = dist(p("N"), p("Sn"))
        out["Nasal_width_index"] = dist(p("Al_L"), p("Al_R")) / denom if denom != 0 else float("nan")
    except: out["Nasal_width_index"] = float("nan")

    try:
        denom = dist(p("Al_L"), p("Al_R"))
        out["Nasal_height_ratio"] = dist(p("G"), p("Sn")) / denom if denom != 0 else float("nan")
    except: out["Nasal_height_ratio"] = float("nan")

    return out



# =====================================================
# 2. Feature Extraction (output = 42-dim vector)
# =====================================================
def extract_42_features(img):
    """
    Extract the full 42 handcrafted nasal features using Mediapipe.
    Reuses the same 15 key landmarks and geometry functions from your pipeline.
    Returns a 42-length numpy vector.
    """
    img = cv2.imread(img) 
    h, w = img.shape[:2]
    rgb = cv2.cvtColor(img, cv2.COLOR_BGR2RGB)
    results = face_mesh.process(rgb)

    # Initialize landmark dict
    pts = {name: None for name in labelnum_to_name.values()}

    if results.multi_face_landmarks:
        lmset = results.multi_face_landmarks[0]
        for num, mp_idx in landmarks_to_index.items():
            name = labelnum_to_name[num]
            try:
                lm = lmset.landmark[mp_idx]
                pts[name] = point_from_landmark(lm, w, h)
            except:
                pts[name] = None

    # ------------------------------
    # Compute your existing 12 features
    # ------------------------------
    f12 = compute_features(pts)

    # ------------------------------
    # Additional handcrafted features
    # ------------------------------
    feat_list = []

    def safe_dist(a, b):
        if a is None or b is None:
            return 0.0
        return dist(a, b)

    def safe_ang(a, b, c):
        """Angle at point b formed by (a-b) and (c-b)."""
        if a is None or b is None or c is None:
            return 0.0
        return angle_between(a - b, c - b)

    # === 1. Distances (10 features) ===
    feat_list += [
        safe_dist(pts["N"], pts["Prn"]),
        safe_dist(pts["Prn"], pts["Sn"]),
        safe_dist(pts["Al_L"], pts["Al_R"]),
        safe_dist(pts["Ac_L"], pts["Prn"]),
        safe_dist(pts["Ac_R"], pts["Prn"]),
        safe_dist(pts["Sbal_L"], pts["Sbal_R"]),
        safe_dist(pts["G"], pts["N"]),
        safe_dist(pts["G"], pts["Prn"]),
        safe_dist(pts["N"], pts["Sn"]),
        safe_dist(pts["Prn"], pts["Ls"])
    ]

    # === 2. Angles (8 features) ===
    feat_list += [
        safe_ang(pts["G"], pts["N"], pts["Prn"]),
        safe_ang(pts["N"], pts["Prn"], pts["Sn"]),
        safe_ang(pts["Al_L"], pts["Prn"], pts["Al_R"]),
        safe_ang(pts["Ac_L"], pts["Prn"], pts["Ac_R"]),
        safe_ang(pts["Sbal_L"], pts["Sn"], pts["Sbal_R"]),
        safe_ang(pts["G"], pts["Prn"], pts["Sn"]),
        safe_ang(pts["G"], pts["Sn"], pts["Prn"]),
        safe_ang(pts["N"], pts["Sn"], pts["Prn"])
    ]

    # === 3. Ratios (6 features) ===
    denom1 = safe_dist(pts["N"], pts["Sn"])
    denom2 = safe_dist(pts["Al_L"], pts["Al_R"])
    denom3 = safe_dist(pts["G"], pts["Sn"])

    feat_list += [
        safe_dist(pts["N"], pts["Prn"]) / (denom1 + 1e-6),
        safe_dist(pts["Prn"], pts["Sn"]) / (denom2 + 1e-6),
        safe_dist(pts["G"], pts["Prn"]) / (denom3 + 1e-6),
        safe_dist(pts["G"], pts["N"]) / (denom3 + 1e-6),
        safe_dist(pts["Sbal_L"], pts["Sbal_R"]) / (denom2 + 1e-6),
        safe_dist(pts["Ac_L"], pts["Ac_R"]) / (denom2 + 1e-6)
    ]

    # === 4. Symmetry features (6 features) ===
    def sym(a, b, center):
        if a is None or b is None or center is None:
            return 0.0
        return abs(dist(a, center) - dist(b, center))

    mid_N_Prn = None
    if pts["N"] is not None and pts["Prn"] is not None:
        mid_N_Prn = midpoint(pts["N"], pts["Prn"])

    feat_list += [
        sym(pts["Al_L"], pts["Al_R"], pts["N"]),
        sym(pts["Ac_L"], pts["Ac_R"], pts["Prn"]),
        sym(pts["Sbal_L"], pts["Sbal_R"], pts["Sn"]),
        sym(pts["En_L"], pts["En_R"], pts["G"]),
        sym(pts["Tr_L"], pts["Tr_R"], mid_N_Prn),
        sym(pts["Ac_L"], pts["Ac_R"], pts["Sn"])
    ]

    # === 5. Add your 12 existing features ===
    for k in [
        "Nasofrontal_angle_deg", "Dorsal_angle_deg", "Nasal_dorsum_angle_deg",
        "Nasolabial_angle_deg", "Columellar_angle_deg",
        "Nasal_tip_angle_deg", "Interalar_angle_deg",
        "Alar_base_width_px", "Nasal_width_index", "Nasal_height_ratio",
        "Projection_ratio", "Tip_projection_index"
    ]:
        feat_list.append(float(f12.get(k, 0.0)))

    # ------------------------------
    # Guarantee vector length = 42
    # ------------------------------
    while len(feat_list) < 42:
        feat_list.append(0.0)

    return np.array(feat_list[:42], dtype=np.float32)

# =====================================================
# 3. Full Prediction Pipeline
# =====================================================

def predict_scores(img):
    # Step 1: extract handcrafted features
    features = extract_42_features(img)

    # Step 2: apply manual scaling
    features_scaled = (features - scaler_mean) / scaler_scale

    # Step 3: convert to tensor
    x = torch.tensor(features_scaled, dtype=torch.float32).unsqueeze(0)

    final_scores = []

    # Step 4: predict
    with torch.no_grad():
        outputs = model(x)  # list of 12 tensors, each (1, 4)

        for out in outputs:
            probs = torch.softmax(out, dim=1)   # (1, 4)
            pred_class = torch.argmax(probs, dim=1).item()  # 0–3
            final_scores.append(pred_class + 1)  # → 1–4
    print(final_scores)

    return final_scores  # length = 12


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
    scores = predict_scores(r"/mnt/c/Amal/FYP_REPO/FYP-REPO-/backend" + "/" + saved_files['front'])
    filename = result.split('/')[-1]
    print(filename)

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

@app.post("/api/upload_comparison")
async def upload_comparison(
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
        # 1️⃣ Save all uploaded files
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
        # 2️⃣ Predict nose scores
        # -----------------------------
        pre_scores = predict_scores(r"/mnt/c/Amal/FYP_REPO/FYP-REPO-/backend" + "/" + saved_files['front'])
        post_scores = predict_scores(r"/mnt/c/Amal/FYP_REPO/FYP-REPO-/backend" + "/" + saved_files['post_front'])

        # -----------------------------
        # 3️⃣ Generate 3D OBJ 
        # -----------------------------
        obj_file_path = generate_3d_obj(saved_files["front"])
        obj_filename = os.path.basename(obj_file_path)

        obj_file_path1 = generate_3d_obj(saved_files["post_front"])
        obj_filename1 = os.path.basename(obj_file_path1)

        # -----------------------------
        # 4️⃣ Cleanup uploaded files
        # -----------------------------
        for f in glob.glob(os.path.join(UPLOAD_DIR, "*")):
            try:
                os.remove(f)
            except Exception as e:
                print("Failed to delete:", f, e)

        # -----------------------------
        # 5️⃣ Return structured response
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
