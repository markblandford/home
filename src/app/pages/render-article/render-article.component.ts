import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { MetaService } from '@services/meta.service';
import { BasePage } from '@pages/base-page/base-page';

@Component({
  templateUrl: './render-article.component.html'
})
export class RenderArticleComponent extends BasePage implements OnInit {
  articleId = '';

  constructor(
    private route: ActivatedRoute,
    public metaService: MetaService
    ) {
    super(metaService);
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.articleId = params.get('id') as string;

      this.metaService.setTagsForArticlePage(this.articleId);
    })
  }
}
