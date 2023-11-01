import { Data, NavigationEnd, NavigationStart, Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { of } from 'rxjs';
import { RoutingService } from './routing.service';

describe('RoutingService', () => {
  const titleService = {
    setTitle: jest.fn()
  } as jest.MockedObject<Title>;

  it('should subscribe to get the routing data', () => {
    const mockRouter = {
      events: of(new NavigationEnd(0, '', '')),
      routerState: {
        snapshot: {
          root: {
            data: [{ title: 'test' }]
          }
        }
      }
    } as unknown as jest.MockedObject<Router>;

    const service = new RoutingService(mockRouter, titleService);

    let actual = null;
    service.routeData$.subscribe(_ => actual = _);

    expect(actual).toEqual(({ title: 'test' } as unknown) as Data);
  });

  it('should not get data from NavigationStart events', () => {
    const mockRouter = {
      events: of(new NavigationStart(1, '', 'imperative')),
      routerState: {
        snapshot: {
          root: {
            data: [ { title: 'test' } ]
          }
        }
      }
    } as unknown as jest.MockedObject<Router>;

    const service = new RoutingService(mockRouter, titleService);

    let actual = null;
    service.routeData$.subscribe(_ => actual = _);

    expect(actual).toBeNull();
  });

  it('should subscribe to get the routing data when there are child roots', () => {
    const mockRouter = {
      events: of(new NavigationEnd(0, '', '')),
      routerState: {
        snapshot: {
          root: {
            firstChild: {
              data: [{ title: 'sweet child of mine' }]
            }
          }
        }
      }
    } as unknown as jest.MockedObject<Router>;

    const service = new RoutingService(mockRouter, titleService);

    let actual = null;
    service.routeData$.subscribe(_ => actual = _);

    expect(actual).toEqual({ title: 'sweet child of mine' } as jest.MockedObject<Data>);
  })

  it('should set the document title with the routing data title', () => {
    const mockRouter = {
      events: of(new NavigationEnd(0, '', '')),
      routerState: {
        snapshot: {
          root: {
            data: [{ title: 'new title' }]
          }
        }
      }
    } as unknown as jest.MockedObject<Router>;

    new RoutingService(mockRouter, titleService);

    expect(titleService.setTitle).toHaveBeenCalledWith('new title');
  });
});
