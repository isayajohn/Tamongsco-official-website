import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

import { NewsletterBannerComponent } from '../../shared/components/newsletter-banner/newsletter-banner.component';
import { PageHeroComponent } from '../../shared/components/page-hero/page-hero.component';
import { SiteIconComponent } from '../../shared/components/site-icon/site-icon.component';
import { insightCategories, insightPosts, insightTags, newsletterBannerContent } from '../../data';

@Component({
  selector: 'app-insights-page',
  imports: [RouterLink, NewsletterBannerComponent, PageHeroComponent, SiteIconComponent],
  templateUrl: './insights-page.component.html',
  styleUrl: './insights-page.component.scss',
})
export class InsightsPageComponent {
  protected readonly posts = insightPosts;
  protected readonly categories = insightCategories;
  protected readonly recentPosts = insightPosts.slice(0, 3);
  protected readonly tags = insightTags;
  protected readonly newsletter = newsletterBannerContent;
}
