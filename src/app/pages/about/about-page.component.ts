import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

import { NewsletterBannerComponent } from '../../shared/components/newsletter-banner/newsletter-banner.component';
import { PageHeroComponent } from '../../shared/components/page-hero/page-hero.component';
import { SiteIconComponent } from '../../shared/components/site-icon/site-icon.component';
import { StatsCounterComponent } from '../../shared/components/stats-counter/stats-counter.component';
import {
  aboutFeatures,
  missionVisionValues,
  newsletterBannerContent,
  sharedCounters,
  teamMembers,
} from '../../data';

@Component({
  selector: 'app-about-page',
  imports: [
    RouterLink,
    NewsletterBannerComponent,
    PageHeroComponent,
    SiteIconComponent,
    StatsCounterComponent,
  ],
  templateUrl: './about-page.component.html',
  styleUrl: './about-page.component.scss',
})
export class AboutPageComponent {
  protected readonly features = aboutFeatures;
  protected readonly missionVisionValues = missionVisionValues;
  protected readonly teamMembers = teamMembers;
  protected readonly counters = sharedCounters;
  protected readonly newsletter = newsletterBannerContent;
}
