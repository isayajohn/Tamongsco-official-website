import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, catchError, map, of, shareReplay } from 'rxjs';

import { environment } from '../../environments/environment';
import {
  aboutFeatures,
  articleComments,
  contactAccessLinks,
  contactInfoCards,
  contactReasons,
  elementsFaqColumnOne,
  elementsFaqColumnTwo,
  footerQuickLinks,
  footerServices,
  heroPartners,
  homeHero,
  homeServices,
  insightCategories,
  insightPosts,
  insightTags,
  missionVisionValues,
  newsletterBannerContent,
  organizationProfile,
  processSteps,
  resourceCards,
  serviceFaqs,
  servicesPageServices,
  sharedCounters,
  socialLinks,
  teamMembers,
  testimonials,
  trustItems,
  whyUsItems,
} from '../data';
import {
  CategoryCount,
  CommentItem,
  ContactInfoCard,
  CounterItem,
  FaqItem,
  HomeHeroContent,
  InsightPost,
  NavLink,
  OfficeHour,
  PartnerLogo,
  ServiceCard,
  SocialLink,
  TeamMember,
  Testimonial,
} from '../data/models';

export interface SiteContent {
  organizationProfile: typeof organizationProfile;
  newsletterBannerContent: typeof newsletterBannerContent;
  homeHero: HomeHeroContent;
  heroPartners: PartnerLogo[];
  homeServices: ServiceCard[];
  servicesPageServices: ServiceCard[];
  missionVisionValues: ServiceCard[];
  teamMembers: TeamMember[];
  resourceCards: ServiceCard[];
  whyUsItems: { title: string; description: string }[];
  aboutFeatures: string[];
  trustItems: string[];
  footerServices: string[];
  insightTags: string[];
  contactReasons: string[];
  sharedCounters: CounterItem[];
  elementsCounters: CounterItem[];
  processSteps: { number: string; title: string; description: string; delay?: string }[];
  serviceFaqs: FaqItem[];
  elementsFaqColumnOne: FaqItem[];
  elementsFaqColumnTwo: FaqItem[];
  testimonials: Testimonial[];
  insightPosts: InsightPost[];
  insightCategories: CategoryCount[];
  articleComments: CommentItem[];
  contactInfoCards: ContactInfoCard[];
  contactAccessLinks: OfficeHour[];
  socialLinks: SocialLink[];
  footerQuickLinks: NavLink[];
}

export const fallbackSiteContent: SiteContent = {
  organizationProfile,
  newsletterBannerContent,
  homeHero,
  heroPartners,
  homeServices,
  servicesPageServices,
  missionVisionValues,
  teamMembers,
  resourceCards,
  whyUsItems,
  aboutFeatures,
  trustItems,
  footerServices,
  insightTags,
  contactReasons,
  sharedCounters,
  elementsCounters: [
    { icon: 'groups', value: 150, suffix: '+', label: 'Member Institutions' },
    { icon: 'article', value: 75, suffix: '+', label: 'Shared Resources' },
    { icon: 'forum', value: 25, suffix: '+', label: 'Annual Events' },
    { icon: 'star', value: 98, suffix: '%', label: 'Member Satisfaction' },
  ],
  processSteps,
  serviceFaqs,
  elementsFaqColumnOne,
  elementsFaqColumnTwo,
  testimonials,
  insightPosts,
  insightCategories,
  articleComments,
  contactInfoCards,
  contactAccessLinks,
  socialLinks,
  footerQuickLinks,
};

@Injectable({ providedIn: 'root' })
export class SiteContentService {
  private readonly http = inject(HttpClient);
  private readonly content$ = this.http.get<Partial<SiteContent>>(`${environment.apiBaseUrl}/site-content/`).pipe(
    map((content) => ({ ...fallbackSiteContent, ...this.removeEmptyValues(content) })),
    catchError(() => of(fallbackSiteContent)),
    shareReplay(1),
  );

  getContent(): Observable<SiteContent> {
    return this.content$;
  }

  submitContact(payload: { name: string; email: string; subject?: string; message: string }) {
    return this.http.post(`${environment.apiBaseUrl}/contact/`, payload);
  }

  subscribeNewsletter(email: string) {
    return this.http.post(`${environment.apiBaseUrl}/newsletter/`, { email });
  }

  private removeEmptyValues(content: Partial<SiteContent>): Partial<SiteContent> {
    return Object.fromEntries(
      Object.entries(content).filter(([, value]) => value !== null && value !== undefined),
    ) as Partial<SiteContent>;
  }
}
