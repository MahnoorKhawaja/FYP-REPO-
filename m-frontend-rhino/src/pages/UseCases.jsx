import { FileText, Camera, Box, Scan, Workflow, CheckCircle } from "lucide-react";

const UseCaseCard = ({ icon: Icon, title, children }) => {
  return (
    <div className="p-6 bg-slate-700/40 border border-slate-600 rounded-lg flex flex-col">
      <div className="flex items-center gap-4">
        <div className="p-3 bg-blue-500/20 rounded-lg">
          <Icon className="w-6 h-6 text-blue-400" />
        </div>
        <h3 className="text-xl font-semibold text-white">{title}</h3>
      </div>
      <div className="mt-4 text-slate-300 flex-1">{children}</div>
    </div>
  );
};

const UseCases = () => {
  return (
    <main className="w-full min-h-screen bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900">
      <div className="absolute inset-0 pointer-events-none opacity-5">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-400 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/3 right-1/4 w-80 h-80 bg-blue-300 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10">
        <header className="w-full py-12 sm:py-16 lg:py-20 border-b border-slate-700/50">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl sm:text-5xl font-bold text-white">Project Documentation</h1>
            <p className="mt-4 text-lg sm:text-xl text-slate-200 max-w-3xl mx-auto">
              Explore the core functional use cases that power Rhinovision. From image upload to AI-driven nasal
              deformity analysis and 3D visualization.
            </p>
          </div>
        </header>

        <section className="w-full py-12 sm:py-16 lg:py-20">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-white mb-6">System Use Cases</h2>

            <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2">

              <UseCaseCard icon={Camera} title="Upload 2D Photographs">
                <p className="text-sm">
                  Surgeons upload standardized facial images for AI-assisted preprocessing and reconstruction. Images must
                  meet clinical quality standards for accurate downstream analysis.
                </p>
              </UseCaseCard>

              <UseCaseCard icon={Box} title="Generate 3D Nasal Model">
                <p className="text-sm">
                  The system reconstructs a 3D nasal structure using deep learning pipelines, enabling accurate surface
                  geometry estimation from 2D images.
                </p>
              </UseCaseCard>

              <UseCaseCard icon={Scan} title="AI-Driven Deformity Analysis">
                <p className="text-sm">
                  Rhinovision detects nasal asymmetries, deviations, and morphological variations using landmark-based and
                  learned-feature algorithms.
                </p>
              </UseCaseCard>

              <UseCaseCard icon={Workflow} title="Severity Classification (ML)">
                <p className="text-sm">
                  Machine learning models assess deformity severity levels using surgeon-validated annotation pipelines and
                  multi-view geometric cues.
                </p>
              </UseCaseCard>

              <UseCaseCard icon={FileText} title="Report Generation">
                <p className="text-sm">
                  Automatically generated standardized clinical reports summarize deformities, measurements, and predicted
                  surgical outcomes for pre-operative evaluation.
                </p>
              </UseCaseCard>

              <UseCaseCard icon={CheckCircle} title="Outcome Comparison">
                <p className="text-sm">
                  Visual comparison modules allow surgeons to evaluate pre- and post-operative results using identical
                  viewing parameters and angle-matched projections.
                </p>
              </UseCaseCard>

            </div>
          </div>
        </section>
      </div>
    </main>
  );
};

export default UseCases;
