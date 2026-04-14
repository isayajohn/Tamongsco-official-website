import { FaqItem, ServiceCard } from './models';

export const elementsFaqColumnOne: FaqItem[] = [
  {
    question: 'Where can I start as a new member?',
    answer:
      'Start with the membership section, then review the resources and updates shared by TAMONGSCO.',
  },
  {
    question: 'What kind of resources are available?',
    answer:
      'The site highlights resources, updates, FAQs, and practical information intended to support member institutions.',
  },
  {
    question: 'Does TAMONGSCO work with government bodies?',
    answer:
      'Yes. Collaboration with government bodies is part of the organization’s role in strengthening education delivery.',
  },
];

export const elementsFaqColumnTwo: FaqItem[] = [
  {
    question: 'How does TAMONGSCO support collaboration?',
    answer:
      'It brings institutions together and helps strengthen communication across the education community.',
  },
  {
    question: 'What updates can members expect?',
    answer:
      'Members can follow news, updates, and community information shared through the organization’s channels.',
  },
  {
    question: 'Can I contact TAMONGSCO directly?',
    answer:
      'Yes. The organization publishes its phone number, email address, and Dodoma location for direct inquiries.',
  },
];

export const resourceCards: ServiceCard[] = [
  {
    icon: 'folder_open',
    title: 'Member Guides & Templates',
    description:
      'Access standard documents, templates, and policy guides designed for member institutions.',
    link: '/resources',
  },
  {
    icon: 'description',
    title: 'Training & Workshop Materials',
    description:
      'Find presentations, toolkits, and learning resources used in TAMONGSCO workshops and meetings.',
    link: '/resources',
  },
  {
    icon: 'book',
    title: 'Advocacy & Regulatory Briefs',
    description:
      'Review advocacy briefs, educational policy summaries, and important regulatory updates.',
    link: '/resources',
  },
];
