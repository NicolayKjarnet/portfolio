/**
 * @typedef {Object} ProjectItem
 * @property {string} link
 * @property {string} imgSrc
 * @property {string} title
 * @property {string} description
 * @property {string[]} techniques
 * @property {string} classes
 * @property {string} imgClass
 * @property {string} [gitLink]
 * @property {string} [projectBtnText]
 * @property {string} [gitBtnText]
 */

/**
 * Renders a single project item.
 * @returns {string} HTML string for the project item
 */
const renderProjectItem = ({
  link,
  imgSrc,
  title,
  description,
  techniques,
  classes,
  imgClass,
  gitLink = "",
  projectBtnText = "See more",
  gitBtnText = "GitHub",
}) => {
  return `
    <article class="project-section__article ${classes}">
      <div class="project-section__img-container">
        <img class="project-section__img ${imgClass}" src="${imgSrc}" alt="Image of ${title}.">
      </div>
      <div class="project-section__about">
        <h2 class="project-section__project-title">${title}</h2>
        <hr class="about__divider divider">
        <h3 class="about__title">About</h3>
        <figcaption class="about__caption">${description}
          <div class="noteworthy-techniques-container">
            <span class="noteworthy-techniques">
              <ul>
                ${techniques
                  .map((technique) => `<li>${technique}</li>`)
                  .join("")}
              </ul>
            </span>
          </div>
        </figcaption>
        <div class="project-links">
          <a class="project-link" href="${link}">
            <button class="project-btn">${projectBtnText}</button>
          </a>
          ${
            gitLink
              ? `<a class="project-git-link" href="${gitLink}" target="_blank"><button class="project-btn project-btn-github">${gitBtnText}</button></a>`
              : ""
          }
        </div>
      </div>
    </article>
  `;
};

/**
 * Renders all projects.
 * @returns {string} HTML string for all projects
 */
export const renderProjects = () => {
  return `
    ${renderProjectItem({
      link: "artist-api.html",
      imgSrc: "/images/Popartist-2-min.png",
      title: "Artist API",
      description:
        "Running a music company and need to manage information about your artists? Look no further.",
      techniques: [
        "React",
        ".net",
        "C#",
        "CRUD",
        "Axios",
        "Context",
        "Routing",
        "Bootstrap",
      ],
      classes: "project-section__article--fullstack",
      imgClass: "project-img",
      gitLink: "https://github.com/NicolayKjarnet/pop-artists",
      projectBtnText: "View Project",
      gitBtnText: "See on GitHub",
    })}
    ${renderProjectItem({
      link: "wolve.html",
      imgSrc: "/images/Wolve-min.png",
      title: "Wolve Redesign",
      description:
        "Bachelor's project for Wolve IT. Full redesign of their loyalty platform.",
      techniques: [
        "Prototype",
        "Figma",
        "UX",
        "User testing",
        "Universal Design",
        "Design Principles",
      ],
      classes: "project-section__article--ux",
      imgClass: "project-img",
      projectBtnText: "View Project",
      gitBtnText: "See in Figma",
      gitLink:
        "https://www.figma.com/design/HBssxeoUkcRd2txOOGbfy4/Wolve-IT-Prototype?node-id=0-1&t=lqFe0VzCIJxuaZ80-1",
    })}
    ${renderProjectItem({
      link: "greenhouse-system.html",
      imgSrc: "/images/GreenhouseMonitoring-min.png",
      title: "Greenhouse System",
      description:
        "Monitor your greenhouse(s) on your desktop or mobile and get notified when something is wrong.",
      techniques: [
        "IoT",
        "Arduino",
        "C++",
        "Mongo DB",
        "Express",
        "React",
        "Node",
        "Tailwind",
      ],
      classes:
        "project-section__article--fullstack project-section__article--iot",
      imgClass: "project-img",
      gitLink: "https://github.com/NicolayKjarnet/greenhouse-system",
      projectBtnText: "View Project",
      gitBtnText: "See on GitHub",
    })}
    ${renderProjectItem({
      link: "munchAR.html",
      imgSrc: "/images/MunchAR-min.png",
      title: "Munch AR",
      description:
        "Let Mr. Scream guide you through the streets of Oslo to the Munch Museum. Perhaps you'll learn some trivia along the way?",
      techniques: [
        "Prototype",
        "UX",
        "Figma",
        "Android",
        "Google Maps API",
        "Kotlin",
      ],
      classes: "project-section__article--android",
      imgClass: "project-img",
      projectBtnText: "View Project",
    })}
    ${renderProjectItem({
      link: "munchQR.html",
      imgSrc: "/images/MunchQR-min.png",
      title: "Discover Munch",
      description:
        "Tourist? Scan QR codes to read about Munch's art. Are you an admin at the Munch Museum and needs to do some CRUD operations? We got you covered.",
      techniques: ["React Native", "React", ".net", "C#", "CRUD"],
      classes:
        "project-section__article--fullstack project-section__article--crossplattform project-section__article--ux",
      imgClass: "project-img",
      projectBtnText: "View Project",
    })}
    ${renderProjectItem({
      link: "https://rick-and-morty-api.nicolaykjaernet.com/",
      imgSrc: "/images/Rick and Morty-min.png",
      title: "Rick and Morty",
      description:
        "If you like the Rick and Morty series, you'll love this website.",
      techniques: [
        "API",
        "Grid",
        "Media Queries",
        "BEM",
        "Fetch",
        "Module",
        "IIFE",
      ],
      classes: "project-section__article--frontend",
      imgClass: "project-img",
      projectBtnText: "View Website",
    })}
    ${renderProjectItem({
      link: "Dagens-latter.html",
      imgSrc: "/images/DagensLatter-min.png",
      title: "Laughter Of The Day",
      description:
        "iOS app for daily laughs. Fetches jokes from an API. Add your own jokes as well.",
      techniques: [
        "Swift",
        "API",
        "Core Data",
        "Bindings",
        "Navigation",
        "Persistence",
      ],
      classes: "project-section__article--ios",
      imgClass: "project-img",
      gitLink: "https://github.com/NicolayKjarnet/DagensLatter",
      projectBtnText: "View Project",
      gitBtnText: "See on GitHub",
    })}
    ${renderProjectItem({
      link: "split.html",
      imgSrc: "/images/Split-min.png",
      title: "Split",
      description:
        "Prototype for a finance app that automatically allocates your freelance income to various accounts for taxes, savings, and expenses based on predefined percentages.",
      techniques: [
        "UX",
        "Figma",
        "Universal Design",
        "Don Norman's principles",
      ],
      classes: "project-section__article--ux",
      imgClass: "project-img",
      projectBtnText: "View Project",
      gitBtnText: "See in Figma",
      gitLink:
        "https://www.figma.com/design/aIVI2dZQAmWy2WuLlnObSA/Split-Prototype?node-id=198-27456&t=P0AXLc4lQswTkrrs-1",
    })}
    ${renderProjectItem({
      link: "https://scrollfolio.nicolaykjaernet.com/",
      imgSrc: "/images/Scrollfolio-min-2.png",
      title: "Scrollfolio",
      description: "A portfolio based on Apple's appear-on-scroll-effect.",
      techniques: ["HTML", "CSS", "JS", "Grid", "Flexbox", "Animation"],
      classes: "project-section__article--frontend",
      imgClass: "project-img",
      projectBtnText: "View Website",
    })}
  `;
};
