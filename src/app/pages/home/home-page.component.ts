import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';

import { NewsletterBannerComponent } from '../../shared/components/newsletter-banner/newsletter-banner.component';
import { SiteIconComponent } from '../../shared/components/site-icon/site-icon.component';
import { StatsCounterComponent } from '../../shared/components/stats-counter/stats-counter.component';
import {
  homeHero,
  heroPartners,
  homeServices,
  insightPosts,
  newsletterBannerContent,
  sharedCounters,
  testimonials,
  trustItems,
  whyUsItems,
} from '../../data';
import { SiteContentService } from '../../services/site-content.service';

@Component({
  selector: 'app-home-page',
  imports: [RouterLink, NewsletterBannerComponent, SiteIconComponent, StatsCounterComponent],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.scss',
})
export class HomePageComponent {
  private readonly siteContent = inject(SiteContentService);

  protected hero = homeHero;
  protected heroPartners = [...heroPartners, ...heroPartners];
  protected trustItems = trustItems;
  protected services = homeServices;
  protected whyUsItems = whyUsItems;
  protected counters = sharedCounters;
  protected testimonials = testimonials;
  protected posts = insightPosts.slice(0, 3);
  protected newsletter = newsletterBannerContent;

  constructor() {
    this.siteContent.getContent().subscribe((content) => {
      this.hero = content.homeHero;
      this.heroPartners = [...content.heroPartners, ...content.heroPartners];
      this.trustItems = content.trustItems;
      this.services = content.homeServices;
      this.whyUsItems = content.whyUsItems;
      this.counters = content.sharedCounters;
      this.testimonials = content.testimonials;
      this.posts = content.insightPosts.slice(0, 3);
      this.newsletter = content.newsletterBannerContent;
    });
  }
}
