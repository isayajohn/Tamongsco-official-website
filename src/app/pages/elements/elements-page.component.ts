import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink, RouterModule } from '@angular/router';

import { PageHeroComponent } from '../../shared/components/page-hero/page-hero.component';
import { SiteIconComponent } from '../../shared/components/site-icon/site-icon.component';

import { CounterItem, FaqItem, ServiceCard } from '../../data/models';
import { elementsFaqColumnOne, elementsFaqColumnTwo, resourceCards } from '../../data/resources.data';
import { newsletterBannerContent } from '../../data/organization.data';
import { processSteps } from '../../data/services.data';

@Component({
  selector: 'app-elements-page',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    PageHeroComponent,
    SiteIconComponent
  ],
  templateUrl: './elements-page.component.html',
  styleUrl: './elements-page.component.scss',
})
export class ElementsPageComponent {
  protected readonly resourceCards: ServiceCard[] = resourceCards;
  protected readonly faqColumnOne: FaqItem[] = elementsFaqColumnOne;
  protected readonly faqColumnTwo: FaqItem[] = elementsFaqColumnTwo;
  protected readonly newsletter = newsletterBannerContent;
  protected readonly steps = processSteps;
  protected readonly counters: CounterItem[] = [
    { icon: 'groups', value: 150, suffix: '+', label: 'Member Institutions' },
    { icon: 'article', value: 75, suffix: '+', label: 'Shared Resources' },
    { icon: 'forum', value: 25, suffix: '+', label: 'Annual Events' },
    { icon: 'star', value: 98, suffix: '%', label: 'Member Satisfaction' }
  ];

  protected preventSubmit(event: Event): void {
    event.preventDefault();
  }
}

