import { Award, ExternalLink, Loader } from 'lucide-react';
import { motion } from 'framer-motion';

interface Cert {
  id: string;
  title: string;
  issuer?: string;
  date?: string;
  url?: string;
}

const defaultCerts: Cert[] = [
  { id: 'c1', title: 'Introduction to Cybersecurity', issuer: 'Credly', date: '', url: 'https://www.credly.com/badges/979eee55-4f5d-4f12-ae82-e42542e8534f/linked_in_profile' },
  { id: 'c2', title: 'Webservices API Testing with Postman', issuer: 'Udemy/Postman', date: '', url: 'https://ude.my/UC-94bcb8a8-2448-4104-bcbd-6a1d67384bd2' },
  { id: 'c3', title: 'Hands-On Introduction: SQL', issuer: 'LinkedIn Learning', date: '', url: 'https://www.linkedin.com/learning/certificates/e560b8aaba46d2e6e7e3f54135c7bcfcebff51329fc6862c1274de28bdc525e9?lipi=urn%3Ali%3Apage%3Ad_flagship3_profile_view_base_certifications_details%3B4w75NuCiSYGdKZfHcnedzw%3D%3D' },
  { id: 'c4', title: 'Advanced JMeter', issuer: 'LinkedIn Learning', date: '', url: 'https://www.linkedin.com/learning/certificates/95639232a3b5e4b8c4670a57b67f6ff1a74d5f7d85c1b5a24c346e2ca99c8aba' },
];

export default function Certifications() {
  const certs = defaultCerts;

  if (!certs || certs.length === 0) {
    return (
      <section id="certifications" className="py-24 px-6 relative bg-[#F8FAFC] dark:bg-[#0F172A]">
        <div className="max-w-4xl mx-auto relative z-10 flex items-center justify-center">
          <Loader className="w-8 h-8 text-cyan-400 animate-spin" />
        </div>
      </section>
    );
  }

  return (
    <section id="certifications" className="py-24 px-6 relative bg-[#F4F7F5] dark:bg-[#111827]">
      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight mb-4 px-4 text-primary">
            Certifications
          </h2>
          <div className="w-12 h-0.5 bg-accent-primary mx-auto" />
        </motion.div>

        <div className="grid sm:grid-cols-2 gap-6">
          {certs.map((cert, idx) => (
            <motion.a
              key={cert.id}
              href={cert.url && cert.url.length > 0 ? cert.url : undefined}
              target={cert.url ? "_blank" : undefined}
              rel={cert.url ? "noopener noreferrer" : undefined}
              className={`group block p-6 rounded-2xl border bg-white dark:bg-white/[0.02] transition-shadow hover:shadow-lg ${cert.url ? 'cursor-pointer' : 'opacity-80 cursor-default'}`}
              onClick={(e) => {
                if (!cert.url) {
                  e.preventDefault();
                }
              }}
            >
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-lg bg-[#EEF2FF] dark:bg-[rgba(59,130,246,0.08)] flex items-center justify-center text-blue-600">
                  <Award className="w-6 h-6" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between gap-3">
                    <h3 className="text-lg font-bold text-primary">{cert.title}</h3>
                    {cert.url ? (
                      <ExternalLink className="w-4 h-4 text-[#6B7280] group-hover:text-primary" />
                    ) : null}
                  </div>
                  <div className="text-sm text-secondary mt-1">{cert.issuer}{cert.date ? ` · ${cert.date}` : ''}</div>
                  {!cert.url ? (
                    <div className="mt-3 text-xs text-[#9CA3AF] italic">Certificate URL not provided — edit `Certifications.tsx` to add the link.</div>
                  ) : null}
                </div>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
