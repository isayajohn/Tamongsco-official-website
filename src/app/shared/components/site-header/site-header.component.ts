import { Component, HostListener, inject, signal } from '@angular/core';
import { NavigationEnd, Router, RouterLink } from '@angular/router';
import { filter } from 'rxjs/operators';

import { SiteIconComponent } from '../site-icon/site-icon.component';

@Component({
  selector: 'app-site-header',
  imports: [RouterLink, SiteIconComponent],
  templateUrl: './site-header.component.html',
  styleUrl: './site-header.component.scss',
})
export class SiteHeaderComponent {
  private readonly router = inject(Router);

  protected readonly mobileOpen = signal(false);
  protected readonly scrolled = signal(false);

  constructor() {
    this.scrolled.set(typeof window !== 'undefined' ? window.scrollY > 50 : false);
    this.router.events
      .pipe(filter((event): event is NavigationEnd => event instanceof NavigationEnd))
      .subscribe(() => this.mobileOpen.set(false));
  }

  @HostListener('window:scroll')
  protected onWindowScroll(): void {
    this.scrolled.set(window.scrollY > 50);
  }

  protected toggleMobileMenu(): void {
    this.mobileOpen.update((value) => !value);
  }

  protected isActive(route: string): boolean {
    return this.router.url === route;
  }

  protected isSectionActive(routes: string[]): boolean {
    return routes.some(
      (route) => this.router.url === route || this.router.url.startsWith(`${route}/`),
    );
  }
}
