import React from "react";
import { Linkedin } from "lucide-react";

const SocialLinks = () => {
  return (
    <div className="bg-primary-dark">
        <div className="max-w-7xl mx-auto">
            <div className="lg:text-center pb-8 pt-8">
                <a
                    href="https://www.linkedin.com/company/readyai-dev/"
                    target="_blank"
                    className="font-sans flex items-center justify-center md:justify-end space-x-2 text-gray-300 hover:text-accent transition-colors"
                >
                    <span className="text-sm">Find us on</span>
                    <Linkedin className="w-5 h-5" />
                    <span className="text-sm">LinkedIn</span>
                </a>
            </div>
        </div>
    </div>
      
  );
};

export default SocialLinks;