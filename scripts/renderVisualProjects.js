import { t } from './i18n.js';

/**
 * @typedef {Object} VisualItem
 * @property {string} title
 * @property {string | {en: string, no: string}} description
 * @property {string | {en: string, no: string}} role - e.g. 'Director & Editor'
 * @property {number} year
 * @property {string} [imgSrc] - For image/graphic items
 * @property {string} [videoSrc] - Self-hosted video file path
 * @property {string} [youtubeId] - YouTube video ID (for link to YT)
 * @property {(string | {en: string, no: string})[]} [tags] - e.g. ['Music Video', 'Skateboarding']
 * @property {string} type - 'image' | 'video'
 * @property {boolean} [hidden]
 */

/** @type {VisualItem[]} */
const visualProjects = [
  {
    title: 'Hammok - One Minute',
    description: {
      en: 'Shot in one afternoon across Oslo. Skateboarding meets lo-fi visual experimentation.',
      no: 'Filmet på en ettermiddag i Oslo. Skateboarding møter lo-fi visuell eksperimentering.',
    },
    role: { en: 'Director, Camera, Editor', no: 'Regissør, kamera, redigering' },
    year: 2024,
    tags: [{ en: 'Music Video', no: 'Musikkvideo' }, 'Skateboarding'],
    youtubeId: 'SfcEUHwksBU',
    videoSrc: '/videos/hammok-one-minute.mp4',
    imgSrc: '/images/visuals-thumbnails/hammok-one-minute-thumb-1.webp',
    type: 'video',
  },
   {
    title: 'trueandtrue - Pin My Gaze',
    description: {
      en: 'Filmed on the island of Hvaler with Vincent Engebretsen.',
      no: 'Filmet på Hvaler med Vincent Engebretsen.',
    },
    role: { en: 'Director, Camera, Editor', no: 'Regissør, kamera, redigering' },
    year: 2024,
    tags: [{ en: 'Music Video', no: 'Musikkvideo' }, 'Post-Punk'],
    youtubeId: 'dU_fG-5h6gQ',
    videoSrc: '/videos/trueandtrue-pin-my-gaze.mp4',
    imgSrc: '/images/visuals-thumbnails/pin-my-gaze-thumb.webp',
    type: 'video',
  },
  {
    title: 'Ushikawa - Everlasting Green',
    description: {
      en: 'Starring Emma-Sofie Feen Kvarsnes.',
      no: 'Med Emma-Sofie Feen Kvarsnes.',
    },
    role: { en: 'Director, Camera, Editor', no: 'Regissør, kamera, redigering' },
    year: 2021,
    tags: [{ en: 'Music Video', no: 'Musikkvideo' }, 'Indie'],
    youtubeId: 'vOinWBPNyTQ',
    videoSrc: '/videos/ushikawa-everlasting-green.mp4',
    imgSrc: '/images/visuals-thumbnails/everlasting-green-thumb.webp',
    type: 'video',
  },
  {
    title: 'Victoria Nadine - Nerve',
    description: {
      en: 'Official music video. A step up in reach from the other projects here.',
      no: 'Offisiell musikkvideo. Et steg opp i popularitet fra de andre prosjektene.',
    },
    role: { en: 'Editor, Texting', no: 'Redigering, teksting' },
    year: 2022,
    tags: [{ en: 'Music Video', no: 'Musikkvideo' }, 'Pop'],
    youtubeId: '2Lh7zL49Lyo',
    videoSrc: '/videos/victoria-nadine-nerve.mp4',
    imgSrc: '/images/visuals-thumbnails/victoria-nadine-nerve-thumb.webp',
    type: 'video',
  },
  {
    title: 'Hammok - Contrapoint',
    description: {
      en: 'Color grading, VFX and graphics.',
      no: 'Fargegradering, VFX og grafikk.',
    },
    role: { en: 'Colorist, VFX, Graphics', no: 'Fargegradering, VFX, grafikk' },
    year: 2024,
    tags: [{ en: 'Music Video', no: 'Musikkvideo' }],
    youtubeId: '_S0lj-RDdgk',
    videoSrc: '/videos/hammok-contrapoint.mp4',
    imgSrc: '/images/visuals-thumbnails/hammok-contrapoint-thumbnail.webp',
    type: 'video',
  },
  {
    title: 'Ushikawa - Invite the Grief',
    description: {
      en: 'A deliberately weird one for Ushikawa.',
      no: 'En bevisst sær en for Ushikawa.',
    },
    role: { en: 'Director, DP, Editor', no: 'Regissør, fotograf, redigering' },
    year: 2022,
    tags: [{ en: 'Music Video', no: 'Musikkvideo' }, 'Indie'],
    youtubeId: 'S7cxHb0GZcQ',
    videoSrc: '/videos/ushikawa-invite-the-grief.mp4',
    imgSrc: '/images/visuals-thumbnails/invite-the-grief-thumb.webp',
    type: 'video',
  },
  {
    title: 'Zana - Spike Lee',
    description: {
      en: 'Widescreen music video in 2.35:1 cinemascope.',
      no: 'Musikkvideo i 2.35:1 cinemascope.',
    },
    role: { en: 'Director, Camera, Editor', no: 'Regissør, kamera, redigering' },
    year: 2024,
    tags: [{ en: 'Music Video', no: 'Musikkvideo' }],
    youtubeId: 'y8Pesu_cdQE',
    videoSrc: '/videos/zana-spike-lee.mp4',
    imgSrc: '/images/visuals-thumbnails/zana-spike-lee-thumb-2.webp',
    type: 'video',
  },
   {
    title: 'Brother Savannah - When You\'re Gone',
    description: {
      en: 'Low-budget indie video with a surprise Atle Antonsen cameo towards the end.',
      no: 'Lavbudsjett indie-video med en uventet Atle Antonsen-cameo mot slutten.',
    },
    role: { en: 'Director, DP, Editor', no: 'Regissør, fotograf, redigering' },
    year: 2019,
    tags: [{ en: 'Music Video', no: 'Musikkvideo' }, 'Rock'],
    youtubeId: '8awO73kyAkM',
    videoSrc: '/videos/brother-savannah-when-youre-gone.mp4',
    imgSrc: '/images/visuals-thumbnails/brother-savannah-when-ur-gone-thumb.webp',
    type: 'video',
  },
];

