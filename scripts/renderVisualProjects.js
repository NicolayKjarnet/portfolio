/**
 * @typedef {Object} VisualItem
 * @property {string} title
 * @property {string} description
 * @property {string} [imgSrc] - For image/graphic items
 * @property {string} [youtubeId] - For video items (YouTube video ID)
 * @property {string} type - 'image' | 'video'
 * @property {boolean} [hidden]
 */

/** @type {VisualItem[]} */
const visualProjects = [
  // Add visual items here. Set hidden: true to hide.
  // Example image:
  // {
  //   title: 'Album Cover Design',
  //   description: 'Cover art for ...',
  //   imgSrc: '/images/visual/cover-art.webp',
  //   type: 'image',
  // },
  // Example video:
  // {
  //   title: 'Music Video',
  //   description: 'Directed and edited for ...',
  //   youtubeId: 'dQw4w9WgXcQ',
  //   type: 'video',
  // },
];

const renderVisualItem = ({ title, description, imgSrc, youtubeId, type }) => {
  const media =
    type === 'video'
      ? `<div class="visual-card__video">
          <iframe
            src="https://www.youtube.com/embed/${youtubeId}"
            title="${title}"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowfullscreen
            loading="lazy"
          ></iframe>
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
        <p class="visual-card__description">${description}</p>
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
