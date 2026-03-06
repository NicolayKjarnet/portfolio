import { t } from './i18n.js';

// Timeline data
const timelineData = [
  {
    year: { en: 'May 2025 - Present', no: 'Mai 2025 - Nåværende' },
    title: { en: 'Frontend Developer', no: 'Frontend-utvikler' },
    company: 'Cavai',
    details: [
      {
        en: "Building and improving the platform that powers Cavai's interactive advertising solutions.",
        no: 'Bygger og forbedrer plattformen som driver Cavais interaktive annonseløsninger.',
      },
      {
        en: 'Working with Vue.js and TypeScript to develop scalable, maintainable frontend architecture.',
        no: 'Jobber med Vue.js og TypeScript for å utvikle skalerbar, vedlikeholdbar frontend-arkitektur.',
      },
      {
        en: 'Collaborating with the team to enhance developer experience and platform capabilities.',
        no: 'Samarbeider med teamet for å forbedre utvikleropplevelsen og plattformens kapasitet.',
      },
    ],
    skills: ['Vue.js', 'TypeScript', 'JavaScript', 'SASS/CSS'],
    media: { type: 'video', src: './images/cavai-frontend-showreel-short.mp4' },
  },
  {
    year: { en: 'Sep 2024 - May 2025', no: 'Sep 2024 - Mai 2025' },
    title: { en: 'Creative Developer', no: 'Kreativ utvikler' },
    company: 'Cavai',
    details: [
      {
        en: 'Created interactive advertising experiences from concept to finished product - games, quizzes, and engaging campaigns.',
        no: 'Skapte interaktive annonseopplevelser fra konsept til ferdig produkt – spill, quizer og engasjerende kampanjer.',
      },
      {
        en: 'Combined technical development with visual storytelling to deliver solutions that resonated with audiences.',
        no: 'Kombinerte teknisk utvikling med visuell historiefortelling for å levere løsninger som traff publikum.',
      },
      {
        en: 'Worked closely with the creative team, translating their ideas into functional, polished experiences.',
        no: 'Jobbet tett med det kreative teamet, og oversatte ideene deres til funksjonelle, polerte opplevelser.',
      },
    ],
    skills: ['JavaScript', 'CSS', 'HTML', '"Vanilla" Game Dev'],
    media: { type: 'video', src: './images/cavai-showreel-2024.mp4' },
  },
  {
    year: { en: 'May 2024 - Present', no: 'Mai 2024 - Nåværende' },
    title: { en: 'Developer, Designer & Content Producer', no: 'Utvikler, designer & innholdsprodusent' },
    company: 'Kjærnet-Wesseltoft AS',
    details: [
      {
        en: 'Developing an interactive platform for designing high-end, sustainable kitchens and a webshop for handcrafted items.',
        no: 'Utvikler en interaktiv plattform for å designe eksklusive, bærekraftige kjøkken og en nettbutikk for håndlagde produkter.',
      },
      {
        en: 'Producing promotional videos, product photos, and marketing content.',
        no: 'Produserer reklamevideoer, produktfoto og markedsføringsinnhold.',
      },
    ],
    skills: ['React', 'TypeScript', 'Three.js', 'Supabase'],
    media: { type: 'video', src: 'images/kithcen-builder.mp4' },
  },
  {
    year: { en: 'Aug 2018 - Present', no: 'Aug 2018 - Nåværende' },
    title: { en: 'Freelance Content Producer', no: 'Frilanser innholdsprodusent' },
    company: 'Universal Music, EMI Music, Island Records, and more',
    details: [
      {
        en: 'Producing music videos, promotional content, and graphic design for artists ranging from emerging talents to household names.',
        no: 'Produserer musikkvideoer, reklameinnhold og grafisk design for artister fra nye talenter til kjente navn.',
      },
      {
        en: 'Managing the full production pipeline - from concept and pre-production through filming to final delivery.',
        no: 'Styrer hele produksjonslinjen – fra konsept og forproduksjon via filming til endelig levering.',
      },
    ],
    skills: ['Premiere Pro', 'Davinci Resolve', 'Photography', 'Graphic Design'],
    media: { type: 'video', src: './images/video-content-showreel-short.mp4' },
  },
  {
    year: { en: 'Jan 2024 - Jun 2024', no: 'Jan 2024 - Jun 2024' },
    title: { en: 'UX Designer (Internship)', no: 'UX-designer (praksis)' },
    company: 'Wolve IT',
    details: [
      {
        en: "Redesigned the company's loyalty platform with a focus on improved usability and user experience.",
        no: 'Redesignet selskapets lojalitetsplattform med fokus på forbedret brukervennlighet og brukeropplevelse.',
      },
      {
        en: 'Conducted user research and market analysis to inform design decisions.',
        no: 'Gjennomførte brukerundersøkelser og markedsanalyse for å informere designvalg.',
      },
      {
        en: 'Project received top marks and positive feedback from the company.',
        no: 'Prosjektet fikk toppkarakter og positive tilbakemeldinger fra selskapet.',
      },
    ],
    skills: ['Figma', 'UX Research', 'User Testing', 'Prototyping'],
    media: { type: 'video', src: './images/wolve-showcase-short.mp4' },
  },
  {
    year: { en: 'Aug 2020 - Jun 2024', no: 'Aug 2020 - Jun 2024' },
    title: { en: 'Bachelor in Frontend and Mobile Development', no: 'Bachelor i frontend- og mobilutvikling' },
    company: 'Kristiania University College',
    details: [
      {
        en: 'Studied web development, mobile app development, UX/UI design, and agile methodologies.',
        no: 'Studerte webutvikling, mobilapputvikling, UX/UI-design og smidige metoder.',
      },
      {
        en: 'Built projects with HTML, CSS, JavaScript, React, React Native, Swift, and more.',
        no: 'Bygget prosjekter med HTML, CSS, JavaScript, React, React Native, Swift og mer.',
      },
      {
        en: 'Developed collaboration and problem-solving skills through team projects.',
        no: 'Utviklet samarbeids- og problemløsningsferdigheter gjennom teamprosjekter.',
      },
    ],
    skills: ['React', 'React Native', 'Swift', 'JavaScript', 'Agile'],
  },
  {
    year: { en: 'Aug 2015 - Jun 2018', no: 'Aug 2015 - Jun 2018' },
    title: { en: 'Bachelor in Screenwriting', no: 'Bachelor i manus' },
    company: 'Westerdals Oslo ACT',
    details: [
      {
        en: 'Developed a strong foundation in storytelling, narrative structure, and visual communication.',
        no: 'Utviklet et solid fundament innen historiefortelling, narrativ struktur og visuell kommunikasjon.',
      },
      {
        en: 'Worked on short films, TV series concepts, and feature film scripts.',
        no: 'Jobbet med kortfilmer, TV-seriekonsepter og spillefilmmanus.',
      },
      {
        en: 'The storytelling skills from this degree now inform how I approach user experiences and product narratives.',
        no: 'Historiefortellerferdighetene fra denne graden påvirker nå hvordan jeg tilnærmer meg brukeropplevelser og produktnarrativer.',
      },
    ],
    skills: ['Storytelling', 'Screenwriting', 'Film', 'Narrative Design'],
  },
];

