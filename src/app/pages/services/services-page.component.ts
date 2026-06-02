import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';

import { FaqListComponent } from '../../shared/components/faq-list/faq-list.component';
import { PageHeroComponent } from '../../shared/components/page-hero/page-hero.component';
import { SiteIconComponent } from '../../shared/components/site-icon/site-icon.component';
import { processSteps, serviceFaqs, servicesPageServices } from '../../data';
import { FaqItem, ServiceCard } from '../../data/models';
import { SiteContentService } from '../../services/site-content.service';

interface ProcessStep {
  number: string;
  title: string;
  description: string;
  delay?: string;
}

@Component({
  selector: 'app-services-page',
  imports: [RouterLink, FaqListComponent, PageHeroComponent, SiteIconComponent],
  templateUrl: './services-page.component.html',
  styleUrl: './services-page.component.scss',
})
export class ServicesPageComponent {
  private readonly siteContent = inject(SiteContentService);

  protected services: ServiceCard[] = servicesPageServices;
  protected steps: ProcessStep[] = processSteps;
  protected faqs: FaqItem[] = serviceFaqs;

  constructor() {
    this.siteContent.getContent().subscribe((content) => {
      this.services = content.servicesPageServices;
      this.steps = content.processSteps;
      this.faqs = content.serviceFaqs;
    });
  }
}
