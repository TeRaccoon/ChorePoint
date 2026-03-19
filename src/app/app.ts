import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { PhoneFrame } from './components/phone-frame/phone-frame';
import { Welcome } from './components/start/children/welcome/welcome';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, PhoneFrame, Welcome],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  protected readonly title = signal('ChorePoint');
}
