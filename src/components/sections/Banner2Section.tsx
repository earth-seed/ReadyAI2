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
} from "lucide-react";
import SlideAnimator from "../../utils/SlideAnimator.tsx";

const Banner2Section = () => {
  return (
    <SlideAnimator direction="up">
      <section className="relative bg-accent2 text-white py-20 px-8 overflow-hidden text-lg">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 relative z-10">
          {/* Left Side with centered shield + text */}
          <div className="relative flex items-center justify-center text-center px-4">
            {/* Background Shield */}
            <Shield className="absolute inset-0 m-auto w-64 md:w-80 lg:w-[420px] h-64 md:h-80 lg:h-[420px] text-white/10 pointer-events-none" />

            {/* Text Content */}
            <div className="relative z-10 max-w-md">
              <ShieldCheck className="text-accent w-12 h-12 mx-auto mb-4" />
              <h2 className="text-3xl md:text-4xl font-bold mb-2">
                Secure By Default
              </h2>
              <p className="text-gray-300 text-lg font-medium mb-4">
                Compliant by design
              </p>
              <p className="text-gray-300 leading-relaxed">
                ReadyAI.dev provides enterprise-grade security and compliance
                baked in from the start, giving you confidence to scale AI
                securely across your organization.
              </p>
            </div>
          </div>

          {/* Right Side */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 text-base">
            <FeatureGroup
              title={
                <>
                  Your data. <span className="text-accent">Your rules.</span>
                </>
              }
              items={[
                { icon: <ShieldCheck />, text: "Never used to train LLMs" },
                { icon: <Eye />, text: "Data visibility controls" },
                { icon: <Trash2 />, text: "Delete data anytime" },
                { icon: <Server />, text: "US-based servers" },
              ]}
            />

            <FeatureGroup
              title={
                <>
                  Enterprise-grade security.{" "}
                  <span className="text-accent">Fully compliant.</span>
                </>
              }
              items={[
                { icon: <Database />, text: "SOC 2 Compliant" },
                { icon: <Shield />, text: "Private Azure instances" },
                { icon: <Check />, text: "GDPR Compliant" },
                { icon: <Server />, text: "On-prem deployment options" },
              ]}
            />

            <FeatureGroup
              title={
                <>
                  Secure access.{" "}
                  <span className="text-accent">Granular control.</span>
                </>
              }
              items={[
                { icon: <Key />, text: "SSO verification" },
                { icon: <BarChart />, text: "Org-wide analytics" },
                { icon: <Settings />, text: "Role-based permissions" },
                { icon: <FileText />, text: "Admin chat log access" },
              ]}
            />
          </div>
        </div>
      </section>
    </SlideAnimator>
  );
};

const FeatureGroup = ({
  title,
  items,
}: {
  title: React.ReactNode;
  items: { icon: JSX.Element; text: string }[];
}) => (
  <div>
    <h3 className="text-white font-semibold mb-4 text-lg">{title}</h3>
    <div className="space-y-3">
      {items.map((item, i) => (
        <Feature key={i} icon={item.icon} text={item.text} />
      ))}
    </div>
  </div>
);

const Feature = ({ icon, text }: { icon: JSX.Element; text: string }) => (
  <div className="flex items-center space-x-3">
    <div className="text-accent w-6 h-6">{icon}</div>
    <span className="text-gray-200">{text}</span>
  </div>
);

export default Banner2Section;