import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  OnChanges,
  OnDestroy,
  SimpleChanges,
  ViewChild,
  signal,
} from '@angular/core';

import { CounterItem } from '../../../data';
import { SiteIconComponent } from '../site-icon/site-icon.component';

@Component({
  selector: 'app-stats-counter',
  imports: [SiteIconComponent],
  templateUrl: './stats-counter.component.html',
  styleUrl: './stats-counter.component.scss',
})
export class StatsCounterComponent implements AfterViewInit, OnChanges, OnDestroy {
  @Input({ required: true }) items: CounterItem[] = [];

  @ViewChild('counterSection', { static: true })
  private readonly counterSection?: ElementRef<HTMLElement>;

  protected readonly displayValues = signal<number[]>([]);

  private observer?: IntersectionObserver;
  private hasAnimated = false;

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['items']) {
      this.displayValues.set(this.items.map(() => 0));
      this.hasAnimated = false;
    }
  }

  ngAfterViewInit(): void {
    if (!this.counterSection) {
      return;
    }

    this.observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting && !this.hasAnimated) {
          this.hasAnimated = true;
          this.animateCounters();
          this.observer?.disconnect();
        }
      },
      { threshold: 0.3 },
    );

    this.observer.observe(this.counterSection.nativeElement);
  }

  ngOnDestroy(): void {
    this.observer?.disconnect();
  }

  private animateCounters(): void {
    const duration = 2000;
    const start = performance.now();

    const updateFrame = (timestamp: number): void => {
      const progress = Math.min((timestamp - start) / duration, 1);
      this.displayValues.set(this.items.map((item) => Math.floor(item.value * progress)));

      if (progress < 1) {
        requestAnimationFrame(updateFrame);
        return;
      }

      this.displayValues.set(this.items.map((item) => item.value));
    };

    requestAnimationFrame(updateFrame);
  }
}
