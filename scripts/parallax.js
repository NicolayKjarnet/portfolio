gsap.registerPlugin(ScrollTrigger);

gsap.utils.toArray(".image-container").forEach((container) => {
  const imgs = container.querySelectorAll("img");

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
