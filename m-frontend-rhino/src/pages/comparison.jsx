import React, { useMemo, useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { Canvas, useLoader, useThree } from "@react-three/fiber";
import { OrbitControls, OBJLoader } from "three-stdlib";
import * as THREE from "three";
import { Billboard, Html } from "@react-three/drei";
import NoseAnalysis from "./NoseAnalysis";
import { useParams } from "react-router-dom";

/* =========================================
   LANDMARK INDICES
========================================= */
const LANDMARK_INDICES = [
  { name: "Nasion",  vertexIndex: 47800 },
  { name: "Subnasale",  vertexIndex: 48700 },
  { name: "Pronasale",  vertexIndex: 48600 },
  { name: "Endocanthion_L",  vertexIndex: 39900 },
  { name: "Labrale superius",  vertexIndex: 48750 },
  { name: "Endocanthion_R",  vertexIndex: 59800 },
  { name: "Glabella",  vertexIndex: 48300 },
  { name: "Alar_L",  vertexIndex: 40100 },
  { name: "Alar_curvature_L",  vertexIndex: 37300 },
  { name: "Alar_curvature_R", vertexIndex: 60810 },
  { name: "Alar_R", vertexIndex: 60740 },
];

/* =========================================
   FEATURE INDICES
========================================= */
const FEATURE_INDICES = [
  { name: "Dorsum", vertexIndex: 48550, radius: 0.3, scaleX: 0.3, scaleY: 0.4, scaleZ: 0.3 },
  { name: "Width of Dorsum", vertexIndex: 48560, radius: 0.3, scaleX: 0.3, scaleY: 0.3, scaleZ: 0.5 },
  { name: "Tip Shape and Symmetry", vertexIndex: 48600, radius: 0.25, scaleX: 0.25, scaleY: 0.25, scaleZ: 0.25 },
  { name: "Saddle", vertexIndex: 48470, radius: 0.3, scaleX: 0.3, scaleY: 0.4, scaleZ: 0.3 },
  { name: "Hump", vertexIndex: 48550, radius: 0.25, scaleX: 0.25, scaleY: 0.3, scaleZ: 0.25 },
  { name: "Nasal Length", vertexIndex: 48550, radius: 0.4, scaleX: 0.3, scaleY: 0.7, scaleZ: 0.3 },
  { name: "Radix", vertexIndex: 48470, radius: 0.25, scaleX: 0.25, scaleY: 0.25, scaleZ: 0.25 },
  { name: "Alar Columellar Relation", vertexIndex: 48650, radius: 0.28, scaleX: 0.25, scaleY: 0.25, scaleZ: 0.3 },
  { name: "Tip Projection", vertexIndex: 48600, radius: 0.25, scaleX: 0.3, scaleY: 0.25, scaleZ: 0.3 },
  { name: "Tip Rotation", vertexIndex: 48600, radius: 0.25, scaleX: 0.25, scaleY: 0.25, scaleZ: 0.25 },
  { name: "Alar Flaring", vertexIndex: 48650, radius: 0.25, scaleX: 0.25, scaleY: 0.25, scaleZ: 0.3 },
  { name: "Nostril Ratio", vertexIndex: 48550, radius: 0.4, scaleX: 0.3, scaleY: 0.6, scaleZ: 0.3 },
];

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
   LANDMARKS & FEATURES
========================================= */
function Landmarks({ points }) {
  const [hovered, setHovered] = useState(null);
  if (!points || points.length === 0) return null;
  return points.map((p, i) => (
    <mesh key={i} position={p.position}
      onPointerOver={(e) => { e.stopPropagation(); setHovered(i); }}
      onPointerOut={() => setHovered(null)}
    >
      <sphereGeometry args={[0.02, 16, 16]} />
      <meshStandardMaterial
        color={hovered === i ? "yellow" : "red"}
        emissive={hovered === i ? "yellow" : "red"}
        emissiveIntensity={hovered === i ? 4 : 2}
      />
      {hovered === i && (
        <Html distanceFactor={10} style={{
          background: "white", padding: "2px 4px", borderRadius: "4px", fontSize: "4px",
          fontWeight: "bold", whiteSpace: "nowrap", boxShadow: "0px 1px 3px rgba(0,0,0,0.25)"
        }}>{p.name}</Html>
      )}
    </mesh>
  ));
}

function FeatureLabel({ position, name, score }) {
  return (
    <Billboard position={position} scale={0.05}>
      <Html center transform distanceFactor={12} style={{ pointerEvents: "none" }}>
        <div style={{
          background: "white", padding: "10px 14px", borderRadius: "14px",
          boxShadow: "0 8px 25px rgba(0,0,0,0.15)", border: "1px solid #e5e7eb",
          fontSize: "20px", minWidth: "100px", textAlign: "center"
        }}>
          <div style={{ fontWeight: "700", marginBottom: "1px" }}>{name}</div>
        </div>
        <div style={{
          width: 0, height: 0,
          borderLeft: "8px solid transparent", borderRight: "8px solid transparent",
          borderTop: "10px solid white", margin: "0 auto"
        }}/>
      </Html>
    </Billboard>
  );
}

function HighlightSphere({ position, radius = 0.15, scaleX = 2, scaleY = 1.5, scaleZ = 1 }) {
  if (!position) return null;
  return (
    <mesh position={position} scale={[scaleX, scaleY, scaleZ]}>
      <sphereGeometry args={[radius, 32, 32]} />
      <meshStandardMaterial color="#60a5fa" transparent opacity={0.25} roughness={0.2} metalness={0.1}/>
    </mesh>
  );
}

/* =========================================
   OBJ MODEL & CALCULATION LOGIC
========================================= */

function VertexColorModel({ objUrl, flipFront = false, rotateY = 0, onCalculated, scores }){
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

    const calcFeatures = FEATURE_INDICES.map((ft, idx) => ({
  name: ft.name,
  center: getVertexWorldPosition(meshFound, ft.vertexIndex),
  score: scores?.[idx] ?? 0,
  radius: ft.radius,
  scaleX: ft.scaleX,
  scaleY: ft.scaleY,
  scaleZ: ft.scaleZ
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
export default function ThreeD_PrePostComparison() {
  const navigate = useNavigate();  
  const { patientId } = useParams();
  const [preScores, setPreScores] = useState([]);
  const [postScores, setPostScores] = useState([]);
  const [preFilename, setPreFilename] = useState(null);
  const [postFilename, setPostFilename] = useState(null);

  const preOpUrl = preFilename
  ? `/results/${preFilename.replace(".obj", "_obj.obj")}`
  : null;

  const postOpUrl = postFilename
    ? `/results/${postFilename.replace(".obj", "_obj.obj")}`
    : null;

  const [preOpData, setPreOpData] = useState({ landmarks: [], features: [] });
  const [postOpData, setPostOpData] = useState({ landmarks: [], features: [] });
  const [showPanel, setShowPanel] = useState(true);
  const [showLandmarks, setShowLandmarks] = useState(false);
  const [showFeatures, setShowFeatures] = useState(false);
  const [selectedFeature, setSelectedFeature] = useState(null);
  // const features = preOpData.features.map((f, i) => ({
  //   name: f.name,
  //   preScore: preScores[i] ?? 0,
  //   postScore: postScores[i] ?? 0,
  // }));
  useEffect(() => {
  if (!patientId) return;

  const fetchData = async () => {
    try {
      const res = await fetch(`http://localhost:8000/comparison/${patientId}`);
      const data = await res.json();

      setPreScores(data.preop?.scores || []);
      setPostScores(data.postop?.scores || []);

      setPreFilename(data.preop?.filename);
      setPostFilename(data.postop?.filename);

    } catch (err) {
      console.error("Error fetching comparison data:", err);
    }
  };

  fetchData();
}, [patientId]);

 return (
  <div className="min-h-screen w-full bg-gradient-to-b from-gray-100 to-gray-300 flex flex-col items-center justify-center">
    <h1 className="text-3xl font-semibold mb-4 text-gray-700 tracking-tight">Pre-Op vs Post-Op Viewer</h1>

    <div className="flex gap-4 mb-4 z-20">
      <button
        onClick={() => navigate(`/rhinoplasty/${patientId}`)}
        className="relative bg-[linear-gradient(#262626,#262626),linear-gradient(#3b82f6,#3b82f6)] bg-[length:100%_2px,0_2px] bg-[position:100%_100%,0_100%] bg-no-repeat text-neutral-950 text-xl transition-[background-size] duration-300 hover:bg-[0_2px,100%_2px]"
      >
        Back to Analysis
      </button>
    </div>
    <div className="flex gap-3 mb-3">
  <button
    onClick={() => setShowLandmarks(prev => !prev)}
    className="px-4 py-2 bg-white rounded-lg shadow"
  >
    {showLandmarks ? "Hide Landmarks" : "Show Landmarks"}
  </button>

  <button
    onClick={() => setShowFeatures(prev => !prev)}
    className="px-4 py-2 bg-white rounded-lg shadow"
  >
    {showFeatures ? "Hide Features" : "Show Features"}
  </button>
</div>

    <div
      className="relative grid grid-cols-2 gap-4 rounded-2xl shadow-2xl border border-gray-300 p-4"
      style={{
        width: "90vw",
        height: "85vh",
        background: "radial-gradient(circle at center, #fafafa, #e5e5e5)",
      }}
    >
      {/* ======================= PRE-OP CANVAS ======================= */}
      <div className="w-full h-full rounded-xl overflow-hidden border bg-white shadow">
        <Canvas camera={{ position: [0, 0, 3], fov: 45 }}>
          <ambientLight intensity={0.6} />
          <directionalLight position={[1.5, 2, 3]} intensity={1.6} />
          <pointLight position={[-2, -1, 3]} intensity={1.2} />

          <VertexColorModel
            objUrl={preOpUrl}
            rotateY={Math.PI / 2}
            onCalculated={setPreOpData}
            scores={preScores}
          />
          <Landmarks points={showLandmarks ? preOpData.landmarks : []} />

          {showFeatures && preOpData.features?.map((f, i) => (
            <group key={`pre-${i}`}>
              {selectedFeature === i && (
                <>
                  <HighlightSphere
                    position={f.center}
                    radius={f.radius}
                    scaleX={f.scaleX}
                    scaleY={f.scaleY}
                    scaleZ={f.scaleZ}
                    active={true}
                  />
                  {/* <FeatureLabel position={f.center} name={f.name} /> */}
                </>
              )}
            </group>
          ))}

          <HorizontalControls />
        </Canvas>
      </div>

      {/* ======================= POST-OP CANVAS ======================= */}
      <div className="w-full h-full rounded-xl overflow-hidden border bg-white shadow">
        <Canvas camera={{ position: [0, 0, 3], fov: 45 }}>
          <ambientLight intensity={0.6} />
          <directionalLight position={[1.5, 2, 3]} intensity={1.6} />
          <pointLight position={[-2, -1, 3]} intensity={1.2} />

          <VertexColorModel
            objUrl={postOpUrl}
            rotateY={Math.PI / 2}
            onCalculated={setPostOpData}
            scores={postScores}
          />

          <Landmarks points={showLandmarks ? postOpData.landmarks : []} />

          {showFeatures && postOpData.features?.map((f, i) => (
            <group key={`post-${i}`}>
              {selectedFeature === i && (
                <>
                  <HighlightSphere
                    position={f.center}
                    radius={f.radius}
                    scaleX={f.scaleX}
                    scaleY={f.scaleY}
                    scaleZ={f.scaleZ}
                    active={true}
                  />
                  {/* <FeatureLabel position={f.center} name={f.name} /> */}
                </>
              )}
            </group>
          ))}

          <HorizontalControls />
        </Canvas>
      </div>

      {/* ======================= COLLAPSIBLE PANEL BUTTON ======================= */}
      <button
        onClick={() => setShowPanel(!showPanel)}
       className="absolute top-5 right-5 z-30 px-4 py-2 bg-white text-blue-600 font-semibold rounded-xl shadow-md hover:bg-blue-50 hover:text-blue-700 transition-all duration-200"
      >
        {showPanel ? "Hide Panel" : "Show Panel"}
      </button>

      {/* ======================= COLLAPSIBLE COMPARISON PANEL ======================= */}
<div
  className={`absolute left-5 top-5 z-20
    bg-gradient-to-br from-white/90 via-blue-50/70 to-white/60
    p-6 rounded-2xl
    shadow-[0_15px_40px_rgba(0,0,0,0.2)]
    border border-white/70
    max-h-[80vh] overflow-y-auto
    transition-all duration-300
    ${showPanel ? "w-96 opacity-100 translate-x-0" : "w-0 opacity-0 translate-x-10 pointer-events-none"}
  `}
>
  {showPanel && (() => {
  const features = preOpData.features.map((f, i) => ({
    name: f.name,
    preScore: preScores[i] ?? 0,
    postScore: postScores[i] ?? 0,
  }));

  return (
    <>
      <h2 className="font-bold text-lg mb-2">Feature Comparison</h2>

      {features.map((f, i) => {
        const diff = f.postScore - f.preScore;

        return (
          <div key={i} className="flex justify-between mb-1">
            <button
              onClick={() => setSelectedFeature(i)}
              className={`flex justify-between w-full text-left px-2 py-1 rounded-lg transition
                ${selectedFeature === i ? "bg-blue-100 font-semibold" : "hover:bg-gray-100"}
              `}
            >
              <span>{f.name}</span>

              <span className={`${diff > 0 ? "text-green-600" : diff < 0 ? "text-red-600" : ""}`}>
                {f.preScore} → {f.postScore} ({diff >= 0 ? "+" : ""}{diff})
              </span>
            </button>
           
          </div>
        );
      })}

      <NoseAnalysis features={features} mode="comparison" />
    </>
  );
})()}
 
</div>
    </div>
  </div>
);
}
