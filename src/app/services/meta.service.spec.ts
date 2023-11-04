import { Meta, Title } from '@angular/platform-browser';

import { ArticlesService } from '@services/articles.service';
import { MetaService } from './meta.service';

describe('MetaService', () => {
  it('should be created', () => {
    const mockArticlesService = {} as jest.MockedObject<ArticlesService>;
    const mockTitleService = {} as jest.MockedObject<Title>;
    const mockMetaService = {} as jest.MockedObject<Meta>;
    expect(new MetaService(mockArticlesService, mockTitleService, mockMetaService)).toBeTruthy();
  });

  describe('getMetaTagsForArticle', () => {
    it('should call the Articles service to get the data and return the array of meta tags', () => {


      throw new Error('Not implemented');
    });
  });

  describe('setForPage', () => {
    it('should set the title using the Title service', () => {
      throw new Error('Not implemented');
    });

    it('should set the meta tags using the Meta service', () => {
      throw new Error('Not implemented');
    })
  });
});
