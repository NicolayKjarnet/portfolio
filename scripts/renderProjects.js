/**
 * @typedef {Object} ProjectItem
 * @property {string} link
 * @property {boolean} [newTab]
 * @property {string} imgSrc
 * @property {string} videoSrc
 * @property {string} title
 * @property {string} description
 * @property {string[]} techniques
 * @property {string} classes
 * @property {string} imgClass
 * @property {string} [clickoutLink]
 * @property {boolean} [isFigma]
 * @property {boolean} [ongoingProject]
 * @property {boolean} [readMore]
 * @property {boolean} [visitWebsite]
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
              : `<img width="500" height="250" class="project-section__img ${imgClass}" src="${imgSrc}" alt="Image of ${title}.">`
          }
            ${
              ongoingProject
                ? '<div class="ongoing-indicator"><i class="fas fa-cog fa-spin"></i> In Progress</div>'
                : ''
            }
            ${readMore ? '<div class="read-more-overlay"><span>Read More</span></div>' : ''}
            ${visitWebsite ? '<div class="read-more-overlay"><span>Visit Website</span></div>' : ''}
          </div>
          <div class="project-section__about">
            <h2 class="project-section__project-title">${
              ongoingProject ? `${title} (Ongoing)` : title
            }</h2>
            <hr class="about__divider divider">
            <h3 class="about__title">About</h3>
            <figcaption class="about__caption">${description}
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

/**
 * Renders all projects.
 * @returns {string} HTML string for all projects
 */