const renderVisualItem = ({ title, description, role, year, imgSrc, videoSrc, youtubeId, tags, type }) => {
  const ytLink = youtubeId
    ? `<a href="https://www.youtube.com/watch?v=${youtubeId}" target="_blank" class="visual-card__yt-link" aria-label="${t('visual.watchOnYoutube')}"><i class="fab fa-youtube"></i></a>`
    : '';

  const media =
    type === 'video' && videoSrc
      ? `<div class="visual-card__video visual-card__video--cinema" data-video-src="${videoSrc}"${youtubeId ? ` data-youtube-id="${youtubeId}"` : ''}>
            <img class="visual-card__poster" src="${imgSrc}" alt="${title}" loading="lazy" />
            <button class="visual-card__play-overlay" aria-label="${t('visual.playVideo')}"><i class="fas fa-play"></i></button>
            ${ytLink}
          </div>`
      : type === 'video' && youtubeId
        ? `<div class="visual-card__video visual-card__video--poster" data-youtube-id="${youtubeId}">
            <img class="visual-card__poster" src="https://img.youtube.com/vi/${youtubeId}/maxresdefault.jpg" alt="${title}" loading="lazy" />
            <button class="visual-card__play-overlay" aria-label="${t('visual.playVideo')}"><i class="fas fa-play"></i></button>
            ${ytLink}
          </div>`
        : `<div class="visual-card__image" data-lightbox-src="${imgSrc}">
            <img src="${imgSrc}" alt="${title}" width="500" height="500" loading="lazy" />
            <div class="visual-card__expand"><i class="fas fa-expand"></i></div>
          </div>`;

  return `
    <article class="project-section__article project-section__article--visual">
      ${media}
      <div class="visual-card__info">
        <h2 class="visual-card__title">${title}</h2>
        <p class="visual-card__meta">${t(role)} &middot; ${year}</p>
        <p class="visual-card__description">${t(description)}</p>
        ${tags?.length ? `<div class="visual-card__tags">${tags.map(tag => `<span class="visual-card__tag">${t(tag)}</span>`).join('')}</div>` : ''}
      </div>
    </article>
  `;
};

export const renderVisualProjects = () => {
  return visualProjects
    .filter((p) => !p.hidden)
    .map((p) => renderVisualItem(p))
    .join('');
};

export const setupVisualPlayers = () => {
  document.querySelectorAll('.visual-card__video--poster').forEach((container) => {
    const btn = container.querySelector('.visual-card__play-overlay');
    const poster = container.querySelector('.visual-card__poster');
    if (!btn && !poster) return;

    const handlePlay = () => {
      const id = container.dataset.youtubeId;
      if (!id) return;
      const iframe = document.createElement('iframe');
      iframe.src = `https://www.youtube-nocookie.com/embed/${id}?autoplay=1`;
      iframe.title = poster?.alt || '';
      iframe.frameBorder = '0';
      iframe.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture';
      iframe.allowFullscreen = true;
      container.querySelector('.visual-card__play-overlay')?.remove();
      container.querySelector('.visual-card__poster')?.remove();
      container.classList.remove('visual-card__video--poster');
      container.appendChild(iframe);
    };

    btn?.addEventListener('click', handlePlay);
    poster?.addEventListener('click', handlePlay);
  });
};
