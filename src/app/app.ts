import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { SiteFooterComponent } from './shared/components/site-footer/site-footer.component';
import { SiteHeaderComponent } from './shared/components/site-header/site-header.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, SiteHeaderComponent, SiteFooterComponent],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  protected readonly showPreloader = signal(true);

  constructor() {
    setTimeout(() => this.showPreloader.set(false), 650);
  }
}
