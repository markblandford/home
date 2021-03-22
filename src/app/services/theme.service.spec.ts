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
      'sunny',
      'default',
      'night'
    ];

    const actual = service.availableThemes();

    expect(actual).toEqual(expected);
  });

  it('should set the theme to sunny', () => {
    service.enableTheme('sunny');

    expect(dom.documentElement.style.setProperty).toBeCalledWith('--bg-color', '#ffef67');
    expect(dom.documentElement.style.setProperty).toBeCalledWith('--txt-color', '#005826');
  });

  it('should set the theme to default', () => {
    service.enableTheme('default');

    expect(dom.documentElement.style.setProperty).toBeCalledWith('--bg-color', '#f6f6f6');
    expect(dom.documentElement.style.setProperty).toBeCalledWith('--txt-color', '#175ea1');
  });

  it('should set the theme to night', () => {
    service.enableTheme('night');

    expect(dom.documentElement.style.setProperty).toBeCalledWith('--bg-color', '#333');
    expect(dom.documentElement.style.setProperty).toBeCalledWith('--txt-color', '#fff');
  });
});
