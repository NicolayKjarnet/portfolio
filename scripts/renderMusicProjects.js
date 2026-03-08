import { t } from './i18n.js';

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
 * @property {string} [singleImg] - Cover art for this single (swaps album cover during playback)
 * @property {string} [canvasVideo] - Spotify Canvas looping video
 */

/**
 * @typedef {Object} MusicItem
 * @property {string} title
 * @property {string} artist
 * @property {string | {en: string, no: string}} role - e.g. 'Bass & Songwriter'
 * @property {number} year
 * @property {string | {en: string, no: string}} description
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
  soundcloud: { icon: 'fab fa-soundcloud', label: 'SoundCloud' },
};

/** @type {MusicItem[]} */
const musicProjects = [
  {
    title: 'This Won\u2019t Last When You Know the Beginning',
    artist: 'trueandtrue',
    role: { en: 'Songwriter, Bassist & visual identity', no: 'Låtskriver, bassist og visuell identitet' },
    year: 2024,
    description: {
      en: 'Post-punk, hardcore and screamo — featuring Bugge Wesseltoft on track 4.',
      no: 'Post-punk, hardcore og screamo — med Bugge Wesseltoft på spor 4.',
    },
    imgSrc: '/images/music/this-wont-last-cover.png',
    tracks: [
      { title: 'Doomed', duration: '3:43', previewUrl: 'https://p.scdn.co/mp3-preview/812e1fd7de66d482eb952f44f1bd73ecfe35a5f8' },
      { title: 'Pin My Gaze', duration: '2:39', previewUrl: 'https://p.scdn.co/mp3-preview/7761960c681348dfb4267134bc3bdbadfd245fd9', singleImg: '/images/music/pin-my-gaze-cover.png'},
      { title: 'Hollowed Out, Pt. 1', duration: '2:37', previewUrl: 'https://p.scdn.co/mp3-preview/4a4e8c4de7a673d0b59d49793900a130f8ef8633', singleImg: '/images/music/hollowed-out-cover.png', canvasVideo: '/videos/hollowed-out-canvas.mp4'},
      { title: 'Hollowed Out, Pt. 2 (feat. Bugge Wesseltoft)', duration: '4:23', previewUrl: 'https://p.scdn.co/mp3-preview/00db74e96fe7a8e745247e81632f3123e1df894c' },
      { title: 'Nothing Revealed', duration: '2:16', previewUrl: 'https://p.scdn.co/mp3-preview/b898c5cf19242606a4052abab9054278feea2207' },
      { title: 'Watch Me Dance (Again)', duration: '4:08', previewUrl: 'https://p.scdn.co/mp3-preview/d8ee1ac23f62f253deb44a063e886186f8f88200' },
    ],
    links: [
      { url: 'https://open.spotify.com/album/2qbFTbHiWJZS9BsaVj5dFy', platform: 'spotify' },
      { url: 'https://music.apple.com/no/album/this-wont-last-when-you-know-the-beginning-ep/1760354407', platform: 'apple' },
    ],
  },
  {
    title: 'Back into Quiet',
    artist: 'trueandtrue',
    role: { en: 'Songwriter, Bassist, visuals', no: 'Låtskriver, bassist, visuelt' },
    year: 2024,
    description: {
      en: 'Hardcore fury to shoegaze nostalgia.',
      no: 'Hardcore til shoegaze-nostalgi.',
    },
    imgSrc: '/images/music/biq-ep-cover.png',
    tracks: [
      { title: 'Reset', duration: '2:43', previewUrl: 'https://p.scdn.co/mp3-preview/b688b8c98e4f31089fed92730278b5461888c860', canvasVideo: '/videos/reset-canvas.mp4' },
      { title: 'Erased U', duration: '4:09', previewUrl: 'https://p.scdn.co/mp3-preview/ea940eb5ec0cee6745383cfbdbbcb131cefbc00d', canvasVideo: '/videos/erased-u-canvas.mp4' },
      { title: 'Lay Down', duration: '3:36', previewUrl: 'https://p.scdn.co/mp3-preview/a3a56ff5717f2fc1b4c8d2ffa8a3c39ff3e2aeaa', canvasVideo: '/videos/lay-down-canvas.mp4' },
      { title: 'Blindfold', duration: '3:00', previewUrl: 'https://p.scdn.co/mp3-preview/9be22302109e16cbbc4aa27273f5425e381049b4', canvasVideo: '/videos/blindfold-canvas.mp4' },
      { title: 'Back into Quiet', duration: '3:34', previewUrl: 'https://p.scdn.co/mp3-preview/0cc757b27976fd07590340aaf1eec74a857f73ee', canvasVideo: '/videos/biq-canvas.mp4'},
    ],
    links: [
      { url: 'https://open.spotify.com/album/3SpmM3eIcpzURJB3JpMFkn', platform: 'spotify' },
      { url: 'https://music.apple.com/no/album/back-into-quiet-ep/1727145686', platform: 'apple' },
    ],
  },
  {
    title: 'Indie/Post-Rock Demos',
    artist: 'Whatever Floats',
    role: { en: 'Instruments, Producer & Mix', no: 'Instrumenter, produsent & miks' },
    year: 2021,
    description: {
      en: 'Self-produced demos — guitar, bass, keys and MIDI drums.',
      no: 'Egenproduserte demoer — gitar, bass, keys og MIDI-trommer.',
    },
    imgSrc: '/images/music/whatever-floats-allergic-to-the-21st-century-cover.png',
    tracks: [
      { title: 'Allergic To The 21st Century', duration: '3:44', previewUrl: '/audio/whatever-floats/allergic-to-the-21st-century.wav', previewStart: '1:13' },
      { title: 'Grey Matter', duration: '3:53', previewUrl: '/audio/whatever-floats/grey-matter.wav', previewStart: '1:34' },
      { title: 'My Vision Is Just Fine, Thank You (Interlude)', duration: '1:00', previewUrl: '/audio/whatever-floats/my-vision-is-just-fine-thank-you.wav', previewStart: '0:15' },
      { title: 'We Know What You Did', duration: '2:01', previewUrl: '/audio/whatever-floats/we-know-what-you-did.wav', previewStart: '0:30' },
    ],
    links: [
      { url: 'https://soundcloud.com/nicolaykjaernet/sets/indie-post-rock', platform: 'soundcloud' },
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
      <li class="music-card__track${track.previewUrl ? ' music-card__track--playable' : ''}" data-preview-url="${track.previewUrl || ''}"${track.previewStart ? ` data-preview-start="${track.previewStart}"` : ''}${track.singleImg ? ` data-single-img="${track.singleImg}"` : ''}${track.canvasVideo ? ` data-canvas-video="${track.canvasVideo}"` : ''}>
        <span class="music-card__track-num">${i + 1}</span>
        ${track.previewUrl ? `<button class="music-card__play music-card__track-play" aria-label="${t('music.playPreview')}"><i class="fas fa-play"></i></button>` : '<span class="music-card__track-play-spacer"></span>'}
        <span class="music-card__track-title">${track.title}</span>
        ${track.duration ? `<span class="music-card__track-duration">${track.duration}</span>` : ''}
        <div class="music-card__track-progress"><div class="music-card__track-progress-fill"></div></div>
      </li>`
    )
    .join('');

  return `<ol class="music-card__tracklist">${rows}</ol>`;
};

const renderMusicItem = ({ title, artist, role, year, description, imgSrc, previewUrl, tracks, links }) => {
  const hasTracklist = tracks && tracks.length > 0;
  const hasCanvas = tracks?.some(tr => tr.canvasVideo);

  const coverMedia = `
    ${hasCanvas ? '<video class="music-card__canvas" muted loop playsinline preload="none"></video>' : ''}
    <img class="music-card__img${hasCanvas ? ' music-card__img--fallback' : ''}" src="${imgSrc}" alt="${t('music.coverAlt', { title })}" width="500" height="500" />`;

  return `
    <article class="project-section__article project-section__article--music">
      <div class="music-card"${!hasTracklist && previewUrl ? ` data-preview-url="${previewUrl}"` : ''}>
        <div class="music-card__cover">
          ${coverMedia}
          ${!hasTracklist && previewUrl ? `<button class="music-card__play" aria-label="${t('music.playPreview')}"><i class="fas fa-play"></i></button>` : ''}
        </div>
        <div class="music-card__info">
          <h2 class="music-card__title">${title}</h2>
          <p class="music-card__artist">${artist}</p>
          <p class="music-card__meta">${t(role)} &middot; ${year}</p>
          <p class="music-card__description">${t(description)}</p>
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
