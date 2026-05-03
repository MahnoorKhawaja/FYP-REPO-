import cv2
import numpy as np

def classify(val):
        val = abs(val)
        if val < 0.02:
            return 4
        elif val < 0.05:
            return 3
        elif val < 0.1:
            return 2
        else:
            return 1
# Load image
def get_nose_saddle_hump(img_path):
    img = cv2.imread(img_path)
    gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)

    # Smooth image (remove skin noise)
    blur = cv2.GaussianBlur(gray, (9,9), 0)

    # Edge detection
    edges = cv2.Canny(blur, 40, 120)

    # Find contours
    contours, _ = cv2.findContours(edges, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_NONE)

    # Get largest contour (face outline)
    largest = max(contours, key=cv2.contourArea)

    # Draw full face contour
    result = img.copy()
    cv2.drawContours(result, [largest], -1, (0,255,0), 2)

    # ---- Extract only nose part ----
    h, w = gray.shape

    nose_points = []

    for p in largest:
        x, y = p[0]
        
        # region where nose is located
        if 0.2*w < x < 0.75*w and 0.2*h < y < 0.9*h:
            nose_points.append([[x,y]])

    nose_points = np.array(nose_points)

    cv2.polylines(result, [nose_points], False, (0,0,255), 3)

    # cv2.imshow("Nose Contour", result)
    # cv2.waitKey(0)
    # cv2.destroyAllWindows()
    cv2.imwrite("side_check.jpg", result)

    # ---- ANALYSIS: Hump / Saddle Detection ----

    if len(nose_points) > 20:

        pts = nose_points.reshape(-1, 2)

        # Sort top → bottom (important for profile)
        pts = pts[np.argsort(pts[:, 1])]

        x = pts[:, 0]
        y = pts[:, 1]

        # Normalize
        y_norm = (y - np.mean(y)) / np.std(y)
        x_norm = (x - np.mean(x)) / np.std(x)

        # Fit curve: x = f(y)  
        coeffs = np.polyfit(y_norm, x_norm, 2)

        # Straight line
        line_coeffs = np.polyfit(y_norm, x_norm, 1)
        x_line = np.polyval(line_coeffs, y_norm)
        x_curve = np.polyval(coeffs, y_norm)


        deviations = x_curve - x_line

        max_dev = np.max(deviations)
        min_dev = np.min(deviations)

        # Pick strongest bend
        if abs(max_dev) > abs(min_dev):
            deviation = max_dev
        else:
            deviation = min_dev

        print("Deviation:", deviation)
        print("Max Deviation:", max_dev)
        print("Min Deviation:", min_dev)

    # ---- CLASSIFICATION----

    if deviation > 0 and deviation < 1:
        hump_class = classify(deviation)
        saddle_class = 4
    else:
        saddle_class = classify(deviation)
        hump_class = 4

    print("Hump:", hump_class)
    print("Saddle:", saddle_class)
    return hump_class, saddle_class