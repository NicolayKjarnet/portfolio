/**
 * @typedef {Object} MusicItem
 * @property {string} title
 * @property {string} artist
 * @property {string} description
 * @property {string} imgSrc - Album cover
 * @property {string} [previewUrl] - Spotify 30s preview MP3 URL
 * @property {string} externalUrl - Spotify/SoundCloud link
 * @property {string} platform - 'spotify' | 'soundcloud'
 * @property {boolean} [hidden]
 */

/** @type {MusicItem[]} */
const musicProjects = [
  {
    title: 'Placeholder Track',
    artist: 'trueandtrue',
    description: 'Replace with your actual track. This is a placeholder to verify layout.',
    imgSrc: '/images/self-portrait.webp',
    externalUrl: 'https://open.spotify.com/track/placeholder',
    platform: 'spotify',
  },
  {
    title: 'Another Track',
    artist: 'trueandtrue',
    description: 'Second placeholder for layout testing. Replace with real content.',
    imgSrc: '/images/self-portrait.webp',
    externalUrl: 'https://soundcloud.com/placeholder',
    platform: 'soundcloud',
  },
];

const renderMusicItem = ({ title, artist, description, imgSrc, previewUrl, externalUrl, platform }) => {
  const platformIcon = platform === 'spotify' ? 'fab fa-spotify' : 'fab fa-soundcloud';

  return `
    <article class="project-section__article project-section__article--music">
      <div class="music-card" data-preview-url="${previewUrl || ''}" data-external-url="${externalUrl}">
        <div class="music-card__cover">
          <img class="music-card__img" src="${imgSrc}" alt="Cover art for ${title}" width="500" height="500" />
          ${previewUrl ? '<button class="music-card__play" aria-label="Play preview"><i class="fas fa-play"></i></button>' : ''}
        </div>
        <div class="music-card__info">
          <h2 class="music-card__title">${title}</h2>
          <p class="music-card__artist">${artist}</p>
          <p class="music-card__description">${description}</p>
          <a href="${externalUrl}" target="_blank" class="music-card__link" onclick="event.stopPropagation();">
            <i class="${platformIcon}"></i> Listen on ${platform === 'spotify' ? 'Spotify' : 'SoundCloud'}
          </a>
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
