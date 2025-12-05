import { Users, Cpu, Brain, Mail } from 'lucide-react';

function RoleCard({ icon: Icon, title, children }) {
  return (
    <div className="p-6 bg-slate-700/40 border border-slate-600 rounded-lg flex flex-col">
      <div className="flex items-center gap-4">
        <div className="p-3 bg-blue-500/20 rounded-lg">
          <Icon className="w-6 h-6 text-blue-400" />
        </div>
        <h3 className="text-xl font-semibold text-white">{title}</h3>
      </div>
      <div className="mt-4 text-slate-300 flex-1">{children}</div>
      <div className="mt-6">
        <button className="px-5 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg">Apply</button>
      </div>
    </div>
  );
}

const Careers = () => {
  return (
    <main className="w-full min-h-screen bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900">
      <div className="absolute inset-0 pointer-events-none opacity-5">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-400 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/3 right-1/4 w-80 h-80 bg-blue-300 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10">
        <header className="w-full py-12 sm:py-16 lg:py-20 border-b border-slate-700/50">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl sm:text-5xl font-bold text-white">Join the Rhinovision Team</h1>
            <p className="mt-4 text-lg sm:text-xl text-slate-200 max-w-3xl mx-auto">
              We are building AI-powered solutions for precise and standardized rhinoplasty assessment. Join our team and help transform surgical planning with cutting-edge technology.
            </p>
          </div>
        </header>

        <section className="w-full py-12 sm:py-16 lg:py-20">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-white mb-6">Current Openings</h2>
            <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2">
              <RoleCard icon={Cpu} title="Software Engineer (Frontend / Backend / AI)">
                <p className="text-sm">Work on UI, backend services, and AI model integration to deliver robust, clinical-grade features.</p>
              </RoleCard>

              <RoleCard icon={Brain} title="Medical Research Assistant">
                <p className="text-sm">Support clinical validation, data annotation, and research studies related to rhinoplasty assessment.</p>
              </RoleCard>

              <RoleCard icon={Users} title="UI/UX Designer (Medical Applications)">
                <p className="text-sm">Design user interfaces optimized for clinical users and patient-facing visualizations with clarity and compliance in mind.</p>
              </RoleCard>
            </div>
          </div>
        </section>

        <section className="w-full py-12 sm:py-16 lg:py-20 border-t border-slate-700/50">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-semibold text-white mb-3">Internships & Collaboration</h2>
            <p className="text-slate-300 max-w-3xl">We welcome interns and collaborators — students, hospitals, and research partners — to contribute to our platform and gain hands-on experience in AI and medical technology.</p>
          </div>
        </section>

        <section className="w-full py-12 sm:py-16 lg:py-20 border-t border-slate-700/50">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
            <div className="p-8 bg-blue-500/10 border border-blue-500/30 rounded-lg text-center">
              <h3 className="text-xl font-bold text-white">Interested?</h3>
              <p className="mt-3 text-slate-200">Send your CV to:</p>
              <p className="mt-2 text-blue-400 font-semibold">rhinovision@gmail.com</p>
              <div className="mt-6">
                <a href="mailto:rhinovision@gmail.com" className="inline-flex items-center gap-2 px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-lg">
                  <Mail className="w-5 h-5" />
                  Email Your CV
                </a>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
};

export default Careers;
