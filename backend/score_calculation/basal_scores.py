import cv2
import numpy as np

def classify_tip(symmetry_ratio, boxy_score, triangle_type):
    
    # thresholds (tune these later)
    SYM_THRESH_MILD = 0.07
    SYM_THRESH_MOD = 0.09
    print(f"Symmetry ratio: {symmetry_ratio:.2f}, Boxy score: {boxy_score}, Triangle type: {triangle_type}")

    # --- A: Normal ---
    if symmetry_ratio < SYM_THRESH_MILD and boxy_score == 0:
        return 4

    # --- B: Mild boxy ---
    if symmetry_ratio < SYM_THRESH_MILD and boxy_score >= 1:
        return 3

    # --- C: Moderate deviation ---
    if symmetry_ratio >= SYM_THRESH_MILD and symmetry_ratio < SYM_THRESH_MOD and boxy_score == 0:
        return 2

    # --- D: Severe (both) ---
    if symmetry_ratio >= SYM_THRESH_MOD and boxy_score >= 1:
        return 1

    # fallback
    return 3



def triangle_type(A, B, C):
    a = np.linalg.norm(B - C)
    b = np.linalg.norm(A - C)
    c = np.linalg.norm(A - B)

    sides = sorted([a, b, c])
    a, b, c = sides  # c = longest

    # Equilateral check
    if abs(a - b) < 1e-2 and abs(b - c) < 1e-2:
        return "Equilateral"

    # Pythagorean relation
    if abs(c**2 - (a**2 + b**2)) < 1e-2:
        return "Right"

    elif c**2 < (a**2 + b**2):
        return "Acute"

    else:
        return "Obtuse"

def point_in_triangle(P, A, B, C):
    P = np.array(P)

    v0 = C - A
    v1 = B - A
    v2 = P - A

    dot00 = np.dot(v0, v0)
    dot01 = np.dot(v0, v1)
    dot02 = np.dot(v0, v2)
    dot11 = np.dot(v1, v1)
    dot12 = np.dot(v1, v2)

    denom = dot00 * dot11 - dot01 * dot01
    if denom == 0:
        return False  # degenerate triangle

    u = (dot11 * dot02 - dot01 * dot12) / denom
    v = (dot00 * dot12 - dot01 * dot02) / denom

    EPS = 0.05  # tweak (0.02–0.1 depending on scale)

    return (u >= -EPS) and (v >= -EPS) and (u + v <= 1 + EPS)


def check_nostril_proportion(tip, ntr, nbr, abl, abr, face_scale):
    tip = np.array(tip)
    ntr = np.array(ntr)
    nbr = np.array(nbr)
    abl = np.array(abl)
    abr = np.array(abr)

    # ---- proportions ----
    d1 = abs(ntr[1] - tip[1])
    d2 = abs(nbr[1] - ntr[1])
    total = abs(nbr[1] - tip[1])

    r1 = d1 / total
    r2 = d2 / total

    # ---- tip depression ----
    nostril_height = abs(nbr[1] - ntr[1])
    tip_ratio = d1 / (nostril_height + 1e-6)

    if tip_ratio < 0.8:
        tip_state = "TIP DEPRESSED"
    else:
        tip_state = "TIP NORMAL"

    # ---- nostril collapse ----
    left_h = abs(ntr[1] - abl[1])
    right_h = abs(ntr[1] - abr[1])

    nostril_collapse = (left_h + right_h) / 2
    nos_scale = nostril_collapse / face_scale
    print(f"Nostril collapse scale: {nos_scale:.2f}")

    if nos_scale < 0.1:  # tune this threshold as needed
        nostril_state = "NOSTRIL DEPRESSED"

    # ---- classification ----
    if abs(r1 - 0.33) < 0.05 and abs(r2 - 0.66) < 0.05:
        shape = "NORMAL"
    else:
        if r1 < 0.33 and r2 > 0.66:
            shape = "NARROW"
        elif r1 > 0.33 and r2 < 0.66:
            shape = "WIDE"
 

    return shape,nostril_collapse,tip_state

def classify_alar_nbl(nbl, abl,sn,tip,face_scale):
    nbl = np.array(nbl)
    abl = np.array(abl)

    vec = abl - nbl
    dx, dy = vec[0], vec[1]
    dist = np.linalg.norm(vec)

    dist_alar_nbl = np.linalg.norm(np.array(abl) - np.array(nbl))

    dist_norm = dist_alar_nbl / face_scale
    print(dist_norm)

    print(f"dx: {dx}, dy: {dy}, distance: {dist}")
    angle = np.degrees(np.arctan2(abs(dy), abs(dx)))
    print(f"Angle: {angle:.2f} degrees")

    if dist_norm < 0.05:
        return 4

    if angle < 15:
        return 2

    if dy > 0:
        return 3   # top → bottom diagonal

    if dy < 0:
        return 1  # bottom → top diagonal

    return 3

