export interface ArticleSummary {
  id: string;
  title: string;
  createdDate: string;
  updatedDate: string;
  about: string;
  image?: string;
  tags: Array<string>;
}
