import type { Struct, Schema } from '@strapi/strapi';

export interface ComponentsLink extends Struct.ComponentSchema {
  collectionName: 'components_components_links';
  info: {
    displayName: 'Link';
  };
  attributes: {
    url: Schema.Attribute.String;
    text: Schema.Attribute.String;
    isExternal: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
  };
}

export interface ComponentsFeature extends Struct.ComponentSchema {
  collectionName: 'components_components_features';
  info: {
    displayName: 'Feature';
  };
  attributes: {
    heading: Schema.Attribute.String;
    subHeading: Schema.Attribute.Text;
    icon: Schema.Attribute.Enumeration<
      ['CLOCK_ICON', 'CHECK_ICON', 'CLOUD_ICON']
    >;
  };
}

export interface LayoutHeroSection extends Struct.ComponentSchema {
  collectionName: 'components_layout_hero_sections';
  info: {
    displayName: 'Hero Section';
    description: '';
  };
  attributes: {
    image: Schema.Attribute.Media<'images'>;
    heading: Schema.Attribute.String;
    subHeading: Schema.Attribute.Text;
    link: Schema.Attribute.Component<'components.link', false>;
  };
}

export interface LayoutFeaturesSection extends Struct.ComponentSchema {
  collectionName: 'components_layout_features_sections';
  info: {
    displayName: 'Features Section';
  };
  attributes: {
    title: Schema.Attribute.String;
    description: Schema.Attribute.Text;
    feature: Schema.Attribute.Component<'components.feature', true>;
  };
}

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'components.link': ComponentsLink;
      'components.feature': ComponentsFeature;
      'layout.hero-section': LayoutHeroSection;
      'layout.features-section': LayoutFeaturesSection;
    }
  }
}
