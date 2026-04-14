import { Component } from '@angular/core';
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

@Component({
  selector: 'app-home-page',
  imports: [RouterLink, NewsletterBannerComponent, SiteIconComponent, StatsCounterComponent],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.scss',
})
export class HomePageComponent {
  protected readonly hero = homeHero;
  protected readonly heroPartners = [...heroPartners, ...heroPartners];
  protected readonly trustItems = trustItems;
  protected readonly services = homeServices;
  protected readonly whyUsItems = whyUsItems;
  protected readonly counters = sharedCounters;
  protected readonly testimonials = testimonials;
  protected readonly posts = insightPosts.slice(0, 3);
  protected readonly newsletter = newsletterBannerContent;
}
