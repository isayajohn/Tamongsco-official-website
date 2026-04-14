import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-page-hero',
  imports: [RouterLink],
  templateUrl: './page-hero.component.html',
  styleUrl: './page-hero.component.scss',
})
export class PageHeroComponent {
  @Input({ required: true }) tag = '';
  @Input({ required: true }) titleHtml = '';
  @Input({ required: true }) backgroundImage = '';
  @Input({ required: true }) breadcrumbLabel = '';
  @Input() compact = false;
}
