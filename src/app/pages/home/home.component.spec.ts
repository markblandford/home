import { MetaService } from '@services/meta.service';
import { HomeComponent } from './home.component';

describe('HomeComponent', () => {
  it('should create', () => {
    const metaService = {} as jest.MockedObject<MetaService>;

    const component = new HomeComponent(metaService);
    expect(component).toBeTruthy();
  });
});
