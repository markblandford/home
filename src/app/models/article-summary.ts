export interface ArticleSummary {
  id: string;
  path: string;
  filename: string;
  title: string;
  createdDate: string;
  updatedDate: string;
  about: string;
  tags: Array<string>;
}
