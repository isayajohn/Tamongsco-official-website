import { Component } from '@angular/core';

import { PageHeroComponent } from '../../shared/components/page-hero/page-hero.component';
import { SiteIconComponent } from '../../shared/components/site-icon/site-icon.component';
import { contactAccessLinks, contactInfoCards, contactReasons, socialLinks } from '../../data';

@Component({
  selector: 'app-contact-page',
  imports: [PageHeroComponent, SiteIconComponent],
  templateUrl: './contact-page.component.html',
  styleUrl: './contact-page.component.scss',
})
export class ContactPageComponent {
  protected readonly infoCards = contactInfoCards;
  protected readonly reasons = contactReasons;
  protected readonly accessLinks = contactAccessLinks;
  protected readonly socialLinks = socialLinks;

  protected preventSubmit(event: Event): void {
    event.preventDefault();
  }
}
