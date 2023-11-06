

import { ActivatedRoute, convertToParamMap } from '@angular/router';
import { of } from 'rxjs';
import { MetaService } from '@services/meta.service';

import { RenderArticleComponent } from './render-article.component';

describe('RenderArticleComponent', () => {
  it('should create', () => {
    const activatedRoute = {} as jest.MockedObject<ActivatedRoute>;
    const metaService = {} as jest.MockedObject<MetaService>;

    const component = new RenderArticleComponent(activatedRoute, metaService);
    expect(component).toBeTruthy();
  });

  describe('ngOnInit', () => {
    it('should get the articleId from the route parameters', () => {
      const activatedRoute = {
        paramMap: of(convertToParamMap({ id: 'an id' }))
      } as jest.MockedObject<ActivatedRoute>;

      const metaService = {
        setTagsForArticlePage: jest.fn()
      } as jest.MockedObject<MetaService>;

      const component = new RenderArticleComponent(activatedRoute, metaService);

      component.ngOnInit();

      expect(component.articleId).toEqual('an id');
    });

    it('should set the meta tags for the article', () => {
      const activatedRoute = {
        paramMap: of(convertToParamMap({ id: 'an id' }))
      } as jest.MockedObject<ActivatedRoute>;

      const metaService = {
        setTagsForArticlePage: jest.fn()
      } as jest.MockedObject<MetaService>;

      const component = new RenderArticleComponent(activatedRoute, metaService);

      component.ngOnInit();

      expect(metaService.setTagsForArticlePage).toHaveBeenCalledWith('an id');
    });
  });
});
