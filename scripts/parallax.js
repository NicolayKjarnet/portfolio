gsap.registerPlugin(ScrollTrigger);

// Section title fade-in on scroll
gsap.utils.toArray(".title-section").forEach((section) => {
  const bracket1 = section.querySelector(".title-element-1");
  const title = section.querySelector(".title-element-2");
  const bracket2 = section.querySelector(".title-element-3");

  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: section,
      start: "top 60%",
      toggleActions: "play none none none",
    },
  });

  tl.from(title, {
    opacity: 0,
    y: 30,
    duration: 0.6,
    ease: "power2.out",
  });

  if (bracket1) {
    tl.from(bracket1, {
      opacity: 0,
      x: 40,
      duration: 0.4,
      ease: "power2.out",
    }, "-=0.3");
  }

  if (bracket2) {
    tl.from(bracket2, {
      opacity: 0,
      x: -40,
      duration: 0.4,
      ease: "power2.out",
    }, "-=0.3");
  }
});

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
