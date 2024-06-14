document.addEventListener("DOMContentLoaded", function () {
  // Function to save the current scroll position
  function saveScrollPosition() {
    sessionStorage.setItem("scrollPosition", window.scrollY);
  }

  // Function to restore the scroll position
  function restoreScrollPosition() {
    const scrollPosition = sessionStorage.getItem("scrollPosition");
    if (scrollPosition !== null) {
      window.scrollTo(0, parseInt(scrollPosition, 10));
      sessionStorage.removeItem("scrollPosition");
    }
  }

  // Attach saveScrollPosition function to all project links
  document.querySelectorAll(".project-link").forEach(function (link) {
    link.addEventListener("click", saveScrollPosition);
  });

  // Restore scroll position on page load
  restoreScrollPosition();

  // Smooth scrolling for internal links
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

  // Scroll arrow click event to scroll to projects section
  document
    .querySelector(".scroll-arrow")
    .addEventListener("click", function () {
      const projectsSection = document.getElementById("projects");
      const headerOffset = 80;
      const elementPosition = projectsSection.getBoundingClientRect().top;
      const offsetPosition = elementPosition - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    });

  // Intersection Observer for animations
  const titleElement2 = document.querySelectorAll(".title-element-2");
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("animate");
      }
    });
  });

  titleElement2.forEach((item) => {
    observer.observe(item);
  });

  // Filtering logic
  const filterItems = document.querySelectorAll(".filter-item");
  const projectArticles = document.querySelectorAll(
    ".project-section__article"
  );
  const filterDropdown = document.querySelector(".filter-dropdown");

  filterItems.forEach((item) => {
    item.addEventListener("click", function () {
      const filterValue = this.getAttribute("data-filter");

      filterItems.forEach((el) => el.classList.remove("active"));
      this.classList.add("active");

      filterProjects(filterValue);
    });
  });

  filterDropdown.addEventListener("change", function () {
    const filterValue = this.value;
    filterProjects(filterValue);
  });

  function filterProjects(filterValue) {
    projectArticles.forEach((article) => {
      if (filterValue === "all") {
        article.classList.remove("hidden");
      } else if (
        article.classList.contains(`project-section__article--${filterValue}`)
      ) {
        article.classList.remove("hidden");
      } else {
        article.classList.add("hidden");
      }
    });
  }
});

// Register GSAP ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

// Fade out animation for .scroll-arrow using ScrollTrigger
gsap.to(".scroll-arrow", {
  opacity: 0,
  scrollTrigger: {
    trigger: ".projects__title-section",
    start: "top bottom",
    end: "top top",
    scrub: true,
  },
});
