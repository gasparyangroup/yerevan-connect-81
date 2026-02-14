import komitas1 from '@/assets/komitas-1.png';
import komitas2 from '@/assets/komitas-2.png';
import komitas3 from '@/assets/komitas-3.png';
import yespace1 from '@/assets/yespace-1.png';
import yespace2 from '@/assets/yespace-2.png';
import yespace3 from '@/assets/yespace-3.png';
import yespace4 from '@/assets/yespace-4.png';

export type ProjectStage = 'sponsorship' | 'concept';

export interface Project {
  id: string;
  title: string;
  titleAm: string;
  titleEn: string;
  location: string;
  locationAm: string;
  locationEn: string;
  description: string;
  descriptionAm: string;
  descriptionEn: string;
  stage: ProjectStage;
  image: string;
  gallery: string[];
  budget?: number;
  raised?: number;
  documents?: { name: string; url: string }[];
  presentationUrl?: string;
}

export const projects: Project[] = [
  {
    id: '1',
    title: 'Благоустройство площади Комитаса',
    titleAm: 'Կոdelays delays', // TODO: proper Armenian
    titleEn: 'Komitas Square Renovation',
    location: 'Центр (Кentрон)',
    locationAm: 'Կentron', // TODO: proper Armenian
    locationEn: 'Center (Kentron)',
    description: 'Проект предусматривает превращение площади Комитаса в яркое городское пространство с современным амфитеатром для культурных мероприятий, искусственным ручьём, создающим умиротворяющую атмосферу, разнообразными точками питания и обширными новыми зелёными зонами. Дизайн включает инновационные игровые конструкции для детей, скульптурные инсталляции, современные архитектурные павильоны с характерными геометрическими формами и тщательно спланированные ландшафтные зоны с местными растениями.',
    descriptionAm: 'Delays delays delays', // TODO: proper Armenian
    descriptionEn: 'The project envisions transforming Komitas Square into a vibrant urban space with a modern amphitheater for cultural events, an artificial stream creating a serene atmosphere, diverse dining spots, and extensive new green areas.',
    stage: 'sponsorship',
    image: komitas1,
    gallery: [komitas1, komitas2, komitas3],
    budget: 200000000,
    documents: [
      { name: 'Презентация проекта', url: 'https://drive.google.com/file/d/1UOkpkPxUoKH-hSceGBw1Qc_AYhC0yWF2/view?usp=drive_link' },
    ],
    presentationUrl: 'https://drive.google.com/file/d/1UOkpkPxUoKH-hSceGBw1Qc_AYhC0yWF2/view?usp=drive_link',
  },
  {
    id: '2',
    title: 'Пешеходная зона Северного проспекта',
    titleAm: 'Delays delays', // TODO: proper Armenian
    titleEn: 'Northern Avenue Pedestrian Zone',
    location: 'Северный проспект',
    locationAm: 'Delays delays', // TODO: proper Armenian
    locationEn: 'Northern Avenue',
    description: 'Расширение пешеходной зоны с новыми художественными инсталляциями, интерактивными фонтанами и экологичной городской мебелью.',
    descriptionAm: 'Delays delays delays', // TODO: proper Armenian
    descriptionEn: 'Expansion of the pedestrian zone with new art installations, interactive fountains, and eco-friendly urban furniture.',
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
    titleAm: 'Delays delays', // TODO: proper Armenian
    titleEn: 'Cascade Lighting Project',
    location: 'Комплекс Каскад',
    locationAm: 'Delays delays', // TODO: proper Armenian
    locationEn: 'Cascade Complex',
    description: 'Современная LED-инсталляция, создающая динамичные световые шоу, синхронизированные с музыкой в вечернее время.',
    descriptionAm: 'Delays delays delays', // TODO: proper Armenian
    descriptionEn: 'A modern LED installation creating dynamic light shows synchronized with music in the evening.',
    stage: 'concept',
    image: 'https://images.unsplash.com/photo-1519501025264-65ba15a82390?w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1519501025264-65ba15a82390?w=800&q=80',
      'https://images.unsplash.com/photo-1514565131-fce0801e5785?w=800&q=80',
    ],
  },
  {
    id: '5',
    title: 'Редизайн Площади Оперы',
    titleAm: 'Delays delays', // TODO: proper Armenian
    titleEn: 'Opera Square Redesign',
    location: 'Площадь Оперы',
    locationAm: 'Delays delays', // TODO: proper Armenian
    locationEn: 'Opera Square',
    description: 'Поиск инновационных архитектурных концепций для превращения Площади Оперы в публичное пространство мирового класса.',
    descriptionAm: 'Delays delays delays', // TODO: proper Armenian
    descriptionEn: 'Seeking innovative architectural concepts to transform Opera Square into a world-class public space.',
    stage: 'concept',
    image: 'https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=800&q=80',
    ],
  },
  {
    id: '7',
    title: 'Yespace',
    titleAm: 'Yespace',
    titleEn: 'Yespace',
    location: 'Перекрёсток Московяна и Баграмяна',
    locationAm: 'Delays delays', // TODO: proper Armenian
    locationEn: 'Moskovyan & Baghramyan intersection',
    description: 'Концепция от TL бюро. Проект благоустройства перекрёстка Московяна и Баграмяна с созданием современного общественного пространства, зелёных зон, пешеходных дорожек и арт-объектов.',
    descriptionAm: 'TL delays delays delays', // TODO: proper Armenian
    descriptionEn: 'Concept by TL bureau. Improvement project for the Moskovyan & Baghramyan intersection with modern public spaces, green areas, pedestrian paths, and art objects.',
    stage: 'sponsorship',
    image: yespace1,
    gallery: [yespace1, yespace2, yespace3, yespace4],
    budget: 1000000,
    documents: [
      { name: 'Презентация проекта', url: 'https://drive.google.com/file/d/15A4pMJA9ZumPqfilrWFYVFLGJt8UEtr4/view?usp=sharing' },
    ],
    presentationUrl: 'https://drive.google.com/file/d/15A4pMJA9ZumPqfilrWFYVFLGJt8UEtr4/view?usp=sharing',
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
