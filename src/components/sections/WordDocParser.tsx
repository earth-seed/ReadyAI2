// components/WordDocViewer.jsx
import React, { useEffect, useState } from 'react';
import mammoth from 'mammoth';

const WordDocParser = ({ docPath }) => {
  const [htmlContent, setHtmlContent] = useState('');

  useEffect(() => {
    if (!docPath) return;

    const fetchAndParse = async () => {
      try {
        const response = await fetch(docPath);
        if (!response.ok) throw new Error(`File not found: ${docPath}`);

        const arrayBuffer = await response.arrayBuffer();
        const result = await mammoth.convertToHtml({ arrayBuffer });

        // Parse HTML string into DOM
        const parser = new DOMParser();
        const doc = parser.parseFromString(result.value, 'text/html');

        // Add Tailwind classes
        doc.querySelectorAll('h2').forEach(el =>
          el.classList.add('text-4xl', 'text-gray-700', 'mb-20', 'mt-20', 'text-center')
        );
        doc.querySelectorAll('h3').forEach(el =>
          el.classList.add('font-light', 'mb-5', 'mt-10')
        );
        doc.querySelectorAll('h4').forEach(el =>
          el.classList.add('text-2xl', 'font-semibold', 'mb-20', 'mt-20', 'text-center')
        );
        doc.querySelectorAll('p').forEach(el =>
          el.classList.add('mb-6', 'font-light')
        );
        doc.querySelectorAll('ul').forEach(el =>
          el.classList.add('list-disc', 'pl-8', 'mb-6', 'mr-6', 'text-center', 'md:text-left')
        );
        
        doc.querySelectorAll('a').forEach(el => {
          el.classList.add('text-blue-700');
          el.setAttribute('target', '_blank');
        });


        setHtmlContent(doc.body.innerHTML);
      } catch (err) {
        console.error('Error parsing Word doc:', err);
        // setHtmlContent(`<p class="text-red-600">Failed to load document: ${err.message}</p>`);
      }
    };

    fetchAndParse();
  }, [docPath]);

  return (
    <div
      className="prose max-w-none mt-6"
      dangerouslySetInnerHTML={{ __html: htmlContent }}
    />
  );
};

export default WordDocParser;