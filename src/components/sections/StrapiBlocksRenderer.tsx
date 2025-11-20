/**
 * Renderer for Strapi blocks content (Strapi 5 format)
 * Handles common block types: paragraph, heading, list, quote, image, etc.
 * Supports nested lists and inline formatting (bold, italic, underline)
 */

import React from 'react';

interface TextNode {
  type: 'text';
  text: string;
  bold?: boolean;
  italic?: boolean;
  underline?: boolean;
  strikethrough?: boolean;
  code?: boolean;
  children?: TextNode[];
}

interface Block {
  type: string;
  children?: (Block | TextNode)[];
  text?: string;
  level?: number;
  format?: string | number; // Can be "unordered", "ordered", or number for legacy
  url?: string;
  alt?: string;
  caption?: string;
  items?: string[];
  image?: {
    url?: string;
    alternativeText?: string;
    caption?: string;
    width?: number;
    height?: number;
    formats?: any;
  };
  // For Strapi image blocks
  imageUrl?: string;
  imageAlt?: string;
  imageCaption?: string;
  // Alignment options (left, center, right, full-width)
  align?: 'left' | 'center' | 'right' | 'full';
  // Size options (small, medium, large, full)
  size?: 'small' | 'medium' | 'large' | 'full';
}

interface StrapiBlocksRendererProps {
  blocks: Block[];
}

