import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { PageHeroComponent } from '../../shared/components/page-hero/page-hero.component';
import { SiteIconComponent } from '../../shared/components/site-icon/site-icon.component';
import { contactAccessLinks, contactInfoCards, contactReasons, socialLinks } from '../../data';
import { SiteContentService } from '../../services/site-content.service';

@Component({
  selector: 'app-contact-page',
  imports: [FormsModule, PageHeroComponent, SiteIconComponent],
  templateUrl: './contact-page.component.html',
  styleUrl: './contact-page.component.scss',
})
export class ContactPageComponent {
  private readonly siteContent = inject(SiteContentService);

  protected infoCards = contactInfoCards;
  protected reasons = contactReasons;
  protected accessLinks = contactAccessLinks;
  protected socialLinks = socialLinks;
  protected form = {
    name: '',
    email: '',
    phone: '',
    topic: '',
    message: '',
  };
  protected submitState: 'idle' | 'sending' | 'sent' | 'error' = 'idle';

  constructor() {
    this.siteContent.getContent().subscribe((content) => {
      this.infoCards = content.contactInfoCards;
      this.reasons = content.contactReasons;
      this.accessLinks = content.contactAccessLinks;
      this.socialLinks = content.socialLinks;
    });
  }

  protected submitContact(event: Event): void {
    event.preventDefault();
    if (!this.form.name || !this.form.email || !this.form.message || this.submitState === 'sending') {
      return;
    }

    this.submitState = 'sending';
    const subject = [this.form.topic, this.form.phone].filter(Boolean).join(' | ');
    this.siteContent
      .submitContact({
        name: this.form.name,
        email: this.form.email,
        subject,
        message: this.form.message,
      })
      .subscribe({
        next: () => {
          this.submitState = 'sent';
          this.form = { name: '', email: '', phone: '', topic: '', message: '' };
        },
        error: () => {
          this.submitState = 'error';
        },
      });
  }
}
