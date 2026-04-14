import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-site-icon',
  template: `
    <span
      class="ve-site-icon-glyph"
      [style.--ve-icon-url]="'url(/icons/material/' + name + '.svg)'"
      [style.width.px]="size"
      [style.height.px]="size"
      aria-hidden="true"
    ></span>
  `,
  styleUrl: './site-icon.component.scss',
})
export class SiteIconComponent {
  @Input({ required: true }) name = '';
  @Input() size = 20;
}