const StrapiBlocksRenderer: React.FC<StrapiBlocksRendererProps> = ({ blocks }) => {
  if (!blocks || blocks.length === 0) {
    return null;
  }

  const renderTextNode = (node: TextNode, index: number): React.ReactNode => {
    if (!node || node.type !== 'text') return null;

    let content: React.ReactNode = node.text || '';

    // Apply formatting - wrap in order: code, bold, italic, underline, strikethrough
    if (node.code) {
      content = <code key={`code-${index}`} className="bg-gray-100 px-1 rounded text-sm">{content}</code>;
    }
    if (node.bold) {
      content = <strong key={`bold-${index}`}>{content}</strong>;
    }
    if (node.italic) {
      content = <em key={`italic-${index}`}>{content}</em>;
    }
    if (node.underline) {
      content = <u key={`underline-${index}`}>{content}</u>;
    }
    if (node.strikethrough) {
      content = <s key={`strikethrough-${index}`}>{content}</s>;
    }

    return <span key={index}>{content}</span>;
  };

  const renderInline = (node: Block | TextNode, index: number): React.ReactNode => {
    if (!node) return null;

    // Handle text nodes
    if (node.type === 'text') {
      return renderTextNode(node as TextNode, index);
    }

    const block = node as Block;

    // Handle links
    if (block.type === 'link' && block.url) {
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
    }

    // Handle other inline elements with children
    if (block.children && block.children.length > 0) {
      return (
        <span key={index}>
          {block.children.map((child, i) => renderInline(child, i))}
        </span>
      );
    }

    return <span key={index}>{block.text || ''}</span>;
  };

  const renderBlock = (block: Block, index: number): React.ReactNode => {
    if (!block) return null;

    switch (block.type) {
      case 'paragraph':
        // Skip empty paragraphs
        if (!block.children || block.children.length === 0 || 
            (block.children.length === 1 && block.children[0].type === 'text' && !(block.children[0] as TextNode).text)) {
          return <br key={index} className="mb-4" />;
        }
        return (
          <p key={index} className="mb-6 font-light leading-relaxed">
            {block.children?.map((child, i) => renderInline(child, i))}
          </p>
        );

      case 'heading':
        const level = block.level || 1;
        const HeadingTag = `h${Math.min(Math.max(level, 1), 6)}` as keyof JSX.IntrinsicElements;
        const headingClasses = {
          1: 'text-4xl font-bold mb-8 mt-12',
          2: 'text-3xl font-semibold mb-6 mt-10',
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
        // Handle both string format ("unordered", "ordered") and legacy number format
        const format = block.format;
        const isOrdered = format === 'ordered' || format === 1 || format === '1';
        const ListTag = isOrdered ? 'ol' : 'ul';
        const listClasses = isOrdered 
          ? 'list-decimal pl-8 mb-6 space-y-2' 
          : 'list-disc pl-8 mb-6 space-y-2';
        
        return (
          <ListTag key={index} className={listClasses}>
            {block.children?.map((child, i) => {
              // Handle list-item blocks
              if (child.type === 'list-item') {
                return (
                  <li key={i} className="mb-2">
                    {child.children?.map((grandchild, j) => {
                      // If grandchild is a nested list, render it as a block
                      if (grandchild.type === 'list') {
                        return <React.Fragment key={j}>{renderBlock(grandchild as Block, j)}</React.Fragment>;
                      }
                      // Otherwise render as inline content
                      return renderInline(grandchild, j);
                    })}
                  </li>
                );
              }
              // Handle nested lists directly (for deeply nested structures)
              if (child.type === 'list') {
                return (
                  <li key={i} className="list-none">
                    {renderBlock(child as Block, i)}
                  </li>
                );
              }
              // Fallback for other types
              return <li key={i}>{renderInline(child, i)}</li>;
            })}
          </ListTag>
        );

      case 'list-item':
        // List items should be handled within list blocks, but handle standalone cases
        return (
          <li key={index} className="mb-2">
            {block.children?.map((child, i) => {
              if (child.type === 'list') {
                return renderBlock(child as Block, i);
              }
              return renderInline(child, i);
            })}
          </li>
        );

      case 'quote':
        return (
          <blockquote key={index} className="border-l-4 border-accent pl-6 py-4 my-6 italic text-gray-700">
            {block.children?.map((child, i) => renderInline(child, i))}
          </blockquote>
        );

      case 'image':
        // Handle different image block structures from Strapi
        let imageUrl = '';
        let imageAlt = '';
        let imageCaption = '';
        
        // Check for nested image object (Strapi 5 format)
        if (block.image) {
          const img = block.image as any;
          imageUrl = img.url || img.data?.attributes?.url || '';
          imageAlt = img.alternativeText || img.alt || img.caption || '';
          imageCaption = img.caption || '';
        } else {
          // Fallback to direct properties
          imageUrl = block.url || block.imageUrl || '';
          imageAlt = block.alt || block.imageAlt || block.caption || '';
          imageCaption = block.caption || block.imageCaption || '';
        }
        
        // Get alignment and size options
        const align = block.align || 'center';
        const size = block.size || 'full';
        
        // Determine CSS classes based on alignment and size
        const alignmentClasses = {
          left: 'float-left mr-6 mb-4',
          center: 'mx-auto block',
          right: 'float-right ml-6 mb-4',
          full: 'w-full',
        }[align] || 'mx-auto block';
        
        const sizeClasses = {
          small: 'max-w-xs',
          medium: 'max-w-md',
          large: 'max-w-2xl',
          full: 'w-full',
        }[size] || 'w-full';
        
        // For full-width images, use a different container
        if (size === 'full' || align === 'full') {
          return (
            <figure key={index} className="my-8">
              <img
                src={imageUrl}
                alt={imageAlt}
                className={`${sizeClasses} rounded-lg shadow-lg ${align === 'center' ? 'mx-auto' : ''}`}
              />
              {imageCaption && (
                <figcaption className="text-sm text-gray-600 mt-2 text-center">
                  {imageCaption}
                </figcaption>
              )}
            </figure>
          );
        }
        
        // For aligned images (left/right), use float layout
        return (
          <figure key={index} className={`${alignmentClasses} ${sizeClasses} my-4`}>
            <img
              src={imageUrl}
              alt={imageAlt}
              className="w-full rounded-lg shadow-md"
            />
            {imageCaption && (
              <figcaption className="text-xs text-gray-600 mt-1 text-center">
                {imageCaption}
              </figcaption>
            )}
          </figure>
        );

      // Handle component blocks (custom components like image-block)
      case 'component':
        // Check if it's our image-block component
        if ((block as any).component === 'image-block' || (block as any).componentName === 'image-block') {
          const componentData = (block as any).image || (block as any);
          const img = componentData.image?.data?.attributes || componentData.image?.attributes || componentData;
          
          imageUrl = img.url || '';
          imageAlt = img.alternativeText || componentData.caption || '';
          imageCaption = componentData.caption || '';
          const align = componentData.alignment || 'center';
          const size = componentData.size || 'full';
          
          const alignmentClasses = {
            left: 'float-left mr-6 mb-4',
            center: 'mx-auto block',
            right: 'float-right ml-6 mb-4',
            full: 'w-full',
          }[align] || 'mx-auto block';
          
          const sizeClasses = {
            small: 'max-w-xs',
            medium: 'max-w-md',
            large: 'max-w-2xl',
            full: 'w-full',
          }[size] || 'w-full';
          
          if (size === 'full' || align === 'full') {
            return (
              <figure key={index} className="my-8">
                <img
                  src={imageUrl}
                  alt={imageAlt}
                  className={`${sizeClasses} rounded-lg shadow-lg ${align === 'center' ? 'mx-auto' : ''}`}
                />
                {imageCaption && (
                  <figcaption className="text-sm text-gray-600 mt-2 text-center">
                    {imageCaption}
                  </figcaption>
                )}
              </figure>
            );
          }
          
          return (
            <figure key={index} className={`${alignmentClasses} ${sizeClasses} my-4`}>
              <img
                src={imageUrl}
                alt={imageAlt}
                className="w-full rounded-lg shadow-md"
              />
              {imageCaption && (
                <figcaption className="text-xs text-gray-600 mt-1 text-center">
                  {imageCaption}
                </figcaption>
              )}
            </figure>
          );
        }
        
        // Fallback for other component types
        return (
          <div key={index} className="my-4 p-4 bg-gray-100 rounded">
            <p className="text-sm text-gray-600">Unsupported component: {(block as any).component || (block as any).componentName}</p>
          </div>
        );

      case 'code':
        return (
          <pre key={index} className="bg-gray-100 p-4 rounded-lg overflow-x-auto my-6">
            <code>{block.text || block.children?.map((c) => c.type === 'text' ? (c as TextNode).text : '').join('')}</code>
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
        // Fallback for unknown block types - try to render children
        return (
          <div key={index} className="my-4">
            {block.children?.map((child, i) => {
              if (child.type === 'text' || (child as Block).type && ['list', 'paragraph', 'heading'].includes((child as Block).type)) {
                return renderBlock(child as Block, i);
              }
              return renderInline(child, i);
            })}
            {block.text && <span>{block.text}</span>}
          </div>
        );
    }
  };

  return (
    <div className="prose prose-lg max-w-none">
      {blocks.map((block, index) => renderBlock(block, index))}
    </div>
  );
};

export default StrapiBlocksRenderer;