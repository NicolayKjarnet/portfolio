/**
 * @typedef {Object} MusicLink
 * @property {string} url
 * @property {'spotify' | 'apple' | 'tidal' | 'qobuz'} platform
 */

/**
 * @typedef {Object} Track
 * @property {string} title
 * @property {string} [previewUrl] - Spotify 30s preview MP3 URL
 * @property {string} [duration] - e.g. '3:24'
 */

/**
 * @typedef {Object} MusicItem
 * @property {string} title
 * @property {string} artist
 * @property {string} description
 * @property {string} imgSrc - Album/single cover
 * @property {string} [previewUrl] - Preview URL (for single tracks)
 * @property {Track[]} [tracks] - Track list (for albums/EPs)
 * @property {MusicLink[]} links - Streaming service links
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
    title: 'Placeholder EP',
    artist: 'trueandtrue',
    description: 'Replace with your actual EP/album. Tracks with preview URLs get a play button.',
    imgSrc: '/images/self-portrait.webp',
    tracks: [
      { title: 'Track One', duration: '3:24', previewUrl: '' },
      { title: 'Track Two', duration: '4:01', previewUrl: '' },
      { title: 'Track Three', duration: '2:58', previewUrl: '' },
      { title: 'Track Four', duration: '3:42', previewUrl: '' },
    ],
    links: [
      { url: 'https://open.spotify.com/album/placeholder', platform: 'spotify' },
      { url: 'https://music.apple.com/placeholder', platform: 'apple' },
      { url: 'https://tidal.com/placeholder', platform: 'tidal' },
      { url: 'https://www.qobuz.com/placeholder', platform: 'qobuz' },
    ],
  },
  {
    title: 'Placeholder Single',
    artist: 'trueandtrue',
    description: 'A single track card without a tracklist.',
    imgSrc: '/images/self-portrait.webp',
    links: [
      { url: 'https://open.spotify.com/track/placeholder2', platform: 'spotify' },
      { url: 'https://tidal.com/placeholder2', platform: 'tidal' },
    ],
  },
];

const renderLinks = (links) =>
  links
    .map(({ url, platform }) => {
      const { icon, label } = platformConfig[platform] || { icon: 'fas fa-music', label: platform };
      return `<a href="${url}" target="_blank" class="music-card__link" onclick="event.stopPropagation();" aria-label="${label}"><i class="${icon}"></i></a>`;
    })
    .join('');

const renderTracklist = (tracks) => {
  const rows = tracks
    .map(
      (track, i) => `
      <li class="music-card__track${track.previewUrl ? ' music-card__track--playable' : ''}" data-preview-url="${track.previewUrl || ''}">
        <span class="music-card__track-num">${i + 1}</span>
        ${track.previewUrl ? '<button class="music-card__play music-card__track-play" aria-label="Play preview"><i class="fas fa-play"></i></button>' : '<span class="music-card__track-play-spacer"></span>'}
        <span class="music-card__track-title">${track.title}</span>
        ${track.duration ? `<span class="music-card__track-duration">${track.duration}</span>` : ''}
      </li>`
    )
    .join('');

  return `<ol class="music-card__tracklist">${rows}</ol>`;
};

const renderMusicItem = ({ title, artist, description, imgSrc, previewUrl, tracks, links }) => {
  const hasTracklist = tracks && tracks.length > 0;

  return `
    <article class="project-section__article project-section__article--music">
      <div class="music-card"${!hasTracklist && previewUrl ? ` data-preview-url="${previewUrl}"` : ''}>
        <div class="music-card__cover">
          <img class="music-card__img" src="${imgSrc}" alt="Cover art for ${title}" width="500" height="500" />
          ${!hasTracklist && previewUrl ? '<button class="music-card__play" aria-label="Play preview"><i class="fas fa-play"></i></button>' : ''}
        </div>
        <div class="music-card__info">
          <h2 class="music-card__title">${title}</h2>
          <p class="music-card__artist">${artist}</p>
          <p class="music-card__description">${description}</p>
          ${hasTracklist ? renderTracklist(tracks) : ''}
          <div class="music-card__links">${renderLinks(links)}</div>
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