def basal_scores(img_path):
    img = cv2.imread(img_path)

    # In OpenCV: BGR format
    lower_red = np.array([0, 0, 200])
    upper_red = np.array([60, 60, 255])

    mask = cv2.inRange(img, lower_red, upper_red)
    kernel = np.ones((5,5), np.uint8)
    mask = cv2.morphologyEx(mask, cv2.MORPH_OPEN, kernel)
    mask = cv2.morphologyEx(mask, cv2.MORPH_DILATE, kernel)
    contours, _ = cv2.findContours(mask, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)

    points = []
    output = img.copy()
    for i, cnt in enumerate(contours):
        area = cv2.contourArea(cnt)

        if area > 20:  # filter noise
            M = cv2.moments(cnt)

            if M["m00"] != 0:
                cx = int(M["m10"] / M["m00"])
                cy = int(M["m01"] / M["m00"])

                points.append((cx, cy))

                # draw circle
                cv2.circle(output, (cx, cy), 6, (0, 255, 0), -1)

                # label
                cv2.putText(output, f"P{i}", (cx+5, cy-5),
                            cv2.FONT_HERSHEY_SIMPLEX, 0.5,
                            (255,255,255), 1)
                
    cv2.imwrite("marked_basal_points.png", output)

    print("Detected points:", points)

    points = sorted(points, key=lambda p: p[1])  # ascending Y (top → bottom)

    if len(points) < 10:
        raise ValueError("Not enough landmarks detected")

    tip = points[0]

    outer_edge = points[1:3]  

    if points[3][0] < points[4][0]:  # left nostril should be more left
        nostril_top_left = points[3]
        nostril_top_right = points[4]
    else:
        nostril_top_left = points[4]
        nostril_top_right = points[3]

    group = points[5:10]  # points 5,6,7,8,9
    group_sorted = sorted(group, key=lambda p: p[0])
    print(group_sorted)


    nostril_bottom_left = group_sorted[1]
    nostril_bottom_right = group_sorted[3]

    sub_nasale = group_sorted[2]

    alar_bottom_left = group_sorted[0]
    alar_bottom_right = group_sorted[4]


    output = img.copy()

    def draw(pt, label, color):
        cv2.circle(output, pt, 6, color, -1)
        cv2.putText(output, label, (pt[0]+5, pt[1]-5),
                    cv2.FONT_HERSHEY_SIMPLEX, 0.5, (255,255,255), 1)

    draw(tip, "TIP", (0,255,0))

    draw(nostril_top_left, "NTL", (255,0,0))
    draw(nostril_top_right, "NTR", (255,0,0))

    draw(nostril_bottom_left, "NBL", (0,255,255))
    draw(nostril_bottom_right, "NBR", (0,255,255))

    draw(alar_bottom_left, "ABL", (0,0,255))
    draw(alar_bottom_right, "ABR", (0,0,255))
    draw(sub_nasale, "SN", (255,255,0))

    draw(outer_edge[0], "OE1", (255,0,255))
    draw(outer_edge[1], "OE2", (255,0,255))

    cv2.imwrite("final_labeled_nose_basal.png", output)

    nbl = np.array(nostril_bottom_left)
    abl = np.array(alar_bottom_left)
    abr = np.array(alar_bottom_right)
    sn = np.array(sub_nasale)
    tip = np.array(tip)
    ntr = np.array(nostril_top_left)
    nbr = np.array(nostril_top_right)

    face_scale = np.linalg.norm(np.array(tip) - np.array(sn))

    #Alar flaring
    score1 = classify_alar_nbl(nbl, abl, sn, tip,face_scale)
    print("Alar-NBL classification:", score1)

    #tip lobule
    a,b,c = check_nostril_proportion(tip, ntr, nbr, abl, abr, face_scale)
    if a == "NORMAL":
        score2 = 4
    elif a == "NARROW":
        score2 = 2  
    elif a == "WIDE":
        score2 = 3
    elif b == "NOSTRIL DEPRESSED" or c == "TIP DEPRESSED":
        score2 = 1

    #TIP SHAPE AND SYMMETRY

    A = np.array(tip)   # TIP
    B = np.array(alar_bottom_left)   # ABL
    C = np.array(alar_bottom_right)  # ABR

    oe1 = np.array(outer_edge[0])
    oe2 = np.array(outer_edge[1])

    inside_oe1 = point_in_triangle(oe1, A, B, C)
    inside_oe2 = point_in_triangle(oe2, A, B, C)

    print("OE1 inside:", inside_oe1)
    print("OE2 inside:", inside_oe2)


    triangle_type_result = triangle_type(A, B, C)
    print("Triangle type:", triangle_type_result)

    left_len = np.linalg.norm(A - B)
    right_len = np.linalg.norm(A - C)

    symmetry_ratio = abs(left_len - right_len) / max(left_len, right_len)

    boxy_score = 0
    if not inside_oe1:
        boxy_score += 1
    if not inside_oe2:
        boxy_score += 1

    score3 = classify_tip(symmetry_ratio, boxy_score, triangle_type(A, B, C))
    print("Tip classification:", score3)
    return score1, score2, score3

# print(basal_scores("basal_try3.JPG"))