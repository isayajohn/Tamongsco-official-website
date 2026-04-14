export interface NavLink {
  label: string;
  route: string;
}

export interface SocialLink {
  label: string;
  icon: string;
  href: string;
}

export interface ServiceCard {
  icon: string;
  title: string;
  description: string;
  link?: string;
  image?: string;
  delay?: string;
}

export interface CounterItem {
  icon: string;
  value: number;
  suffix: string;
  label: string;
  delay?: string;
}

export interface FaqItem {
  question: string;
  answer: string;
}

export interface Testimonial {
  quote: string;
  name: string;
  role: string;
  image: string;
  delay?: string;
}

export interface InsightPost {
  category: string;
  title: string;
  excerpt: string;
  image: string;
  date: string;
  route: string;
  delay?: string;
}

export interface TeamMember {
  name: string;
  role: string;
  image: string;
  delay?: string;
}

export interface ContactInfoCard {
  icon: string;
  title: string;
  text: string;
}

export interface CategoryCount {
  label: string;
  count: number;
}

export interface OfficeHour {
  label: string;
  value: string;
}

export interface CommentItem {
  name: string;
  date: string;
  text: string;
  image: string;
  isReply?: boolean;
}

export interface HeroAction {
  label: string;
  route: string;
  variant: 'primary' | 'ghost';
}

export interface HeroStat {
  value: string;
  label: string;
  detail: string;
}

export interface HeroFeature {
  icon: string;
  title: string;
  description: string;
}

export interface HeroSpotlightMetric {
  label: string;
  value: string;
}

export interface HomeHeroContent {
  badge: string;
  titleHtml: string;
  description: string;
  actions: HeroAction[];
  sliderImages: string[];
}

export interface PartnerLogo {
  name: string;
  image: string;
}
