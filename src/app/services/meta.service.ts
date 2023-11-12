import { Injectable } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

import { ArticlesService } from '@services/articles.service';
import { MetaTags, Tags } from '../models/meta';

@Injectable({
  providedIn: 'root'
})
export class MetaService {

  static readonly fqdn = 'https://www.blandford.dev';
  static readonly siteTitle = 'Blandford.dev';
  static readonly defaultDescription = 'Mark Blandford: personal site, blog posts and other software development related content';

  public static defaultTags = () => ({
    [Tags.Description]: MetaService.defaultDescription,
    [Tags.OG_Description]: MetaService.defaultDescription,
    [Tags.OG_Image]: `${MetaService.fqdn}/assets/images/doll-round.png`,
    [Tags.OG_Title]: MetaService.siteTitle,
    [Tags.OG_Type]: 'website',
    [Tags.OG_Url]: MetaService.fqdn
  } as MetaTags);

  constructor(
    private articleService: ArticlesService,
    private titleService: Title,
    private metaService: Meta,
  ) { }

  public getMetaTagsForArticle(id: string): MetaTags {
    const a = this.articleService.getArticleSummary(id);

    const image = a?.image
      ? `${MetaService.fqdn}${ArticlesService.articlesLocation}${a.id}/${a.image}`
      : `${MetaService.fqdn}/assets/images/code-python-zen.jpg`

    return a
      ? {
          [Tags.Description]: a.about,
          [Tags.OG_Description]: a.about,
          [Tags.OG_Image]: image,
          [Tags.OG_Title]: a.title,
          [Tags.OG_Type]: 'article',
          [Tags.OG_Url]: `${MetaService.fqdn}${ArticlesService.articlesLocation}${a.id}`,
        } as MetaTags
      : MetaService.defaultTags();
  };

  public setTagsForArticlePage(id: string): void {
    const tags = this.getMetaTagsForArticle(id);

    this.titleService.setTitle(`${MetaService.siteTitle} - ${tags[Tags.OG_Title]}`);

    this.updateTags(tags);

  };

  public setDefaultTags(): void {
    this.updateTags(MetaService.defaultTags());
  }

  private updateTags(tags: MetaTags): void {
    Object.keys(tags).forEach(key => {
      if (this.isOpenGraphTag(key as Tags)) {
        this.metaService.updateTag({ property: key, content: tags[(key as Tags)] });
      } else {
        this.metaService.updateTag({ name: key, content: tags[(key as Tags)] });
      }
    })
  }

  private isOpenGraphTag(tag: Tags): boolean {
    return tag.startsWith('og:');
  }
}
