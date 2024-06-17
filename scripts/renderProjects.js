const renderProjectItem = (
  link,
  imgSrc,
  title,
  description,
  techniques,
  classes,
  imgClass
) => {
  return `
    <article class="project-section__article ${classes}">
      <a class="project-link" href="${link}">
        <div class="project-section__img-container">
          <img class="project-section__img ${imgClass}" src="${imgSrc}" alt="Image of ${title}.">
        </div>
        <div class="project-section__about">
          <h2 class="project-section__project-title">${title}</h2>
          <hr class="about__divider divider">
          <h3 class="about__title">About</h3>
          <figcaption class="about__caption">${description}
            <div class="noterworthy-techniques-container">
              <span class="noteworthy-techniques">
                <ul>
                  ${techniques
                    .map((technique) => `<li>${technique}</li>`)
                    .join("")}
                </ul>
              </span>
            </div>
          </figcaption>
        </div>
      </a>
    </article>
  `;
};

export const renderProjects = () => {
  return `
    ${renderProjectItem(
      "wolve-2.html",
      "/images/Wolve-min.png",
      "Wolve Redesign",
      "Bachelor's project for Wolve IT. Full redesign of their loyalty platform.",
      [
        "Prototype",
        "Figma",
        "UX",
        "User testing",
        "Universal Design",
        "Design Principles",
        "Law's of UX",
      ],
      "project-section__article--ux"
    )}
    ${renderProjectItem(
      "munchAR.html",
      "/images/MunchAR-min.png",
      "Munch AR",
      "Let Mr. Scream guide you through the streets of Oslo to the Munch Museum. Perhaps you'll learn some trivia along the way?",
      ["Prototype", "UX", "Figma", "Android", "Google Maps API", "Kotlin"],
      "project-section__article--android"
    )}
    ${renderProjectItem(
      "munchQR.html",
      "/images/MunchQR-min.png",
      "Discover Munch's Artworks",
      "Tourist? Scan QR codes to read about Munch's art. Are you an admin at the Munch Museum and needs to do some CRUD operations? We got you covered.",
      ["React Native", "React", ".net", "C#", "CRUD"],
      "project-section__article--fullstack project-section__article--crossplattform project-section__article--ux"
    )}
    ${renderProjectItem(
      "greenhouse-system.html",
      "/images/GreenhouseMonitoring-min.png",
      "Greenhouse System",
      "Monitor your greenhouse(s) on your desktop or mobile and get notified when something is wrong.",
      [
        "IoT",
        "Arduino",
        "C++",
        "MQTT",
        "Mongo DB",
        "Express",
        "React",
        "Node",
        "Tailwind",
      ],
      "project-section__article--fullstack project-section__article--iot"
    )}
    ${renderProjectItem(
      "https://pop-artist-api.nicolaykjaernet.com/",
      "/images/Popartist-min.png",
      "Pop Artist API",
      "So you're running a music company and need to manage information about your artists? Look no further.",
      [
        "React",
        ".net",
        "C#",
        "CRUD",
        "Axios",
        "Context",
        "Routing",
        "Bootstrap",
      ],
      "project-section__article--fullstack"
    )}
    ${renderProjectItem(
      "https://rick-and-morty-api.nicolaykjaernet.com/",
      "/images/Rick and Morty-min.png",
      "Rick and Morty",
      "If you like the Rick and Morty series, you'll love this website.",
      ["API", "Grid", "Media Queries", "BEM", "Fetch", "Module", "IIFE"],
      "project-section__article--frontend"
    )}
    ${renderProjectItem(
      "Dagens-latter.html",
      "/images/DagensLatter-min.png",
      "Laughter Of The Day",
      "iOS app for daily laughs. Fetches jokes from an API. Add your own jokes as well.",
      ["Swift", "API", "Core Data", "Bindings", "Navigation", "Persistence"],
      "project-section__article--ios"
    )}
    ${renderProjectItem(
      "https://nicolaykjaernet.com/",
      "/images/Mouse.png",
      "Ratatouille",
      "iOS app for food lovers.",
      [
        "API",
        "Core Data",
        "Persistence",
        "Bindings",
        "Navigation",
        "Persistence",
      ],
      "project-section__article--ios",
      "project-section__img-ratatouille"
    )}
    ${renderProjectItem(
      "https://nicolaykjaernet.com/",
      "/images/wrd-min.png",
      "Wrd",
      "iOS app for lovers of word puzzles.",
      [
        "API",
        "Core Data",
        "Persistence",
        "Bindings",
        "Navigation",
        "Persistence",
      ],
      "project-section__article--ios"
    )}
    ${renderProjectItem(
      "split.html",
      "/images/Split-min.png",
      "Split",
      "Prototype for a finance app that automatically allocates your freelance income to various accounts for taxes, savings, and expenses based on predefined percentages.",
      ["UX", "Figma", "Universal Design", "Don Norman's principles"],
      "project-section__article--ux"
    )}
    ${renderProjectItem(
      "https://scrollfolio.nicolaykjaernet.com/",
      "/images/Scrollfolio-min.png",
      "Scrollfolio",
      "A portfolio based on Apple's appear-on-scroll-effect.",
      ["HTML", "CSS", "JS", "Grid", "Flexbox", "Animation"],
      "project-section__article--frontend"
    )}
  `;
};
