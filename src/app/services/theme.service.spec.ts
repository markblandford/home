import { Themes } from '@services/theme.service';
import { ThemeService } from './theme.service';

describe('ThemeService', () => {
  let service: ThemeService;
  let dom: Document;

  beforeEach(() => {
    dom = {
      querySelector: jest.fn(),
    } as jest.MockedObject<Document>;

    service = new ThemeService(dom);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should set the html data-theme attribute to the given theme', () => {
    const htmlStub = { setAttribute: jest.fn() } as jest.MockedObject<HTMLHtmlElement>;

    jest.spyOn(dom, 'querySelector').mockReturnValue(htmlStub);
    service.enableTheme(Themes.Sunny);

    expect(htmlStub.setAttribute).toHaveBeenCalledWith('data-theme', Themes.Sunny);
  });
});
