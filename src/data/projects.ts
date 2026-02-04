import komitas1 from '@/assets/komitas-1.png';
import komitas2 from '@/assets/komitas-2.png';
import komitas3 from '@/assets/komitas-3.png';

export type ProjectStage = 'sponsorship' | 'concept' | 'voting';

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
  presentationUrl?: string;
}

export const projects: Project[] = [
  {
    id: '1',
    title: 'Komitas Square Improvement',
    titleAm: 'Կdelays delays delays delays',
    location: 'Center (Kentron)',
    locationAm: 'Կdelays',
    description: 'The project envisions transforming Komitas Square into a vibrant urban destination featuring a modern amphitheater for cultural events, an artificial stream creating a serene atmosphere, diverse food court options, and expansive new green zones. The design incorporates innovative playground structures for children, sculptural installations, contemporary architectural pavilions with distinctive geometric forms, and carefully landscaped areas with native plants. This transformative urban renewal will create a unique gathering space that celebrates Armenian culture while providing modern amenities for residents and visitors alike.',
    descriptionAm: 'Delays delays delays delays delays delays delays delays delays delays delays',
    stage: 'sponsorship',
    image: komitas1,
    gallery: [
      komitas1,
      komitas2,
      komitas3,
    ],
    budget: 200000000,
    documents: [
      { name: 'Project Presentation', url: 'https://drive.google.com/file/d/1UOkpkPxUoKH-hSceGBw1Qc_AYhC0yWF2/view?usp=drive_link' },
    ],
    presentationUrl: 'https://drive.google.com/file/d/1UOkpkPxUoKH-hSceGBw1Qc_AYhC0yWF2/view?usp=drive_link',
  },
  {
    id: '2',
    title: 'Northern Avenue Pedestrian Zone',
    titleAm: 'Հյdelays delays delays',
    location: 'Northern Avenue',
    locationAm: 'Հdelays պ',
    description: 'Expanding the pedestrian zone with new artistic installations, interactive fountains, and sustainable urban furniture.',
    descriptionAm: 'Delays delays delays delays delays delays',
    stage: 'sponsorship',
    image: 'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=800&q=80',
      'https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?w=800&q=80',
    ],
    budget: 80000000,
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
