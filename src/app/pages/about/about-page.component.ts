import { Component, inject } from '@angular/core';
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
import { CounterItem, ServiceCard, TeamMember } from '../../data/models';
import { SiteContentService } from '../../services/site-content.service';

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
  private readonly siteContent = inject(SiteContentService);

  protected features: string[] = aboutFeatures;
  protected missionVisionValues: ServiceCard[] = missionVisionValues;
  protected teamMembers: TeamMember[] = teamMembers;
  protected counters: CounterItem[] = sharedCounters;
  protected newsletter = newsletterBannerContent;

  constructor() {
    this.siteContent.getContent().subscribe((content) => {
      this.features = content.aboutFeatures;
      this.missionVisionValues = content.missionVisionValues;
      this.teamMembers = content.teamMembers;
      this.counters = content.sharedCounters;
      this.newsletter = content.newsletterBannerContent;
    });
  }
}
