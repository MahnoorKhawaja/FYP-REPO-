import React, { useMemo, useEffect, useState,  useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { Canvas, useLoader, useThree } from "@react-three/fiber";
import { OrbitControls } from "three-stdlib";
import * as THREE from "three";
import { OBJLoader } from "three-stdlib";
import { Billboard, Html } from "@react-three/drei";

/* =========================================
   LANDMARK INDICES (Replaced Positions)
   Note: These are arbitrary vertex indices. 
   You must match these to your specific .obj topology.
========================================= */

const LANDMARK_INDICES = [
  { name: "Point 1",  vertexIndex: 47800 },
  { name: "Point 2",  vertexIndex: 48700 },
  { name: "Point 3",  vertexIndex: 48600 },
  { name: "Point 4",  vertexIndex: 39900 },
  { name: "Point 5",  vertexIndex: 48750 },
  { name: "Point 6",  vertexIndex: 59800 },
  { name: "Point 7",  vertexIndex: 48300 },
  { name: "Point 8",  vertexIndex: 40100 },
  { name: "Point 9",  vertexIndex: 37300 },
  { name: "Point 10", vertexIndex: 60810 },
  { name: "Point 11", vertexIndex: 60740 },
];

/* =========================================
   FEATURE INDICES 
========================================= */

const FEATURE_INDICES_TEMP = [
  { name: "Dorsum", vertexIndex: 48550, score: 1, radius:0.3, scaleX: 0.3, scaleY: 0.4 ,scaleZ:0.3},
  { name: "Width of Dorsum", vertexIndex: 48560 , score: 1 , radius:0.3, scaleX: 0.3, scaleY: 0.3 ,scaleZ:0.5},
  { name: "Tip Shape and Symmetry", vertexIndex: 48600 , score: 1 ,radius:0.25, scaleX: 0.25, scaleY: 0.25 ,scaleZ:0.25},
  { name: "Saddle", vertexIndex: 48470 , score: 1 , radius:0.3, scaleX: 0.3, scaleY: 0.4 ,scaleZ:0.3},
  { name: "Hump", vertexIndex: 48550 , score: 1 ,radius:0.25, scaleX: 0.25, scaleY: 0.3 ,scaleZ:0.25}, 
  { name: "Nasal Length", vertexIndex: 48550, score: 1 , radius:0.4, scaleX: 0.3, scaleY: 0.7 ,scaleZ:0.3},
  { name: "Radix", vertexIndex: 48470 , score: 1 , radius:0.25, scaleX: 0.25, scaleY: 0.25 ,scaleZ:0.25},
  { name: "Alar Columellar Relation", vertexIndex: 48650 , score: 1 ,radius:0.28, scaleX: 0.25, scaleY: 0.25 ,scaleZ:0.3},
  { name: "Tip Projection", vertexIndex: 48600 , score: 1 ,radius:0.25, scaleX: 0.3, scaleY: 0.25 ,scaleZ:0.3 }, 
  { name: "Tip Rotation", vertexIndex: 48600 , score: 1 ,radius:0.25, scaleX: 0.25, scaleY: 0.25 ,scaleZ:0.25 },
  { name: "Alar Flaring", vertexIndex: 48650 , score: 1 ,radius:0.25, scaleX: 0.25, scaleY: 0.25 ,scaleZ:0.3 }, 
  { name: "Nostril Ratio", vertexIndex: 48550, score: 1 , radius:0.4, scaleX: 0.3, scaleY: 0.6 ,scaleZ:0.3}
];


/* =========================================
   Load scores from localStorage
========================================= */

// Retrieve scores from localStorage
const savedScores = JSON.parse(localStorage.getItem("noseScores")) || [];
console.log("Retrieved nose scores from localStorage:", savedScores);

// Map FEATURE_INDICES and update the score
const FEATURE_INDICES = FEATURE_INDICES_TEMP.map((ft, idx) => ({
  ...ft,
  score: savedScores[idx] ?? ft.score,  // fallback to existing score if undefined
}));

/* =========================================
   CONTROLS
========================================= */

function HorizontalControls() {
  const { camera, gl } = useThree();

  useEffect(() => {
    const controls = new OrbitControls(camera, gl.domElement);

    controls.enableDamping = true;
    controls.dampingFactor = 0.08;
    controls.enableZoom = false;
    controls.enablePan = false;

    // Horizontal only
    controls.minPolarAngle = Math.PI / 2;
    controls.maxPolarAngle = Math.PI / 2;

    const animate = () => {
      requestAnimationFrame(animate);
      controls.update();
    };

    animate();

    return () => controls.dispose();
  }, [camera, gl]);

  return null;
}


/* =========================================
   LANDMARK DOTS
========================================= */

function Landmarks({ points }) {
  const [hovered, setHovered] = useState(null);

  if (!points || points.length === 0) return null;

  return points.map((p, i) => (
    <mesh
      key={i}
      position={p.position}
      onPointerOver={(e) => {
        e.stopPropagation();
        setHovered(i);
      }}
      onPointerOut={() => setHovered(null)}
    >
      <sphereGeometry args={[0.02, 16, 16]} />
      <meshStandardMaterial
        color={hovered === i ? "yellow" : "red"}
        emissive={hovered === i ? "yellow" : "red"}
        emissiveIntensity={hovered === i ? 4 : 2}
      />

      {hovered === i && (
  <Html
    distanceFactor={10}
    style={{
      background: "white",
      padding: "2px 4px",      // smaller box
      borderRadius: "4px",
      fontSize: "4px",         // smaller text
      fontWeight: "bold",
      whiteSpace: "nowrap",
      boxShadow: "0px 1px 3px rgba(0,0,0,0.25)", // lighter shadow
    }}
  >
    {p.name}
  </Html>
)}
    </mesh>
  ));
}



/* =========================================
   FEATURE HIGHLIGHT
========================================= */

function FeatureLabel({ position, name, score }) {
  return (
    <Billboard position={position} scale={0.05}>
  <Html
    center
    transform
    distanceFactor={12}
    style={{ pointerEvents: "none" }}
  >

        <div
          style={{
            background: "white",
            padding: "10px 14px",
            borderRadius: "14px",
            boxShadow: "0 8px 25px rgba(0,0,0,0.15)",
            border: "1px solid #e5e7eb",
            fontSize: "20px",
            minWidth: "100px",
            textAlign: "center"
          }}
        >
          <div
            style={{
              fontWeight: "700",
              marginBottom: "1px"
            }}
          >
            {name}
          </div>
          
        </div>
        <div
          style={{
            width: 0,
            height: 0,
            borderLeft: "8px solid transparent",
            borderRight: "8px solid transparent",
            borderTop: "10px solid white",
            margin: "0 auto",
          }}
        />
      </Html>
    </Billboard>
  );
}
function HighlightSphere({ position, radius = 0.15, scaleX = 2, scaleY = 1.5, scaleZ = 1 }) {
  if (!position) return null;

  return (
    <mesh position={position} scale={[scaleX, scaleY, scaleZ]}>
      <sphereGeometry args={[radius, 32, 32]} />
      <meshStandardMaterial
        color="#60a5fa"
        transparent
        opacity={0.25}
        roughness={0.2}
        metalness={0.1}
      />
    </mesh>
  );
}




/* =========================================
   OBJ MODEL & CALCULATION LOGIC
========================================= */

function VertexColorModel({ 
  objUrl, 
  flipFront = false, 
  rotateY = 0, 
  onCalculated 
}) {
  const rawObj = useLoader(OBJLoader, objUrl);

// Make the loaded OBJ stable
  const obj = useMemo(() => rawObj, [rawObj]);


  // Helper to extract a world position from a vertex index given the object transformations
 const getVertexWorldPosition = (mesh, index) => {
  const geometry = mesh.geometry;
  const pos = geometry.attributes.position;

  if (index >= pos.count) return [0, 0, 0];

  const v = new THREE.Vector3(
    pos.getX(index),
    pos.getY(index),
    pos.getZ(index)
  );
  console.log(`Vertex ${index} local position:`, v.toArray());

  mesh.localToWorld(v);
  return v.toArray();
};

// Make callback stable
const stableOnCalculated = useCallback(onCalculated, []);

useEffect(() => {
  let meshFound = null;

  obj.traverse((child) => {
    if (child.isMesh) {
      meshFound = child;
      const geometry = child.geometry;

      const positionAttr = geometry.attributes.position;
      const vertexData = positionAttr.array;
      const stride = vertexData.length / positionAttr.count;

      if (stride >= 6) {
        const colors = [];
        for (let i = 0; i < vertexData.length; i += stride) {
          colors.push(
            Math.min(vertexData[i + 3] * 1.3, 1.0),
            Math.min(vertexData[i + 4] * 1.1, 1.0),
            Math.min(vertexData[i + 5] * 1.3, 1.0)
          );
        }
        geometry.setAttribute(
          "color",
          new THREE.Float32BufferAttribute(colors, 3)
        );
      }

      geometry.computeVertexNormals();
      child.material = new THREE.MeshLambertMaterial({
        vertexColors: true,
        side: THREE.DoubleSide
      });
    }
  });

  const box = new THREE.Box3().setFromObject(obj);
  const center = box.getCenter(new THREE.Vector3());
  const size = box.getSize(new THREE.Vector3()).length();
  const scaleFactor = 1.8 / size;

  obj.position.sub(center);
  obj.scale.multiplyScalar(scaleFactor);

  let finalRotation = rotateY;
  if (flipFront) finalRotation += Math.PI;

  obj.rotation.set(0, finalRotation, 0);

  if (meshFound && stableOnCalculated) {
    const geometry = meshFound.geometry;

    const calcLandmarks = LANDMARK_INDICES.map(lm => ({
      name: lm.name,
      position: getVertexWorldPosition(meshFound, lm.vertexIndex)
    }));

    const calcFeatures = FEATURE_INDICES.map(ft => ({
  name: ft.name,
  center: getVertexWorldPosition(meshFound, ft.vertexIndex),
  score: ft.score,
  radius: ft.radius ?? 0.15,   // fallback if undefined
  scaleX: ft.scaleX ?? 1,
  scaleY: ft.scaleY ?? 1,
  scaleZ: ft.scaleZ ?? 1
}));

    stableOnCalculated({ landmarks: calcLandmarks, features: calcFeatures });
    console.log("Calculated landmarks and features sent.", calcLandmarks, calcFeatures);
  }
}, [obj, flipFront, rotateY, stableOnCalculated]); // now stable

  return <primitive object={obj} />;
}


/* =========================================
   MAIN COMPONENT
========================================= */

export default function ThreeD_VertexColorViewer() {
  const navigate = useNavigate();
  let filename = localStorage.getItem("resultFilename");
  filename = filename.replace(".obj", "_obj.obj");
  //let filename = "a2ad9056bc7a46d2968a66669ebbfb07_obj.obj"; //for testing 
  const url = `/results/${filename}`;

  const [showLandmarks, setShowLandmarks] = useState(false);
  const [showFeatures, setShowFeatures] = useState(false);
  const [selectedFeature, setSelectedFeature] = useState(null);

  // State to hold the calculated [x,y,z] positions derived from vertex indices
  const [calculatedLandmarks, setCalculatedLandmarks] = useState([]);
  const [calculatedFeatures, setCalculatedFeatures] = useState([]);

  const handleCalculatedPositions = ({ landmarks, features }) => {
    setCalculatedLandmarks(landmarks);
    setCalculatedFeatures(features);
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-gray-100 to-gray-300 flex flex-col items-center justify-center">
      <h1 className="text-3xl font-semibold mb-4 text-gray-700 tracking-tight">
        3D Face Viewer
      </h1>

      {/* BUTTONS */}
      <div className="flex gap-4 mb-4 z-20">
        <button
          onClick={() => {
            setShowLandmarks(!showLandmarks);
            setShowFeatures(false);
            setSelectedFeature(null);
          }}
         className="relative bg-[linear-gradient(#262626,#262626),linear-gradient(#3b82f6,#3b82f6)] bg-[length:100%_2px,0_2px] bg-[position:100%_100%,0_100%] bg-no-repeat text-neutral-950 text-xl transition-[background-size] duration-300 hover:bg-[0_2px,100%_2px]"

        >
          Landmarks
        </button>

        <button
          onClick={() => {
            setShowFeatures(!showFeatures);
            setShowLandmarks(false);
            setSelectedFeature(null);
          }}
          className="relative bg-[linear-gradient(#262626,#262626),linear-gradient(#3b82f6,#3b82f6)] bg-[length:100%_2px,0_2px] bg-[position:100%_100%,0_100%] bg-no-repeat text-neutral-950 text-xl transition-[background-size] duration-300 hover:bg-[0_2px,100%_2px]"
        >
          Features
        </button>

        <button
  onClick={() => navigate("/rhinoplasty")}
   className="relative bg-[linear-gradient(#262626,#262626),linear-gradient(#3b82f6,#3b82f6)] bg-[length:100%_2px,0_2px] bg-[position:100%_100%,0_100%] bg-no-repeat text-neutral-950 text-xl transition-[background-size] duration-300 hover:bg-[0_2px,100%_2px]"
>
         Back to Analysis
</button>

      </div>

      <div
        className="relative rounded-2xl shadow-2xl border border-gray-300 overflow-hidden"
        style={{
          width: "90vw",
          height: "85vh",
          background: "radial-gradient(circle at center, #fafafa, #e5e5e5)"
        }}
      >
        {/* FEATURE SIDEBAR */}
        {showFeatures && (
            <div
            className="absolute left-5 top-5
            bg-gradient-to-br from-white/90 via-blue-50/70 to-white/60
            p-6 rounded-2xl
            shadow-[0_15px_40px_rgba(0,0,0,0.2)]
            w-96 space-y-3 z-20
            overflow-y-auto max-h-[80vh]
            border border-white/70"
            >
            <h2 className="font-bold text-lg mb-2">Facial Features</h2>

            {calculatedFeatures.map((f, i) => (
              <button
                key={i}
                onClick={() => setSelectedFeature(f)}
                className={`block w-full text-left px-3 py-2 rounded-lg transition
                  ${selectedFeature?.name === f.name ? "bg-blue-200" : "hover:bg-blue-100"}`}
              >
                <div className="flex justify-between items-center">
                  <span>{f.name}</span>
                  <span className="text-sm text-gray-600 font-semibold">{f.score}</span>
                </div>
              </button>
            ))}

          </div>
        )}

        {/* RIGHT-SIDE SCORE PANEL */}
{showFeatures && (
  <div
    className="absolute right-5 top-5
      bg-gradient-to-br from-white/90 via-blue-50/70 to-white/60
      p-6 rounded-2xl
      shadow-[0_15px_40px_rgba(0,0,0,0.2)]
      w-80 space-y-4 z-20
      border border-white/70"
  >
    <h2 className="font-bold text-lg mb-2">Total Score</h2>

  <div className="text-2xl font-bold text-blue-600">
  {/* Sum of all feature scores out of 48 */}
  {calculatedFeatures.reduce((sum, f) => sum + f.score, 0).toFixed(1)} / 48
</div>

    <p className="text-sm text-gray-700">
      This score represents the combined evaluation of all 12 nasal features. Higher scores indicate better symmetry, proportion, and aesthetic alignment of the nose according to the model’s assessment.
    </p>
  </div>
)}


        {/* 3D CANVAS */}
        <Canvas
          camera={{ position: [0, 0, 2.8], fov: 45 }}
          gl={{ antialias: true, outputEncoding: THREE.sRGBEncoding }}
        >
          <ambientLight intensity={0.6} />
          <directionalLight position={[1.5, 2, 3]} intensity={1.6} />
          <pointLight position={[-2, -1, 3]} intensity={1.2} />

          <VertexColorModel 
            objUrl={url} 
            rotateY={Math.PI / 2} 
            onCalculated={handleCalculatedPositions}
          />

          {showLandmarks && <Landmarks points={calculatedLandmarks} />}
          
          {selectedFeature && (
  <>
    <FeatureLabel
      position={selectedFeature.center}
      name={selectedFeature.name}
      score={selectedFeature.score}
    />

    <HighlightSphere
  position={selectedFeature.center}
  radius={selectedFeature.radius}
  scaleX={selectedFeature.scaleX}
  scaleY={selectedFeature.scaleY}
  scaleZ={selectedFeature.scaleZ}
/>


  </>
)}



          <HorizontalControls />
        </Canvas>
      </div>
    </div>
  );
} 