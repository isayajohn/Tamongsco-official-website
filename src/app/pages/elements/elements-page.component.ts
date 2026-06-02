import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { RouterLink, RouterModule } from '@angular/router';

import { PageHeroComponent } from '../../shared/components/page-hero/page-hero.component';
import { SiteIconComponent } from '../../shared/components/site-icon/site-icon.component';

import { CounterItem, FaqItem, ServiceCard } from '../../data/models';
import { elementsFaqColumnOne, elementsFaqColumnTwo, resourceCards } from '../../data/resources.data';
import { newsletterBannerContent } from '../../data/organization.data';
import { processSteps } from '../../data/services.data';
import { SiteContentService } from '../../services/site-content.service';

interface ProcessStep {
  number: string;
  title: string;
  description: string;
  delay?: string;
}

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
  private readonly siteContent = inject(SiteContentService);

  protected resourceCards: ServiceCard[] = resourceCards;
  protected faqColumnOne: FaqItem[] = elementsFaqColumnOne;
  protected faqColumnTwo: FaqItem[] = elementsFaqColumnTwo;
  protected newsletter = newsletterBannerContent;
  protected steps: ProcessStep[] = processSteps;
  protected counters: CounterItem[] = [
    { icon: 'groups', value: 150, suffix: '+', label: 'Member Institutions' },
    { icon: 'article', value: 75, suffix: '+', label: 'Shared Resources' },
    { icon: 'forum', value: 25, suffix: '+', label: 'Annual Events' },
    { icon: 'star', value: 98, suffix: '%', label: 'Member Satisfaction' }
  ];

  constructor() {
    this.siteContent.getContent().subscribe((content) => {
      this.resourceCards = content.resourceCards;
      this.faqColumnOne = content.elementsFaqColumnOne;
      this.faqColumnTwo = content.elementsFaqColumnTwo;
      this.newsletter = content.newsletterBannerContent;
      this.steps = content.processSteps;
      this.counters = content.elementsCounters;
    });
  }

  protected preventSubmit(event: Event): void {
    event.preventDefault();
  }
}
