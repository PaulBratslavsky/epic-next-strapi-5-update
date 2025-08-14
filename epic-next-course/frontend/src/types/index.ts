type TImage = {
  id: number;
  documentId: string;
  url: string;
  alternativeText: string | null;
};

type TLink = {
  id: number;
  href: string;
  label: string;
};

export interface IHeroSection {
  id: number;
  documentId: string;
  __component: string;
  heading: string;
  subHeading: string;
  image: TImage;
  link: TLink;
}

type TFeature = {
  id: number;
  heading: string;
  subHeading: string;
  icon: string;
};

export interface IFeatureSection {
  id: number;
  __component: string;
  title: string;
  description: string;
  feature: TFeature[];
}

// Union type of all possible block components
export type TBlocks = IHeroSection | IFeatureSection;

export type THomePage = {
  documentId: string;
  title: string;
  description: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  blocks: TBlocks[];
};

export type THeader = {
  logoText: TLink;
  ctaButton: TLink;
};

export type TFooter = {
  logoText: TLink;
  text: string;
  socialLink: TLink[];
};

export type TGlobal = {
  documentId: string;
  title: string;
  description: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  header: THeader;
  footer: TFooter;
};

export type TStrapiResponse<T = null> = {
  success: boolean;
  data?: T;
  error?: {
    status: number;
    name: string;
    message: string;
    details?: Record<string, string[]>;
  };
  meta?: {
    pagination: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
  status: number;
};
