import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RenderArticleComponent } from './render-article.component';
import { ActivatedRoute, ParamMap, convertToParamMap } from '@angular/router';
import { of } from 'rxjs';

describe('RenderArticleComponent', () => {
  let component: RenderArticleComponent;
  let activatedRoute: ActivatedRoute;

  beforeEach(() => {
    activatedRoute = {
      paramMap: of(convertToParamMap({ id: 'an id' }))
    } as jest.MockedObject<ActivatedRoute>;

    component = new RenderArticleComponent(activatedRoute);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('ngOnInit', () => {
    it('should get the articleId from the route parameters', () => {
      component.ngOnInit();

      expect(component.articleId).toEqual('an id');
    });
  });
});
