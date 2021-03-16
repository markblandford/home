import { ActivatedRouteSnapshot, Data, NavigationEnd, Router, RouterState } from '@angular/router';
import { Injectable } from '@angular/core';
import { filter } from 'rxjs/operators';
import { Title } from '@angular/platform-browser';
import { Observable, Observer, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RoutingService {

  routeData$ = new Observable<Data>(observer =>
    this.subscribeToRouteData(this.router, observer)
  );

  constructor(
    private router: Router,
    private titleService: Title
    ) {
    this.routeData$.subscribe(data => data && this.setTitle(data.title));
  }

  private subscribeToRouteData(router: Router, observer: Observer<Data>): void {
    router.events.pipe(
      filter(e => e instanceof NavigationEnd)
    ).subscribe(e => {
      const rd = this.getSnapshotData(router.routerState);

      observer.next(rd);
    });
  }

  private getSnapshotData(rs: RouterState): Data {
    const root = rs.snapshot.root;
    return this.lastChild(root).data[0];
  }

  private lastChild(snapshotRoot: ActivatedRouteSnapshot): ActivatedRouteSnapshot {
    return snapshotRoot.firstChild ? this.lastChild(snapshotRoot.firstChild) : snapshotRoot;
  }

  private setTitle(title: string): void {
    this.titleService.setTitle(title);
  }
}
