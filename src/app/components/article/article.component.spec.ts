import { SimpleChange, SimpleChanges } from '@angular/core';
import { of } from 'rxjs';

import { ArticlesService } from '@services/articles.service';

import { ArticleComponent } from './article.component';
import { MetaService } from '@services/meta.service';

describe('ArticleComponent', () => {
  it('should create', () => {
    const articleService = {} as jest.MockedObject<ArticlesService>;
    const metaService = {} as jest.MockedObject<MetaService>;

    const component = new ArticleComponent(articleService, metaService);
    expect(component).toBeTruthy();
  });

  describe('ngOnChanges', () => {
    it('should load the article if the article ID is provided', () => {
      const articleService = {
        loadArticle: jest.fn().mockReturnValue(of('some content'))
      } as jest.MockedObject<ArticlesService>;

      const metaService = {
        setTagsForArticlePage: jest.fn()
      } as jest.MockedObject<MetaService>;

      const component = new ArticleComponent(articleService, metaService);

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

    it('should set the meta tags for the article ID', () => {
      const articleService = {
        loadArticle: jest.fn()
      } as jest.MockedObject<ArticlesService>;

      const metaService = {
        setTagsForArticlePage: jest.fn()
      } as jest.MockedObject<MetaService>;

      const component = new ArticleComponent(articleService, metaService);

      const changes = {
        articleId: {
          previousValue: undefined,
          currentValue: 'TheID',
        } as SimpleChange,
      } as SimpleChanges;

      component.ngOnChanges(changes);

      expect(metaService.setTagsForArticlePage).toHaveBeenCalledTimes(1);
      expect(metaService.setTagsForArticlePage).toHaveBeenCalledWith('TheID');
    });
  });
});
