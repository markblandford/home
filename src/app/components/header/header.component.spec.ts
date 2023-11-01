import { Data } from '@angular/router';
import { of } from 'rxjs';
import { RoutingService } from '../../services/routing.service';
import { HeaderComponent } from './header.component';

describe('HeaderComponent', () => {
  let component: HeaderComponent;

  const mockData = {
    title: 'test title'
  } as jest.MockedObject<Data>;

  const mockRouterService = {
    routeData$: of(mockData)
  } as jest.MockedObject<RoutingService>;

  beforeEach(() => {
    component = new HeaderComponent(mockRouterService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get the routing data in ngOnInit', () => {
    component.ngOnInit();

    let actual = null;
    component.routeData$?.subscribe(_ => actual = _);

    expect(actual).toEqual(mockData);
  });
});
