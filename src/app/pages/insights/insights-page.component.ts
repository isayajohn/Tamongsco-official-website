import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';

import { NewsletterBannerComponent } from '../../shared/components/newsletter-banner/newsletter-banner.component';
import { PageHeroComponent } from '../../shared/components/page-hero/page-hero.component';
import { SiteIconComponent } from '../../shared/components/site-icon/site-icon.component';
import { insightCategories, insightPosts, insightTags, newsletterBannerContent } from '../../data';
import { SiteContentService } from '../../services/site-content.service';

@Component({
  selector: 'app-insights-page',
  imports: [RouterLink, NewsletterBannerComponent, PageHeroComponent, SiteIconComponent],
  templateUrl: './insights-page.component.html',
  styleUrl: './insights-page.component.scss',
})
export class InsightsPageComponent {
  private readonly siteContent = inject(SiteContentService);

  protected posts = insightPosts;
  protected categories = insightCategories;
  protected recentPosts = insightPosts.slice(0, 3);
  protected tags = insightTags;
  protected newsletter = newsletterBannerContent;

  constructor() {
    this.siteContent.getContent().subscribe((content) => {
      this.posts = content.insightPosts;
      this.categories = content.insightCategories;
      this.recentPosts = content.insightPosts.slice(0, 3);
      this.tags = content.insightTags;
      this.newsletter = content.newsletterBannerContent;
    });
  }
}