export const renderProjects = () => {
  return `
   ${renderProjectItem({
     link: 'https://kitchenbuilder.studiotorshov.no/',
     newTab: true,
     videoSrc: '/images/kithcen-builder.mp4',
     title: 'Kitchen Planner',
     description:
       'An interactive 3D platform for designing custom, sustainable kitchens. Visualize your design kitchen in real-time.',
     techniques: ['React', 'TypeScript', 'Three.js', 'Taillwind'],
     classes: 'project-section__article--fullstack',
     imgClass: 'project-img',
     ongoingProject: true,
     readMore: false,
     visitWebsite: true,
   })}
    ${renderProjectItem({
      link: 'https://studiotorshov.no/',
      newTab: true,
      imgSrc: '/images/studio-torshov.webp',
      title: 'Studio Torshov',
      description:
        'E-commerce platform for handcrafted clothes, furniture and other interior products. Built to complement the Kitchen Planner.',
      techniques: ['Vue', 'TypeScript', 'Supabase'],
      classes: 'project-section__article--fullstack',
      imgClass: 'project-img',
      ongoingProject: true,
      readMore: false,
      visitWebsite: true,
    })}
     ${renderProjectItem({
       link: 'https://campaign.site/teriyaki-ninja',
       newTab: true,
       imgSrc: '/images/teriyaki-ninja.webp',
       title: 'Teriyaki Ninja',
       description:
         "Interactive mobile game built for Grilstad's Stranda campaign at Cavai. Slice your way through falling teriyaki - sound on recommended! Design by Live Skarbø, assets by POL.",
       techniques: ['JS', 'CSS', 'HTML', 'Cavai'],
       classes: 'project-section__article--frontend',
       imgClass: 'project-img',
       readMore: false,
       visitWebsite: true,
     })}
    ${renderProjectItem({
      link: 'wolve.html',
      imgSrc: '/images/wolve.webp',
      title: 'Wolve Redesign',
      description:
        "Complete UX overhaul of Wolve IT's loyalty platform. User research, prototyping, and testing resulted in top marks.",
      techniques: ['Figma', 'UX', 'User testing'],
      classes: 'project-section__article--ux',
      imgClass: 'project-img',
      clickoutLink: 'https://www.figma.com/file/HBssxeoUkcRd2txOOGbfy4/Wolve-IT-Prototype',
      isFigma: true,
    })}
    ${renderProjectItem({
      link: 'artist-api.html',
      imgSrc: '/images/popartist.webp',
      title: 'Artist API',
      description:
        'Full-stack artist management system for music labels. Create, read, update, and delete artist profiles with a clean, intuitive interface.',
      techniques: ['React', '.net/C#', 'CRUD', 'Bootstrap'],
      classes: 'project-section__article--fullstack',
      imgClass: 'project-img',
      clickoutLink: 'https://github.com/NicolayKjarnet/pop-artists',
    })}
    ${renderProjectItem({
      link: 'greenhouse-system.html',
      imgSrc: '/images/greenhouse.webp',
      title: 'Greenhouse System',
      description:
        'IoT monitoring dashboard for greenhouse environments. Real-time sensor data, mobile alerts, and historical tracking.',
      techniques: ['IoT', 'Arduino', 'C++', 'Mongo DB'],
      classes: 'project-section__article--fullstack project-section__article--iot',
      imgClass: 'project-img',
      clickoutLink: 'https://github.com/NicolayKjarnet/greenhouse-system',
    })}
     ${renderProjectItem({
       link: 'Dagens-latter.html',
       imgSrc: '/images/dagens-latter.webp',
       title: 'Laughter Of The Day',
       description:
         'iOS app serving daily jokes from an API. Save favorites and contribute your own to the collection.',
       techniques: ['Swift', 'API', 'Core Data'],
       classes: 'project-section__article--mobile',
       imgClass: 'project-img',
       clickoutLink: 'https://github.com/NicolayKjarnet/DagensLatter',
     })}
    ${renderProjectItem({
      link: 'munchAR.html',
      imgSrc: '/images/munch-ar.webp',
      title: 'Munch AR',
      description:
        'AR navigation prototype guiding tourists through Oslo to the Munch Museum, with trivia and artwork previews along the way.',
      techniques: ['Figma', 'Android', 'Google Maps API'],
      classes: 'project-section__article--mobile',
      imgClass: 'project-img',
    })}
     ${renderProjectItem({
       link: '',
       imgSrc: '/images/wrd.webp',
       title: 'Wrd',
       ongoingProject: true,
       description:
         "Cross-platform word game with a twist. Coming soon - I think you're going to like this one.",
       techniques: ['Vue', 'Capacitor', 'Crossplatform'],
       classes: 'project-section__article--mobile',
       imgClass: 'project-img',
       readMore: false,
       visitWebsite: false,
     })}
    ${renderProjectItem({
      link: 'munchQR.html',
      imgSrc: '/images/munch-qr.webp',
      title: 'Discover Munch',
      description:
        'QR-powered museum guide for tourists, paired with an admin dashboard for museum staff to manage artwork information.',
      techniques: ['React Native', 'React', '.net', 'C#', 'CRUD'],
      classes: 'project-section__article--mobile project-section__article--ux',
      imgClass: 'project-img',
    })}
    ${renderProjectItem({
      link: 'https://rick-and-morty-api.nicolaykjaernet.com/',
      imgSrc: '/images/rick-and-morty.webp',
      title: 'Rick and Morty',
      description:
        'Character encyclopedia pulling from the Rick and Morty API. Search, filter, and explore the multiverse.',
      techniques: ['API', 'Grid', 'Media Queries', 'BEM'],
      classes: 'project-section__article--frontend',
      imgClass: 'project-img',
      readMore: false,
      visitWebsite: true,
    })}
    ${renderProjectItem({
      link: 'split.html',
      imgSrc: '/images/split.webp',
      title: 'Split',
      description:
        'Finance app prototype for freelancers. Automatically splits income into tax, savings, and expense accounts based on your rules.',
      techniques: ['UX', 'Figma', 'Universal Design'],
      classes: 'project-section__article--ux',
      imgClass: 'project-img',
      clickoutLink: 'https://www.figma.com/file/aIVI2dZQAmWy2WuLlnObSA/Split-Prototype',
      isFigma: true,
    })}
    ${renderProjectItem({
      link: 'https://scrollfolio.nicolaykjaernet.com/',
      imgSrc: '/images/scrollfolio.webp',
      title: 'Scrollfolio',
      description:
        "Experimental portfolio showcasing scroll-triggered animations inspired by Apple's product pages.",
      techniques: ['GSAP', 'HTML', 'CSS', 'JS', 'Grid'],
      classes: 'project-section__article--frontend',
      imgClass: 'project-img',
      readMore: false,
      visitWebsite: true,
    })}
  `;
};
