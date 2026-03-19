import { useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { MapPin } from 'lucide-react';
import { useLanguage } from '@/i18n/LanguageContext';
import type { Project } from '@/data/projects';

// Fix default marker icon issue with webpack/vite
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
});

const createCustomIcon = (stage: 'sponsorship' | 'concept') => {
  const color = stage === 'sponsorship' ? 'hsl(var(--primary))' : 'hsl(var(--accent))';
  return L.divIcon({
    className: 'custom-marker',
    html: `<div style="
      background: ${color};
      width: 36px;
      height: 36px;
      border-radius: 50% 50% 50% 0;
      transform: rotate(-45deg);
      display: flex;
      align-items: center;
      justify-content: center;
      box-shadow: 0 4px 12px rgba(0,0,0,0.3);
      border: 3px solid white;
    ">
      <svg style="transform: rotate(45deg); width: 16px; height: 16px; color: white;" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
        <circle cx="12" cy="10" r="3"></circle>
      </svg>
    </div>`,
    iconSize: [36, 36],
    iconAnchor: [18, 36],
    popupAnchor: [0, -36],
  });
};

type MapFilter = 'all' | 'sponsorship' | 'concept';

interface MapSectionProps {
  projects: Project[];
  onViewDetails: (project: Project) => void;
}

export function MapSection({ projects, onViewDetails }: MapSectionProps) {
  const { t, lang } = useLanguage();
  const [mapFilter, setMapFilter] = useState<MapFilter>('all');

  const projectsWithCoords = projects.filter(
    (p) => p.coordinates && (mapFilter === 'all' || p.stage === mapFilter)
  );

  const getTitle = (p: Project) =>
    lang === 'en' ? p.titleEn : lang === 'am' ? p.titleAm : p.title;
  const getAddress = (p: Project) =>
    lang === 'en'
      ? p.addressEn || p.locationEn
      : lang === 'am'
        ? p.addressAm || p.locationAm
        : p.address || p.location;

  const filterButtons: { value: MapFilter; label: string; dotClass?: string }[] = [
    { value: 'all', label: t('mapFilterAll') },
    { value: 'sponsorship', label: t('mapLegendSponsorship'), dotClass: 'bg-primary' },
    { value: 'concept', label: t('mapLegendConcept'), dotClass: 'bg-accent' },
  ];

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="text-center mb-10">
        <h2 className="text-3xl font-bold text-foreground mb-3">{t('mapTitle')}</h2>
        <p className="text-muted-foreground max-w-2xl mx-auto mb-4">{t('mapSubtitle')}</p>
        <div className="flex items-center justify-center gap-2 flex-wrap">
          {filterButtons.map((btn) => (
            <button
              key={btn.value}
              onClick={() => setMapFilter(btn.value)}
              className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all ${
                mapFilter === btn.value
                  ? 'bg-primary text-primary-foreground shadow-md'
                  : 'bg-muted text-muted-foreground hover:bg-muted/80'
              }`}
            >
              {btn.dotClass && (
                <span className={`w-3 h-3 rounded-full ${btn.dotClass} inline-block`} />
              )}
              {btn.label}
            </button>
          ))}
        </div>
      </div>

      <div
        className="rounded-3xl overflow-hidden shadow-card border border-border"
        style={{ height: '500px' }}
      >
        <MapContainer
          center={[40.1872, 44.5152]}
          zoom={13}
          style={{ height: '100%', width: '100%' }}
          scrollWheelZoom={true}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {projectsWithCoords.map((project) => (
            <Marker
              key={project.id}
              position={[project.coordinates!.lat, project.coordinates!.lng]}
              icon={createCustomIcon(project.stage)}
            >
              <Popup>
                <div className="min-w-[220px]">
                  <img
                    src={project.image}
                    alt={getTitle(project)}
                    className="w-full h-28 object-cover rounded-lg mb-2"
                  />
                  <h3 className="font-semibold text-sm mb-1">{getTitle(project)}</h3>
                  <p className="text-xs text-gray-500 mb-2 flex items-center gap-1">
                    <MapPin className="w-3 h-3" />
                    {getAddress(project)}
                  </p>
                  <button
                    onClick={() => onViewDetails(project)}
                    className="w-full text-xs font-medium py-1.5 px-3 rounded-lg bg-primary text-primary-foreground hover:opacity-90 transition-opacity"
                  >
                    {t('viewOnMap')}
                  </button>
                </div>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>
    </section>
  );
}
