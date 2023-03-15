import { Component, OnInit } from '@angular/core';
import { ThemeName, ThemeService } from '@services/theme.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  themes: ThemeName[] = [];
  selected: ThemeName = 'default';

  constructor(private themeService: ThemeService) {}

  changeTheme(theme: ThemeName): void {
    this.themeService.enableTheme(theme);
  }

  ngOnInit(): void {
    this.themeService.enableTheme(this.selected);

    this.themes = ThemeService.themes.sort();
  }
}
