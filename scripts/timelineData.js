// Timeline data
const timelineData = [
  {
    year: 'May 2025 - Present',
    title: 'Frontend Developer',
    company: 'Cavai',
    details: [
      "Building and improving the platform that powers Cavai's interactive advertising solutions.",
      'Working with Vue.js and TypeScript to develop scalable, maintainable frontend architecture.',
      'Collaborating with the team to enhance developer experience and platform capabilities.',
    ],
    skills: ['Vue.js', 'TypeScript', 'JavaScript', 'CSS'],
    media: { type: 'video', src: './images/cavai-frontend-showreel-short.mp4' },
  },
  {
    year: 'Sep 2024 - May 2025',
    title: 'Creative Developer',
    company: 'Cavai',
    details: [
      'Created interactive advertising experiences from concept to finished product - games, quizzes, and engaging campaigns.',
      'Combined technical development with visual storytelling to deliver solutions that resonated with audiences.',
      'Worked closely with the creative team, translating their ideas into functional, polished experiences.',
    ],
    skills: ['JavaScript', 'CSS', 'HTML', 'Game Dev'],
    media: { type: 'video', src: './images/cavai-showreel-2024.mp4' },
  },
  {
    year: 'May 2024 - Present',
    title: 'Developer, Designer & Content Producer',
    company: 'Kjærnet-Wesseltoft AS',
    details: [
      'Developing an interactive platform for designing high-end, sustainable kitchens and a webshop for handcrafted items.',
      'Producing promotional videos, product photos, and marketing content.',
    ],
    skills: ['React', 'TypeScript', 'Three.js', 'Vue', 'Supabase'],
    media: { type: 'video', src: 'images/kithcen-builder.mp4' },
  },
  {
    year: 'Aug 2018 - Present',
    title: 'Freelance Content Producer',
    company: 'Universal Music, EMI Music, Island Records, and more',
    details: [
      'Producing music videos, promotional content, and graphic design for artists ranging from emerging talents to household names.',
      'Managing the full production pipeline - from concept and pre-production through filming to final delivery.',
    ],
    skills: ['Premiere Pro', 'After Effects', 'Photography', 'Graphic Design'],
    media: { type: 'video', src: './images/video-content-showreel-short.mp4' },
  },
  {
    year: 'Jan 2024 - Jun 2024',
    title: 'UX Designer (Internship)',
    company: 'Wolve IT',
    details: [
      "Redesigned the company's loyalty platform with a focus on improved usability and user experience.",
      'Conducted user research and market analysis to inform design decisions.',
      'Project received top marks and positive feedback from the company.',
    ],
    skills: ['Figma', 'UX Research', 'User Testing', 'Prototyping'],
    media: { type: 'video', src: './images/wolve-showcase-short.mp4' },
  },
  {
    year: 'Aug 2020 - Jun 2024',
    title: 'Bachelor in Frontend and Mobile Development',
    company: 'Kristiania University College',
    details: [
      'Studied web development, mobile app development, UX/UI design, and agile methodologies.',
      'Built projects with HTML, CSS, JavaScript, React, React Native, Swift, and more.',
      'Developed collaboration and problem-solving skills through team projects.',
    ],
    skills: ['React', 'React Native', 'Swift', 'JavaScript', 'Agile'],
  },
  {
    year: 'Aug 2015 - Jun 2018',
    title: 'Bachelor in Screenwriting',
    company: 'Westerdals Oslo ACT',
    details: [
      'Developed a strong foundation in storytelling, narrative structure, and visual communication.',
      'Worked on short films, TV series concepts, and feature film scripts.',
      'The storytelling skills from this degree now inform how I approach user experiences and product narratives.',
    ],
    skills: ['Storytelling', 'Screenwriting', 'Film', 'Narrative Design'],
  },
];

const DESKTOP_BREAKPOINT = 1024;

const createTimeline = () => {
  const timelineContainer = document.createElement('div');
  timelineContainer.className = 'timeline-container';

  const title = document.createElement('h2');
  title.className = 'timeline-title';
  title.ariaLabel = 'timeline-heading';
  title.textContent = 'Experience';
  timelineContainer.appendChild(title);

  const timelineLine = document.createElement('div');
  timelineLine.className = 'timeline-line';
  timelineContainer.appendChild(timelineLine);

  const updateTimelineClasses = () => {
    const timelineItems = timelineContainer.querySelectorAll('.timeline-item');
    timelineItems.forEach((item, index) => {
      if (window.innerWidth > 768) {
        item.className = `timeline-item ${index % 2 === 0 ? 'left' : 'right'}`;
      } else {
        item.className = 'timeline-item';
      }
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
    year.textContent = item.year;

    const itemTitle = document.createElement('h3');
    itemTitle.className = 'timeline-item-title';
    itemTitle.textContent = item.title;

    const company = document.createElement('h4');
    company.className = 'timeline-company';
    company.textContent = item.company;

    const detailsList = document.createElement('ul');
    detailsList.className = 'timeline-details';

    item.details.forEach((detail) => {
      const listItem = document.createElement('li');
      listItem.textContent = detail;
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

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const index = parseInt(entry.target.dataset.index, 10);
          if (!isNaN(index)) activate(index);
        }
      });
    },
    { rootMargin: '-40% 0px -40% 0px' }
  );

  timelineItems.forEach((item) => observer.observe(item));
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

document.addEventListener('DOMContentLoaded', addTimelineToPage);
