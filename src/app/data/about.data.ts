import { TeamMember } from './models';

export const aboutFeatures = [
  'Connects and represents non-government educational institutions across Tanzania',
  'Promotes educational excellence through advocacy and collaboration',
  'Enhances communication between schools, colleges, and government bodies',
  'Provides resources and updates that help members thrive',
];

export const missionVisionValues = [
  {
    icon: 'checklist',
    title: 'Our Mission',
    description:
      'To connect and represent non-government educational institutions across Tanzania while promoting excellence and collaboration.',
    delay: '100ms',
  },
  {
    icon: 'visibility',
    title: 'Our Vision',
    description:
      'A stronger education sector where schools and colleges work together, stay informed, and contribute to a brighter future.',
    delay: '250ms',
  },
  {
    icon: 'favorite',
    title: 'Our Values',
    description:
      'Advocacy, collaboration, practical support, and a shared commitment to improving education in Tanzania.',
    delay: '400ms',
  },
];

export const teamMembers: TeamMember[] = [
  {
    name: 'Advocacy Support',
    role: 'Representing member interests in education policy matters',
    image: 'img/bg-img/15.jpg',
    delay: '100ms',
  },
  {
    name: 'Institution Collaboration',
    role: 'Strengthening the relationship between members and public stakeholders',
    image: 'img/bg-img/16.jpg',
    delay: '200ms',
  },
  {
    name: 'Shared Resources',
    role: 'Providing practical information and updates for schools and colleges',
    image: 'img/bg-img/17.jpg',
    delay: '300ms',
  },
  {
    name: 'Membership Growth',
    role: 'Building a connected network of non-government education providers',
    image: 'img/bg-img/18.jpg',
    delay: '400ms',
  },
];
