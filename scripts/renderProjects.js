import { t } from './i18n.js';

/**
 * @typedef {Object} ProjectItem
 * @property {string} link
 * @property {boolean} [newTab]
 * @property {string} [imgSrc]
 * @property {string} [videoSrc]
 * @property {string | {en: string, no: string}} title
 * @property {string | {en: string, no: string}} description
 * @property {string[]} techniques
 * @property {string} classes
 * @property {string} imgClass
 * @property {string} [clickoutLink]
 * @property {boolean} [isFigma]
 * @property {boolean} [ongoingProject]
 * @property {boolean} [readMore]
 * @property {boolean} [visitWebsite]
 * @property {boolean} [hidden]
 */

const renderProjectItem = ({
  link,
  newTab,
  imgSrc,
  videoSrc,
  title,
  description,
  techniques,
  classes,
  imgClass,
  clickoutLink = '',
  isFigma = false,
  ongoingProject = false,
  readMore = true,
  visitWebsite = false,
}) => {
  const resolvedTitle = t(title);

  return `
      <article class="project-section__article ${classes} ${
    ongoingProject ? 'project-section__article--ongoing' : ''
  }">
        ${
          clickoutLink
            ? `
          <a href="${clickoutLink}" target="_blank" class="icon-clickout-link" onclick="event.stopPropagation();">
            <i class="${isFigma ? 'fab fa-figma' : 'fab fa-github'} fa-2x"></i>
          </a>
        `
            : ''
        }
        <a href="${link}"${newTab ? ' target="_blank"' : ''} class="project-link">
          <div class="project-section__img-container">
          ${
            videoSrc
              ? `<video class="project-section__img ${imgClass}" width="500" height="250" preload="metadata" src="${videoSrc}" autoplay muted loop playsinline></video>`
              : `<img width="500" height="250" class="project-section__img ${imgClass}" src="${imgSrc}" alt="${t('project.imageAlt', { title: resolvedTitle })}">`
          }
            ${
              ongoingProject
                ? `<div class="ongoing-indicator"><i class="fas fa-cog fa-spin"></i> ${t('project.inProgress')}</div>`
                : ''
            }
            ${readMore ? `<div class="read-more-overlay"><span>${t('project.readMore')}</span></div>` : ''}
            ${visitWebsite ? `<div class="read-more-overlay"><span>${t('project.visitWebsite')}</span></div>` : ''}
          </div>
          <div class="project-section__about">
            <h2 class="project-section__project-title">${
              ongoingProject ? `${resolvedTitle} ${t('project.ongoing')}` : resolvedTitle
            }</h2>
            <hr class="about__divider divider">
            <h3 class="about__title">${t('project.aboutHeading')}</h3>
            <figcaption class="about__caption">${t(description)}
              <div class="noteworthy-techniques-container">
                <span class="noteworthy-techniques">
                  <ul>
                    ${techniques.map((technique) => `<li>${technique}</li>`).join('')}
                  </ul>
                </span>
              </div>
            </figcaption>
          </div>
        </a>
      </article>
  `;
};

