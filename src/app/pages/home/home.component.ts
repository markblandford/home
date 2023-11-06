import { Component } from '@angular/core';
import { BasePage } from '@pages/base-page/base-page';
import { MetaService } from '@services/meta.service';

@Component({
  templateUrl: './home.component.html'
})
export class HomeComponent extends BasePage {
  constructor(metaService: MetaService) {
    super(metaService);
  }
}
