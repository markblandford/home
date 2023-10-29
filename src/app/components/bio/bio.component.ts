import { Component } from '@angular/core';
import { faGithub, faLinkedin, faStackOverflow } from '@fortawesome/free-brands-svg-icons';

@Component({
  selector: 'app-bio',
  templateUrl: './bio.component.html',
  styleUrls: ['./bio.component.scss']
})
export class BioComponent {
  githubIcon = faGithub;
  stackOverflowIcon = faStackOverflow;
  linkedInIcon = faLinkedin;
}
