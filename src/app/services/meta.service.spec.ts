import { Meta, MetaDefinition, Title } from '@angular/platform-browser';
import { of } from 'rxjs';

import { ArticlesService } from '@services/articles.service';
import { ArticleSummary } from '../models/article-summary';
import { MetaTags, Tags } from '../models/meta';

import { MetaService } from './meta.service';
import HTMLMetaElement from '$GLOBAL$';
import { fakeAsync, tick } from '@angular/core/testing';

describe('MetaService', () => {
  it('should be created', () => {
    const mockArticlesService = {} as jest.MockedObject<ArticlesService>;
    const mockTitleService = {} as jest.MockedObject<Title>;
    const mockMetaService = {} as jest.MockedObject<Meta>;
    expect(new MetaService(mockArticlesService, mockTitleService, mockMetaService)).toBeTruthy();
  });

  describe('getMetaTagsForArticle', () => {
    it('should return the default meta tags if the article is not found', () => {
      const mockArticlesService = {
        getArticleSummary: jest.fn().mockReturnValue(of(undefined)),
      } as jest.MockedObject<ArticlesService>;
      const mockTitleService = {} as jest.MockedObject<Title>;
      const mockMetaService = {} as jest.MockedObject<Meta>;

      const service = new MetaService(mockArticlesService, mockTitleService, mockMetaService);

      let actual = null;
      service.getMetaTagsForArticle('p').subscribe(_ => actual = _);

      expect(actual).toEqual(MetaService.defaultTags());
    });

    it('should call the Articles service to get the data and return the array of meta tags', () => {
      const articleSummary = {
        id: 'p',
        title: 'An article',
        createdDate: '2023-10-23',
        updatedDate: '2023-10-24',
        about: 'the description',
        image: 'img.png',
        tags: [
          'angular',
          'test'
        ],
      } as ArticleSummary;

      const mockArticlesService = {
        getArticleSummary: jest.fn().mockReturnValue(of(articleSummary)),
      } as jest.MockedObject<ArticlesService>;
      const mockTitleService = {} as jest.MockedObject<Title>;
      const mockMetaService = {} as jest.MockedObject<Meta>;

      const service = new MetaService(mockArticlesService, mockTitleService, mockMetaService);

      const expected: MetaTags = {
        [ Tags.Description ] : articleSummary.about,
        [ Tags.OG_Description ] : articleSummary.about,
        [ Tags.OG_Image ] : `${MetaService.fqdn}${ArticlesService.articlesLocation}${articleSummary.id}/${articleSummary.image}`,
        [ Tags.OG_Title ] : articleSummary.title,
        [ Tags.OG_Type ] : 'article',
        [ Tags.OG_Url ] : `${MetaService.fqdn}${ArticlesService.articlesLocation}${articleSummary.id}`,
      };

      let actual = null;
      service.getMetaTagsForArticle('p').subscribe(_ => actual = _);

      expect(actual).toEqual(expected);
    });
  });

  describe('setTagsForArticlePage', () => {
    it('should set the title using the Title service', () => {
      const articleSummary = {
        id: 'p',
        title: 'An article',
        createdDate: '2023-10-23',
        updatedDate: '2023-10-24',
        about: 'the description',
        image: 'img.png',
        tags: [
          'angular',
          'test'
        ],
      } as ArticleSummary;

      const mockArticlesService = {
        getArticleSummary: jest.fn().mockReturnValue(of(articleSummary)),
      } as jest.MockedObject<ArticlesService>;
      const mockTitleService = {
        setTitle: jest.fn(),
      } as jest.MockedObject<Title>;
      const mockMetaService = {} as jest.MockedObject<Meta>;

      const service = new MetaService(mockArticlesService, mockTitleService, mockMetaService);

      service.setTagsForArticlePage('anID');

      expect(mockTitleService.setTitle).toHaveBeenCalledTimes(1);
      expect(mockTitleService.setTitle).toHaveBeenCalledWith(`${MetaService.siteTitle} - ${articleSummary.title}`);

    });

    it('should set the meta tags using the Meta service', fakeAsync(() => {
      const articleSummary = {
        id: 'p',
        title: 'An article',
        createdDate: '2023-10-23',
        updatedDate: '2023-10-24',
        about: 'the description',
        image: 'img.png',
        tags: [
          'angular',
          'test'
        ],
      } as ArticleSummary;

      const mockArticlesService = {
        getArticleSummary: jest.fn().mockReturnValue(of(articleSummary)),
      } as jest.MockedObject<ArticlesService>;
      const mockTitleService = {
        setTitle: jest.fn(),
      } as jest.MockedObject<Title>;
      const mockMetaService = {
        updateTag: jest.fn()
      } as jest.MockedObject<Meta>;

      const service = new MetaService(mockArticlesService, mockTitleService, mockMetaService);

      service.setTagsForArticlePage('anID');
      tick();

      expect(mockMetaService.updateTag).toHaveBeenNthCalledWith(1, { name: 'description', content: articleSummary.about });
      expect(mockMetaService.updateTag).toHaveBeenNthCalledWith(2, { name: 'og:description', content: articleSummary.about });
      expect(mockMetaService.updateTag).toHaveBeenNthCalledWith(3, { name: 'og:image', content: `${MetaService.fqdn}${ArticlesService.articlesLocation}${articleSummary.id}/${articleSummary.image}` });
      expect(mockMetaService.updateTag).toHaveBeenNthCalledWith(4, { name: 'og:title', content: articleSummary.title });
      expect(mockMetaService.updateTag).toHaveBeenNthCalledWith(5, { name: 'og:type', content: 'article' });
      expect(mockMetaService.updateTag).toHaveBeenNthCalledWith(6, { name: 'og:url', content: `${MetaService.fqdn}${ArticlesService.articlesLocation}${articleSummary.id}` });

    }));
  });
});
