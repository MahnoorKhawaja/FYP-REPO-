import cv2
import numpy as np

def get_radix_score(img_path):
    # Load image
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
        if 0.2*w < x < 0.75*w and 0.1*h < y < 0.3*h:
            nose_points.append([[x,y]])

    # Convert to proper shape
    nose_points = np.array(nose_points).reshape(-1,2)

    # Draw the radix
    cv2.polylines(result, [nose_points], False, (0,0,255), 3)
    cv2.imwrite("side_check_radix.jpg", result)

    # Average y-coordinate (height) and x-coordinate (lateral position)
    radix_x = nose_points[:,0]
    radix_y = nose_points[:,1]

    avg_x = np.mean(radix_x)
    avg_y = np.mean(radix_y)

    # Face midline (approx)
    h, w = gray.shape
    face_mid = w / 2

    # Normal radix height (side view assumption)
    ideal_y = 0.12 * h

    height_diff = abs(avg_y - ideal_y) / h  # normalized
    pos_diff = abs(avg_x - face_mid) / w    # normalized

    print("Average Y (height):", avg_y)
    print("Average X (lateral position):", avg_x)
    print("Height difference (normalized):", height_diff)
    print("Position difference (normalized):", pos_diff)

    # Suggested thresholds
    if height_diff < 0.1 and pos_diff < 0.1:
        radix_score = 4  # normal
    elif height_diff < 0.15 and pos_diff < 0.15:
        radix_score = 3  # mild deformity
    elif height_diff < 0.2 and pos_diff < 0.2:
        radix_score = 2  # moderate deformity
    else:
        radix_score = 1  # severe deformity

    print("Radix deformity score:", radix_score)
    return radix_score