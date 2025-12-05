import { Users, Zap, Eye, Brain, TrendingUp, CheckCircle } from 'lucide-react';

function SectionHeading({ title, subtitle }) {
  return (
    <div className="mb-8">
      <h2 className="text-3xl sm:text-4xl font-bold text-white">{title}</h2>
      {subtitle && <p className="mt-2 text-lg text-slate-300">{subtitle}</p>}
    </div>
  );
}

function Card({ icon: Icon, title, items }) {
  return (
    <div className="p-6 bg-slate-700/40 border border-slate-600 rounded-lg hover:bg-slate-700/60 transition-colors">
      <div className="flex items-start gap-4">
        {Icon && (
          <div className="p-3 bg-blue-500/20 rounded-lg">
            <Icon className="w-6 h-6 text-blue-400" />
          </div>
        )}
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-white">{title}</h3>
          {items && (
            <ul className="mt-3 space-y-2">
              {items.map((item, idx) => (
                <li key={idx} className="text-sm text-slate-300 flex items-start gap-2">
                  <span className="text-blue-400 mt-1">•</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}

function BulletList({ items }) {
  return (
    <ul className="space-y-3">
      {items.map((item, idx) => (
        <li key={idx} className="text-slate-200 flex items-start gap-3">
          <CheckCircle className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

const About = () => {
  return (
    <main className="w-full min-h-screen bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900">
      {/* Background accents */}
      <div className="absolute inset-0 pointer-events-none opacity-5">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-400 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/3 right-1/4 w-80 h-80 bg-blue-300 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10">
        {/* Hero Header */}
        <header className="w-full py-12 sm:py-16 lg:py-20 border-b border-slate-700/50">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <h1 className="text-4xl sm:text-5xl font-bold text-white">
              About Rhino Vision
            </h1>
            <p className="mt-4 text-lg sm:text-xl text-slate-200">
              AI-Powered Objective Assessment for Rhinoplasty
            </p>
            <p className="mt-3 text-base text-slate-300">
              Transforming clinical research into precision surgical planning and outcome evaluation
            </p>
          </div>
        </header>

        {/* Collaboration Statement */}
        <section className="w-full py-12 sm:py-16 lg:py-20">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <SectionHeading 
              title="Collaboration & Research Foundation" 
              subtitle="Built on peer-reviewed clinical expertise"
            />
            <div className="grid gap-8 lg:grid-cols-2 items-center">
              <div className="space-y-4">
                <p className="text-slate-200 text-lg">
                  Rhino Vision is developed in collaboration with <span className="text-blue-400 font-semibold">Jinnah Hospital</span>, implementing their groundbreaking research paper:
                </p>
                <div className="p-6 bg-blue-500/10 border border-blue-500/30 rounded-lg">
                  <p className="text-white font-semibold italic">
                    "Assessing Outcome in Aesthetic Rhinoplasty — Surgeon, Assessor, and Patient Perspective"
                  </p>
                </div>
                <p className="text-slate-200">
                  This research provides the theoretical foundation for objective, standardized evaluation. Rhino Vision transforms this academic work into a <span className="text-blue-400 font-semibold">practical, deployed system</span> that surgeons can use daily.
                </p>
              </div>
              <div className="h-64 bg-gradient-to-br from-blue-500/20 to-slate-700/40 border border-slate-600 rounded-lg flex items-center justify-center overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1576091160550-112173f7f869?w=500&h=400&fit=crop"
                  alt="Medical Research"
                  className="w-full h-full object-cover opacity-80"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Problem Statement & Solution */}
        <section className="w-full py-12 sm:py-16 lg:py-20 border-t border-slate-700/50">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <SectionHeading 
              title="The Challenge & Solution" 
              subtitle="From subjective assessment to objective precision"
            />
            <div className="grid gap-8 md:grid-cols-2">
              <Card
                icon={Brain}
                title="The Problem: Subjectivity"
                items={[
                  'Traditional methods (ROE, NOSE) rely on human judgment',
                  'Surgeon bias affects outcome assessment',
                  'Inconsistent evaluation across practitioners',
                  'Difficulty predicting surgical outcomes',
                  'Patient expectations often unmet',
                  'Limited post-operative comparison',
                ]}
              />
              <Card
                icon={Zap}
                title="Our Solution: AI-Driven Objectivity"
                items={[
                  'Automated 3D nasal model generation',
                  'Standardized deformity classification',
                  'Precise anatomical measurements',
                  'Objective aesthetic scoring (JRAS)',
                  'Predictive outcome visualization',
                  'Unbiased pre/post comparison',
                ]}
              />
            </div>
          </div>
        </section>

        {/* Platform Capabilities */}
        <section className="w-full py-12 sm:py-16 lg:py-20 border-t border-slate-700/50">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <SectionHeading 
              title="Platform Capabilities" 
              subtitle="Comprehensive tools for surgical excellence"
            />
            <div className="space-y-6">
              <div className="p-6 bg-slate-700/40 border border-slate-600 rounded-lg">
                <h3 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
                  <Eye className="w-6 h-6 text-blue-400" />
                  Pre-Operative Analysis
                </h3>
                <BulletList items={[
                  '3D nasal model generation from 2D patient images',
                  'Automated detection and classification of nasal deformities',
                  'Calculation of nasal and facial angles',
                  'Anatomical landmark identification and annotation',
                  'Rule-based surgical strategy recommendations',
                  'Predictive outcome visualizations for patient consultation',
                ]} />
              </div>

              <div className="p-6 bg-slate-700/40 border border-slate-600 rounded-lg">
                <h3 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
                  <TrendingUp className="w-6 h-6 text-blue-400" />
                  Post-Operative Evaluation
                </h3>
                <BulletList items={[
                  'Comparison of predicted vs. actual post-operative results',
                  'Updated JRAS scoring for objective outcome measurement',
                  'Deformity improvement visualization',
                  'Anatomical change quantification',
                  'Standardized, bias-free assessment',
                  'Comprehensive outcome documentation',
                ]} />
              </div>
            </div>
          </div>
        </section>

        {/* Goals & Objectives */}
        <section className="w-full py-12 sm:py-16 lg:py-20 border-t border-slate-700/50">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <SectionHeading 
              title="Goals & Objectives" 
              subtitle="What we aim to achieve"
            />
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {[
                {
                  icon: Eye,
                  title: 'Generate 3D Models',
                  desc: 'Accurate nasal models from 2D images for visualization and analysis'
                },
                {
                  icon: Brain,
                  title: 'Classify Deformities',
                  desc: 'Automated detection of aesthetic and functional nasal deformities'
                },
                {
                  icon: Zap,
                  title: 'Measure Angles',
                  desc: 'Compute nasal, facial, and anatomical angles for objective assessment'
                },
                {
                  icon: TrendingUp,
                  title: 'Surgical Planning',
                  desc: 'Rule-based strategy suggestions tailored to patient anatomy'
                },
                {
                  icon: Users,
                  title: 'Predict Outcomes',
                  desc: 'Visual outcome predictions to support surgeon-patient discussions'
                },
                {
                  icon: CheckCircle,
                  title: 'Standardize Scoring',
                  desc: 'Objective JRAS-based evaluation for pre and post-operative results'
                },
              ].map((goal, idx) => (
                <div key={idx} className="p-6 bg-slate-700/40 border border-slate-600 rounded-lg hover:bg-slate-700/60 transition-colors">
                  <div className="p-3 bg-blue-500/20 rounded-lg w-fit mb-3">
                    <goal.icon className="w-6 h-6 text-blue-400" />
                  </div>
                  <h3 className="text-lg font-semibold text-white">{goal.title}</h3>
                  <p className="mt-2 text-sm text-slate-300">{goal.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Project Scope */}
        <section className="w-full py-12 sm:py-16 lg:py-20 border-t border-slate-700/50">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <SectionHeading 
              title="Project Scope" 
              subtitle="A complete web-based surgical planning platform"
            />
            <div className="grid gap-8 lg:grid-cols-2 items-start">
              <div className="space-y-4">
                <p className="text-slate-200 text-lg">
                  Rhino Vision is delivered as a comprehensive web application for surgical professionals.
                </p>
                <div className="space-y-3">
                  <div className="p-4 bg-slate-700/40 border border-slate-600 rounded-lg">
                    <h4 className="font-semibold text-white">Core Features</h4>
                    <BulletList items={[
                      'Secure surgeon dashboard',
                      'Patient image upload and management',
                      'Real-time 3D model generation',
                      'Deformity classification and visualization',
                      'Anatomical angle measurements',
                      'Surgical strategy recommendations',
                      'Outcome prediction engine',
                      'Pre/post comparison analytics',
                      'JRAS scoring and reporting',
                    ]} />
                  </div>
                </div>
              </div>
              <div className="h-80 bg-gradient-to-br from-blue-500/20 to-slate-700/40 border border-slate-600 rounded-lg flex items-center justify-center overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=500&h=400&fit=crop"
                  alt="Technology Platform"
                  className="w-full h-full object-cover opacity-80"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Why This Matters */}
        <section className="w-full py-12 sm:py-16 lg:py-20 border-t border-slate-700/50">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <SectionHeading 
              title="Why This Matters" 
              subtitle="Impact on surgical outcomes and patient satisfaction"
            />
            <div className="grid gap-6 sm:grid-cols-2">
              <Card
                icon={Users}
                title="For Surgeons"
                items={[
                  'Objective data-driven decision making',
                  'Standardized pre-operative planning',
                  'Improved predictability of outcomes',
                  'Reduced bias in assessment',
                  'Time-efficient documentation',
                  'Evidence-based strategy selection',
                ]}
              />
              <Card
                icon={CheckCircle}
                title="For Patients"
                items={[
                  'Clear visual outcome expectations',
                  'Unbiased aesthetic assessment',
                  'Accurate pre/post result comparison',
                  'Transparent surgical planning',
                  'Improved satisfaction outcomes',
                  'Standardized quality of care',
                ]}
              />
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="w-full py-12 sm:py-16 bg-gradient-to-r from-blue-600 to-blue-700 border-t border-slate-700/50">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold text-white">Ready to Transform Your Practice?</h2>
            <p className="mt-4 text-lg text-blue-100">
              Join leading surgeons advancing rhinoplasty with AI-powered precision and objectivity.
            </p>
            <button className="mt-8 px-8 py-3 bg-white text-blue-700 font-semibold rounded-lg hover:bg-slate-100 transition-colors">
              Schedule a Demo
            </button>
          </div>
        </section>
      </div>
    </main>
  );
};

export default About;
