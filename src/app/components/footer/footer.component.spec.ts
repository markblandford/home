import { FooterComponent } from './footer.component';
import { ThemeService } from '@services/theme.service';

describe('FooterComponent', () => {
  let component: FooterComponent;
  let themeService: ThemeService;

  beforeEach(() => {
    themeService = {
      enableTheme: jest.fn(),
    } as unknown as ThemeService;

    ThemeService.themes = ['sunny', 'default'];

    component = new FooterComponent(themeService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should enable the default theme in ngOnInit', () => {
    component.ngOnInit();

    expect(themeService.enableTheme).toBeCalledWith('default');
  });

  it('should get the available themes in ngOnInit and sort them', () => {
    component.ngOnInit();

    expect(component.themes).toEqual(['default', 'sunny']);
  });

  it('should set the theme', () => {
    component.changeTheme('sunny');

    expect(themeService.enableTheme).toBeCalledWith('sunny');
  });
});
