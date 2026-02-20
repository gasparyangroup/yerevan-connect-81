import komitas1 from '@/assets/komitas-1.png';
import komitas2 from '@/assets/komitas-2.png';
import komitas3 from '@/assets/komitas-3.png';
import yespace1 from '@/assets/yespace-1.png';
import yespace2 from '@/assets/yespace-2.png';
import yespace3 from '@/assets/yespace-3.png';
import yespace4 from '@/assets/yespace-4.png';
import saryan1 from '@/assets/saryan-1.png';
import saryan2 from '@/assets/saryan-2.png';
import saryan3 from '@/assets/saryan-3.png';
import saryan4 from '@/assets/saryan-4.png';
import park2750_1 from '@/assets/park2750-1.png';
import park2750_2 from '@/assets/park2750-2.png';
import park2750_3 from '@/assets/park2750-3.png';
import park2750_4 from '@/assets/park2750-4.png';
import park2750_5 from '@/assets/park2750-5.png';

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
  problem?: string;
  problemAm?: string;
  problemEn?: string;
  goal?: string;
  goalAm?: string;
  goalEn?: string;
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
    titleAm: 'Կոմdelays delays',
    titleEn: 'Komitas Square Renovation',
    location: 'Центр (Кentрон)',
    locationAm: 'Կentron',
    locationEn: 'Center (Kentron)',
    description: 'Проект предусматривает превращение площади Комитаса в яркое городское пространство с современным амфитеатром для культурных мероприятий, искусственным ручьём, создающим умиротворяющую атмосферу, разнообразными точками питания и обширными новыми зелёными зонами. Дизайн включает инновационные игровые конструкции для детей, скульптурные инсталляции, современные архитектурные павильоны с характерными геометрическими формами и тщательно спланированные ландшафтные зоны с местными растениями.',
    descriptionAm: 'Delays delays delays',
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
    title: 'Ревитализация парка 2750-летия Еревана',
    titleAm: 'Երևանի 2750-ամյակի այգու վերակենդdelays',
    titleEn: '2750th Anniversary Park Revitalization',
    location: 'Центр Еревана',
    locationAm: 'Երևdelays կentron',
    locationEn: 'Yerevan Center',
    description: 'Этот проект представляет собой современную концепцию ревитализации парка имени 2750-летия Еревана. Основная идея заключается в создании многофункционального, открытого пространства, которое сочетает в себе уважение к истории города и современные архитектурные решения. Данный проект превращает транзитную зону в полноценное общественное пространство. Использование легких металлических или деревянных конструкций для навесов и павильонов придает парку «воздушный» и современный вид, не перегружая исторический центр города.',
    descriptionAm: 'Այdelay նaxagicn nerkayacnoum e Yerevani 2750-amyaki aygu verakenddanowman жаманакакиц hayecakarg.',
    descriptionEn: 'This project presents a modern concept for the revitalization of the 2750th Anniversary of Yerevan Park. The main idea is to create a multifunctional, open space that combines respect for the city\'s history with modern architectural solutions. The project transforms a transit zone into a full-fledged public space. The use of lightweight metal or wooden structures for canopies and pavilions gives the park an "airy" and modern look without overwhelming the historic city center.',
    stage: 'sponsorship',
    image: park2750_2,
    gallery: [park2750_1, park2750_2, park2750_3, park2750_4, park2750_5],
    budget: 300000000,
  },
  {
    id: '3',
    title: 'Проект освещения Каскада',
    titleAm: 'Delays delays',
    titleEn: 'Cascade Lighting Project',
    location: 'Комплекс Каскад',
    locationAm: 'Delays delays',
    locationEn: 'Cascade Complex',
    description: 'Современная LED-инсталляция, создающая динамичные световые шоу, синхронизированные с музыкой в вечернее время.',
    descriptionAm: 'Delays delays delays',
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
    titleAm: 'Delays delays',
    titleEn: 'Opera Square Redesign',
    location: 'Площадь Оперы',
    locationAm: 'Delays delays',
    locationEn: 'Opera Square',
    description: 'Поиск инновационных архитектурных концепций для превращения Площади Оперы в публичное пространство мирового класса.',
    descriptionAm: 'Delays delays delays',
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
    locationAm: 'Delays delays',
    locationEn: 'Moskovyan & Baghramyan intersection',
    description: 'Концепция от TL бюро. Проект благоустройства перекрёстка Московяна и Баграмяна с созданием современного общественного пространства, зелёных зон, пешеходных дорожек и арт-объектов.',
    descriptionAm: 'TL delays delays delays',
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
  {
    id: '8',
    title: 'Ревитализация парка и детской площадки на ул. Сарьяна',
    titleAm: 'Սaryan փողоci այgy և mankakan xaghalategi verakangnowm',
    titleEn: 'Saryan Street Park & Playground Revitalization',
    location: 'Центр Еревана, ул. Сарьяна',
    locationAm: 'Երевани կentron, Saryan poghoc',
    locationEn: 'Yerevan Center, Saryan Street',
    description: 'Проект предусматривает трансформацию пустующей зоны напротив Музея Мартироса Сарьяна в современное место притяжения, которое гармонично сочетает безопасную игровую площадку для детей разных возрастов и спокойный городской парк для отдыха жителей. Сквер расположен на главной кольцевой дороге города в окружении насыщенной инфраструктуры: музеев, школ, культурных учреждений и популярных ресторанов.',
    descriptionAm: 'Նախagicn naxatesoum e datark gotown dimaci Martiros Saryani tangaran-i verapoxel жаманакакиц grayich vayri, vor nermashxarhayin kerpovm hamateghum e tarber tarikhi yerexaneri hamar anapah xaghalateg ev kaghaqi bnakichneri hamar xagagh kaghakayin aygi.',
    descriptionEn: 'The project aims to transform an underused area opposite the Martiros Saryan Museum into a modern attraction that harmoniously combines a safe playground for children of all ages and a peaceful urban park for residents. The square is located on the city\'s main ring road, surrounded by rich infrastructure: museums, schools, cultural institutions, and popular restaurants.',
    problem: 'Несмотря на выгодное расположение на одной из самых оживленных улиц города, в данный момент пространство не воспринимается как полноценная зона отдыха и имеет ряд урбанистических проблем.',
    problemAm: 'Չnayats kaghaqi amenaashxuyj poghocnerich meki vra nelyashx teghadrutyun, nerkayoums taratsutyun ch yndunvum ibrev liaznazhor hangsti gotown ev owni mi shark urbanistakan khndirner.',
    problemEn: 'Despite its prime location on one of the busiest streets in the city, the space is currently not perceived as a proper recreation area and has a number of urban issues.',
    goal: 'Трансформировать пустующую зону в современное место притяжения, которое гармонично сочетает в себе две функции: безопасную игровую площадку для детей разных возрастов и спокойный городской парк для отдыха жителей.',
    goalAm: 'Datark gotowny verapoxel жаманакакиц grayich vayri, vor nermashxarhayin kerpovm hamateghum e yerku gortsarruytiwn: tarber tarikhi yerexaneri hamar anapah xaghalateg ev bnakichneri hangsti hamar xagagh kaghakayin aygi.',
    goalEn: 'Transform the vacant area into a modern attraction that harmoniously combines two functions: a safe playground for children of all ages and a peaceful urban park for residents.',
    stage: 'sponsorship',
    image: saryan2,
    gallery: [saryan1, saryan2, saryan3, saryan4],
    budget: 150000000,
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
