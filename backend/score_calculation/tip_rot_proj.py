import cv2
import numpy as np


def get_tip_projection_score(img_path,tip_lobule_score=4):
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
    # cv2.drawContours(result, [largest], -1, (0,255,0), 2)

    # ---- Extract only nose part ----
    h, w = gray.shape

    nose_points = []

    for p in largest:
        x, y = p[0]
        
        # region where nose is located
        if 0*w < x < 1.0*w and 0.1*h < y < 1*h:
            nose_points.append([[x,y]])

    # Convert to proper shape
    nose_points = np.array(nose_points).reshape(-1,2)

    # # Draw the radix
    # cv2.polylines(result, [nose_points], False, (0,0,255), 3)
    # cv2.imwrite("side_check_length.jpg", result)

    # Convert properly
    nose_points = np.array(nose_points).reshape(-1,2)

    # Lowest width (min x)
    min_x_point = nose_points[np.argmin(nose_points[:,0])]

    # Highest width (max x)
    max_x_point = nose_points[np.lexsort((-nose_points[:,0], -nose_points[:,1]))][0]

    # Lowest y (top point → radix)
    min_y_point = nose_points[np.argmin(nose_points[:,1])]

    max_y_point = nose_points[np.argmax(nose_points[:,1])]

    # Tip projection (always positive)
    tip_projection = abs(max_x_point[0] - min_y_point[0])

    # Nose length
    nose_length = abs(max_y_point[1] - min_y_point[1])

    projection_ratio = tip_projection / nose_length

    if projection_ratio < 0.2:
        tip_type = "Under-projected"
        tip_score = 2
        if tip_lobule_score == 2:
            tip_score = 1
    elif projection_ratio > 0.3:
        tip_type = "Over-projected"
        tip_score = 3
    else:
        tip_type = "Normal projection"
        tip_score = 4


    print(f"Tip Projection: {tip_projection}")
    print(f"Nose Length: {nose_length}")
    print(f"Projection ratio: {projection_ratio:.2f}, Tip Type: {tip_type}")


    # Tip of nose
    cv2.circle(result, tuple(min_x_point), 6, (0,255,0), -1)

    # Radix (top)
    cv2.circle(result, tuple(min_y_point), 6, (0,0,255), -1)

    cv2.circle(result, tuple(max_x_point), 6, (255,0,0), -1)

    # Draw lines
    cv2.line(result, tuple(min_y_point), tuple(min_x_point), (0,255,255), 2)  # Radix → Tip (yellow)
    cv2.line(result, tuple(min_x_point), tuple(max_x_point), (255,0,255), 2)  # Tip → Max X (magenta)


    cv2.imwrite("side_check_points.jpg", result)
    return tip_score

######################################  tip rotation score  ######################################

def get_tip_rotation_score(img_path,tip_lobule_score=4):
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
    # cv2.drawContours(result, [largest], -1, (0,255,0), 2)

    # ---- Extract only nose part ----
    h, w = gray.shape

    nose_points = []

    for p in largest:
        x, y = p[0]
        
        # region where nose is located
        if 0*w < x < 1.0*w and 0.1*h < y < 1*h:
            nose_points.append([[x,y]])

    # Convert to proper shape
    nose_points = np.array(nose_points).reshape(-1,2)

    # Lowest width (min x)
    min_x_point = nose_points[np.argmin(nose_points[:,0])]

    # Highest width (max x)
    max_x_point = nose_points[np.lexsort((-nose_points[:,0], -nose_points[:,1]))][0]

    # Lowest y (top point → radix)
    min_y_point = nose_points[np.argmin(nose_points[:,1])]

    max_y_point = nose_points[np.argmax(nose_points[:,1])]

    # Example: nose_points is a Nx2 array with x and y coordinates
    # min_x_point = nose_points[np.argmin(nose_points[:,0])]
    # max_y_point = nose_points[np.argmax(nose_points[:,1])]

    # Step 1: Find the indices of min_x_point and max_y_point
    min_x_idx = np.where((nose_points == min_x_point).all(axis=1))[0][0]
    max_y_idx = np.where((nose_points == max_y_point).all(axis=1))[0][0]

    # Step 2: Slice the array between these indices
    if min_x_idx < max_y_idx:
        segment = nose_points[min_x_idx:max_y_idx+1]
    else:
        segment = nose_points[max_y_idx:min_x_idx+1]

    # Step 3: Find the point with maximum X in this segment
    max_x_point = segment[np.argmax(segment[:,0])]

    print("Max X point between min_x and max_y:", max_x_point)


    print("Min X Point:", min_x_point)
    print("Max X Point:", max_x_point)
    print("Min Y Point:", min_y_point)
    print("Max Y Point:", max_y_point)

    # Tip of nose
    cv2.circle(result, tuple(min_x_point), 6, (0,255,0), -1)

    cv2.circle(result, tuple(max_x_point), 6, (255,0,0), -1)

    cv2.circle(result, tuple(max_y_point), 6, (0,0,255), -1)

    # # Draw lines
    cv2.line(result, tuple(min_x_point), tuple(max_x_point), (0,255,255), 2)  # Radix → Tip (yellow)
    cv2.line(result, tuple(max_y_point), tuple(max_x_point), (255,0,255), 2)  # Tip → Max X (magenta)
    # cv2.polylines(result, [nose_points], False, (0,0,255), 3)
    cv2.imwrite("side_check_rot.jpg", result)

    # Convert points to numpy arrays just in case
    p1 = np.array(min_x_point)
    p2 = np.array(max_x_point)
    p3 = np.array(max_y_point)

    # Vectors
    v1 = p2 - p1  # Yellow line: min_x → max_x
    v2 = p2 - p3  # Magenta line: max_y → max_x

    # Dot product
    dot_prod = np.dot(v1, v2)

    # Norms (lengths)
    norms = np.linalg.norm(v1) * np.linalg.norm(v2)

    # Angle in radians
    angle_rad = np.arccos(dot_prod / norms)

    # Convert to degrees
    angle_deg = np.degrees(angle_rad)

    angle_deg = int(angle_deg)
    print("Angle (degrees):", angle_deg)

    if angle_deg < 90:
        print("Under tip rotation")
        score = 3
        if tip_lobule_score == 2:
            score = 1
    elif angle_deg > 110:
        print("Over tip rotation")
        score = 2
    else:
        print("Normal tip rotation")
        score = 4


    return score