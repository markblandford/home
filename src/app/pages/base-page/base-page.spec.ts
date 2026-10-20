import { BasePage } from './base-page';
import { Component } from '@angular/core';
import { MetaService } from '@services/meta.service';

@Component({
  template: '',
  selector: 'app-tbp',
})
class TestBasePage extends BasePage {
  constructor(metaService: MetaService,) {
    super(metaService);
  }
}

describe('BasePage', () => {
  it('should create an instance', () => {
    const metaService = {} as jest.MockedObject<MetaService>;

    const component = new TestBasePage(metaService);
    expect(component).toBeTruthy();
  });

  describe('ngOnInit', () => {
    it('should set the default, meta tags', () => {
      const metaService = {
        setDefaultTags: jest.fn(),
      } as jest.MockedObject<MetaService>;

      const component = new TestBasePage(metaService);

      component.ngOnInit();

      expect(metaService.setDefaultTags).toHaveBeenCalledTimes(1);
    });
  });
});
