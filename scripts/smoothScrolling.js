export const setupSmoothScrolling = () => {
  document.querySelectorAll('a[href^="#"]').forEach((a) => {
    a.addEventListener("click", function (e) {
      e.preventDefault();
      const href = this.getAttribute("href");
      const element = document.getElementById(href.substring(1));
      const headerOffset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    });
  });
};

export const setupScrollArrow = () => {
  const scrollArrow = document.querySelector(".scroll-arrow");

  const scrollToProjects = () => {
    const projectsSection = document.getElementById("projects");
    const headerOffset = 80;
    const elementPosition = projectsSection.getBoundingClientRect().top;
    const offsetPosition = elementPosition - headerOffset;

    window.scrollTo({
      top: offsetPosition,
      behavior: "smooth",
    });
  };

  scrollArrow.addEventListener("click", scrollToProjects);

  scrollArrow.addEventListener("keydown", (event) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      scrollToProjects();
    }
  });
};
