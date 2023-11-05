import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  templateUrl: './render-article.component.html'
})
export class RenderArticleComponent implements OnInit {
  articleId = '';

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.articleId = params.get('id') as string;
    })
  }
}
