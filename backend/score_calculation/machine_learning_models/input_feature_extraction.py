
# # ---------------------------
# # MediaPipe Setup
# # ---------------------------
# mp_face_mesh = mp.solutions.face_mesh
# face_mesh = mp_face_mesh.FaceMesh(static_image_mode=True, max_num_faces=1, refine_landmarks=True)

# # ---------------------------
# # Landmark Mapping
# # ---------------------------
# landmarks_to_index = {
#     1: 168, 2: 4, 3: 94, 4: 115, 5: 279, 6: 59, 7: 439,
#     8: 60, 9: 290, 10: 0, 11: 9, 12: 362, 13: 133, 14: 454, 15: 234
# }

# labelnum_to_name = {
#     1: "N", 2: "Prn", 3: "Sn", 4: "Al_R", 5: "Al_L", 6: "Ac_R", 7: "Ac_L",
#     8: "Sbal_R", 9: "Sbal_L", 10: "Ls", 11: "G", 12: "En_R", 13: "En_L",
#     14: "Tr_R", 15: "Tr_L"
# }

# # ---------------------------
# # Helper Functions
# # ---------------------------
# def point_from_landmark(landmark, img_w, img_h):
#     return np.array([landmark.x * img_w, landmark.y * img_h], dtype=float)

# def dist(a, b):
#     return float(np.linalg.norm(a - b))

# def angle_between(u, v):
#     u = np.array(u, dtype=float)
#     v = np.array(v, dtype=float)
#     nu, nv = np.linalg.norm(u), np.linalg.norm(v)
#     if nu == 0 or nv == 0:
#         return float("nan")
#     cosang = np.dot(u, v) / (nu * nv)
#     cosang = np.clip(cosang, -1.0, 1.0)
#     return float(math.degrees(math.acos(cosang)))

# def midpoint(a, b):
#     return (a + b) / 2.0

# def compute_features(pts):
#     """Compute 12 nasal geometry features from landmarks."""
#     def p(name): return pts.get(name, None)
#     Sbalmid = midpoint(p("Sbal_R"), p("Sbal_L")) if p("Sbal_R") is not None and p("Sbal_L") is not None else None
#     out = {}

#     try: out["Nasofrontal_angle_deg"] = angle_between(p("G") - p("N"), p("Prn") - p("N"))
#     except: out["Nasofrontal_angle_deg"] = float("nan")

#     try: out["Nasolabial_angle_deg"] = angle_between(p("Sn") - p("Ls"), Sbalmid - p("Sn")) if Sbalmid is not None else float("nan")
#     except: out["Nasolabial_angle_deg"] = float("nan")

#     try: out["Nasal_tip_angle_deg"] = angle_between(p("Ac_L") - p("Prn"), p("Ac_R") - p("Prn"))
#     except: out["Nasal_tip_angle_deg"] = float("nan")

#     try: out["Dorsal_angle_deg"] = angle_between(p("G") - p("N"), p("Prn") - p("N"))
#     except: out["Dorsal_angle_deg"] = float("nan")

#     try: out["Columellar_angle_deg"] = angle_between(p("Sn") - p("Prn"), Sbalmid - p("Sn")) if Sbalmid is not None else float("nan")
#     except: out["Columellar_angle_deg"] = float("nan")

#     try: out["Alar_base_width_px"] = dist(p("Al_L"), p("Al_R"))
#     except: out["Alar_base_width_px"] = float("nan")

#     try: out["Interalar_angle_deg"] = angle_between(p("Ac_L") - p("Prn"), p("Ac_R") - p("Prn"))
#     except: out["Interalar_angle_deg"] = float("nan")

#     try:
#         denom = dist(p("N"), p("Sn"))
#         out["Projection_ratio"] = dist(p("N"), p("Prn")) / denom if denom != 0 else float("nan")
#     except: out["Projection_ratio"] = float("nan")

#     try:
#         denom = dist(p("Al_L"), p("Al_R"))
#         out["Tip_projection_index"] = dist(p("Prn"), p("Sn")) / denom if denom != 0 else float("nan")
#     except: out["Tip_projection_index"] = float("nan")

#     try: out["Nasal_dorsum_angle_deg"] = angle_between(p("N") - p("Prn"), p("Sn") - p("Prn"))
#     except: out["Nasal_dorsum_angle_deg"] = float("nan")

#     try:
#         denom = dist(p("N"), p("Sn"))
#         out["Nasal_width_index"] = dist(p("Al_L"), p("Al_R")) / denom if denom != 0 else float("nan")
#     except: out["Nasal_width_index"] = float("nan")

#     try:
#         denom = dist(p("Al_L"), p("Al_R"))
#         out["Nasal_height_ratio"] = dist(p("G"), p("Sn")) / denom if denom != 0 else float("nan")
#     except: out["Nasal_height_ratio"] = float("nan")

#     return out



# # =====================================================
# # 2. Feature Extraction (output = 42-dim vector)
# # =====================================================
# def extract_42_features(img):
#     """
#     Extract the full 42 handcrafted nasal features using Mediapipe.
#     Reuses the same 15 key landmarks and geometry functions from pipeline.
#     Returns a 42-length numpy vector.
#     """
#     img = cv2.imread(img) 
#     h, w = img.shape[:2]
#     rgb = cv2.cvtColor(img, cv2.COLOR_BGR2RGB)
#     results = face_mesh.process(rgb)

