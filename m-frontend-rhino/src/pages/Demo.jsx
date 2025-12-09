import { gsap } from "gsap";
import { Cpu, Play, UploadCloud } from "lucide-react";
import { useEffect, useRef, useState } from "react";

const UsecaseBadge = ({ icon: Icon, title }) => (
  <div className="inline-flex items-center gap-3 px-4 py-2 bg-slate-800/50 border border-slate-700 rounded-full">
    <div className="p-2 bg-blue-500/20 rounded-md">
      <Icon className="w-5 h-5 text-blue-400" />
    </div>
    <span className="text-sm text-slate-200 font-medium">{title}</span>
  </div>
);

const Demo = () => {
  const dropRef = useRef(null);
  const uploadIconRef = useRef(null);
  const pipelineRef = useRef(null);
  const viewerRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [fileName, setFileName] = useState("");
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [showViewer, setShowViewer] = useState(false);

  useEffect(() => {
    // Kill any existing GSAP animations on these elements first
    gsap.killTweensOf(".demo-header");
    gsap.killTweensOf(".demo-grid");
    
    // Set initial state to visible (prevents flash)
    gsap.set(".demo-header", { opacity: 1, y: 0 });
    gsap.set(".demo-grid", { opacity: 1, y: 0 });
    
    // Then animate
    gsap.from(".demo-header", { y: -20, opacity: 0, duration: 0.6 });
    gsap.from(".demo-grid", { y: 20, opacity: 0, duration: 0.6, delay: 0.15, stagger: 0.08 });
    
    // Cleanup on unmount
    return () => {
      gsap.killTweensOf(".demo-header");
      gsap.killTweensOf(".demo-grid");
    };
  }, []);

  useEffect(() => {
    const el = uploadIconRef.current;
    if (!el) return;

    const hover = gsap.to(el, {
      scale: 1.08,
      rotation: 6,
      duration: 0.4,
      paused: true,
      ease: "power1.out"
    });

    const onEnter = () => hover.play();
    const onLeave = () => hover.reverse();

    el.addEventListener("mouseenter", onEnter);
    el.addEventListener("mouseleave", onLeave);

    return () => {
      el.removeEventListener("mouseenter", onEnter);
      el.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  useEffect(() => {
    if (!pipelineRef.current) return;
    const dots = pipelineRef.current.querySelectorAll(".dot");
    gsap.set(dots, { y: 0 });

    const tl = gsap.timeline({ repeat: -1, paused: true });
    tl.to(dots, { y: -8, stagger: 0.12, duration: 0.35 }).to(
      dots,
      { y: 0, stagger: 0.12, duration: 0.25 },
      "+=0.08"
    );

    if (uploading) tl.play();
    return () => tl.kill();
  }, [uploading]);

  useEffect(() => {
    if (showViewer && viewerRef.current) {
      gsap.fromTo(
        viewerRef.current,
        { opacity: 0, y: 10, scale: 0.98 },
        { opacity: 1, y: 0, scale: 1, duration: 0.6 }
      );
    }
  }, [showViewer]);

  const onDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (!isDragging) setIsDragging(true);
  };
  const onDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };
  const onDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    const f = e.dataTransfer.files && e.dataTransfer.files[0];
    if (f) handleFile(f);
  };

  const fileInputRef = useRef(null);
  const triggerFile = () => fileInputRef.current?.click();

  const handleFile = (f) => setFileName(f.name);

  const startDemo = async () => {
    setShowViewer(false);
    setProgress(0);
    setUploading(true);

    const steps = [10, 30, 55, 72, 90, 100];
    for (let s of steps) {
      await new Promise((r) => setTimeout(r, 700 + Math.random() * 600));
      setProgress(s);
    }

    setUploading(false);
    setShowViewer(true);
  };

  return (
    <main className="w-full min-h-screen bg-slate-900 relative">

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <header className="demo-header text-center mb-10">
          <h1 className="text-4xl sm:text-5xl font-bold text-white">Interactive Demo</h1>
          <p className="mt-3 text-slate-300 max-w-2xl mx-auto">
            Try a mock run of RhinoVision's pipeline. Upload an image, watch the simulated AI pipeline, and preview a mock 3D viewer.
          </p>
        </header>

        <div className="demo-grid grid gap-8 lg:grid-cols-3">
          {/* LEFT PANEL */}
          <div className="col-span-1 bg-slate-800/40 border border-slate-700 rounded-lg p-6 backdrop-blur-sm">
            <div
              ref={dropRef}
              onDragOver={onDragOver}
              onDragLeave={onDragLeave}
              onDrop={onDrop}
              onClick={triggerFile}
              className={`p-6 rounded-lg border-2 cursor-pointer transition ${
                isDragging
                  ? "border-blue-400 bg-slate-700/60"
                  : "border-slate-700/40 bg-slate-800/30"
              }`}
            >
              <div className="flex items-center gap-4">
                <div ref={uploadIconRef} className="p-3 bg-blue-500/10 rounded-md">
                  <UploadCloud className="w-8 h-8 text-blue-400" />
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-white">Upload & Preprocess</h3>
                  <p className="text-slate-300 text-sm">
                    Drag & drop or click to select a face image.
                  </p>
                </div>
              </div>

              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => e.target.files?.[0] && handleFile(e.target.files[0])}
              />

              <div className="mt-6 text-sm text-slate-200">
                {fileName ? fileName : <span className="text-slate-400">No file selected</span>}
              </div>

              <button
                className="mt-4 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-md flex items-center gap-2"
                onClick={(e) => {
                  e.stopPropagation();
                  if (!fileName) triggerFile();
                  else startDemo();
                }}
              >
                <Play className="w-4 h-4" />
                {fileName ? "Run Pipeline" : "Select & Try"}
              </button>

              <div className="mt-6 flex gap-3 flex-wrap">
                <UsecaseBadge icon={Cpu} title="AI Pipeline" />
                <UsecaseBadge icon={Play} title="Interactive" />
              </div>
            </div>
          </div>

          {/* MIDDLE PANEL */}
          <div className="col-span-1 bg-slate-800/30 border border-slate-700 rounded-lg p-6 backdrop-blur-sm">
            <h3 className="text-lg font-semibold text-white">AI Processing Pipeline</h3>

            <div className="mt-6">
              <div className="w-full bg-slate-700/40 rounded-full h-3 border border-slate-700 overflow-hidden">
                <div
                  className="h-3 bg-gradient-to-r from-blue-500 to-cyan-400 transition-all"
                  style={{ width: `${progress}%` }}
                />
              </div>

              <div className="mt-3 flex items-center justify-between text-sm text-slate-300">
                <span>{uploading ? "Processing…" : showViewer ? "Complete" : "Idle"}</span>
                <span>{progress}%</span>
              </div>

              <div ref={pipelineRef} className="mt-5 flex items-center gap-2">
                <div className="dot w-2 h-2 rounded-full bg-blue-400" />
                <div className="dot w-2 h-2 rounded-full bg-blue-400/80" />
                <div className="dot w-2 h-2 rounded-full bg-blue-400/60" />
                <div className="ml-3 text-xs text-slate-400">
                  preprocess → align → extract → classify
                </div>
              </div>

              <button
                className="mt-6 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-md"
                onClick={startDemo}
                disabled={uploading}
              >
                {uploading ? "Running…" : "Try Pipeline"}
              </button>
            </div>
          </div>

          {/* RIGHT PANEL */}
          <div className="col-span-1 bg-slate-800/20 border border-slate-700 rounded-lg p-6 backdrop-blur-sm">
            <h3 className="text-lg font-semibold text-white">3D Viewer (placeholder)</h3>

            <div
              ref={viewerRef}
              className={`mt-6 w-full h-64 rounded-lg border border-slate-700/40 flex items-center justify-center bg-slate-800/40 ${
                showViewer ? "opacity-100" : "opacity-60"
              }`}
            >
              {!showViewer ? (
                <div className="text-center text-slate-400">Processing preview…</div>
              ) : (
                <div className="w-40 h-40 perspective-800">
                  <div className="relative w-full h-full transform-style-preserve-3d animate-rotate-cube">
                    <div className="absolute inset-0 bg-slate-700/40 border border-slate-600 rounded-md" />
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .perspective-800 { perspective: 800px; }
        .transform-style-preserve-3d { transform-style: preserve-3d; }
        @keyframes rotate-cube {
          0% { transform: rotateX(0) rotateY(0); }
          50% { transform: rotateX(20deg) rotateY(180deg); }
          100% { transform: rotateX(0) rotateY(360deg); }
        }
        .animate-rotate-cube { animation: rotate-cube 6s linear infinite; }
      `}</style>
    </main>
  );
};

export default Demo;
