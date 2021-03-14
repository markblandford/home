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
    } as unknown as Router;

    const service = new RoutingService(mockRouter);
    const actual = service.routeData();

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
    } as unknown as Router;

    const service = new RoutingService(mockRouter);
    const actual = service.routeData();

    expect(actual).toBeUndefined();
  });
});
