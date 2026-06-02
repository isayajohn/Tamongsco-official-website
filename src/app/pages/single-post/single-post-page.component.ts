import { Component, inject } from '@angular/core';
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
import { SiteContentService } from '../../services/site-content.service';

@Component({
  selector: 'app-single-post-page',
  imports: [RouterLink, NewsletterBannerComponent, PageHeroComponent, SiteIconComponent],
  templateUrl: './single-post-page.component.html',
  styleUrl: './single-post-page.component.scss',
})
export class SinglePostPageComponent {
  private readonly siteContent = inject(SiteContentService);

  protected comments = articleComments;
  protected post = insightPosts[0];
  protected categories = insightCategories;
  protected recentPosts = insightPosts.slice(0, 3);
  protected tags = insightTags;
  protected newsletter = newsletterBannerContent;

  constructor() {
    this.siteContent.getContent().subscribe((content) => {
      this.comments = content.articleComments;
      this.post = content.insightPosts[0];
      this.categories = content.insightCategories;
      this.recentPosts = content.insightPosts.slice(0, 3);
      this.tags = content.insightTags;
      this.newsletter = content.newsletterBannerContent;
    });
  }

  protected preventSubmit(event: Event): void {
    event.preventDefault();
  }
}
