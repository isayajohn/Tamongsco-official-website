import { CategoryCount, CommentItem, InsightPost } from './models';

export const insightPosts: InsightPost[] = [
  {
    category: 'Updates',
    title: 'Policy Dialogue Highlights for Member Institutions',
    excerpt:
      'A quick look at the advocacy themes and education priorities currently shaping conversations with stakeholders.',
    image: 'img/bg-img/10.jpg',
    date: 'January 28, 2026',
    route: '/insights/latest-updates',
    delay: '100ms',
  },
  {
    category: 'Resources',
    title: 'Preparing Schools and Colleges for the New Term',
    excerpt:
      'Practical reminders and shared guidance to help institutions plan confidently and communicate clearly.',
    image: 'img/bg-img/11.jpg',
    date: 'January 28, 2026',
    route: '/insights/latest-updates',
    delay: '250ms',
  },
  {
    category: 'Membership',
    title: 'Become a Member of the National Education Network',
    excerpt:
      'Join TAMONGSCO to access networking, shared resources, and stronger representation for your institution.',
    image: 'img/bg-img/12.jpg',
    date: 'January 28, 2026',
    route: '/insights/latest-updates',
    delay: '400ms',
  },
];

export const insightCategories: CategoryCount[] = [
  { label: 'Updates', count: 1 },
  { label: 'Membership', count: 1 },
  { label: 'Resources', count: 1 },
  { label: 'Advocacy', count: 1 },
  { label: 'Community', count: 1 },
  { label: 'Events', count: 1 },
];

export const insightTags = [
  'TAMONGSCO',
  'Education',
  'Schools',
  'Colleges',
  'Membership',
  'Advocacy',
  'Resources',
  'Events',
  'Updates',
];

export const articleComments: CommentItem[] = [
  {
    name: 'Alice Mwangi',
    date: 'January 28, 2026',
    text: "The support from TAMONGSCO has greatly improved our school's operations. Their insights are invaluable.",
    image: 'img/logo.jpeg',
  },
  {
    name: 'John Kisumu',
    date: 'January 28, 2026',
    text: 'Working with TAMONGSCO has enabled us to access better resources and network with other institutions.',
    image: 'img/logo.jpeg',
    isReply: true,
  },
  {
    name: 'Grace Nduna',
    date: 'January 28, 2026',
    text: "TAMONGSCO's guidance on educational policy has been a game changer for our college's growth.",
    image: 'img/logo.jpeg',
  },
];
