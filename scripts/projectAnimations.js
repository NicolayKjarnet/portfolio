gsap.registerPlugin(ScrollTrigger);

// ============================================
// PARALLAX ON PROJECT IMAGES
// ============================================
// Images drift upward slightly as you scroll down the page

if (window.innerWidth >= 768) {
  gsap.utils.toArray(".image-container").forEach((container) => {
    const imgs = container.querySelectorAll("img");

    imgs.forEach((img) => {
      gsap.fromTo(
        img,
        { yPercent: 15 },
        {
          yPercent: -15,
          ease: "none",
          scrollTrigger: {
            trigger: container,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        }
      );
    });
  });
}
