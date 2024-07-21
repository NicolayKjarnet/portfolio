gsap.registerPlugin(ScrollTrigger);

gsap.utils.toArray(".image-container").forEach((container) => {
  const imgs = container.querySelectorAll("img");

  // Block parallax effect on mobile for better user experience
  const screenWidth = window.innerWidth;

  if (screenWidth < 768) {
    imgs.forEach((img) => {
      gsap.to(img, {
        yPercent: 0,
        ease: "none",
        scrollTrigger: {
          trigger: container,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      });
    });
    return;
  }

  imgs.forEach((img) => {
    gsap.to(img, {
      yPercent: -40,
      ease: "none",
      scrollTrigger: {
        trigger: container,
        start: "top bottom",
        end: "bottom top",
        scrub: true,
      },
    });
  });
});
