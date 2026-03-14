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
import park2750_6 from '@/assets/park2750-6.png';
import park2750_7 from '@/assets/park2750-7.png';
import tpagrichner1 from '@/assets/tpagrichner-1.png';
import tpagrichner2 from '@/assets/tpagrichner-2.png';
import tpagrichner3 from '@/assets/tpagrichner-3.png';
import tpagrichner4 from '@/assets/tpagrichner-4.png';
import tpagrichner5 from '@/assets/tpagrichner-5.png';
import tpagrichner6 from '@/assets/tpagrichner-6.png';
import tpagrichner7 from '@/assets/tpagrichner-7.png';
import cascade1 from '@/assets/cascade-1.png';
import cascade2 from '@/assets/cascade-2.png';
import cascade3 from '@/assets/cascade-3.png';
import cascade4 from '@/assets/cascade-4.png';
import cascade5 from '@/assets/cascade-5.png';
import razdan1 from '@/assets/razdan-1.png';
import razdan2 from '@/assets/razdan-2.png';
import razdan3 from '@/assets/razdan-3.png';
import razdan4 from '@/assets/razdan-4.png';
import razdan5 from '@/assets/razdan-5.png';
import razdan6 from '@/assets/razdan-6.png';
import razdan7 from '@/assets/razdan-7.png';
import razdan8 from '@/assets/razdan-8.png';
import razdan9 from '@/assets/razdan-9.png';
import puppet1 from '@/assets/puppet-1.png';
import puppet2 from '@/assets/puppet-2.png';
import puppet3 from '@/assets/puppet-3.png';
import puppet4 from '@/assets/puppet-4.png';
import puppet5 from '@/assets/puppet-5.png';
import puppet6 from '@/assets/puppet-6.png';
import puppet7 from '@/assets/puppet-7.png';
import puppet8 from '@/assets/puppet-8.png';
import puppet9 from '@/assets/puppet-9.png';
import moskovyan1 from '@/assets/moskovyan-1.png';
import moskovyan2 from '@/assets/moskovyan-2.png';
import moskovyan3 from '@/assets/moskovyan-3.png';
import moskovyan4 from '@/assets/moskovyan-4.png';
import moskovyan5 from '@/assets/moskovyan-5.png';
import moskovyan6 from '@/assets/moskovyan-6.png';
import moskovyan7 from '@/assets/moskovyan-7.png';
import republic1 from '@/assets/republic-1.png';
import republic2 from '@/assets/republic-2.png';
import republic3 from '@/assets/republic-3.png';
import republic4 from '@/assets/republic-4.png';
import republic5 from '@/assets/republic-5.png';
import republic6 from '@/assets/republic-6.png';
import republic7 from '@/assets/republic-7.png';
import kirakosyan1 from '@/assets/kirakosyan-1.png';
import kirakosyan2 from '@/assets/kirakosyan-2.png';
import kirakosyan3 from '@/assets/kirakosyan-3.png';
import kirakosyan4 from '@/assets/kirakosyan-4.png';

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
  displayBudget?: string;
  budgetLabel?: string;
  buttonLabel?: string;
  raised?: number;
  documents?: { name: string; url: string }[];
  presentationUrl?: string;
  address?: string;
  addressAm?: string;
  addressEn?: string;
  coordinates?: { lat: number; lng: number };
}

