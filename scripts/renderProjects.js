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
              : `<img loading="lazy" decoding="async" width="500" height="250" class="project-section__img ${imgClass}" src="${imgSrc}" alt="Image of ${title}.">`
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
     description: 'WIP: An interactive platform for designing high-end, sustainable kitchens.',
     techniques: ['React', 'TypeScript', 'Three.js', 'Taillwind'],
     classes: 'project-section__article--fullstack project-section__article--ongoing',
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
        'WIP: The companion webshop to the kitchen builder, featuring handcrafted items by Studio Torshov.',
      techniques: ['Vue', 'TypeScript', 'Supabase'],
      classes: 'project-section__article--fullstack project-section__article--ongoing',
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
         "Who says ads just have to be watched? I built this interactive game for Grilstad's Stranda campaign at Cavai. Design by Live Skarbø, assets by POL.",
       techniques: ['JS', 'CSS', 'HTML', 'Cavai'],
       classes: 'project-section__article--frontend project-section__article--ongoing',
       imgClass: 'project-img',
       readMore: false,
       visitWebsite: true,
     })}
    ${renderProjectItem({
      link: 'wolve.html',
      imgSrc: '/images/wolve.webp',
      title: 'Wolve Redesign',
      description: "Bachelor's project for Wolve IT. Full redesign of their loyalty platform.",
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
        'Running a music company and need to manage information about your artists? Look no further.',
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
        'Monitor your greenhouse(s) on your desktop or mobile and get notified when something is wrong.',
      techniques: ['IoT', 'Arduino', 'C++', 'Mongo DB', 'React', 'Tailwind'],
      classes: 'project-section__article--fullstack project-section__article--iot',
      imgClass: 'project-img',
      clickoutLink: 'https://github.com/NicolayKjarnet/greenhouse-system',
    })}
     ${renderProjectItem({
       link: 'Dagens-latter.html',
       imgSrc: '/images/dagens-latter.webp',
       title: 'Laughter Of The Day',
       description:
         'iOS app for daily laughs. Fetches jokes from an API. Add your own jokes as well.',
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
        "Let Mr. Scream guide you through the streets of Oslo to the Munch Museum. Perhaps you'll learn some trivia along the way?",
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
         'WIP: a cross-platform quiz/game app with a concept I think a lot of people are going to like.',
       techniques: ['Vue', 'Capacitor', 'Crossplatform'],
       classes: 'project-section__article--mobile project-section__article--ongoing',
       imgClass: 'project-img',
       readMore: false,
       visitWebsite: false,
     })}
    ${renderProjectItem({
      link: 'munchQR.html',
      imgSrc: '/images/munch-qr.webp',
      title: 'Discover Munch',
      description:
        "Tourist? Scan QR codes to read about Munch's art. Are you an admin at the Munch Museum and needs to do some CRUD operations? We got you covered.",
      techniques: ['React Native', 'React', '.net', 'C#', 'CRUD'],
      classes: 'project-section__article--mobile project-section__article--ux',
      imgClass: 'project-img',
    })}
    ${renderProjectItem({
      link: 'https://rick-and-morty-api.nicolaykjaernet.com/',
      imgSrc: '/images/rick-and-morty.webp',
      title: 'Rick and Morty',
      description: "If you like the Rick and Morty series, you'll love this website.",
      techniques: ['API', 'Grid', 'Media Queries', 'BEM', 'Fetch', 'Module', 'IIFE'],
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
        'Prototype for a finance app that automatically allocates your freelance income to various accounts for taxes, savings, and expenses based on predefined percentages.',
      techniques: ['UX', 'Figma', 'Universal Design', "Don Norman's principles"],
      classes: 'project-section__article--ux',
      imgClass: 'project-img',
      clickoutLink: 'https://www.figma.com/file/aIVI2dZQAmWy2WuLlnObSA/Split-Prototype',
      isFigma: true,
    })}
    ${renderProjectItem({
      link: 'https://scrollfolio.nicolaykjaernet.com/',
      imgSrc: '/images/scrollfolio.webp',
      title: 'Scrollfolio',
      description: "A portfolio based on Apple's appear-on-scroll-effect.",
      techniques: ['HTML', 'CSS', 'JS', 'Grid', 'Flexbox', 'Animation'],
      classes: 'project-section__article--frontend',
      imgClass: 'project-img',
      readMore: false,
      visitWebsite: true,
    })}
  `;
};
