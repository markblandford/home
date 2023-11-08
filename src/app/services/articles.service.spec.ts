import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { ArticlesService } from './articles.service';
import { ArticleSummary } from '../models/article-summary';
import ArticleList from '@content/article-list';

jest.mock('@content/article-list')

describe('ArticlesService', () => {
  let service: ArticlesService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule ]
    });

    service = TestBed.inject(ArticlesService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => httpTestingController.verify());

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('articlesLocation', () => {
    it('should return the path to where the articles are saved', () => {
      expect(ArticlesService.articlesLocation).toEqual('/assets/articles/');
    });
  });

  describe('articleFilename', () => {
    it('should return the filename of the articles', () => {
      expect(ArticlesService.articleFilename).toEqual('article.md');
    });
  });

  describe('loadArticle', () => {
    it('should return the html body of the article', () => {
      const expected = '<h1>Hello World</h1>';

      service.loadArticle('AnID')
      .subscribe(f => expect(f).toEqual(expected));

      const req = httpTestingController.expectOne('/assets/articles/AnID/article.md');

      expect(req.request.method).toEqual('GET');

      req.flush(expected);
    });
  });

  describe('getArticleSummaries', () => {
    it('should return the array of article summaries', () => {
      const expected: Array<ArticleSummary> = [
        {
          id: 'p',
          title: 'An article',
          createdDate: '2023-10-23',
          updatedDate: '2023-10-24',
          about: 'the description',
          image: 'img.png',
          tags: [],
        }
      ];

      jest.spyOn(ArticleList.prototype, 'getSummaries').mockReturnValue(expected);

      expect(service.getArticleSummaries()).toEqual(expected);
    });
  });

  describe('getArticleSummary', () => {
    it('should return the summary for the given article id', () => {
      const expected = {
        id: 'p',
        title: 'An article',
        createdDate: '2023-10-23',
        updatedDate: '2023-10-24',
        about: 'the description',
        image: 'img.png',
        tags: [],
      } as ArticleSummary;

      const allSummaries = [
        { id: 'b' } as ArticleSummary,
        { ...expected },
        { id: 'a' } as ArticleSummary
      ]

      jest.spyOn(ArticleList.prototype, 'getSummaries').mockReturnValue(allSummaries);

      expect(service.getArticleSummary('p')).toEqual(expected);
    });
  });
});
