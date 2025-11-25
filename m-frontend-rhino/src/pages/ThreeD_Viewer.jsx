import React, { useMemo, useRef, useEffect } from "react";
import { Canvas, useLoader, useThree } from "@react-three/fiber";
import { OrbitControls } from "three-stdlib";
import * as THREE from "three";
import { OBJLoader } from "three-stdlib";

// --- Custom Controls (to mimic Debug rotation) ---
function HorizontalControls() {
  const { camera, gl } = useThree();
  const controlsRef = useRef();

  useEffect(() => {
    const controls = new OrbitControls(camera, gl.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.08;
    controls.enableZoom = false;
    controls.enablePan = false;

    // 🧭 Allow only horizontal rotation
    controls.minPolarAngle = Math.PI / 2;
    controls.maxPolarAngle = Math.PI / 2;

    // 🧠 Start slightly above center
    controls.target.set(0, 0, 0);

    controlsRef.current = controls;

    const animate = () => {
      requestAnimationFrame(animate);
      controls.update();
    };
    animate();

    return () => controls.dispose();
  }, [camera, gl]);

  return null;
}

// --- Model Component ---
function VertexColorModel({ objUrl, flipFront = false, rotateY = 0 }) {
  const obj = useLoader(OBJLoader, objUrl);

  useMemo(() => {
    obj.traverse((child) => {
      if (child.isMesh) {
        const geometry = child.geometry;

        // --- Detect and convert per-vertex RGB colors ---
        const positionAttr = geometry.attributes.position;
        const vertexData = positionAttr.array;
        const stride = vertexData.length / positionAttr.count;

        if (stride >= 6) {
          const colors = [];
          for (let i = 0; i < vertexData.length; i += stride) {
            const r = Math.min(vertexData[i + 3] * 1.3, 1.0);
            const g = Math.min(vertexData[i + 4] * 1.3, 1.0);
            const b = Math.min(vertexData[i + 5] * 1.3, 1.0);
            colors.push(r, g, b);
          }
          geometry.setAttribute("color", new THREE.Float32BufferAttribute(colors, 3));
        }

        geometry.computeVertexNormals();

        child.material = new THREE.MeshLambertMaterial({
          vertexColors: true,
          side: THREE.DoubleSide,
        });
      }
    });

    // --- Normalize and center ---
    const box = new THREE.Box3().setFromObject(obj);
    const center = box.getCenter(new THREE.Vector3());
    const size = box.getSize(new THREE.Vector3()).length();
    obj.position.sub(center);
    obj.scale.multiplyScalar(1.8 / size);

    // --- Upright fix ---
    obj.rotation.x = 0; // no tilt
    obj.rotation.y = rotateY;
    if (flipFront) obj.rotation.y += Math.PI;
  }, [obj, flipFront, rotateY]);

  return <primitive object={obj} />;
}

// --- Main Viewer Component ---
export default function ThreeD_VertexColorViewer() {
  const filename = localStorage.getItem("resultFilename");
  const newFilename = filename.replace(".obj", "_obj.obj");
  const url = `/results/${newFilename}`;
  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-gray-100 to-gray-300 flex flex-col items-center justify-center">
      <h1 className="text-3xl font-semibold mb-4 text-gray-700 tracking-tight">
        3D Vertex Color Viewer (.OBJ)
      </h1>

      <div
        className="relative rounded-2xl shadow-2xl border border-gray-300 overflow-hidden"
        style={{
          width: "90vw",
          height: "85vh",
          background: "radial-gradient(circle at center, #fafafa, #e5e5e5)",
        }}
      >
        <Canvas
          camera={{ position: [0, 0, 2.8], fov: 45 }}
          gl={{ antialias: true, outputEncoding: THREE.sRGBEncoding }}
        >
          {/* ✅ Lighting for Lambert material */}
          <ambientLight intensity={0.6} />
          <directionalLight position={[1.5, 2, 3]} intensity={1.6} />
          <pointLight position={[-2, -1, 3]} intensity={1.2} />

          {/* 👇 Model */}
          <VertexColorModel objUrl={url} rotateY={Math.PI / 2} />

          {/* 👇 Horizontal orbit controls (like debug viewer) */}
          <HorizontalControls />
        </Canvas>
      </div>
    </div>
  );
}
