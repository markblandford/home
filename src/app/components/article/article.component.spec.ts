import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArticleComponent } from './article.component';
import { ArticlesService } from '@services/articles.service';
import { SimpleChange, SimpleChanges } from '@angular/core';
import { of } from 'rxjs';

describe('ArticleComponent', () => {
  let component: ArticleComponent;
  let articleService: ArticlesService;

  beforeEach(() => {
    articleService = {
      articlesLocation: jest.fn().mockReturnValue('/dir/dir/'),
      loadArticle: jest.fn().mockReturnValue(of('some content'))
    } as unknown as ArticlesService;

    component = new ArticleComponent(articleService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('ngOnChanges', () => {
    it('should load the article if the article ID is provided', () => {
      const changes = {
        articleId: {
          previousValue: undefined,
          currentValue: 'id',
        } as SimpleChange,
      } as SimpleChanges;

      component.ngOnChanges(changes);

      let actual = null;
      component.content$.subscribe(_ => actual = _);

      expect(articleService.loadArticle).toHaveBeenCalledWith('/dir/dir/id/body.html');
      expect(actual).toEqual('some content');
    });
  });
});
