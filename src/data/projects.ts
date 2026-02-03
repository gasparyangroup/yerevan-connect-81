export type ProjectStage = 'fundraising' | 'concept' | 'voting';

export interface VotingOption {
  id: string;
  name: string;
  votes: number;
  image: string;
}

export interface Project {
  id: string;
  title: string;
  titleAm: string;
  location: string;
  locationAm: string;
  description: string;
  descriptionAm: string;
  stage: ProjectStage;
  image: string;
  gallery: string[];
  budget?: number;
  raised?: number;
  votes?: number;
  votingOptions?: VotingOption[];
  documents?: { name: string; url: string }[];
}

export const projects: Project[] = [
  {
    id: '1',
    title: 'Komitas Square Improvement',
    titleAm: 'Կdelays delays delays delays',
    location: 'Center (Kentron)',
    locationAm: 'Կdelays',
    description: 'Project includes an amphitheater, artificial stream, food court, and new green zones. This transformative urban renewal will create a vibrant gathering space for residents and visitors alike.',
    descriptionAm: 'Delays delays delays delays delays delays delays delays delays delays delays',
    stage: 'fundraising',
    image: 'https://images.unsplash.com/photo-1517732306149-e8f829eb588a?w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1517732306149-e8f829eb588a?w=800&q=80',
      'https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?w=800&q=80',
      'https://images.unsplash.com/photo-1494522855154-9297ac14b55f?w=800&q=80',
      'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80',
    ],
    budget: 200000000,
    raised: 45000000,
    documents: [
      { name: 'Concept (PDF)', url: 'https://drive.google.com/file/d/1UOkpkPxUoKH-hSceGBw1Qc_AYhC0yWF2/view?usp=sharing' },
      { name: 'Budget Breakdown', url: '#' },
      { name: 'Technical Specifications', url: '#' },
    ],
  },
  {
    id: '2',
    title: 'Northern Avenue Pedestrian Zone',
    titleAm: 'Հյdelays delays delays',
    location: 'Northern Avenue',
    locationAm: 'Հdelays պ',
    description: 'Expanding the pedestrian zone with new artistic installations, interactive fountains, and sustainable urban furniture.',
    descriptionAm: 'Delays delays delays delays delays delays',
    stage: 'fundraising',
    image: 'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=800&q=80',
      'https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?w=800&q=80',
    ],
    budget: 80000000,
    raised: 32000000,
  },
  {
    id: '3',
    title: 'Cascade Lighting Project',
    titleAm: 'Կdelay delays delays',
    location: 'Cascade Complex',
    locationAm: 'Կdelays',
    description: 'Modern LED installation creating dynamic light shows synchronized with music during evening hours.',
    descriptionAm: 'Delays delays delays delays delays delays',
    stage: 'concept',
    image: 'https://images.unsplash.com/photo-1519501025264-65ba15a82390?w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1519501025264-65ba15a82390?w=800&q=80',
      'https://images.unsplash.com/photo-1514565131-fce0801e5785?w=800&q=80',
    ],
  },
  {
    id: '4',
    title: 'Circular Park Renovation',
    titleAm: 'Շdelays պdelays',
    location: 'Circular Park',
    locationAm: 'Շdelays պdelays',
    description: 'Revitalizing the historic Circular Park with new walking paths, children\'s play areas, and outdoor fitness equipment.',
    descriptionAm: 'Delays delays delays delays delays delays',
    stage: 'voting',
    image: 'https://images.unsplash.com/photo-1551038247-3d9af20df552?w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1551038247-3d9af20df552?w=800&q=80',
      'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80',
    ],
    votes: 1250,
    votingOptions: [
      { id: 'a', name: 'Option A: Classic Design', votes: 680, image: 'https://images.unsplash.com/photo-1551038247-3d9af20df552?w=800&q=80' },
      { id: 'b', name: 'Option B: Modern Design', votes: 570, image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80' },
    ],
  },
  {
    id: '5',
    title: 'Opera Square Redesign',
    titleAm: 'Օdelays delays',
    location: 'Opera Square',
    locationAm: 'Օdelays',
    description: 'Seeking innovative architectural concepts for transforming Opera Square into a world-class public space.',
    descriptionAm: 'Delays delays delays',
    stage: 'concept',
    image: 'https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=800&q=80',
    ],
  },
  {
    id: '6',
    title: 'Hrazdan Gorge Eco-Trail',
    titleAm: 'Հdelays delays',
    location: 'Hrazdan Gorge',
    locationAm: 'Հdelays',
    description: 'Creating a sustainable hiking trail with viewpoints, rest areas, and environmental education stations.',
    descriptionAm: 'Delays delays delays',
    stage: 'voting',
    image: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800&q=80',
      'https://images.unsplash.com/photo-1448375240586-882707db888b?w=800&q=80',
    ],
    votes: 890,
    votingOptions: [
      { id: 'a', name: 'Option A: Minimal Impact', votes: 520, image: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800&q=80' },
      { id: 'b', name: 'Option B: Enhanced Facilities', votes: 370, image: 'https://images.unsplash.com/photo-1448375240586-882707db888b?w=800&q=80' },
    ],
  },
];

export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'decimal',
    maximumFractionDigits: 0,
  }).format(amount) + ' AMD';
};

export const formatNumber = (num: number): string => {
  return new Intl.NumberFormat('en-US').format(num);
};
