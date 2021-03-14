import { Data } from '@angular/router';
import { RoutingService } from '../../services/routing.service';
import { HeaderComponent } from './header.component';

describe('HeaderComponent', () => {
  let component: HeaderComponent;

  const mockRouterService = jest.mock('../../services/routing.service.ts') as unknown as RoutingService;

  beforeEach(() => {
    component = new HeaderComponent(mockRouterService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get the routing data in ngOnInit', () => {
    const expected = {
      title: 'test title'
    } as unknown as Data;

    const spy = jest.fn().mockReturnValue(expected);

    mockRouterService.routeData = spy;

    component.ngOnInit();

    expect(component.data).toEqual(expected);
  });
});
