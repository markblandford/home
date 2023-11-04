export enum Tags {
  Description = 'description',
  OG_Description = 'og:description',
  OG_Image = 'og:image',
  OG_Title = 'og:title',
  OG_Type = 'og:type',
  OG_Url = 'og:url'
}

export type MetaTags = {
  [key in Tags]: string;
};
