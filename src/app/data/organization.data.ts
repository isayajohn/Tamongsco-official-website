import { ContactInfoCard, CounterItem, NavLink, SocialLink } from './models';

export const organizationProfile = {
  name: 'TAMONGSCO',
  fullName: 'Tanzania Managers and Owners of Non-Government Schools and Colleges Organization',
  tagline: 'Representing non-government education providers in Tanzania.',
  location: 'Dodoma, Tanzania 63088',
  phone: '+255 569 316 570',
  email: 'info@tamongsco.tz',
  website: 'tamongsco.tz',
} as const;

export const footerQuickLinks: NavLink[] = [
  { label: 'Home', route: '/' },
  { label: 'About TAMONGSCO', route: '/about' },
  { label: 'Our Services', route: '/services' },
  { label: 'News & Updates', route: '/insights' },
  { label: 'Contact Us', route: '/contact' },
];

export const footerServices = [
  'Advocacy',
  'Collaboration',
  'Resources',
  'Membership',
  'News & Updates',
];

export const trustItems = [
  'Representing non-government education providers in Tanzania',
  'Advocacy for educational excellence',
  'Collaboration with schools and colleges',
  'Communication with government bodies',
  'Membership and resource sharing',
  'News, updates, and community support',
  'Representing non-government education providers in Tanzania',
  'Advocacy for educational excellence',
];

export const sharedCounters: CounterItem[] = [
  { icon: 'star', value: 3, suffix: '', label: 'Core Service Areas', delay: '100ms' },
  { icon: 'link', value: 5, suffix: '', label: 'Quick Access Links', delay: '200ms' },
  { icon: 'forum', value: 3, suffix: '', label: 'Member Testimonials', delay: '300ms' },
  {
    icon: 'article',
    value: 2,
    suffix: '',
    label: 'Latest Updates Shown',
    delay: '400ms',
  },
];

export const newsletterBannerContent = {
  title: 'Stay Connected',
  description: 'Follow TAMONGSCO for education updates, member notices, and community news.',
} as const;

export const socialLinks: SocialLink[] = [
  { label: 'Facebook', icon: 'public', href: 'javascript:void(0)' },
  { label: 'Instagram', icon: 'photo_camera', href: 'javascript:void(0)' },
  { label: 'Twitter', icon: 'forum', href: 'javascript:void(0)' },
  { label: 'LinkedIn', icon: 'business_center', href: 'javascript:void(0)' },
];

export const contactInfoCards: ContactInfoCard[] = [
  { icon: 'call', title: 'Call Us', text: organizationProfile.phone },
  { icon: 'mail', title: 'Email Us', text: organizationProfile.email },
  { icon: 'location_on', title: 'Visit Our Office', text: organizationProfile.location },
];
