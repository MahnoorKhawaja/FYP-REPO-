import { CreditCard, Users, Shield, Mail, CheckCircle } from 'lucide-react';

function PlanCard({ icon: Icon, title, price, perks, cta }) {
  return (
    <div className="p-6 sm:p-8 bg-slate-700/40 border border-slate-600 rounded-lg flex flex-col h-full">
      <div className="flex items-center gap-4">
        <div className="p-3 bg-blue-500/20 rounded-lg">
          <Icon className="w-6 h-6 text-blue-400" />
        </div>
        <div>
          <h3 className="text-xl font-semibold text-white">{title}</h3>
          {price && <div className="text-slate-300 mt-1">{price}</div>}
        </div>
      </div>

      <ul className="mt-6 space-y-3 text-slate-200 flex-1">
        {perks.map((p, i) => (
          <li key={i} className="flex items-start gap-3">
            <CheckCircle className="w-5 h-5 text-blue-400 mt-1 flex-shrink-0" />
            <span className="text-sm">{p}</span>
          </li>
        ))}
      </ul>

      <div className="mt-6">
        <button className="w-full px-5 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-lg">{cta}</button>
      </div>
    </div>
  );
}

const Pricing = () => {
  return (
    <main className="w-full min-h-screen bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900">
      <div className="absolute inset-0 pointer-events-none opacity-5">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-400 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/3 right-1/4 w-80 h-80 bg-blue-300 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10">
        <header className="w-full py-12 sm:py-16 lg:py-20 border-b border-slate-700/50">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl sm:text-5xl font-bold text-white">Choose a Plan That Fits Your Needs</h1>
            <p className="mt-4 text-lg sm:text-xl text-slate-200 max-w-3xl mx-auto">
              Rhinovision provides surgeons with AI-powered tools for precise pre- and post-operative analysis. Select a plan based on the features and support you need.
            </p>
          </div>
        </header>

        <section className="w-full py-12 sm:py-16 lg:py-20">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-3">
              <PlanCard
                icon={CreditCard}
                title="Free / Demo Plan"
                price="Free"
                perks={["Access to basic 3D modeling", "Limited patient uploads", "Basic visualization and scoring"]}
                cta="Request Demo"
              />

              <PlanCard
                icon={Users}
                title="Professional Plan"
                price="Contact for pricing"
                perks={["Full pre- and post-operative analysis", "Deformity classification & predicted outcomes", "Unlimited patient uploads"]}
                cta="Contact Us"
              />

              <PlanCard
                icon={Shield}
                title="Enterprise Plan"
                price="Custom"
                perks={["All Professional features", "Priority support & training", "Multi-user hospital access"]}
                cta="Request Access"
              />
            </div>
          </div>
        </section>

        <section className="w-full py-12 sm:py-16 lg:py-20 border-t border-slate-700/50">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
            <div className="p-8 bg-blue-500/10 border border-blue-500/30 rounded-lg text-center">
              <h3 className="text-2xl font-bold text-white">Need a custom plan?</h3>
              <p className="mt-3 text-slate-200">For enterprise pricing, training sessions, and deployment support, contact our team.</p>
              <div className="mt-6">
                <a href="mailto:rhinovision@gmail.com" className="inline-flex items-center gap-2 px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-lg">
                  <Mail className="w-5 h-5" />
                  Contact Sales
                </a>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
};

export default Pricing;
