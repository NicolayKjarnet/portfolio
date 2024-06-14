export const setupGSAPAnimations = () => {
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
};
