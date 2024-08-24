// Timeline data
const timelineData = [
  {
    year: "May 2024 - Present",
    title: "Developer, designer, and content producer",
    company: "Kjærnet-Wesseltoft AS",
    details: [
      "Developing an interactive platform for designing high-end, sustainable kitchens.",
      "Designing lamps, monitor stands, and other commercial products.",
      "Producing promotional videos, product photos, and other content for marketing purposes.",
    ],
    image: "./images/kitchen-planner.gif",
  },
  {
    year: "Aug 2017 - Present",
    title: "Freelance Content Producer",
    company: "Universal Music, EMI Music, Island Records, Integrasjonssystemer AS, and more",
    details: [
      "Film and edit music videos, promotional videos, graphical design and other content for various clients.",
      "Work closely with clients to understand their vision and deliver high-quality content that meets their needs.",
      "Manage projects from start to finish, including pre-production, production, and post-production.",
    ],
    image: "./images/video-content.gif",
  },
  {
    year: "Aug 2020 - June 2024",
    title: "Bachelor in Frontend and Mobile Development",
    company: "Kristiania University College",
    details: [
      "Studied a wide range of subjects including web development, mobile app development, UX/UI design, and agile methodologies.",
      "Developed several projects using technologies such as HTML, CSS, JavaScript, React, React Native, and more.",
      "Participated in group projects to enhance collaboration, communication, and problem-solving skills.",
    ],
  },
  {
    year: "Aug 2015 - June 2018",
    title: "Bachelor in Screenwriting",
    company: "Westerdals Oslo ACT",
    details: [
      "Studied screenwriting, storytelling, and film production to develop a strong foundation in the film industry.",
      "Worked on various projects including short films, TV series, and feature films.",
      "Collaborated with other students to create compelling stories and scripts.",
    ],
  },
];

// Function to create timeline HTML
function createTimeline() {
  const timelineContainer = document.createElement("div");
  timelineContainer.className = "timeline-container";

  const title = document.createElement("h2");
  title.className = "timeline-title";
  title.textContent = "Experience";
  timelineContainer.appendChild(title);

  const timelineLine = document.createElement("div");
  timelineLine.className = "timeline-line";
  timelineContainer.appendChild(timelineLine);

  timelineData.forEach((item, index) => {
    const timelineItem = document.createElement("div");
    timelineItem.className = `timeline-item ${index % 2 === 0 ? "left" : "right"}`;

    const content = document.createElement("div");
    content.className = "timeline-content";

    const year = document.createElement("span");
    year.className = "timeline-year";
    year.textContent = item.year;

    const itemTitle = document.createElement("h3");
    itemTitle.className = "timeline-item-title";
    itemTitle.textContent = item.title;

    const company = document.createElement("h4");
    company.className = "timeline-company";
    company.textContent = item.company;

    const detailsList = document.createElement("ul");
    detailsList.className = "timeline-details";

    const image = document.createElement("img");
    image.src = item.image;
    image.className = "timeline-image";

    item.details.forEach((detail) => {
      const listItem = document.createElement("li");
      listItem.textContent = detail;
      detailsList.appendChild(listItem);
    });

    content.appendChild(year);
    content.appendChild(itemTitle);
    content.appendChild(company);
    content.appendChild(detailsList);
    if (item.image) {
      content.appendChild(image);
    }

    const circle = document.createElement("div");
    circle.className = `timeline-circle timeline-circle-${index}`;

    timelineItem.appendChild(content);
    timelineItem.appendChild(circle);
    timelineContainer.appendChild(timelineItem);
  });

  return timelineContainer;
}

// Function to add the timeline to the page
function addTimelineToPage() {
  const timeline = createTimeline();
  const targetElement = document.querySelector(".timeline-content"); // Adjust this selector as needed
  if (targetElement) {
    targetElement.innerHTML = ""; // Clear existing content
    targetElement.appendChild(timeline);
  }
}

// Call the function when the DOM is fully loaded
document.addEventListener("DOMContentLoaded", addTimelineToPage);
