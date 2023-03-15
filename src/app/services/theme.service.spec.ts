import { ThemeService } from './theme.service';

describe('ThemeService', () => {
  let service: ThemeService;

  const dom = {
    documentElement: {
      style: {
        setProperty: jest.fn()
      }
    }
  } as unknown as Document;

  beforeEach(() => {
    service = new ThemeService(dom);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return an array of the names of the themes available', () => {
    const expected = [
      'default',
      'night',
      'sunny',
    ];

    const actual = ThemeService.themes;

    expect(actual).toEqual(expected);
  });

  ThemeService.themes.forEach(t => {
    it(`should set the theme to ${t}`, () => {
      service.enableTheme(t);

      expect(dom.documentElement.style.setProperty).toBeCalledWith('--bg-color', `var(--bg-color-${t})`);
      expect(dom.documentElement.style.setProperty).toBeCalledWith('--txt-color', `var(--txt-color-${t})`);
    });
  });
});
