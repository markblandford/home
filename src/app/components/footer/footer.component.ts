import { Component, OnInit } from '@angular/core';
import { Themes, ThemeService } from '@services/theme.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  themes = Themes;
  selected = Themes.Default;

  constructor(private themeService: ThemeService) {}

  changeTheme(theme: string): void {
    this.themeService.enableTheme(theme as Themes);
  }

  ngOnInit(): void {
    this.themeService.enableTheme(this.selected);
  }
}
