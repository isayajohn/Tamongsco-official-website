import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';

import { footerQuickLinks, footerServices, organizationProfile, socialLinks } from '../../../data';
import { SiteContentService } from '../../../services/site-content.service';
import { SiteIconComponent } from '../site-icon/site-icon.component';

@Component({
  selector: 'app-site-footer',
  imports: [RouterLink, SiteIconComponent],
  templateUrl: './site-footer.component.html',
  styleUrl: './site-footer.component.scss',
})
export class SiteFooterComponent {
  private readonly siteContent = inject(SiteContentService);

  protected readonly currentYear = new Date().getFullYear();
  protected quickLinks = footerQuickLinks;
  protected services = footerServices;
  protected profile = organizationProfile;
  protected socialLinks = socialLinks;

  constructor() {
    this.siteContent.getContent().subscribe((content) => {
      this.quickLinks = content.footerQuickLinks;
      this.services = content.footerServices;
      this.profile = content.organizationProfile;
      this.socialLinks = content.socialLinks;
    });
  }
}
