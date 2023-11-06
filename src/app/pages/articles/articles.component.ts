import { Component } from '@angular/core';
import { BasePage } from '@pages/base-page/base-page';
import { MetaService } from '@services/meta.service';

@Component({
  selector: 'app-articles',
  templateUrl: './articles.component.html'
})
export class ArticlesComponent extends BasePage {
  constructor(metaService: MetaService) {
    super(metaService);
  }
}
