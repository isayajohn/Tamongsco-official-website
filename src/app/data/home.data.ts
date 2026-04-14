import { HomeHeroContent, PartnerLogo, ServiceCard, Testimonial } from './models';

export const homeHero: HomeHeroContent = {
  badge: 'National Education Network',
  titleHtml: 'Stronger representation for <span>Tanzania&apos;s schools and colleges</span>',
  description:
    'TAMONGSCO connects non-government institutions, supports collaboration, and gives members a stronger voice in education.',
  actions: [
    { label: 'Become a Member', route: '/contact', variant: 'primary' },
    { label: 'Explore Services', route: '/services', variant: 'ghost' },
  ],
  sliderImages: ['img/bg-img/1.jpg', 'img/bg-img/3.jpg', 'img/bg-img/5.jpg'],
};

export const heroPartners: PartnerLogo[] = [
  {
    name: 'TAMONGSCO',
    image: 'img/partners/tamongsco-clean.jpeg',
  },
  {
    name: 'Office of the Attorney General Tanzania',
    image: 'img/partners/attorney-general-seal.png',
  },
  {
    name: 'United Republic of Tanzania',
    image: 'img/partners/tanzania-emblem.png',
  },
  {
    name: 'Afrigotech',
    image: 'img/partners/afrigotech-blue.png',
  },
];

export const homeServices: ServiceCard[] = [
  {
    icon: 'campaign',
    title: 'Advocacy',
    description:
      'We advocate for the interests of our members in policy discussions so their voices are heard in educational matters.',
    link: '/services',
    delay: '100ms',
  },
  {
    icon: 'diversity_3',
    title: 'Collaboration',
    description:
      'We foster collaboration between educational institutions and government agencies to strengthen the education framework.',
    link: '/services',
    delay: '200ms',
  },
  {
    icon: 'folder_open',
    title: 'Resources',
    description:
      'We provide resources and information that help members improve educational practice and community engagement.',
    link: '/elements',
    delay: '300ms',
  },
];

export const whyUsItems = [
  {
    title: 'National Representation',
    description:
      'We connect and represent non-government educational institutions across Tanzania.',
  },
  {
    title: 'Government Engagement',
    description:
      'We promote better communication between member institutions and government bodies.',
  },
  {
    title: 'Useful Updates',
    description:
      'We share timely resources, information, and community updates that help members move forward.',
  },
];

export const testimonials: Testimonial[] = [
  {
    quote:
      "The support from TAMONGSCO has greatly improved our school's operations. Their insights are invaluable.",
    name: 'Alice Mwangi',
    role: 'Principal',
    image: 'img/logo.jpeg',
    delay: '100ms',
  },
  {
    quote:
      'Working with TAMONGSCO has enabled us to access better resources and network with other institutions.',
    name: 'John Kisumu',
    role: 'Headmaster',
    image: 'img/logo.jpeg',
    delay: '250ms',
  },
  {
    quote:
      "TAMONGSCO's guidance on educational policy has been a game changer for our college's growth.",
    name: 'Grace Nduna',
    role: 'Director',
    image: 'img/logo.jpeg',
    delay: '400ms',
  },
];
