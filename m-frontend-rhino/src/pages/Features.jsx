import { Upload, Zap, BarChart3, ArrowRight, Eye } from 'lucide-react';

function FeatureCard({ icon: Icon, title, description, details }) {
  return (
    <div className="p-6 bg-white/85 border border-blue-100 rounded-lg shadow-sm hover:shadow-md transition-shadow">
      <div className="flex items-start gap-4">
        <div className="p-3 bg-blue-50 rounded-lg">
          <Icon className="w-6 h-6 text-blue-600" />
        </div>
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-blue-900">{title}</h3>
          <p className="mt-2 text-sm text-gray-700">{description}</p>
          {details && (
            <ul className="mt-3 text-sm text-gray-600 space-y-1">
              {details.map((detail, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="text-blue-500 mt-1">•</span>
                  <span>{detail}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}

function ViewGrid() {
  const views = [
    { 
      name: 'Front View', 
      desc: 'Direct frontal perspective',
      imageUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop'
    },
    { 
      name: 'Left Profile', 
      desc: 'Left lateral perspective',
      imageUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300&h=300&fit=crop'
    },
    { 
      name: 'Right Profile', 
      desc: 'Right lateral perspective',
      imageUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop&flip=h'
    },
    { 
      name: 'Basal View', 
      desc: 'Bottom nasal perspective',
      imageUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=300&h=300&fit=crop'
    },
  ];
  return (
    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
      {views.map((view, idx) => (
        <div key={idx} className="p-4 bg-white/60 border border-blue-50 rounded-lg text-center hover:shadow-md transition-shadow">
          <div className="w-full h-32 bg-gradient-to-br from-blue-50 to-blue-100 rounded overflow-hidden mb-3 flex items-center justify-center">
            <img 
              src={view.imageUrl}
              alt={view.name}
              className="w-full h-full object-cover"
              onError={(e) => {
                e.target.style.display = 'none';
                e.target.parentElement.innerHTML = '<div className="text-gray-400 text-sm">Image</div>';
              }}
            />
          </div>
          <div className="text-sm font-medium text-blue-900">{view.name}</div>
          <div className="text-xs text-gray-500 mt-1">{view.desc}</div>
        </div>
      ))}
    </div>
  );
}

function AnalysisBox({ title, items }) {
  return (
    <div className="p-4 bg-white/70 border border-blue-100 rounded-lg">
      <div className="text-sm font-semibold text-blue-900">{title}</div>
      <ul className="mt-2 text-sm text-gray-700 space-y-1">
        {items.map((item, idx) => (
          <li key={idx} className="flex items-center gap-2">
            <span className="w-2 h-2 bg-blue-400 rounded-full"></span>
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}

const Features = () => {
  return (
    <main className="w-full min-h-screen bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900">
      {/* Subtle medical background pattern */}
      <div className="absolute inset-0 pointer-events-none opacity-10">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-300 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/3 right-1/4 w-80 h-80 bg-blue-200 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10">
        {/* Hero Header */}
        <header className="w-full py-12 sm:py-16 lg:py-20 border-b border-slate-700/50">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <h1 className="text-4xl sm:text-5xl font-bold text-white">
              Rhinoplasty Analysis Platform
            </h1>
            <p className="mt-4 text-lg sm:text-xl text-slate-200">
              Advanced AI-powered pre/post-operative nasal assessment and comparison
            </p>
            <p className="mt-3 text-base text-slate-300">
              Secure, clinical-grade analysis for surgical planning and outcome evaluation
            </p>
          </div>
        </header>

        {/* Main Features Overview */}
        <section className="w-full py-12 sm:py-16 lg:py-20">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-white mb-8">Platform Capabilities</h2>
            <div className="grid gap-6 sm:grid-cols-1 lg:grid-cols-2">
              <FeatureCard
                icon={Upload}
                title="Pre-Operative Image Upload"
                description="Surgeons upload four standardized facial views for initial assessment."
                details={[
                  'Front, left profile, right profile, and basal views',
                  'HIPAA-compliant secure upload',
                  'Automatic 3D nose model generation',
                  'Instant baseline analysis',
                ]}
              />
              <FeatureCard
                icon={Zap}
                title="Pre-Operative Analysis"
                description="Comprehensive automated assessment of pre-operative anatomy."
                details={[
                  'JRAS (JINNAH Rhinoplasty Assessment Score)',
                  'Nasal deformity detection',
                  'Facial and nasal landmark identification',
                  'Predictive deformity analysis',
                ]}
              />
              <FeatureCard
                icon={Upload}
                title="Post-Operative Image Upload"
                description="Upload the same four views after surgery for outcome evaluation."
                details={[
                  'Consistent view angles for accurate comparison',
                  'Time-stamped documentation',
                  'Multi-patient tracking',
                  'Seamless workflow integration',
                ]}
              />
              <FeatureCard
                icon={BarChart3}
                title="Pre vs Post Comparison"
                description="Side-by-side analysis showing surgical outcomes and improvements."
                details={[
                  'JRAS score before and after',
                  'Deformity improvement metrics',
                  'Anatomical change visualization',
                  'Clinical outcome reporting',
                ]}
              />
            </div>
          </div>
        </section>

        {/* Pre-Operative Section */}
        <section className="w-full py-12 sm:py-16 lg:py-20 border-t border-slate-700/50">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <div className="grid gap-8 lg:grid-cols-3 items-start">
              <div className="lg:col-span-2">
                <h2 className="text-3xl font-bold text-white">Pre-Operative Analysis</h2>
                <p className="mt-3 text-lg text-slate-200">
                  When surgeons upload pre-operative images, the platform automatically generates a comprehensive baseline assessment.
                </p>

                <div className="mt-8">
                  <h3 className="text-xl font-semibold text-blue-900 mb-4">Required Image Views</h3>
                  <ViewGrid />
                </div>

                <div className="mt-8 p-8 bg-white/80 border border-blue-100 rounded-lg">
                  <h3 className="text-xl font-semibold text-blue-900">Generated 3D Model</h3>
                  <p className="mt-3 text-gray-700">
                    From the four uploaded images, the system generates an interactive 3D model of the patient's current nasal anatomy. This model serves as the baseline for surgical planning and post-operative comparison.
                  </p>
                  <div className="mt-6 w-full h-64 bg-gradient-to-br from-blue-100 to-blue-50 border border-blue-100 rounded-lg flex items-center justify-center overflow-hidden">
                    <img 
                      src="https://images.unsplash.com/photo-1576091160550-112173f7f869?w=400&h=300&fit=crop"
                      alt="3D Model"
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.target.style.display = 'none';
                        e.target.parentElement.innerHTML = '<div className="text-center"><p className="text-gray-500">3D Model Visualization</p></div>';
                      }}
                    />
                  </div>
                </div>
              </div>

              <aside className="lg:col-span-1">
                <div className="sticky top-6 space-y-4">
                  <AnalysisBox
                    title="JRAS Score"
                    items={[
                      'Quantified aesthetic assessment',
                      '0–48 scale',
                      'Clinical reference standard',
                    ]}
                  />
                  <AnalysisBox
                    title="Detected Deformities"
                    items={[
                      'Dorsal hump',
                      'Tip deviation',
                      'Nasal asymmetry',
                      'Wide nasal base',
                    ]}
                  />
                  <AnalysisBox
                    title="Anatomical Landmarks"
                    items={[
                      'Nasion, radix, dorsum',
                      'Tip, columella',
                      'Alar base, nostrils',
                    ]}
                  />
                  <AnalysisBox
                    title="Predictions"
                    items={[
                      'Possible septal deviation',
                      'Likely procedural needs',
                      'Surgical complexity estimate',
                    ]}
                  />
                </div>
              </aside>
            </div>
          </div>
        </section>

        {/* Post-Operative Section */}
        <section className="w-full py-12 sm:py-16 lg:py-20 border-t border-slate-700/50">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <div className="grid gap-8 lg:grid-cols-3 items-start">
              <div className="lg:col-span-2">
                <h2 className="text-3xl font-bold text-white">Post-Operative Evaluation</h2>
                <p className="mt-3 text-lg text-slate-200">
                  After surgery, surgeons upload the same four views. The platform automatically compares pre/post images, quantifies improvements, and generates comprehensive outcome reports.
                </p>

                <div className="mt-8 p-8 bg-white/80 border border-blue-100 rounded-lg">
                  <h3 className="text-xl font-semibold text-blue-900 mb-4">Comparison & Results</h3>
                  <div className="space-y-4">
                    <div className="grid gap-4 sm:grid-cols-2">
                      <div className="p-4 bg-blue-50/50 border border-blue-100 rounded">
                        <div className="text-sm font-medium text-blue-900">Pre-Op JRAS Score</div>
                        <div className="mt-2 text-2xl font-bold text-blue-800">31/48</div>
                      </div>
                      <div className="p-4 bg-blue-50/50 border border-blue-100 rounded">
                        <div className="text-sm font-medium text-blue-900">Post-Op JRAS Score</div>
                        <div className="mt-2 text-2xl font-bold text-green-700">39/48</div>
                      </div>
                    </div>

                    <div className="p-4 bg-white/60 border border-blue-50 rounded">
                      <div className="flex items-center justify-between">
                        <div className="text-sm font-medium text-gray-700">Overall Improvement</div>
                        <div className="flex items-center gap-2 text-green-700">
                          <ArrowRight className="w-4 h-4 rotate-90" />
                          <span className="font-semibold">+8 points</span>
                        </div>
                      </div>
                    </div>

                    <div className="grid gap-4 sm:grid-cols-2">
                      <div className="p-4 bg-white/70 border border-blue-100 rounded">
                        <div className="text-sm font-semibold text-blue-900 mb-2">Pre-Op Deformities</div>
                        <ul className="text-sm text-gray-700 space-y-1">
                          <li className="flex items-center gap-2"><span className="w-2 h-2 bg-red-400 rounded-full"></span>Dorsal hump</li>
                          <li className="flex items-center gap-2"><span className="w-2 h-2 bg-red-400 rounded-full"></span>Wide nasal base</li>
                          <li className="flex items-center gap-2"><span className="w-2 h-2 bg-red-400 rounded-full"></span>Tip asymmetry</li>
                        </ul>
                      </div>
                      <div className="p-4 bg-white/70 border border-blue-100 rounded">
                        <div className="text-sm font-semibold text-blue-900 mb-2">Post-Op Deformities</div>
                        <ul className="text-sm text-gray-700 space-y-1">
                          <li className="flex items-center gap-2"><span className="w-2 h-2 bg-green-400 rounded-full"></span>Dorsal contour improved</li>
                          <li className="flex items-center gap-2"><span className="w-2 h-2 bg-green-400 rounded-full"></span>Nasal base refined</li>
                          <li className="flex items-center gap-2"><span className="w-2 h-2 bg-green-400 rounded-full"></span>Tip symmetry achieved</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <aside className="lg:col-span-1">
                <div className="sticky top-6 p-6 bg-white/85 border border-blue-100 rounded-lg">
                  <h3 className="text-lg font-semibold text-blue-900">Analysis Metrics</h3>
                  <div className="mt-4 space-y-3">
                    <div className="pb-3 border-b border-blue-100">
                      <div className="text-xs font-semibold text-gray-500 uppercase">JRAS Comparison</div>
                      <div className="mt-1 text-sm text-gray-700">Score improvement from baseline to post-operative</div>
                    </div>
                    <div className="pb-3 border-b border-blue-100">
                      <div className="text-xs font-semibold text-gray-500 uppercase">Deformity Resolution</div>
                      <div className="mt-1 text-sm text-gray-700">Percentage of detected pre-op issues resolved</div>
                    </div>
                    <div>
                      <div className="text-xs font-semibold text-gray-500 uppercase">Anatomical Changes</div>
                      <div className="mt-1 text-sm text-gray-700">Quantified changes in landmark positions and proportions</div>
                    </div>
                  </div>
                </div>
              </aside>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="w-full py-12 sm:py-16 bg-gradient-to-r from-blue-600 to-blue-700 text-white">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold">Ready to Transform Surgical Outcomes?</h2>
            <p className="mt-4 text-lg text-blue-100">
              Join leading surgeons using AI-powered rhinoplasty analysis for precision planning and objective outcome evaluation.
            </p>
            <button className="mt-8 px-8 py-3 bg-white text-blue-700 font-semibold rounded-lg hover:bg-blue-50 transition-colors">
              Get Started Today
            </button>
          </div>
        </section>
      </div>
    </main>
  );
};

export default Features;
