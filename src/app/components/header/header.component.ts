import { RoutingService } from './../../services/routing.service';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, NavigationEnd, Data } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, map, mergeMap } from 'rxjs/operators';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  data: Data | undefined;

  constructor(private routerService: RoutingService) {}

  ngOnInit(): void {
    this.data = this.routerService.routeData();
  }
}
