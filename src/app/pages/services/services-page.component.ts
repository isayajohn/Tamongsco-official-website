import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

import { FaqListComponent } from '../../shared/components/faq-list/faq-list.component';
import { PageHeroComponent } from '../../shared/components/page-hero/page-hero.component';
import { SiteIconComponent } from '../../shared/components/site-icon/site-icon.component';
import { processSteps, serviceFaqs, servicesPageServices } from '../../data';

@Component({
  selector: 'app-services-page',
  imports: [RouterLink, FaqListComponent, PageHeroComponent, SiteIconComponent],
  templateUrl: './services-page.component.html',
  styleUrl: './services-page.component.scss',
})
export class ServicesPageComponent {
  protected readonly services = servicesPageServices;
  protected readonly steps = processSteps;
  protected readonly faqs = serviceFaqs;
}
