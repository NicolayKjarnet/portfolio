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
      en: 'Music video for Hammok. Filmed on an afternoon in Oslo with no real plan. Fun project where I got to experiment with visuals and editing.',
      no: 'Musikkvideo for Hammok. Filmet på en ettermiddag i Oslo uten noen skikkelig plan. Et morsomt prosjekt hvor jeg fikk eksperimentere med kameravinkler og redigering.',
    },
    role: { en: 'Director, Camera, Editor', no: 'Regissør, kamera, redigering' },
    year: 2024,
    tags: [{ en: 'Music Video', no: 'Musikkvideo' }, 'Skateboarding'],
    youtubeId: 'SfcEUHwksBU',
    videoSrc: '/videos/hammok-one-minute.mp4',
    imgSrc: '/images/thumbnails/hammok-one-minute-thumb-2.webp',
    type: 'video',
  },
   {
    title: 'trueandtrue - Pin My Gaze',
    description: {
      en: 'Music video from the EP "This Won\'t Last When You Know the Beginning." Filmed on Hvaler in Norway with me behind the camera and Vincent Engebretsen in front of it.',
      no: 'Musikkvideo fra EP-en \u00ABThis Won\'t Last When You Know the Beginning\u00BB. Filmet p\u00e5 Hvaler med meg bak kamera og Vincent Engebretsen foran.',
    },
    role: { en: 'Director, Camera, Editor', no: 'Regissør, kamera, redigering' },
    year: 2024,
    tags: [{ en: 'Music Video', no: 'Musikkvideo' }, 'Post-Punk'],
    youtubeId: 'dU_fG-5h6gQ',
    videoSrc: '/videos/trueandtrue-pin-my-gaze.mp4',
    imgSrc: '/images/thumbnails/pin-my-gaze-thumb.webp',
    type: 'video',
  },
  {
    title: 'Ushikawa - Everlasting Green',
    description: {
      en: 'Music video starring Emma-Sofie Feen Kvarsnes.',
      no: 'Musikkvideo med Emma-Sofie Feen Kvarsnes.',
    },
    role: { en: 'Director, Camera, Editor', no: 'Regissør, kamera, redigering' },
    year: 2021,
    tags: [{ en: 'Music Video', no: 'Musikkvideo' }, 'Indie'],
    youtubeId: 'vOinWBPNyTQ',
    videoSrc: '/videos/ushikawa-everlasting-green.mp4',
    imgSrc: '/images/thumbnails/everlasting-green-thumb.webp',
    type: 'video',
  },
  {
    title: 'Victoria Nadine - Nerve',
    description: {
      en: 'Official music video. A cool project to be part of, and a step up from the other projects here in terms of reach.',
      no: 'Offisiell musikkvideo. Et kult prosjekt å være en del av, og et steg opp fra de andre prosjektene her mtp. popularitet og reach.',
    },
    role: { en: 'Editor, Texting', no: 'Redigering, teksting' },
    year: 2022,
    tags: [{ en: 'Music Video', no: 'Musikkvideo' }, 'Pop'],
    youtubeId: '2Lh7zL49Lyo',
    type: 'video',
  },
  {
    title: 'Ushikawa - Invite the Grief',
    description: {
      en: 'A weird one for Ushikawa. Fun crew to work with.',
      no: 'Sær musikkvideo for Ushikawa. Morsom gjeng å jobbe med.',
    },
    role: { en: 'Director, DP, Editor', no: 'Regissør, fotograf, redigering' },
    year: 2022,
    tags: [{ en: 'Music Video', no: 'Musikkvideo' }, 'Indie'],
    youtubeId: 'S7cxHb0GZcQ',
    videoSrc: '/videos/ushikawa-invite-the-grief.mp4',
    imgSrc: '/images/thumbnails/invite-the-grief-thumb.webp',
    type: 'video',
  },
   {
    title: 'Brother Savannah - When You\'re Gone',
    description: {
      en: 'Music video. A fun, low-budget project where I got to experiment with different filming techniques and editing styles. Towards the end, there\'s a little surprise cameo from Atle Antonsen. Not what you\'d expect from a low-budget indie music video.',
      no: 'Musikkvideo. Et morsomt lavbudsjett-prosjekt hvor jeg fikk eksperimentere masse. Mot slutten dukker det opp en liten overraskelse i form av Atle Antonsen. Ikke det man forventer av en lavbudsjett indie-musikkvideo.',
    },
    role: { en: 'Director, DP, Editor', no: 'Regissør, fotograf, redigering' },
    year: 2019,
    tags: [{ en: 'Music Video', no: 'Musikkvideo' }, 'Rock'],
    youtubeId: '8awO73kyAkM',
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
