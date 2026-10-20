import { Component, ChangeDetectionStrategy } from '@angular/core';
import { faBook, faHouse } from '@fortawesome/free-solid-svg-icons';


@Component({
    selector: 'app-navigation',
    templateUrl: './navigation.component.html',
    styleUrls: ['./navigation.component.scss'],
    changeDetection: ChangeDetectionStrategy.Eager,
    standalone: false
})
export class NavigationComponent {
  homeIcon = faHouse;
  articlesIcon = faBook;
}
