import { Component, Input, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { SiteContentService } from '../../../services/site-content.service';
import { SiteIconComponent } from '../site-icon/site-icon.component';

@Component({
  selector: 'app-newsletter-banner',
  imports: [FormsModule, SiteIconComponent],
  templateUrl: './newsletter-banner.component.html',
  styleUrl: './newsletter-banner.component.scss',
})
export class NewsletterBannerComponent {
  private readonly siteContent = inject(SiteContentService);

  @Input() title = 'Stay Ahead of the Markets';
  @Input() description = 'Weekly insights, tips, and exclusive offers — straight to your inbox.';
  protected email = '';
  protected submitState: 'idle' | 'sending' | 'sent' | 'error' = 'idle';

  protected subscribe(event: Event): void {
    event.preventDefault();
    if (!this.email || this.submitState === 'sending') {
      return;
    }

    this.submitState = 'sending';
    this.siteContent.subscribeNewsletter(this.email).subscribe({
      next: () => {
        this.submitState = 'sent';
        this.email = '';
      },
      error: () => {
        this.submitState = 'error';
      },
    });
  }
}