#     # Initialize landmark dict
#     pts = {name: None for name in labelnum_to_name.values()}

#     if results.multi_face_landmarks:
#         lmset = results.multi_face_landmarks[0]
#         for num, mp_idx in landmarks_to_index.items():
#             name = labelnum_to_name[num]
#             try:
#                 lm = lmset.landmark[mp_idx]
#                 pts[name] = point_from_landmark(lm, w, h)
#             except:
#                 pts[name] = None

#     # ------------------------------
#     # Compute your existing 12 features
#     # ------------------------------
#     f12 = compute_features(pts)

#     # ------------------------------
#     # Additional handcrafted features
#     # ------------------------------
#     feat_list = []

#     def safe_dist(a, b):
#         if a is None or b is None:
#             return 0.0
#         return dist(a, b)

#     def safe_ang(a, b, c):
#         """Angle at point b formed by (a-b) and (c-b)."""
#         if a is None or b is None or c is None:
#             return 0.0
#         return angle_between(a - b, c - b)

#     # === 1. Distances (10 features) ===
#     feat_list += [
#         safe_dist(pts["N"], pts["Prn"]),
#         safe_dist(pts["Prn"], pts["Sn"]),
#         safe_dist(pts["Al_L"], pts["Al_R"]),
#         safe_dist(pts["Ac_L"], pts["Prn"]),
#         safe_dist(pts["Ac_R"], pts["Prn"]),
#         safe_dist(pts["Sbal_L"], pts["Sbal_R"]),
#         safe_dist(pts["G"], pts["N"]),
#         safe_dist(pts["G"], pts["Prn"]),
#         safe_dist(pts["N"], pts["Sn"]),
#         safe_dist(pts["Prn"], pts["Ls"])
#     ]

#     # === 2. Angles (8 features) ===
#     feat_list += [
#         safe_ang(pts["G"], pts["N"], pts["Prn"]),
#         safe_ang(pts["N"], pts["Prn"], pts["Sn"]),
#         safe_ang(pts["Al_L"], pts["Prn"], pts["Al_R"]),
#         safe_ang(pts["Ac_L"], pts["Prn"], pts["Ac_R"]),
#         safe_ang(pts["Sbal_L"], pts["Sn"], pts["Sbal_R"]),
#         safe_ang(pts["G"], pts["Prn"], pts["Sn"]),
#         safe_ang(pts["G"], pts["Sn"], pts["Prn"]),
#         safe_ang(pts["N"], pts["Sn"], pts["Prn"])
#     ]

#     # === 3. Ratios (6 features) ===
#     denom1 = safe_dist(pts["N"], pts["Sn"])
#     denom2 = safe_dist(pts["Al_L"], pts["Al_R"])
#     denom3 = safe_dist(pts["G"], pts["Sn"])

#     feat_list += [
#         safe_dist(pts["N"], pts["Prn"]) / (denom1 + 1e-6),
#         safe_dist(pts["Prn"], pts["Sn"]) / (denom2 + 1e-6),
#         safe_dist(pts["G"], pts["Prn"]) / (denom3 + 1e-6),
#         safe_dist(pts["G"], pts["N"]) / (denom3 + 1e-6),
#         safe_dist(pts["Sbal_L"], pts["Sbal_R"]) / (denom2 + 1e-6),
#         safe_dist(pts["Ac_L"], pts["Ac_R"]) / (denom2 + 1e-6)
#     ]

#     # === 4. Symmetry features (6 features) ===
#     def sym(a, b, center):
#         if a is None or b is None or center is None:
#             return 0.0
#         return abs(dist(a, center) - dist(b, center))

#     mid_N_Prn = None
#     if pts["N"] is not None and pts["Prn"] is not None:
#         mid_N_Prn = midpoint(pts["N"], pts["Prn"])

#     feat_list += [
#         sym(pts["Al_L"], pts["Al_R"], pts["N"]),
#         sym(pts["Ac_L"], pts["Ac_R"], pts["Prn"]),
#         sym(pts["Sbal_L"], pts["Sbal_R"], pts["Sn"]),
#         sym(pts["En_L"], pts["En_R"], pts["G"]),
#         sym(pts["Tr_L"], pts["Tr_R"], mid_N_Prn),
#         sym(pts["Ac_L"], pts["Ac_R"], pts["Sn"])
#     ]

#     # === 5. Add your 12 existing features ===
#     for k in [
#         "Nasofrontal_angle_deg", "Dorsal_angle_deg", "Nasal_dorsum_angle_deg",
#         "Nasolabial_angle_deg", "Columellar_angle_deg",
#         "Nasal_tip_angle_deg", "Interalar_angle_deg",
#         "Alar_base_width_px", "Nasal_width_index", "Nasal_height_ratio",
#         "Projection_ratio", "Tip_projection_index"
#     ]:
#         feat_list.append(float(f12.get(k, 0.0)))

#     # ------------------------------
#     # Guarantee vector length = 42
#     # ------------------------------
#     while len(feat_list) < 42:
#         feat_list.append(0.0)

#     return np.array(feat_list[:42], dtype=np.float32)
