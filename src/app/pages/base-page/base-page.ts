import { Directive, OnInit } from '@angular/core';
import { MetaService } from '@services/meta.service';

@Directive()
export abstract class BasePage implements OnInit {

  protected constructor(public metaService: MetaService) { }

  ngOnInit(): void {
    this.metaService.setDefaultTags();
  }
}
