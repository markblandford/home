import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { ArticlesService } from './articles.service';
import { ArticleSummary } from '../models/article-summary';

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
      expect(service.articlesLocation()).toEqual('/assets/articles/');
    });
  });

  describe('loadArticle', () => {
    it('should return the html body of the article', () => {
      const expected = '<h1>Hello World</h1>';

      service.loadArticle('/assets/articles/a.md')
      .subscribe(f => expect(f).toEqual(expected));

      const req = httpTestingController.expectOne('/assets/articles/a.md');

      expect(req.request.method).toEqual('GET');

      req.flush(expected);
    });
  });

  describe('getArticleSummaries', () => {
    it('should return the array of article summaries', () => {
      const expected: Array<ArticleSummary> = [
        {
          id: '0',
          path: 'p',
          filename: 'example',
          title: 'An article',
          createdDate: '2023-10-23',
          updatedDate: '2023-10-24',
          about: 'the description',
          tags: [],
        }
      ];

      service.getArticleSummaries()
        .subscribe(f => expect(f).toEqual(expected));

      const req = httpTestingController.expectOne(`${service.articlesLocation()}summaries.json`);

      expect(req.request.method).toEqual('GET');

      req.flush(expected);

    });
  });
});
