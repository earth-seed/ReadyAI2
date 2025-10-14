import {
  ShieldCheck,
  Trash2,
  Eye,
  Server,
  Database,
  Settings,
  Key,
  BarChart,
  FileText,
  Shield,
  Check,
  Lock,
} from "lucide-react";
import SlideAnimator from "../../utils/SlideAnimator.tsx";

const Banner2Section = () => {
  return (
    <SlideAnimator direction="up">
      <section className="relative bg-accent2-lightest py-20 px-8 overflow-hidden">
        <div className="max-w-7xl mx-auto relative z-10">
          {/* PART 1: SECTION HEADER */}
          <div className="text-center mb-16">
            <h2 className="font-heading text-4xl md:text-5xl font-normal text-primary mb-4">
              Secure By Default. Compliant By Design.
            </h2>
            <p className="font-sans text-lg text-primary-light max-w-3xl mx-auto leading-relaxed">
              Enterprise-grade security and compliance baked in from the start, 
              giving you confidence to scale AI securely across your organization.
            </p>
          </div>

          {/* PART 2: THREE-PILLAR LAYOUT */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* COLUMN 1: DATA SOVEREIGNTY */}
            <SecurityPillar
              icon={<Database className="w-14 h-14 text-accent" />}
              title="Your Data. Your Rules."
              features={[
                "Never used to train LLMs",
                "Data visibility controls",
                "Delete data anytime",
                "US-based servers"
              ]}
            />

            {/* COLUMN 2: ENTERPRISE COMPLIANCE */}
            <SecurityPillar
              icon={<ShieldCheck className="w-14 h-14 text-accent" />}
              title="Enterprise-Grade Security. Fully Compliant."
              features={[
                "SOC 2 Compliant",
                "Private Azure instances",
                "GDPR Compliant",
                "On-prem deployment options"
              ]}
            />

            {/* COLUMN 3: ACCESS CONTROL */}
            <SecurityPillar
              icon={<Key className="w-14 h-14 text-accent" />}
              title="Secure Access. Granular Control."
              features={[
                "SSO verification",
                "Org-wide analytics",
                "Role-based permissions",
                "Admin chat log access"
              ]}
            />
          </div>
        </div>
      </section>
    </SlideAnimator>
  );
};

const SecurityPillar = ({
  icon,
  title,
  features,
}: {
  icon: React.ReactNode;
  title: string;
  features: string[];
}) => (
  <div className="bg-white/70 backdrop-blur-sm border border-accent/20 rounded-2xl p-10 flex flex-col items-center text-center transition-all duration-300 hover:-translate-y-2 hover:shadow-xl hover:bg-white/90 hover:border-accent/40 h-full">
    <div className="mb-6 transition-transform duration-300 hover:scale-110">
      {icon}
    </div>
    <h3 className="font-heading text-2xl font-normal text-primary mb-6 leading-snug">
      {title}
    </h3>
    <ul className="space-y-4 w-full">
      {features.map((feature, index) => (
        <li key={index} className="flex items-start gap-3 text-left">
          <Check className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
          <span className="font-sans text-base text-primary-light">{feature}</span>
        </li>
      ))}
    </ul>
  </div>
);

export default Banner2Section;