import { Inject, Injectable } from '@angular/core';
import { DOCUMENT } from '@angular/common';

export interface ThemeColours {
  'bg-color': string;
  'txt-color': string;
}

export type Themes = {
  [key: string]: ThemeColours;
};

export type ThemeName = keyof typeof ThemeService.appThemes;

@Injectable({
  providedIn: 'root'
})
export class ThemeService {

  static appThemes: Themes = {
    sunny: {
      'bg-color': '#ffef67',
      'txt-color': '#005826'
    } as ThemeColours,
    default: {
      'bg-color': '#f6f6f6',
      'txt-color': '#175ea1'
    } as ThemeColours,
    night: {
      'bg-color': '#333',
      'txt-color': '#fff'
    } as ThemeColours
  };

  constructor(@Inject(DOCUMENT) private document: Document) { }

  availableThemes(): ThemeName[] {
    return Object.keys(ThemeService.appThemes);
  }

  enableTheme(theme: ThemeName): void {
    this.setTheme(ThemeService.appThemes[theme]);
  }

  private setTheme(theme: ThemeColours): void {
    Object.keys(theme).forEach((p) => {
      // @ts-ignore
      this.document.documentElement.style.setProperty(`--${p}`, theme[p]);
    });
  }
}
