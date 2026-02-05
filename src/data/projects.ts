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
    title: 'Благоустройство площади Комитаса',
    titleAm: 'Կոdelays delays delays',
    location: 'Центр (Кентрон)',
    locationAm: 'Կentron',
    description: 'Проект предусматривает превращение площади Комитаса в яркое городское пространство с современным амфитеатром для культурных мероприятий, искусственным ручьём, создающим умиротворяющую атмосферу, разнообразными точками питания и обширными новыми зелёными зонами. Дизайн включает инновационные игровые конструкции для детей, скульптурные инсталляции, современные архитектурные павильоны с характерными геометрическими формами и тщательно спланированные ландшафтные зоны с местными растениями.',
    descriptionAm: 'Delays delays delays',
    stage: 'sponsorship',
    image: komitas1,
    gallery: [
      komitas1,
      komitas2,
      komitas3,
    ],
    budget: 200000000,
    documents: [
      { name: 'Презентация проекта', url: 'https://drive.google.com/file/d/1UOkpkPxUoKH-hSceGBw1Qc_AYhC0yWF2/view?usp=drive_link' },
    ],
    presentationUrl: 'https://drive.google.com/file/d/1UOkpkPxUoKH-hSceGBw1Qc_AYhC0yWF2/view?usp=drive_link',
  },
  {
    id: '2',
    title: 'Пешеходная зона Северного проспекта',
    titleAm: 'Հdelay delays',
    location: 'Северный проспект',
    locationAm: 'Հ Delay',
    description: 'Расширение пешеходной зоны с новыми художественными инсталляциями, интерактивными фонтанами и экологичной городской мебелью.',
    descriptionAm: 'Delays delays',
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
    title: 'Проект освещения Каскада',
    titleAm: 'Կaскад delays',
    location: 'Комплекс Каскад',
    locationAm: 'Կaскад',
    description: 'Современная LED-инсталляция, создающая динамичные световые шоу, синхронизированные с музыкой в вечернее время.',
    descriptionAm: 'Delays delays',
    stage: 'concept',
    image: 'https://images.unsplash.com/photo-1519501025264-65ba15a82390?w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1519501025264-65ba15a82390?w=800&q=80',
      'https://images.unsplash.com/photo-1514565131-fce0801e5785?w=800&q=80',
    ],
  },
  {
    id: '4',
    title: 'Реновация Кольцевого парка',
    titleAm: 'Շdelay delay',
    location: 'Кольцевой парк',
    locationAm: 'Շdelay delay',
    description: 'Возрождение исторического Кольцевого парка с новыми пешеходными дорожками, детскими игровыми площадками и уличными тренажёрами.',
    descriptionAm: 'Delays delays',
    stage: 'voting',
    image: 'https://images.unsplash.com/photo-1551038247-3d9af20df552?w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1551038247-3d9af20df552?w=800&q=80',
      'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80',
    ],
    votes: 1250,
    votingOptions: [
      { id: 'a', name: 'Вариант A: Классический дизайн', votes: 680, image: 'https://images.unsplash.com/photo-1551038247-3d9af20df552?w=800&q=80' },
      { id: 'b', name: 'Вариант B: Современный дизайн', votes: 570, image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80' },
    ],
  },
  {
    id: '5',
    title: 'Редизайн Площади Оперы',
    titleAm: 'Օпера delays',
    location: 'Площадь Оперы',
    locationAm: 'Օпера',
    description: 'Поиск инновационных архитектурных концепций для превращения Площади Оперы в публичное пространство мирового класса.',
    descriptionAm: 'Delays delays',
    stage: 'concept',
    image: 'https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=800&q=80',
    ],
  },
  {
    id: '6',
    title: 'Экотропа Разданского ущелья',
    titleAm: 'Հразdan delays',
    location: 'Разданское ущелье',
    locationAm: 'Հразdan',
    description: 'Создание экологической пешеходной тропы со смотровыми площадками, зонами отдыха и станциями экологического просвещения.',
    descriptionAm: 'Delays delays',
    stage: 'voting',
    image: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800&q=80',
      'https://images.unsplash.com/photo-1448375240586-882707db888b?w=800&q=80',
    ],
    votes: 890,
    votingOptions: [
      { id: 'a', name: 'Вариант A: Минимальное вмешательство', votes: 520, image: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800&q=80' },
      { id: 'b', name: 'Вариант B: Расширенная инфраструктура', votes: 370, image: 'https://images.unsplash.com/photo-1448375240586-882707db888b?w=800&q=80' },
    ],
  },
];

export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('ru-RU', {
    style: 'decimal',
    maximumFractionDigits: 0,
  }).format(amount) + ' AMD';
};

export const formatNumber = (num: number): string => {
  return new Intl.NumberFormat('ru-RU').format(num);
};
