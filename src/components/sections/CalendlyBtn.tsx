import React from "react";

interface CalendlyButtonProps {
  url?: string;
  text?: string;
  className?: string;
  pageSettings?: Record<string, unknown>;
  utm?: Record<string, string>;
  prefill?: Record<string, any>;
}

const CalendlyBtn: React.FC<CalendlyButtonProps> = ({
  url = "https://meetings-na2.hubspot.com/carol-eastman",
  text = "Schedule a Call",
  className = "bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700",
}) => {
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className={className}
    >
      {text}
    </a>
  );
};

export default CalendlyBtn;