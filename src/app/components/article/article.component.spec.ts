import { SimpleChange, SimpleChanges } from '@angular/core';
import { of } from 'rxjs';

import { ArticlesService } from '@services/articles.service';

import { ArticleComponent } from './article.component';

describe('ArticleComponent', () => {
  let component: ArticleComponent;
  let articleService: ArticlesService;

  beforeEach(() => {
    articleService = {
      loadArticle: jest.fn().mockReturnValue(of('some content'))
    } as jest.MockedObject<ArticlesService>;

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
          currentValue: 'TheID',
        } as SimpleChange,
      } as SimpleChanges;

      component.ngOnChanges(changes);

      let actual = null;
      component.content$.subscribe(_ => actual = _);

      expect(articleService.loadArticle).toHaveBeenCalledWith('TheID');
      expect(actual).toEqual('some content');
    });
  });
});
