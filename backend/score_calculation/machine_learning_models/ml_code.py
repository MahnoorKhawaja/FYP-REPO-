# INPUT_FEATURES = 42
# NUM_CLASSES = 4
# NUM_TASKS = 12
# OUTPUT_FEATURES = NUM_TASKS * NUM_CLASSES

# BATCH_SIZE = 16
# EPOCHS = 200
# LR = 0.001

# device = "cuda" if torch.cuda.is_available() else "cpu"


# # =====================================================
# # 1. Load scaler + trained model
# # =====================================================

# scaler_mean = np.load(r"/mnt/c/Amal/FYP_REPO/FYP-REPO-/backend/scaler_mean.npy")          # shape: (42,)
# scaler_scale = np.load(r"/mnt/c/Amal/FYP_REPO/FYP-REPO-/backend/scaler_scale.npy") 

# # =====================================================
# # Frontal view model

# # -----------------------------
# # CONFIG
# # -----------------------------
# INPUT_FEATURES2 = 42
# NUM_CLASSES2 = 4
# NUM_TASKS2 = 2   

# BATCH_SIZE2 = 16
# EPOCHS2 = 200
# LR2 = 0.001

# device = "cuda" if torch.cuda.is_available() else "cpu"



# class NoseScoreClassifier2(nn.Module):
#     def __init__(self):
#         super().__init__()

#         self.backbone = nn.Sequential(
#             nn.Linear(INPUT_FEATURES2, 64),
#             nn.ReLU(),
#             nn.Linear(64, 128),
#             nn.ReLU(),
#             nn.Linear(128, 64),
#             nn.ReLU(),
#         )

#         # ONLY TWO HEADS NOW
#         self.heads = nn.ModuleList([nn.Linear(64, NUM_CLASSES2) for _ in range(NUM_TASKS2)])

#         self.apply(self._init_weights)

#     def _init_weights(self, m):
#         if isinstance(m, nn.Linear):
#             nn.init.kaiming_normal_(m.weight)
#             nn.init.zeros_(m.bias)

#     def forward(self, x):
#         shared = self.backbone(x)
#         return [head(shared) for head in self.heads]
    
# front_model = NoseScoreClassifier2()
# front_model.load_state_dict(torch.load(r"/mnt/c/Amal/FYP_REPO/FYP-REPO-/backend/nose_twohead_model.pth", map_location="cpu"))
# front_model.eval()

# # =====================================================
# # Lateral view model

# # -----------------------------
# # CONFIG
# # -----------------------------
# INPUT_FEATURES3 = 42
# NUM_CLASSES3 = 4
# NUM_TASKS3 = 8  

# BATCH_SIZE3 = 16
# EPOCHS3 = 200
# LR3 = 0.001
# device = "cuda" if torch.cuda.is_available() else "cpu"



# class NoseScoreClassifier3(nn.Module):
#     def __init__(self):
#         super().__init__()

#         self.backbone = nn.Sequential(
#             nn.Linear(INPUT_FEATURES3, 64),
#             nn.ReLU(),
#             nn.Linear(64, 128),
#             nn.ReLU(),
#             nn.Linear(128, 64),
#             nn.ReLU(),
#         )

#         # ---------- 8 output heads ----------
#         self.heads = nn.ModuleList(
#             [nn.Linear(64, NUM_CLASSES3) for _ in range(NUM_TASKS3)]
#         )

#         self.apply(self._init_weights)

#     def _init_weights(self, m):
#         if isinstance(m, nn.Linear):
#             nn.init.kaiming_normal_(m.weight)
#             nn.init.zeros_(m.bias)

#     def forward(self, x):
#         shared = self.backbone(x)
#         return [head(shared) for head in self.heads]
    
# lat_model = NoseScoreClassifier3()
# lat_model.load_state_dict(torch.load(r"/mnt/c/Amal/FYP_REPO/FYP-REPO-/backend/nose_8head_model.pth", map_location="cpu"))
# lat_model.eval()

# # =====================================================
# # Basal view model

# # -----------------------------
# # CONFIG
# # -----------------------------
# INPUT_FEATURES4 = 42        # 7 angles + 5 ratios + 30 landmark coords
# NUM_CLASSES4 = 4            # scores 1–4
# NUM_TASKS4 = 2              # Basal view has 2 output scores
# BATCH_SIZE4 = 16
# EPOCHS4 = 200
# LR4 = 0.001

# device = "cuda" if torch.cuda.is_available() else "cpu"

# # -----------------------------
# # MODEL
# # -----------------------------
# class NoseBasalClassifier(nn.Module):
#     def __init__(self):
#         super().__init__()

#         # shared backbone
#         self.backbone = nn.Sequential(
#             nn.Linear(INPUT_FEATURES4, 64),
#             nn.ReLU(),
#             nn.Linear(64, 128),
#             nn.ReLU(),
#             nn.Linear(128, 64),
#             nn.ReLU(),
#         )

#         # ---- 2 output heads ----
#         self.heads = nn.ModuleList([
#             nn.Linear(64, NUM_CLASSES4) for _ in range(NUM_TASKS4)
#         ])

#         self.apply(self._init_weights)

#     def _init_weights(self, m):
#         if isinstance(m, nn.Linear):
#             nn.init.kaiming_normal_(m.weight)
#             nn.init.zeros_(m.bias)

#     def forward(self, x):
#         shared = self.backbone(x)
#         return [head(shared) for head in self.heads]
    
# basal_model = NoseBasalClassifier()
# basal_model.load_state_dict(torch.load(r"/mnt/c/Amal/FYP_REPO/FYP-REPO-/backend/nose_basal_model.pth", map_location="cpu"))
# basal_model.eval()