/** @type {ProjectItem[]} */
const projects = [
  {
    link: 'https://kitchenbuilder.studiotorshov.no/',
    newTab: true,
    videoSrc: '/images/kitchen-builder.mp4',
    title: { en: 'Kitchen Planner', no: 'Kjøkkenplanlegger' },
    description: {
      en: 'An interactive 3D platform for designing custom, sustainable kitchens. Visualize your dream kitchen in real-time.',
      no: 'En interaktiv 3D-plattform for å designe tilpassede, bærekraftige kjøkken. Visualiser kjøkkenet ditt i sanntid.',
    },
    techniques: ['React', 'TypeScript', 'Three.js', 'Tailwind'],
    classes: 'project-section__article--web',
    imgClass: 'project-img',
    ongoingProject: true,
    readMore: false,
    visitWebsite: true,
  },
  {
    link: 'https://studiotorshov.no/',
    newTab: true,
    imgSrc: '/images/studio-torshov.webp',
    title: 'Studio Torshov',
    description: {
      en: 'E-commerce platform for handcrafted clothes, furniture and other interior products. Built to complement the Kitchen Planner.',
      no: 'Nettbutikk for håndlagde klær, møbler og andre interiørprodukter. Bygget som supplement til Kjøkkenplanleggeren.',
    },
    techniques: ['Vue', 'TypeScript', 'Supabase'],
    classes: 'project-section__article--web',
    imgClass: 'project-img',
    ongoingProject: true,
    readMore: false,
    visitWebsite: true,
  },
  {
    link: 'https://campaign.site/teriyaki-ninja',
    newTab: true,
    imgSrc: '/images/teriyaki-ninja.webp',
    title: 'Teriyaki Ninja',
    description: {
      en: "Interactive mobile game built for Grilstad's Stranda campaign at Cavai. Slice your way through falling teriyaki - sound on recommended! Design by Live Skarbø, assets by POL.",
      no: 'Interaktivt mobilspill laget for Grilstads Stranda-kampanje hos Cavai. Skjær deg gjennom fallende teriyaki – lyd anbefales! Design av Live Skarbø, assets av POL.',
    },
    techniques: ['JS', 'CSS', 'HTML', 'Cavai'],
    classes: 'project-section__article--web',
    imgClass: 'project-img',
    readMore: false,
    visitWebsite: true,
  },
  {
    link: 'wolve.html',
    imgSrc: '/images/wolve.webp',
    title: { en: 'Wolve Redesign', no: 'Wolve-redesign' },
    description: {
      en: "Complete UX overhaul of Wolve IT's loyalty platform. User research, prototyping, and testing resulted in top marks.",
      no: 'Komplett UX-redesign av Wolve ITs lojalitetsplattform. Brukerundersøkelser, prototyping og testing ga toppkarakter.',
    },
    techniques: ['Figma', 'UX', 'User testing'],
    classes: 'project-section__article--web',
    imgClass: 'project-img',
    clickoutLink: 'https://www.figma.com/file/HBssxeoUkcRd2txOOGbfy4/Wolve-IT-Prototype',
    isFigma: true,
  },
  {
    link: 'artist-api.html',
    imgSrc: '/images/popartist.webp',
    title: 'Artist API',
    description: {
      en: 'Full-stack artist management system for music labels. Create, read, update, and delete artist profiles with a clean, intuitive interface.',
      no: 'Full-stack artisthåndteringssystem for musikkselskaper. Opprett, les, oppdater og slett artistprofiler med et rent, intuitivt grensesnitt.',
    },
    techniques: ['React', '.net/C#', 'CRUD', 'Bootstrap'],
    classes: 'project-section__article--web',
    imgClass: 'project-img',
    clickoutLink: 'https://github.com/NicolayKjarnet/pop-artists',
    hidden: true,
  },
  {
    link: 'greenhouse-system.html',
    imgSrc: '/images/greenhouse.webp',
    title: { en: 'Greenhouse System', no: 'Drivhussystem' },
    description: {
      en: 'IoT monitoring dashboard for greenhouse environments. Real-time sensor data, mobile alerts, and historical tracking.',
      no: 'IoT-overvåkingsdashboard for drivhusmiljøer. Sanntids sensordata, mobilvarslinger og historisk sporing.',
    },
    techniques: ['IoT', 'Arduino', 'C++', 'Mongo DB'],
    classes: 'project-section__article--web',
    imgClass: 'project-img',
    clickoutLink: 'https://github.com/NicolayKjarnet/greenhouse-system',
  },
  {
    link: 'Dagens-latter.html',
    imgSrc: '/images/dagens-latter.webp',
    title: { en: 'Laughter Of The Day', no: 'Dagens Latter' },
    description: {
      en: 'iOS app serving daily jokes from an API. Save favorites and contribute your own to the collection.',
      no: 'iOS-app som serverer daglige vitser fra et API. Lagre favoritter og bidra med dine egne.',
    },
    techniques: ['Swift', 'API', 'Core Data'],
    classes: 'project-section__article--web',
    imgClass: 'project-img',
    clickoutLink: 'https://github.com/NicolayKjarnet/DagensLatter',
    hidden: true,
  },
  {
    link: 'munchAR.html',
    imgSrc: '/images/munch-ar.webp',
    title: 'Munch AR',
    description: {
      en: 'AR navigation prototype guiding tourists through Oslo to the Munch Museum, with trivia and artwork previews along the way.',
      no: 'AR-navigasjonsprototype som guider turister gjennom Oslo til Munchmuseet, med trivia og kunstforhåndsvisninger underveis.',
    },
    techniques: ['Figma', 'Android', 'Google Maps API'],
    classes: 'project-section__article--web',
    imgClass: 'project-img',
  },
  {
    link: '',
    imgSrc: '/images/wrd.webp',
    title: 'Wrd',
    ongoingProject: true,
    description: {
      en: "Cross-platform word game with a twist. Coming soon - I think you're going to like this one.",
      no: 'Kryssplattform-ordspill med en vri. Kommer snart – jeg tror du kommer til å like denne.',
    },
    techniques: ['Vue', 'Capacitor', 'Crossplatform'],
    classes: 'project-section__article--web',
    imgClass: 'project-img',
    readMore: false,
    visitWebsite: false,
    hidden: true,
  },
  {
    link: 'munchQR.html',
    imgSrc: '/images/munch-qr.webp',
    title: 'Discover Munch',
    description: {
      en: 'QR-powered museum guide for tourists, paired with an admin dashboard for museum staff to manage artwork information.',
      no: 'QR-drevet museumguide for turister, med et administrasjonspanel for museumsansatte til å håndtere kunstinformasjon.',
    },
    techniques: ['React Native', 'React', '.net', 'C#', 'CRUD'],
    classes: 'project-section__article--web',
    imgClass: 'project-img',
  },
  {
    link: 'https://rick-and-morty-api.nicolaykjaernet.com/',
    imgSrc: '/images/rick-and-morty.webp',
    title: 'Rick and Morty',
    description: {
      en: 'Character encyclopedia pulling from the Rick and Morty API. Search, filter, and explore the multiverse.',
      no: 'Karakterleksikon som henter fra Rick and Morty-APIet. Søk, filtrer og utforsk multiverse.',
    },
    techniques: ['API', 'Grid', 'Media Queries', 'BEM'],
    classes: 'project-section__article--web',
    imgClass: 'project-img',
    readMore: false,
    visitWebsite: true,
    hidden: true,
  },
  {
    link: 'split.html',
    imgSrc: '/images/split.webp',
    title: 'Split',
    description: {
      en: 'Finance app prototype for freelancers. Automatically splits income into tax, savings, and expense accounts based on your rules.',
      no: 'Finansapp-prototype for frilansere. Deler automatisk inntekt i skatt, sparing og utgiftskontoer basert på dine regler.',
    },
    techniques: ['UX', 'Figma', 'Universal Design'],
    classes: 'project-section__article--web',
    imgClass: 'project-img',
    clickoutLink: 'https://www.figma.com/file/aIVI2dZQAmWy2WuLlnObSA/Split-Prototype',
    isFigma: true,
  },
  {
    link: 'https://scrollfolio.nicolaykjaernet.com/',
    imgSrc: '/images/scrollfolio.webp',
    title: 'Scrollfolio',
    description: {
      en: "Experimental portfolio showcasing scroll-triggered animations inspired by Apple's product pages.",
      no: 'Eksperimentell portefølje med scroll-utløste animasjoner inspirert av Apples produktsider.',
    },
    techniques: ['GSAP', 'HTML', 'CSS', 'JS', 'Grid'],
    classes: 'project-section__article--web',
    imgClass: 'project-img',
    readMore: false,
    visitWebsite: true,
  },
];

/**
 * Renders all visible projects.
 * @returns {string} HTML string for all projects
 */
export const renderProjects = () => {
  return projects
    .filter((project) => !project.hidden)
    .map((project) => renderProjectItem(project))
    .join('');
};
