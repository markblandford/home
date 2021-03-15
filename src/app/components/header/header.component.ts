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
<<<<<<< HEAD
    this.data = this.routerService.routeData;
    console.log('data', this.data);
=======
    this.data = this.routerService.routeData();
>>>>>>> 42b4523113f20121753875d3e3d2cbbc7300c876
  }
}