const DESKTOP_BREAKPOINT = 1024;

const createTimeline = () => {
  const timelineContainer = document.createElement('div');
  timelineContainer.className = 'timeline-container';

  const timelineLine = document.createElement('div');
  timelineLine.className = 'timeline-line';
  timelineContainer.appendChild(timelineLine);

  const updateTimelineClasses = () => {
    const timelineItems = timelineContainer.querySelectorAll('.timeline-item');
    const w = window.innerWidth;
    timelineItems.forEach((item, index) => {
      if (w > 768 && w < DESKTOP_BREAKPOINT) {
        item.className = `timeline-item ${index % 2 === 0 ? 'left' : 'right'}`;
      } else {
        item.className = 'timeline-item';
      }
      // Preserve data-index
      item.dataset.index = index;
    });
  };

  timelineData.forEach((item, index) => {
    const timelineItem = document.createElement('div');
    timelineItem.className = 'timeline-item';
    timelineItem.dataset.index = index;

    const content = document.createElement('div');
    content.className = 'timeline-content';

    const year = document.createElement('span');
    year.className = 'timeline-year';
    year.textContent = t(item.year);

    const itemTitle = document.createElement('h3');
    itemTitle.className = 'timeline-item-title';
    itemTitle.textContent = t(item.title);

    const company = document.createElement('h4');
    company.className = 'timeline-company';
    company.textContent = item.company;

    const detailsList = document.createElement('ul');
    detailsList.className = 'timeline-details';

    item.details.forEach((detail) => {
      const listItem = document.createElement('li');
      listItem.textContent = t(detail);
      detailsList.appendChild(listItem);
    });

    content.appendChild(year);
    content.appendChild(itemTitle);
    content.appendChild(company);
    content.appendChild(detailsList);

    // Inline media (visible on mobile, hidden on desktop via CSS)
    if (item.media) {
      if (item.media.type === 'video') {
        const video = document.createElement('video');
        video.src = item.media.src;
        video.className = 'timeline-video';
        video.muted = true;
        video.loop = true;
        video.playsInline = true;
        video.preload = 'metadata';

        const observer = new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => {
              if (entry.isIntersecting) {
                video.play().catch(() => {});
              } else {
                video.pause();
              }
            });
          },
          { threshold: 0.3 }
        );

        observer.observe(video);
        content.appendChild(video);
      } else {
        const image = document.createElement('img');
        image.src = item.media.src;
        image.className = 'timeline-image';
        image.loading = 'lazy';
        content.appendChild(image);
      }
    }

    const circle = document.createElement('div');
    circle.className = `timeline-circle timeline-circle-${index}`;

    timelineItem.appendChild(content);
    timelineItem.appendChild(circle);
    timelineContainer.appendChild(timelineItem);
  });

  updateTimelineClasses();
  window.addEventListener('resize', updateTimelineClasses);

  return timelineContainer;
};

