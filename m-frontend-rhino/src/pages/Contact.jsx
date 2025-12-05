import { Mail, MapPin, Phone, Send } from 'lucide-react';

function ContactCard({ icon: Icon, label, value, href }) {
  const Component = href ? 'a' : 'div';
  return (
    <Component
      href={href}
      target={href ? '_blank' : undefined}
      rel={href ? 'noopener noreferrer' : undefined}
      className="p-6 bg-slate-700/40 border border-slate-600 rounded-lg hover:bg-slate-700/60 transition-all cursor-pointer"
    >
      <div className="flex items-start gap-4">
        <div className="p-3 bg-blue-500/20 rounded-lg">
          <Icon className="w-6 h-6 text-blue-400" />
        </div>
        <div className="flex-1">
          <div className="text-sm font-medium text-slate-400">{label}</div>
          <div className="mt-1 text-lg font-semibold text-white">{value}</div>
        </div>
      </div>
    </Component>
  );
}

const Contact = () => {
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
              Contact Us
            </h1>
            <p className="mt-4 text-lg sm:text-xl text-slate-200">
              Get in touch with our team
            </p>
            <p className="mt-3 text-base text-slate-300">
              Have questions about Rhino Vision? We're here to help. Reach out for support, inquiries, or partnership opportunities.
            </p>
          </div>
        </header>

        {/* Contact Information Section */}
        <section className="w-full py-12 sm:py-16 lg:py-20">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <div className="mb-8">
              <h2 className="text-3xl font-bold text-white">Reach Out</h2>
              <p className="mt-2 text-slate-300">Connect with us through any of the following channels</p>
            </div>

            <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
              <ContactCard
                icon={Mail}
                label="Email"
                value="rhinovision@gmail.com"
                href="mailto:rhinovision@gmail.com"
              />
              <ContactCard
                icon={MapPin}
                label="Address"
                value="Milaad Street, Lahore, Pakistan"
              />
              <ContactCard
                icon={Phone}
                label="Phone"
                value="+92 (0) 323 455 9693"
              />
            </div>
          </div>
        </section>

        {/* Message Section */}
        <section className="w-full py-12 sm:py-16 lg:py-20 border-t border-slate-700/50">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
            <div className="p-8 bg-slate-700/40 border border-slate-600 rounded-lg">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-blue-500/20 rounded-lg">
                  <Send className="w-6 h-6 text-blue-400" />
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-white">How We Can Help</h3>
                  <ul className="mt-4 space-y-3 text-slate-200">
                    <li className="flex items-start gap-3">
                      <span className="text-blue-400 mt-1">•</span>
                      <span><span className="font-semibold">Technical Support:</span> Questions about using Rhino Vision or troubleshooting</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-blue-400 mt-1">•</span>
                      <span><span className="font-semibold">Clinical Inquiries:</span> Information about the platform's research foundation and methodology</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-blue-400 mt-1">•</span>
                      <span><span className="font-semibold">Integration:</span> Discussions about integrating Rhino Vision with your practice</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-blue-400 mt-1">•</span>
                      <span><span className="font-semibold">Partnerships:</span> Collaboration and partnership opportunities</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-blue-400 mt-1">•</span>
                      <span><span className="font-semibold">Feedback:</span> Share your feedback and suggestions for improvement</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Response Time Section */}
        <section className="w-full py-12 sm:py-16 lg:py-20 border-t border-slate-700/50">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-white">Support & Response</h2>
              <p className="mt-4 text-slate-300 max-w-2xl mx-auto">
                We aim to respond to all inquiries within 24-48 hours during business days. 
                For urgent technical support, please include "URGENT" in the subject line.
              </p>
            </div>
          </div>
        </section>

        {/* Surgical Image */}
        <section className="w-full py-12 sm:py-16 lg:py-20 border-t border-slate-700/50">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <div className="h-80 bg-gradient-to-br from-blue-500/20 to-slate-700/40 border border-slate-600 rounded-lg flex items-center justify-center overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1631217314831-c02b2e9de859?w=800&h=400&fit=crop"
                alt="Surgical Team"
                className="w-full h-full object-cover opacity-80"
              />
            </div>
          </div>
        </section>
      </div>
    </main>
  );
};

export default Contact;
