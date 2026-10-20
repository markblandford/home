import { Component, ChangeDetectionStrategy } from '@angular/core';
import { faGithub, faLinkedin, faStackOverflow } from '@fortawesome/free-brands-svg-icons';

@Component({
    selector: 'app-bio',
    templateUrl: './bio.component.html',
    styleUrls: ['./bio.component.scss'],
    changeDetection: ChangeDetectionStrategy.Eager,
    standalone: false
})
export class BioComponent {
  githubIcon = faGithub;
  stackOverflowIcon = faStackOverflow;
  linkedInIcon = faLinkedin;
}
