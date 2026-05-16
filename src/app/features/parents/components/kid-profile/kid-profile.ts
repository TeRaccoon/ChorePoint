import { Component, Input } from '@angular/core';
import { KidDetails } from '../../pages/kids-settings/types';

@Component({
  selector: 'app-kid-profile',
  imports: [],
  templateUrl: './kid-profile.html',
  styleUrl: './kid-profile.scss',
})
export class KidProfile {
  @Input() kid!: KidDetails;
}
