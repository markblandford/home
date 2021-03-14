import { ActivatedRouteSnapshot, Data, NavigationEnd, Router, RouterState } from '@angular/router';
import { Injectable } from '@angular/core';
import { filter } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RoutingService {

  private rd: Data | undefined;

  constructor(router: Router) {
    this.subscribeToRouteData(router);
  }

  routeData(): Data | undefined {
    return this.rd;
  }

  private subscribeToRouteData(router: Router): void {
    router.events.pipe(
      filter(e => e instanceof NavigationEnd)
    ).subscribe(e => {
      this.rd = this.getSnapshotData(router.routerState);
    });
  }

  private getSnapshotData(rs: RouterState): Data {
    return rs.snapshot.root.data[0];
  }

  // private lastChild(route: ActivatedRouteSnapshot): ActivatedRouteSnapshot {
  //   return route.firstChild ? this.lastChild(route.firstChild) : route;
  // }
}
