import {
  ActivatedRouteSnapshot,
  Data,
  NavigationEnd,
  Router,
  RouterState
} from '@angular/router';
import { Injectable } from '@angular/core';
import { filter } from 'rxjs/operators';
import { Observable, Observer } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RoutingService {

  routeData$ = new Observable<Data>(observer =>
    this.subscribeToNavigationData(this.router, observer)
  );

  constructor(private router: Router) {}

  private subscribeToNavigationData(router: Router, dataObserver: Observer<Data>): void {
    router.events.pipe(
      filter(e => e instanceof NavigationEnd)
    ).subscribe(e => {
      const ss = this.getSnapShot(router.routerState);
      const rd = this.getSnapshotData(ss);

      dataObserver.next(rd);
    });
  }

  private getSnapShot(rs: RouterState): ActivatedRouteSnapshot {
    return this.lastChild(rs.snapshot.root)
  }

  private getSnapshotData(ars: ActivatedRouteSnapshot): Data {
    return ars.data[0];
  }

  private lastChild(snapshotRoot: ActivatedRouteSnapshot): ActivatedRouteSnapshot {
    return snapshotRoot.firstChild ? this.lastChild(snapshotRoot.firstChild) : snapshotRoot;
  }
}
