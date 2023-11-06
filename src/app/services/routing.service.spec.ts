import { Data, NavigationEnd, NavigationStart, Router } from '@angular/router';
import { of } from 'rxjs';

import { RoutingService } from './routing.service';

describe('RoutingService', () => {
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

    const service = new RoutingService(mockRouter);

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
            data: [ { title: 'test' } ],
            routeConfig: { path: '' }
          }
        }
      }
    } as unknown as jest.MockedObject<Router>;

    const service = new RoutingService(mockRouter);

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
              data: [{ header: 'sweet child of mine' }]
            }
          }
        }
      }
    } as unknown as jest.MockedObject<Router>;

    const service = new RoutingService(mockRouter);

    let actual = null;
    service.routeData$.subscribe(_ => actual = _);

    expect(actual).toEqual({ header: 'sweet child of mine' } as jest.MockedObject<Data>);
  })
});
