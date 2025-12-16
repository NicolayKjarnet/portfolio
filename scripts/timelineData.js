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
    media: { type: 'video', src: 'images/kithcen-builder.mp4' },
  },
  {
    year: 'Aug 2018 - Present',
    title: 'Freelance Content Producer',
    company: 'Universal Music, EMI Music, Island Records, and more',
    details: [
      'Producing music videos, promotional content, and graphic design for artists ranging from emerging talents to household names.',
      'Managing the full production pipeline - from concept and pre-production through filming to final delivery.',
      'Building long-term client relationships through quality work and clear communication.',
    ],
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
  },
];

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

    // Handle media (video or image)
    if (item.media) {
      if (item.media.type === 'video') {
        const video = document.createElement('video');
        video.src = item.media.src;
        video.className = 'timeline-video';
        video.muted = true;
        video.loop = true;
        video.playsInline = true;
        video.preload = 'none';

        // Intersection Observer - play when visible, pause when not
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

const addTimelineToPage = () => {
  const timeline = createTimeline();
  const targetElement = document.querySelector('.timeline-content');
  if (targetElement) {
    targetElement.innerHTML = '';
    targetElement.appendChild(timeline);
  }
};

document.addEventListener('DOMContentLoaded', addTimelineToPage);
