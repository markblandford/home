import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { ArticlesService } from './articles.service';

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

      service.loadArticle('/assets/articles/a.html')
      .subscribe(html => expect(html).toEqual(expected));

      const req = httpTestingController.expectOne('/assets/articles/a.html');

      expect(req.request.method).toEqual('GET');

      req.flush(expected);
    });
  });
});
