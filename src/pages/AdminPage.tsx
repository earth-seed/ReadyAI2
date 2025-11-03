// src/pages/AdminPage.tsx
import React, { useEffect } from "react";

export default function AdminPage() {
  // Get Strapi URL from environment variables
  const strapiUrl = import.meta.env.VITE_STRAPI_URL || 'http://localhost:1337';
  const adminUrl = `${strapiUrl}/admin`;

  useEffect(() => {
    // Redirect to Strapi admin panel
    window.location.href = adminUrl;
  }, [adminUrl]);

  // Show a loading state while redirecting
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary via-primary-light to-primary-dark flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
        <h2 className="text-2xl font-bold text-white mb-2">Redirecting to Admin Panel...</h2>
        <p className="text-white/80">Taking you to the content management system</p>
        <p className="text-white/60 mt-4 text-sm">
          If you are not redirected automatically,{" "}
          <a href={adminUrl} className="underline hover:text-white">
            click here
          </a>
        </p>
      </div>
    </div>
  );
}