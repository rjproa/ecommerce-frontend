export type ProductType = {
  id: number;
  documentId: string;
  productName: string;
  slug: string;
  description: string;
  price: number;
  active: boolean;
  isFeatured: boolean;
  station: string;
  images: Array<{
    id: number;
    documentId: string;
    url: string;
    name: string;
    alternativeText: string | null;
    width: number;
    height: number;
    ext: string;
    mime: string;
    size: number;
  }>;
  category: {
    id: number;
    documentId: string;
    categoryName: string;
    slug: string;
  };
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
};