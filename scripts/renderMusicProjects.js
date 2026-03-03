/**
 * @typedef {Object} MusicLink
 * @property {string} url
 * @property {'spotify' | 'apple' | 'tidal' | 'qobuz'} platform
 */

/**
 * @typedef {Object} MusicItem
 * @property {string} title
 * @property {string} artist
 * @property {string} description
 * @property {string} imgSrc - Album cover
 * @property {string} [previewUrl] - Spotify 30s preview MP3 URL
 * @property {MusicLink[]} links - Array of streaming service links
 * @property {boolean} [hidden]
 */

const platformConfig = {
  spotify: { icon: 'fab fa-spotify', label: 'Spotify' },
  apple: { icon: 'fab fa-apple', label: 'Apple Music' },
  tidal: { icon: 'fas fa-water', label: 'Tidal' },
  qobuz: { icon: 'fas fa-headphones', label: 'Qobuz' },
};

/** @type {MusicItem[]} */
const musicProjects = [
  {
    title: 'Placeholder Track',
    artist: 'trueandtrue',
    description: 'Replace with your actual track. This is a placeholder to verify layout.',
    imgSrc: '/images/self-portrait.webp',
    links: [
      { url: 'https://open.spotify.com/track/placeholder', platform: 'spotify' },
      { url: 'https://music.apple.com/placeholder', platform: 'apple' },
      { url: 'https://tidal.com/placeholder', platform: 'tidal' },
      { url: 'https://www.qobuz.com/placeholder', platform: 'qobuz' },
    ],
  },
  {
    title: 'Another Track',
    artist: 'trueandtrue',
    description: 'Second placeholder for layout testing. Replace with real content.',
    imgSrc: '/images/self-portrait.webp',
    links: [
      { url: 'https://open.spotify.com/track/placeholder2', platform: 'spotify' },
      { url: 'https://tidal.com/placeholder2', platform: 'tidal' },
    ],
  },
];

const renderMusicItem = ({ title, artist, description, imgSrc, previewUrl, links }) => {
  const linksHtml = links
    .map(({ url, platform }) => {
      const { icon, label } = platformConfig[platform] || { icon: 'fas fa-music', label: platform };
      return `<a href="${url}" target="_blank" class="music-card__link" onclick="event.stopPropagation();" aria-label="${label}"><i class="${icon}"></i></a>`;
    })
    .join('');

  return `
    <article class="project-section__article project-section__article--music">
      <div class="music-card" data-preview-url="${previewUrl || ''}">
        <div class="music-card__cover">
          <img class="music-card__img" src="${imgSrc}" alt="Cover art for ${title}" width="500" height="500" />
          ${previewUrl ? '<button class="music-card__play" aria-label="Play preview"><i class="fas fa-play"></i></button>' : ''}
        </div>
        <div class="music-card__info">
          <h2 class="music-card__title">${title}</h2>
          <p class="music-card__artist">${artist}</p>
          <p class="music-card__description">${description}</p>
          <div class="music-card__links">${linksHtml}</div>
        </div>
      </div>
    </article>
  `;
};

export const renderMusicProjects = () => {
  return musicProjects
    .filter((p) => !p.hidden)
    .map((p) => renderMusicItem(p))
    .join('');
};
