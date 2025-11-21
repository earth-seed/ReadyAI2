import type { Schema, Struct } from '@strapi/strapi';

export interface ImageBlockSchema extends Struct.ComponentSchema {
  collectionName: 'components_image_blocks';
  info: {
    description: 'A block for inserting images with optional caption and alignment';
    displayName: 'Image Block';
  };
  attributes: {
    alignment: Schema.Attribute.Enumeration<
      ['left', 'center', 'right', 'full']
    > &
      Schema.Attribute.DefaultTo<'center'>;
    caption: Schema.Attribute.Text;
    image: Schema.Attribute.Media<'images'> & Schema.Attribute.Required;
    size: Schema.Attribute.Enumeration<['small', 'medium', 'large', 'full']> &
      Schema.Attribute.DefaultTo<'full'>;
  };
}

export interface TextBlockSchema extends Struct.ComponentSchema {
  collectionName: 'components_text_blocks';
  info: {
    description: 'A rich text block for paragraphs and formatted content';
    displayName: 'Text Block';
  };
  attributes: {
    content: Schema.Attribute.Blocks & Schema.Attribute.Required;
  };
}

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'image-block.schema': ImageBlockSchema;
      'text-block.schema': TextBlockSchema;
    }
  }
}
