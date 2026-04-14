import { Component, Input } from '@angular/core';

import { SiteIconComponent } from '../site-icon/site-icon.component';

@Component({
  selector: 'app-newsletter-banner',
  imports: [SiteIconComponent],
  templateUrl: './newsletter-banner.component.html',
  styleUrl: './newsletter-banner.component.scss',
})
export class NewsletterBannerComponent {
  @Input() title = 'Stay Ahead of the Markets';
  @Input() description = 'Weekly insights, tips, and exclusive offers — straight to your inbox.';

  protected preventSubmit(event: Event): void {
    event.preventDefault();
  }
}