/**
 * Scrollytelling: left sticky panel reacts to which timeline entry is in view.
 * On desktop, media + skill tags crossfade as you scroll through the timeline.
 */
const setupScrollytelling = () => {
  if (window.innerWidth < DESKTOP_BREAKPOINT) return;

  const display = document.querySelector('.scrollytelling-display');
  if (!display) return;

  const timelineItems = document.querySelectorAll('.timeline-item');
  if (!timelineItems.length) return;

  // Create one slide per timeline entry
  timelineData.forEach((item, index) => {
    const slide = document.createElement('div');
    slide.className = 'scrollytelling-slide';
    slide.dataset.index = index;

    // Media
    const mediaContainer = document.createElement('div');
    mediaContainer.className = 'scrollytelling-media';

    if (item.media) {
      if (item.media.type === 'video') {
        const video = document.createElement('video');
        video.src = item.media.src;
        video.muted = true;
        video.loop = true;
        video.playsInline = true;
        video.preload = 'metadata';
        mediaContainer.appendChild(video);
      } else {
        const img = document.createElement('img');
        img.src = item.media.src;
        img.loading = 'lazy';
        mediaContainer.appendChild(img);
      }
    } else {
      // Fallback: profile image
      const img = document.createElement('img');
      img.src = '/images/profile-pic-no-bg.webp';
      img.className = 'scrollytelling-fallback';
      mediaContainer.appendChild(img);
    }

    slide.appendChild(mediaContainer);

    // Skill tags
    if (item.skills && item.skills.length) {
      const tags = document.createElement('div');
      tags.className = 'scrollytelling-skills';
      item.skills.forEach((skill) => {
        const tag = document.createElement('span');
        tag.textContent = skill;
        tags.appendChild(tag);
      });
      slide.appendChild(tags);
    }

    display.appendChild(slide);
  });

  const slides = display.querySelectorAll('.scrollytelling-slide');
  let activeIndex = -1;

  const activate = (index) => {
    if (index === activeIndex) return;
    activeIndex = index;

    slides.forEach((slide, i) => {
      const isActive = i === index;
      slide.classList.toggle('active', isActive);

      const video = slide.querySelector('video');
      if (video) {
        if (isActive) {
          video.play().catch(() => {});
        } else {
          video.pause();
        }
      }
    });

    // Highlight active timeline entry
    timelineItems.forEach((item, i) => {
      item.classList.toggle('timeline-item--active', i === index);
    });
  };

  // Activate first slide
  activate(0);

  // Scroll-based: find which timeline item is closest to viewport center
  let ticking = false;
  const onScroll = () => {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(() => {
      ticking = false;
      const center = window.innerHeight / 2;
      let closestIndex = 0;
      let closestDist = Infinity;

      timelineItems.forEach((item, i) => {
        const rect = item.getBoundingClientRect();
        const dist = Math.abs(rect.top + rect.height / 2 - center);
        if (dist < closestDist) {
          closestDist = dist;
          closestIndex = i;
        }
      });

      activate(closestIndex);
    });
  };

  window.addEventListener('scroll', onScroll, { passive: true });
};

const addTimelineToPage = () => {
  const timeline = createTimeline();
  const targetElement = document.querySelector('.timeline-content');
  if (targetElement) {
    targetElement.innerHTML = '';
    targetElement.appendChild(timeline);
  }

  // Set up scrollytelling after timeline is in the DOM
  setupScrollytelling();
};

/** Update timeline text in-place without destroying DOM (preserves GSAP ScrollTriggers). */
const updateTimelineText = () => {
  const titleEl = document.querySelector('.timeline-title');
  if (titleEl) titleEl.textContent = t('timeline.title');

  document.querySelectorAll('.timeline-item').forEach((item) => {
    const index = parseInt(item.dataset.index, 10);
    const data = timelineData[index];
    if (!data) return;

    const yearEl = item.querySelector('.timeline-year');
    if (yearEl) yearEl.textContent = t(data.year);

    const itemTitle = item.querySelector('.timeline-item-title');
    if (itemTitle) itemTitle.textContent = t(data.title);

    const details = item.querySelectorAll('.timeline-details li');
    data.details.forEach((detail, i) => {
      if (details[i]) details[i].textContent = t(detail);
    });
  });
};

export { addTimelineToPage, updateTimelineText };
