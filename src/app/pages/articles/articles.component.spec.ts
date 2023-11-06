import { MetaService } from '@services/meta.service';
import { ArticlesComponent } from './articles.component';

describe('ArticlesComponent', () => {
  it('should create', () => {
    const metaService = {} as jest.MockedObject<MetaService>;

    const component = new ArticlesComponent(metaService);
    expect(component).toBeTruthy();
  });
});
