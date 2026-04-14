import { Component, Input, signal } from '@angular/core';

import { FaqItem } from '../../../data';
import { SiteIconComponent } from '../site-icon/site-icon.component';

@Component({
  selector: 'app-faq-list',
  imports: [SiteIconComponent],
  templateUrl: './faq-list.component.html',
  styleUrl: './faq-list.component.scss',
})
export class FaqListComponent {
  @Input({ required: true }) items: FaqItem[] = [];

  protected readonly openIndex = signal(0);

  protected toggle(index: number): void {
    this.openIndex.set(this.openIndex() === index ? -1 : index);
  }
}
