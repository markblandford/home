import { FooterComponent } from './footer.component';
import { ThemeService, Themes } from '@services/theme.service';

describe('FooterComponent', () => {
  let component: FooterComponent;
  let themeService: ThemeService;

  beforeEach(() => {
    themeService = {
      enableTheme: jest.fn(),
    } as unknown as ThemeService;

    component = new FooterComponent(themeService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should enable the default theme in ngOnInit', () => {
    component.ngOnInit();

    expect(themeService.enableTheme).toBeCalledWith(Themes.Default);
  });

  it('should set the theme', () => {
    component.changeTheme(Themes.Sunny);

    expect(themeService.enableTheme).toBeCalledWith(Themes.Sunny);
  });
});
