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
import { MetaService } from '@services/meta.service';

@Injectable({
  providedIn: 'root'
})
export class RoutingService {

  routeData$ = new Observable<Data>(observer =>
    this.subscribeToNavigationData(this.router, observer)
  );

  constructor(
    private router: Router,
    private metaService: MetaService
    ) {
    this.updateMetaTags(router);
  }

  private subscribeToNavigationData(router: Router, dataObserver: Observer<Data>): void {
    router.events.pipe(
      filter(e => e instanceof NavigationEnd)
    ).subscribe(e => {
      const ss = this.getSnapShot(router.routerState);
      const rd = this.getSnapshotData(ss);

      dataObserver.next(rd);
    });
  }

  private updateMetaTags(router: Router): void {
    router.events.pipe(
      filter(e => e instanceof NavigationEnd)
    ).subscribe(e => {
      const ss = this.getSnapShot(router.routerState);

      this.setMetaTags(ss.routeConfig?.path, ss.params.id);
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

  private setMetaTags(path: string | undefined, id?: string): void {
    if (this.isArticle(path, id)) {
      console.log('is article');
      this.metaService.setTagsForArticlePage(id as string);
    } else {
      this.metaService.setDefaultTags();
    }
  }

  private isArticle(path: string | undefined, id: string | undefined): boolean {
    return !!(path && id && path.startsWith('articles/') && id.length > 0);
  }
}
