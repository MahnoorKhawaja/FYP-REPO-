import { Shield, Lock, Eye, FileCheck, AlertCircle } from 'lucide-react';

function PrivacySection({ icon: Icon, title, description, points }) {
  return (
    <div className="p-6 bg-slate-700/40 border border-slate-600 rounded-lg">
      <div className="flex items-start gap-4">
        {Icon && (
          <div className="p-3 bg-blue-500/20 rounded-lg">
            <Icon className="w-6 h-6 text-blue-400" />
          </div>
        )}
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-white">{title}</h3>
          {description && (
            <p className="mt-2 text-slate-300">{description}</p>
          )}
          {points && (
            <ul className="mt-3 space-y-2">
              {points.map((point, idx) => (
                <li key={idx} className="text-sm text-slate-300 flex items-start gap-2">
                  <span className="text-blue-400 mt-1">•</span>
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}

const Privacy = () => {
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
              Privacy Policy
            </h1>
            <p className="mt-4 text-lg sm:text-xl text-slate-200">
              Your data security and confidentiality are our top priority
            </p>
            <p className="mt-3 text-base text-slate-300">
              Last updated: December 5, 2025
            </p>
          </div>
        </header>

        {/* Overview Section */}
        <section className="w-full py-12 sm:py-16 lg:py-20">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <div className="mb-8">
              <h2 className="text-3xl font-bold text-white">Privacy Overview</h2>
              <p className="mt-3 text-slate-300">
                Rhino Vision is committed to protecting your privacy and ensuring you have a positive experience on our platform. 
                This Privacy Policy outlines our data handling practices and your rights.
              </p>
            </div>

            <div className="grid gap-6">
              <PrivacySection
                icon={Shield}
                title="Data Protection & Security"
                description="We implement enterprise-grade security measures to protect all user data."
                points={[
                  'End-to-end encryption for sensitive medical images and analysis data',
                  'HIPAA-compliant infrastructure and protocols',
                  'Regular security audits and penetration testing',
                  'Multi-factor authentication for user accounts',
                  'Secure data centers with redundant backups',
                  'Compliance with international data protection standards',
                ]}
              />

              <PrivacySection
                icon={Eye}
                title="What Data We Collect"
                description="We only collect information necessary for surgical planning and analysis."
                points={[
                  'Patient facial images (with explicit consent)',
                  'Analysis results and measurements',
                  'Deformity classifications and assessments',
                  'Surgeon interaction data for service improvement',
                  'Non-identifiable demographic information for research (optional)',
                  'Platform usage analytics (anonymized)',
                ]}
              />

              <PrivacySection
                icon={Lock}
                title="How We Use Your Data"
                description="Your data is used exclusively for its intended clinical purpose."
                points={[
                  'Surgical planning and pre-operative analysis',
                  'Post-operative outcome assessment',
                  '3D model generation and visualization',
                  'Deformity detection and classification',
                  'Anatomical measurement and angle calculation',
                  'Service improvement and platform optimization',
                ]}
              />

              <PrivacySection
                icon={AlertCircle}
                title="Data Sharing & Disclosure"
                description="Your data is never shared without your explicit consent."
                points={[
                  'No personal information shared with third parties',
                  'No selling or trading of patient data',
                  'Data shared only between authorized surgical team members',
                  'Disclosure only when legally required (court orders, regulatory requests)',
                  'Aggregate, anonymized data may be used for research (with approval)',
                  'Clear opt-in/opt-out options for research participation',
                ]}
              />

              <PrivacySection
                icon={FileCheck}
                title="Compliance & Legal"
                description="We adhere to all relevant healthcare and data protection regulations."
                points={[
                  'HIPAA (Health Insurance Portability and Accountability Act) compliant',
                  'GDPR compliant for EU users',
                  'Local healthcare regulations and standards',
                  'Patient consent requirements rigorously enforced',
                  'Data retention policies aligned with legal requirements',
                  'Right to access, modify, or delete your data',
                ]}
              />
            </div>
          </div>
        </section>

        {/* User Rights Section */}
        <section className="w-full py-12 sm:py-16 lg:py-20 border-t border-slate-700/50">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <div className="mb-8">
              <h2 className="text-3xl font-bold text-white">Your Privacy Rights</h2>
              <p className="mt-3 text-slate-300">
                You have the following rights regarding your personal data:
              </p>
            </div>

            <div className="grid gap-6 sm:grid-cols-2">
              <div className="p-6 bg-slate-700/40 border border-slate-600 rounded-lg">
                <h3 className="font-semibold text-white mb-3">Right to Access</h3>
                <p className="text-slate-300 text-sm">
                  Request a copy of all data we hold about you, including uploaded images and analysis results.
                </p>
              </div>
              <div className="p-6 bg-slate-700/40 border border-slate-600 rounded-lg">
                <h3 className="font-semibold text-white mb-3">Right to Modification</h3>
                <p className="text-slate-300 text-sm">
                  Update or correct any inaccurate personal information in your account.
                </p>
              </div>
              <div className="p-6 bg-slate-700/40 border border-slate-600 rounded-lg">
                <h3 className="font-semibold text-white mb-3">Right to Deletion</h3>
                <p className="text-slate-300 text-sm">
                  Request permanent deletion of your account and associated data, subject to legal requirements.
                </p>
              </div>
              <div className="p-6 bg-slate-700/40 border border-slate-600 rounded-lg">
                <h3 className="font-semibold text-white mb-3">Right to Portability</h3>
                <p className="text-slate-300 text-sm">
                  Export your data in a standard format and transfer it to another service provider.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Contact for Privacy Section */}
        <section className="w-full py-12 sm:py-16 lg:py-20 border-t border-slate-700/50">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
            <div className="p-8 bg-blue-500/10 border border-blue-500/30 rounded-lg text-center">
              <h2 className="text-2xl font-bold text-white">Privacy Questions?</h2>
              <p className="mt-3 text-slate-200">
                If you have any questions or concerns about our privacy practices, please contact us at:
              </p>
              <p className="mt-4">
                <a href="mailto:privacy@rhinovision.com" className="text-blue-400 hover:text-blue-300 font-semibold">
                  privacy@rhinovision.com
                </a>
              </p>
              <p className="mt-2 text-slate-400 text-sm">
                We respond to all privacy inquiries within 7 business days
              </p>
            </div>
          </div>
        </section>

        {/* Medical Data Security */}
        <section className="w-full py-12 sm:py-16 lg:py-20 border-t border-slate-700/50">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <div className="h-80 bg-gradient-to-br from-blue-500/20 to-slate-700/40 border border-slate-600 rounded-lg flex items-center justify-center overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&h=400&fit=crop"
                alt="Medical Data Security"
                className="w-full h-full object-cover opacity-80"
              />
            </div>
          </div>
        </section>

        {/* Last Update */}
        <section className="w-full py-8 sm:py-12 text-center text-slate-400 text-sm border-t border-slate-700/50">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <p>
              This Privacy Policy may be updated from time to time. We will notify users of significant changes via email.
            </p>
          </div>
        </section>
      </div>
    </main>
  );
};

export default Privacy;