export const projects: Project[] = [
  {
    id: '1',
    title: 'Благоустройство площади Комитаса',
    titleAm: 'Կոմdelays delays',
    titleEn: 'Komitas Square Renovation',
    location: 'Центр Еревана',
    locationAm: 'Կentron',
    locationEn: 'Center (Kentron)',
    description: 'Проект от UrUrban предусматривает превращение площади Комитаса в яркое городское пространство с современным амфитеатром для культурных мероприятий, искусственным ручьём, создающим умиротворяющую атмосферу, разнообразными точками питания и обширными новыми зелёными зонами. Дизайн включает инновационные игровые конструкции для детей, скульптурные инсталляции, современные архитектурные павильоны с характерными геометрическими формами и тщательно спланированные ландшафтные зоны с местными растениями.',
    descriptionAm: 'Delays delays delays',
    descriptionEn: 'The project envisions transforming Komitas Square into a vibrant urban space with a modern amphitheater for cultural events, an artificial stream creating a serene atmosphere, diverse dining spots, and extensive new green areas.',
    stage: 'sponsorship',
    image: komitas1,
    gallery: [komitas1, komitas2, komitas3],
    budget: 200000000,
    displayBudget: 'N/A',
    budgetLabel: 'Бюджет на проект:',
    buttonLabel: 'Спонсор найден',
    address: 'Ереван, площадь Комитаса',
    addressAm: 'Երևan, Komitasi hraparak',
    addressEn: 'Yerevan, Komitas Square',
    coordinates: { lat: 40.2028, lng: 44.5152 },
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
    description: 'Проект от Electric Architects представляет собой современную концепцию ревитализации парка имени 2750-летия Еревана. Основная идея заключается в создании многофункционального, открытого пространства, которое сочетает в себе уважение к истории города и современные архитектурные решения. Данный проект превращает транзитную зону в полноценное общественное пространство. Использование легких металлических или деревянных конструкций для навесов и павильонов придает парку «воздушный» и современный вид, не перегружая исторический центр города.',
    descriptionAm: 'Այdelay նaxagicn nerkayacnoum e Yerevani 2750-amyaki aygu verakenddanowman жаманакакиц hayecakarg.',
    descriptionEn: 'This project presents a modern concept for the revitalization of the 2750th Anniversary of Yerevan Park. The main idea is to create a multifunctional, open space that combines respect for the city\'s history with modern architectural solutions. The project transforms a transit zone into a full-fledged public space. The use of lightweight metal or wooden structures for canopies and pavilions gives the park an "airy" and modern look without overwhelming the historic city center.',
    stage: 'sponsorship',
    image: park2750_2,
    gallery: [park2750_1, park2750_2, park2750_3, park2750_4, park2750_5],
    budget: 300000000,
    address: 'Ереван, парк 2750-летия, ул. Аргишти',
    addressAm: 'Երdelays, 2750-amyaki aygi, Argishti poghoc',
    addressEn: 'Yerevan, 2750th Anniversary Park, Argishti St.',
    coordinates: { lat: 40.1811, lng: 44.5136 },
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
    address: 'Ереван, Каскад, ул. Таманяна',
    addressAm: 'Երdelays, Cascade, Tamanyan poghoc',
    addressEn: 'Yerevan, Cascade, Tamanyan St.',
    coordinates: { lat: 40.1912, lng: 44.5155 },
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
    address: 'Ереван, Площадь Свободы (Оперы)',
    addressAm: 'Երdelays, Azatutyan hraparak',
    addressEn: 'Yerevan, Freedom (Opera) Square',
    coordinates: { lat: 40.1855, lng: 44.5153 },
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
    buttonLabel: 'Стать Спонсором',
    address: 'Ереван, перекрёсток ул. Московяна и пр. Баграмяна',
    addressAm: 'Երdelays, Moskovyan ev Baghramyan khachmeruk',
    addressEn: 'Yerevan, Moskovyan & Baghramyan intersection',
    coordinates: { lat: 40.1930, lng: 44.5085 },
    documents: [
      { name: 'Презентация проекта', url: 'https://drive.google.com/file/d/15A4pMJA9ZumPqfilrWFYVFLGJt8UEtr4/view?usp=sharing' },
    ],
    presentationUrl: 'https://drive.google.com/file/d/15A4pMJA9ZumPqfilrWFYVFLGJt8UEtr4/view?usp=sharing',
  },
  {
    id: '8',
    title: 'Создание карманного парка и детской площадки на ул. Сарьяна',
    titleAm: 'Սaryan փողоci այgy և mankakan xaghalategi verakangnowm',
    titleEn: 'Saryan Street Park & Playground Revitalization',
    location: 'Ереван, ул. Сарьяна',
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
    displayBudget: '',
    budgetLabel: 'Бюджет на стройку:',
    buttonLabel: 'Спонсор найден',
    address: 'Ереван, ул. Сарьяна, напротив Музея Мартироса Сарьяна',
    addressAm: 'Երdelays, Saryan poghoc, Martiros Saryani tangaran-i dimac',
    addressEn: 'Yerevan, Saryan St., opposite Martiros Saryan Museum',
    coordinates: { lat: 40.1793, lng: 44.5095 },
  },
  {
    id: '9',
    title: 'Реконструкция двора ул. Тпагричнери 15',
    titleAm: 'Թdelays delays',
    titleEn: 'Courtyard Reconstruction at Tpagrichneri 15',
    location: 'ул. Тпагричнери 15',
    locationAm: 'Թdelay 15',
    locationEn: 'Tpagrichneri St. 15',
    description: 'Готовый рабочий проект от бюро Miryang общественной площадки для детей и взрослых.',
    descriptionAm: 'Երdelays delays delays',
    descriptionEn: 'Creation of a public area for children and adults.',
    stage: 'sponsorship',
    image: tpagrichner2,
    gallery: [tpagrichner1, tpagrichner2, tpagrichner3, tpagrichner4, tpagrichner5, tpagrichner6, tpagrichner7],
    budget: 75000000,
    budgetLabel: 'Бюджет на стройку:',
    buttonLabel: 'Стать Спонсором',
    address: 'Ереван, ул. Тпагричнери 15',
    addressAm: 'Երdelays, Tpagrichneri 15',
    addressEn: 'Yerevan, Tpagrichneri St. 15',
    coordinates: { lat: 40.177382, lng: 44.521778 },
    documents: [
      { name: 'Презентация проекта', url: 'https://drive.google.com/file/d/1TXaApSoEGvjgK9KUjvTzRUiOE55YPX5s/view?usp=sharing' },
    ],
    presentationUrl: 'https://drive.google.com/file/d/1TXaApSoEGvjgK9KUjvTzRUiOE55YPX5s/view?usp=sharing',
  },
  {
    id: '10',
    title: 'Ремонт баскетбольной площадки и двора у Каскада',
    titleAm: 'Կասկادի մոտ բbasketboli xaghalategi ev baki veranoroogowm',
    titleEn: 'Basketball Court & Courtyard Renovation near Cascade',
    location: 'ул. Исаакяна',
    locationAm: 'Իsakyan poghoc',
    locationEn: 'Isaakyan St.',
    description: 'Концепт реконструкции двора и баскетбольной площадки от Khachaturian Architects',
    descriptionAm: 'Baki ev basketboli xaghalategi verakangman hayecakarg Khachaturian Architects-ic',
    descriptionEn: 'Courtyard and basketball court reconstruction concept by Khachaturian Architects',
    stage: 'sponsorship',
    image: cascade1,
    gallery: [cascade1, cascade2, cascade3, cascade4, cascade5],
    budget: 82000000,
    budgetLabel: 'Бюджет на стройку:',
    buttonLabel: 'Стать Спонсором',
    address: 'Ереван, ул. Исаакяна',
    addressAm: 'Երևan, Isakyan poghoc',
    addressEn: 'Yerevan, Isaakyan St.',
    coordinates: { lat: 40.189081, lng: 44.516462 },
    documents: [
      { name: 'Презентация проекта', url: 'https://drive.google.com/file/d/1-sNJXLXnRNL4VJqT6CL0ujkgwMhKBag4/view?usp=sharing' },
    ],
    presentationUrl: 'https://drive.google.com/file/d/1-sNJXLXnRNL4VJqT6CL0ujkgwMhKBag4/view?usp=sharing',
  },
  {
    id: '11',
    title: 'Создание парка Раздан',
    titleAm: 'Ռազդան այգու ստեղծում',
    titleEn: 'Razdan Park Creation',
    location: 'Разданское ущелье',
    locationAm: 'Ռazdan kirandzav',
    locationEn: 'Razdan Gorge',
    description: 'Концепт создания парка у Разданского ущелья от Proforma Studio',
    descriptionAm: 'Ռazdan kirandzavi mot aygu steghtsman hayecakarg Proforma Studio-ic',
    descriptionEn: 'Park creation concept at Razdan Gorge by Proforma Studio',
    stage: 'sponsorship',
    image: razdan1,
    gallery: [razdan1, razdan2, razdan3, razdan4, razdan5, razdan6, razdan7, razdan8, razdan9],
    displayBudget: 'N/A',
    budgetLabel: 'Бюджет на стройку:',
    buttonLabel: 'Стать Спонсором',
    address: 'Ереван, Разданское ущелье',
    addressAm: 'Երևan, Razdan kirandzav',
    addressEn: 'Yerevan, Razdan Gorge',
    coordinates: { lat: 40.177166, lng: 44.501214 },
    documents: [
      { name: 'Презентация проекта', url: 'https://drive.google.com/file/d/1VCRlCnSR5yNLUdG6xysW6oOY9uqbCUPv/view?usp=sharing' },
    ],
    presentationUrl: 'https://drive.google.com/file/d/1VCRlCnSR5yNLUdG6xysW6oOY9uqbCUPv/view?usp=sharing',
  },
  {
    id: '12',
    title: 'Реконструкция двора Кукольного Театра',
    titleAm: 'Տիкнիкаyin tatroni baki verakangnowm',
    titleEn: 'Puppet Theater Courtyard Reconstruction',
    location: 'пр. Саят-Новы 6',
    locationAm: 'Sayat-Novi 6',
    locationEn: 'Sayat-Nova Ave. 6',
    description: 'Концепт реконструкции двора от Suyn Agency',
    descriptionAm: 'Baki verakangman hayecakarg Suyn Agency-ic',
    descriptionEn: 'Courtyard reconstruction concept by Suyn Agency',
    stage: 'sponsorship',
    image: puppet1,
    gallery: [puppet1, puppet2, puppet3, puppet4, puppet5, puppet6, puppet7, puppet8, puppet9],
    budget: 1000000,
    budgetLabel: 'Бюджет на проектирование:',
    buttonLabel: 'Стать Спонсором',
    address: 'Ереван, пр. Саят-Новы 6',
    addressAm: 'Երևan, Sayat-Novi 6',
    addressEn: 'Yerevan, Sayat-Nova Ave. 6',
    coordinates: { lat: 40.183654, lng: 44.517993 },
    documents: [
      { name: 'Презентация проекта', url: 'https://drive.google.com/file/d/1hY5oHWQokUoEcqpF6u50kQKokIRGUTrQ/view?usp=sharing' },
    ],
    presentationUrl: 'https://drive.google.com/file/d/1hY5oHWQokUoEcqpF6u50kQKokIRGUTrQ/view?usp=sharing',
  },
  {
    id: '13',
    title: 'Реконструкция парка Московян',
    titleAm: 'Մoskovyan այгու վերակonstrukcia',
    titleEn: 'Moskovyan Park Reconstruction',
    location: 'ул. Геворга Кочара',
    locationAm: 'Gevorg Kochar poghoc',
    locationEn: 'Gevorg Kochar St.',
    description: 'Концепт реконструкции Московского Бульвара от Electric Architects',
    descriptionAm: 'Moskovyan boulvari verakangman hayecakarg Electric Architects-ic',
    descriptionEn: 'Moscow Boulevard reconstruction concept by Electric Architects',
    stage: 'sponsorship',
    image: moskovyan1,
    gallery: [moskovyan1, moskovyan2, moskovyan3, moskovyan4, moskovyan5, moskovyan6, moskovyan7],
    displayBudget: 'N/A',
    budgetLabel: 'Бюджет на стройку:',
    buttonLabel: 'Спонсор найден',
    address: 'Ереван, ул. Геворга Кочара',
    addressAm: 'Երևan, Gevorg Kochar poghoc',
    addressEn: 'Yerevan, Gevorg Kochar St.',
    coordinates: { lat: 40.189295, lng: 44.520153 },
    documents: [
      { name: 'Презентация проекта', url: 'https://drive.google.com/file/d/1wFCINSVdMH4-nfuzAzWguiycA32M1thP/view?usp=sharing' },
    ],
    presentationUrl: 'https://drive.google.com/file/d/1wFCINSVdMH4-nfuzAzWguiycA32M1thP/view?usp=sharing',
  },
  {
    id: '14',
    title: 'Реконструкция парка Поплавок',
    titleAm: 'Պoպлавок այգու վерակonstrukcia',
    titleEn: 'Poplavok Park Reconstruction',
    location: 'Ереван, Кольцевой парк',
    locationAm: 'Երևan, Kolcevoy aygi',
    locationEn: 'Yerevan, Ring Park',
    description: 'Концепт реконструкции парка Поплавок от Electric Architects',
    descriptionAm: 'Poplavok aygou verakangman hayecakarg Electric Architects-ic',
    descriptionEn: 'Poplavok Park reconstruction concept by Electric Architects',
    stage: 'sponsorship',
    image: park2750_6,
    gallery: [park2750_1, park2750_2, park2750_3, park2750_4, park2750_5, park2750_6, park2750_7],
    displayBudget: 'N/A',
    budgetLabel: 'Бюджет на стройку:',
    buttonLabel: 'Стать Спонсором',
    address: 'Ереван, Кольцевой парк',
    addressAm: 'Երևan, Kolcevoy aygi',
    addressEn: 'Yerevan, Ring Park',
    coordinates: { lat: 40.187998, lng: 44.519028 },
  },
  {
    id: '15',
    title: 'Создание библиотеки у метро Площадь Республики',
    titleAm: 'Գրադարdelays delays',
    titleEn: 'Library at Republic Square Metro Station',
    location: 'м. Площадь Республики',
    locationAm: 'Հdelays delays',
    locationEn: 'Republic Square Metro',
    description: 'Концепт создания Библиотеки у м. Площадь Республики от Tarberak Studio',
    descriptionAm: 'Հdelays delays delays',
    descriptionEn: 'Library concept at Republic Square Metro Station by Tarberak Studio',
    stage: 'sponsorship',
    image: republic1,
    gallery: [republic1, republic2, republic3, republic4, republic5, republic6, republic7],
    displayBudget: 'N/A',
    budgetLabel: 'Бюджет на стройку:',
    buttonLabel: 'Стать Спонсором',
    address: 'Ереван, м. Площадь Республики',
    addressAm: 'Երdelays, Hanrapetutyan hraparak metro',
    addressEn: 'Yerevan, Republic Square Metro',
    coordinates: { lat: 40.178301, lng: 44.515972 },
    presentationUrl: 'https://drive.google.com/file/d/1J9z3klmBtAiQDYfcAOyn-rWp4PRJGFQ-/view?usp=sharing',
  },
  {
    id: '16',
    title: 'Реконструкция сквера перед школой им. Киракосяна',
    titleAm: 'Կիրակdelays',
    titleEn: 'Reconstruction of the Square near Kirakosyan School',
    location: 'ул. Чаренца',
    locationAm: 'Չdelays',
    locationEn: 'Charents St.',
    description: 'Концепт сквера у школы им. Киракосяна от Electric Architects.',
    descriptionAm: 'Կdelays',
    descriptionEn: 'Square concept near Kirakosyan School by Electric Architects.',
    stage: 'sponsorship',
    image: kirakosyan1,
    gallery: [kirakosyan1, kirakosyan2, kirakosyan3, kirakosyan4],
    displayBudget: 'N/A',
    budgetLabel: 'Бюджет:',
    buttonLabel: 'Стать Спонсором',
    address: 'Ереван, ул. Чаренца',
    addressAm: 'Երևdelays',
    addressEn: 'Yerevan, Charents St.',
    coordinates: { lat: 40.180530, lng: 44.528273 },
    presentationUrl: 'https://drive.google.com/file/d/12Lx_0ySvmH1ze0A7t_TAs6fOBh6dQufT/view?usp=sharing',
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
