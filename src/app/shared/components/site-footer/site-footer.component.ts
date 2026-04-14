import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

import { footerQuickLinks, footerServices, organizationProfile, socialLinks } from '../../../data';
import { SiteIconComponent } from '../site-icon/site-icon.component';

@Component({
  selector: 'app-site-footer',
  imports: [RouterLink, SiteIconComponent],
  templateUrl: './site-footer.component.html',
  styleUrl: './site-footer.component.scss',
})
export class SiteFooterComponent {
  protected readonly currentYear = new Date().getFullYear();
  protected readonly quickLinks = footerQuickLinks;
  protected readonly services = footerServices;
  protected readonly profile = organizationProfile;
  protected readonly socialLinks = socialLinks;
}
