/**
 * Simple renderer for Strapi blocks content
 * Handles common block types: paragraph, heading, list, quote, image, etc.
 */

import React from 'react';

interface Block {
  type: string;
  children?: Block[];
  text?: string;
  level?: number;
  format?: number;
  url?: string;
  alt?: string;
  caption?: string;
  items?: string[];
}

interface StrapiBlocksRendererProps {
  blocks: Block[];
}

const StrapiBlocksRenderer: React.FC<StrapiBlocksRendererProps> = ({ blocks }) => {
  if (!blocks || blocks.length === 0) {
    return null;
  }

  const renderBlock = (block: Block, index: number): React.ReactNode => {
    switch (block.type) {
      case 'paragraph':
        return (
          <p key={index} className="mb-6 font-light">
            {block.children?.map((child, i) => renderInline(child, i))}
          </p>
        );

      case 'heading':
        const level = block.level || 1;
        const HeadingTag = `h${level}` as keyof JSX.IntrinsicElements;
        const headingClasses = {
          1: 'text-4xl font-bold mb-8 mt-12',
          2: 'text-3xl font-semibold mb-6 mt-10 text-center',
          3: 'text-2xl font-semibold mb-5 mt-8',
          4: 'text-xl font-semibold mb-4 mt-6',
          5: 'text-lg font-semibold mb-3 mt-4',
          6: 'text-base font-semibold mb-2 mt-3',
        }[level] || 'text-xl font-semibold mb-4';
        
        return (
          <HeadingTag key={index} className={headingClasses}>
            {block.children?.map((child, i) => renderInline(child, i))}
          </HeadingTag>
        );

      case 'list':
        const isOrdered = block.format === 'ordered';
        const ListTag = isOrdered ? 'ol' : 'ul';
        const listClasses = isOrdered 
          ? 'list-decimal pl-8 mb-6' 
          : 'list-disc pl-8 mb-6 mr-6 text-center md:text-left';
        
        return (
          <ListTag key={index} className={listClasses}>
            {block.items?.map((item, i) => (
              <li key={i} className="mb-2">{item}</li>
            ))}
            {block.children?.map((child, i) => (
              <li key={i}>{renderInline(child, i)}</li>
            ))}
          </ListTag>
        );

      case 'quote':
        return (
          <blockquote key={index} className="border-l-4 border-accent pl-6 py-4 my-6 italic text-gray-700">
            {block.children?.map((child, i) => renderInline(child, i))}
          </blockquote>
        );

      case 'image':
        const imageUrl = block.url || '';
        const imageAlt = block.alt || block.caption || '';
        return (
          <figure key={index} className="my-8">
            <img
              src={imageUrl}
              alt={imageAlt}
              className="w-full rounded-lg shadow-lg"
            />
            {block.caption && (
              <figcaption className="text-sm text-gray-600 mt-2 text-center">
                {block.caption}
              </figcaption>
            )}
          </figure>
        );

      case 'code':
        return (
          <pre key={index} className="bg-gray-100 p-4 rounded-lg overflow-x-auto my-6">
            <code>{block.text || block.children?.map((c, i) => c.text).join('')}</code>
          </pre>
        );

      case 'link':
        return (
          <a
            key={index}
            href={block.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-700 hover:underline"
          >
            {block.children?.map((child, i) => renderInline(child, i))}
          </a>
        );

      default:
        // Fallback for unknown block types
        return (
          <div key={index} className="my-4">
            {block.children?.map((child, i) => renderBlock(child, i))}
            {block.text && <span>{block.text}</span>}
          </div>
        );
    }
  };

  const renderInline = (node: Block, index: number): React.ReactNode => {
    if (!node) return null;

    let content: React.ReactNode = node.text || '';

    // Handle text formatting
    if (node.format) {
      if (node.format & 1) { // bold
        content = <strong key={index}>{content}</strong>;
      }
      if (node.format & 2) { // italic
        content = <em key={index}>{content}</em>;
      }
      if (node.format & 4) { // underline
        content = <u key={index}>{content}</u>;
      }
      if (node.format & 8) { // strikethrough
        content = <s key={index}>{content}</s>;
      }
      if (node.format & 16) { // code
        content = <code key={index} className="bg-gray-100 px-1 rounded">{content}</code>;
      }
    }

    // Handle links
    if (node.type === 'link' && node.url) {
      return (
        <a
          key={index}
          href={node.url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-700 hover:underline"
        >
          {content}
        </a>
      );
    }

    // Handle children
    if (node.children && node.children.length > 0) {
      return (
        <span key={index}>
          {content}
          {node.children.map((child, i) => renderInline(child, i))}
        </span>
      );
    }

    return <span key={index}>{content}</span>;
  };

  return (
    <div className="prose prose-lg max-w-none">
      {blocks.map((block, index) => renderBlock(block, index))}
    </div>
  );
};

export default StrapiBlocksRenderer;

