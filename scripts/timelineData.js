import { t } from './i18n.js';

// Timeline data
const timelineData = [
  {
    year: { en: 'May 2025 - Present', no: 'Mai 2025 - Nåværende' },
    title: { en: 'Frontend Developer', no: 'Frontend-utvikler' },
    company: 'Cavai',
    details: [
      {
        en: "I work on Cavai's ad platform. Think Figma, but for interactive ads.",
        no: 'Jeg jobber med Cavais annonseplattform. Tenk Figma, men for interaktive annonser.',
      },
      {
        en: 'Vue and TypeScript day-to-day. Lots of component work, state management, and making things not break.',
        no: 'Vue og TypeScript i hverdagen. Mye komponentarbeid, state management og å sørge for at ting ikke går i stykker.',
      },
      {
        en: "I used to work in this platform as a creative for nine months, so I know where the pain points are.",
        no: 'Jeg jobbet i denne plattformen selv i ni måneder, så jeg vet hvor skoen trykker.',
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
        en: 'Built games, quizzes and other interactive campaigns. Sometimes from scratch, often helping the creatives bring their ideas to life.',
        no: 'Kodet spill, quizer og andre interaktive kampanjer. Noen ganger fra scratch, ofte som en hjelpende hånd for å få kreatørenes ideer til å fungere.',
      },
      {
        en: "My first dev job. Turns out a background in film and storytelling is surprisingly useful when you're building stuff people are supposed to enjoy.",
        no: 'Min første utviklerjobb. Det skulle vise seg at bakgrunn i film og historiefortelling er overraskende nyttig når man lager ting folk faktisk skal ha lyst til å trykke på.',
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
        en: "Side project where I'm building an interactive kitchen planner and a webshop for handcrafted items.",
        no: 'Sideprosjekt hvor jeg bygger en interaktiv kjøkkenplanlegger og en nettbutikk for hjemmelagde klær og møbler.',
      },
      {
        en: 'I do everything from code to product photos and videos.',
        no: 'Jeg gjør alt fra utvikling til produktfoto og videoer.',
      },
    ],
    skills: ['React', 'TypeScript', 'Three.js', 'Supabase'],
    media: { type: 'video', src: 'images/kitchen-builder.mp4' },
  },
  {
    year: { en: 'Aug 2018 - Present', no: 'Aug 2018 - Nåværende' },
    title: { en: 'Freelance Content Producer', no: 'Freelance innholdsprodusent' },
    company: 'Universal Music, EMI Records, Island Records ++',
    details: [
      {
        en: "Music videos, promo content and some graphic design. I've worked with everyone from small indie acts to some of Norway's biggest artists.",
        no: 'Musikkvideoer, promo-innhold og noe grafisk design. Har jobbet med alt fra små indieartister til noen av Norges største navn.',
      },
      {
        en: 'Mostly video editing, and mostly social media content, but also filming, directing and ideation.',
        no: 'Først og fremst klipping av SoMe-innhold, men også film, foto, regi og idé.',
      },
    ],
    skills: ['Davinci Resolve', 'Premiere Pro', 'Photography', 'Graphic Design'],
    media: { type: 'video', src: './images/video-content-showreel-short.mp4' },
  },
  {
    year: { en: 'Jan 2024 - Jun 2024', no: 'Jan 2024 - Jun 2024' },
    title: { en: 'UX Designer (Internship)', no: 'UX-designer (praksis)' },
    company: 'Wolve IT',
    details: [
      {
        en: "Redesigned Wolve's loyalty platform. Did user research, testing, prototyping — the whole UX toolkit.",
        no: 'Sammen med gruppa mi, gjorde vi en full redesign av lojalitetsplattformen til Wolve. Brukerundersøkelser, testing og prototyping.',
      },
      {
        en: 'The work resulted in top marks, and the company was very happy with the outcome.',
        no: 'Arbeidet endte i toppkarakter, og selskapet var superfornøyde med resultatet.',
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
        en: 'Where I learned to code. Web, mobile apps, UX — the full stack of frontend stuff and some full-stack.',
        no: 'Her lærte jeg å kode, før dette var det helt gresk for meg. Nettsider, mobilapper, UX. Hele frontend-pakken og en dæsj med full-stack.',
      },
      {
        en: 'React, React Native, Swift, JavaScript. Lots of group projects, lots of late nights.',
        no: 'React, React Native, Swift, JavaScript. Masse gruppeprosjekter, mange sene kvelder, men først og fremst gøy!',
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
        en: "My first degree — storytelling, narrative structure, screenwriting. Wrote short films, TV concepts and feature scripts.",
        no: 'Min første grad. Historiefortelling, treaktstrukturen, manuskriving. Skrev kortfilmer, TV-konsepter og spillefilmmanus.',
      },
      {
        en: "Might seem unrelated to code, but knowing how to structure a story turns out to be pretty useful when you're designing user flows.",
        no: 'Kan virke lite relatert til kode, men å vite hvordan man strukturerer en fortelling er overraskende nyttig når man designer brukerflyter.',
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
