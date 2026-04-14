import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

import { NewsletterBannerComponent } from '../../shared/components/newsletter-banner/newsletter-banner.component';
import { PageHeroComponent } from '../../shared/components/page-hero/page-hero.component';
import { SiteIconComponent } from '../../shared/components/site-icon/site-icon.component';
import {
  articleComments,
  insightCategories,
  insightPosts,
  insightTags,
  newsletterBannerContent,
} from '../../data';

@Component({
  selector: 'app-single-post-page',
  imports: [RouterLink, NewsletterBannerComponent, PageHeroComponent, SiteIconComponent],
  templateUrl: './single-post-page.component.html',
  styleUrl: './single-post-page.component.scss',
})
export class SinglePostPageComponent {
  protected readonly comments = articleComments;
  protected readonly categories = insightCategories;
  protected readonly recentPosts = insightPosts.slice(0, 3);
  protected readonly tags = insightTags;
  protected readonly newsletter = newsletterBannerContent;

  protected preventSubmit(event: Event): void {
    event.preventDefault();
  }
}
