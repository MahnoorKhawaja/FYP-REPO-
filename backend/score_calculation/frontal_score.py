import dlib
import cv2
import numpy as np

# Load the detector and predictor
detector = dlib.get_frontal_face_detector()
predictor_path = r"/mnt/c/Downloads/shape_predictor_68_face_landmarks.dat/shape_predictor_68_face_landmarks.dat"
predictor = dlib.shape_predictor(predictor_path)

def get_nose_coords(img_path):
    # Load the image
    img = cv2.imread(img_path)
    if img is None:
        print(f"Error: Could not find or open the image at {img_path}")
        return 4,4

    gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
    faces = detector(gray)
    if len(faces) == 0:
        print("No face detected in the image.")
        return 4,4

    for face in faces:
        landmarks = predictor(gray, face)
        nose_points = []

        # Collect nose landmarks (27-36)
        for n in range(27, 36):
            x = landmarks.part(n).x
            y = landmarks.part(n).y
            nose_points.append((x, y))
            cv2.circle(img, (x, y), 3, (0, 255, 0), -1)
            cv2.putText(img, str(n), (x + 2, y - 2), cv2.FONT_HERSHEY_SIMPLEX, 0.3, (255, 255, 255), 1)

        # Fit a quadratic curve (y = ax^2 + bx + c) to the nose bridge points
        # Use only points 27-30 (bridge), then connect with 31-35 (tip)
        bridge_points = np.array(nose_points[0:4])  # 27-30
        x = bridge_points[:, 0]
        y = bridge_points[:, 1]

        if len(x) >= 3:
            coeffs = np.polyfit(x, y, 2)  # quadratic fit
            y_fit = np.polyval(coeffs, x)

            # Draw fitted curve on image
            for xi in range(x[0], x[-1]+1):
                yi = int(np.polyval(coeffs, xi))
                cv2.circle(img, (xi, yi), 1, (0, 0, 255), -1)

            curvature = coeffs[0]
            print(f"Curvature: {curvature:.6f}")

            # Classification based on curvature
            if curvature > 0.002:
                dorsum_type = "C-shaped deviation"
                dorsum_score = 3
            elif curvature < -0.005:
                dorsum_type = "Opposite C deviation"
                dorsum_score = 3
            else:
                # check for slight S-shape by difference of slopes at ends
                slope_start = y_fit[1] - y_fit[0]
                slope_end = y_fit[-1] - y_fit[-2]

                if slope_start * slope_end < 0:
                    # Compute curvature severity
                    # baseline = straight line between first and last point
                    x_vals = np.arange(len(y_fit))
                    baseline = np.linspace(y_fit[0], y_fit[-1], len(y_fit))

                    # deviation from straight line
                    deviation = np.abs(y_fit - baseline)
                    max_dev = np.max(deviation)

                    dorsum_type = "S-shaped deviation"

                    # Threshold-based severity scoring
                    if max_dev > 5:     
                        dorsum_score = 1   
                    else:
                        dorsum_score = 2   # mild S-shape
                else:
                    dorsum_type = "Straight dorsum"
                    dorsum_score = 4

            print(f"Dorsum Type: {dorsum_type}")


            left_eye_inner = np.array((landmarks.part(39).x, landmarks.part(39).y))
            right_eye_inner = np.array((landmarks.part(42).x, landmarks.part(42).y))

            ICD = np.linalg.norm(right_eye_inner - left_eye_inner)

            # ---- NOSE WIDTH (31–35) ---- #
            left_alar = np.array((landmarks.part(31).x, landmarks.part(31).y))
            right_alar = np.array((landmarks.part(35).x, landmarks.part(35).y))

            nose_width = np.linalg.norm(right_alar - left_alar)

            # ---- NORMALIZED RATIO ---- #
            if ICD != 0:
                width_ratio = nose_width / ICD
            else:
                width_ratio = 0

            print(f"Nose Width / ICD Ratio: {width_ratio:.3f}")

            # ---- CLASSIFICATION ---- #

            if width_ratio <0.8 and width_ratio > 0.7:
                width_score = 4
                width_type = "Ideal / Narrow dorsum"
            elif width_ratio < 0.7:
                width_score = 3
                width_type = "Mild widening"
            elif width_ratio > 0.8:
                width_score = 2
                width_type = "Moderate widening"
            else:
                width_score = 1
                width_type = "Severe dorsum deformity"

            # print(f"Dorsum Width Score: {width_score} ({width_type})")

        # Optional: Connect all nose points with lines
        for i in range(len(nose_points)-6):
            cv2.line(img, nose_points[i], nose_points[i+1], (255, 0, 0), 1)

    output_path = "marked_" + img_path
    cv2.imwrite(output_path, img)
    print(width_score,dorsum_score)
    print(f"Marked image saved as: {output_path}")
    return dorsum_score , width_score
