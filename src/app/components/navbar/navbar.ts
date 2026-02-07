import { Component } from '@angular/core';
import { User } from '../types';

@Component({
  selector: 'app-navbar',
  imports: [],
  templateUrl: './navbar.html',
  styleUrl: './navbar.scss',
})
export class Navbar {
  user: User = {
    username: 'Zach',
    points: 1500,
  };
}
