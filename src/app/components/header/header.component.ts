import { Component, OnInit } from '@angular/core';
import { Data } from '@angular/router';
import { Observable } from 'rxjs';
import { RoutingService } from '@services/routing.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  routeData$: Observable<Data> | undefined;

  constructor(private routerService: RoutingService) {}

  ngOnInit(): void {
    this.routeData$ = this.routerService.routeData$;
  }
}
