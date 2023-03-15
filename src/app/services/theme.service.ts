import { Inject, Injectable } from '@angular/core';
import { DOCUMENT } from '@angular/common';

export type ThemeName = typeof ThemeService.themes[number];

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  static themes = [
    'default',
    'night',
    'sunny',
  ];

  private static themeVariables = [
    'bg-color',
    'txt-color',
  ];

  constructor(@Inject(DOCUMENT) private document: Document) { }

  enableTheme(theme: ThemeName): void {
    this.setTheme(theme);
  }

  private setTheme(themeName: ThemeName): void {

    ThemeService.themeVariables.forEach((p) => {
      this.document.documentElement.style.setProperty(`--${p}`, `var(--theme-${p}-${themeName})`);
    });
  }
}
