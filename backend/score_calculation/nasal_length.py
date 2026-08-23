import dlib
import cv2
import numpy as np

# Load the detector and predictor
detector = dlib.get_frontal_face_detector()
predictor_path = r"/mnt/c/Downloads/shape_predictor_68_face_landmarks.dat/shape_predictor_68_face_landmarks.dat"
predictor = dlib.shape_predictor(predictor_path)

def get_nasal_length_score(img_path,radix_score=4):
    # Load the image
    img = cv2.imread(img_path)
    if img is None:
        print(f"Error: Could not find or open the image at {img_path}")
        return 4

    gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
    faces = detector(gray)
    if len(faces) == 0:
        print("No face detected in the image.")
        return 4

    for face in faces:
        landmarks = predictor(gray, face)
        # Get coordinates
        p27 = np.array([landmarks.part(27).x, landmarks.part(27).y])
        p33 = np.array([landmarks.part(33).x, landmarks.part(33).y])
        p8  = np.array([landmarks.part(8).x, landmarks.part(8).y])
        p66 = np.array([landmarks.part(66).x, landmarks.part(66).y])

        # Distances
        nose_length = np.linalg.norm(p33 - p27)      # Radix → Tip
        lower_face = np.linalg.norm(p66 - p8)        # Stomion → Menton

        # Ratio
        ratio = nose_length / lower_face

        print("Nasal length ratio (Radix→Tip / Stomion→Menton):", ratio)

        # Optional classification
        if ratio < 0.85:
            print("Short nose")
            score = 3
        elif ratio > 1.15:
            print("Long nose")
            if radix_score == 4 or radix_score == 3:
                score = 2
            else:
                score = 1
        else:
            print("Normal nose")
            score = 4
        
        # Loop through all 68 points
        for n in ([8,66,33,27]):
            x = landmarks.part(n).x
            y = landmarks.part(n).y
            # Draw circle
            cv2.circle(img, (x, y), 2, (0, 255, 0), -1)
            # Put landmark index
            cv2.putText(img, str(n), (x + 2, y - 2), cv2.FONT_HERSHEY_SIMPLEX, 0.3, (0, 0, 255), 1)

    output_path = "marked_length_" + img_path
    cv2.imwrite(output_path, img)
    print(f"Marked image saved as: {output_path}")
    return score

# # Run function
# get_nasal_length_score("frontcheck5.JPG")