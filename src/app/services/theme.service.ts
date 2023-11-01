import { Inject, Injectable } from '@angular/core';
import { DOCUMENT } from '@angular/common';

// key and value must be the same
export enum Themes {
  Default = 'Default',
  Night = 'Night',
  Sunny = 'Sunny'
};

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  constructor(@Inject(DOCUMENT) private document: Document) { }

  enableTheme(theme: Themes): void {
    this.setTheme(theme);
  }

  private setTheme(themeName: Themes): void {
    const root = this.document.querySelector('html');

    root?.setAttribute('data-theme', themeName);
  }
}
