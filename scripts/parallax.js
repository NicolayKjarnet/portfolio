gsap.registerPlugin(ScrollTrigger);

// ============================================
// HEADER ENTRANCE ANIMATION
// ============================================
(function headerEntrance() {
  const tl = gsap.timeline({ delay: 0.3 });

  // GIF cutout — scale + rotate in
  tl.from(".header__cutout-wrap", {
    scale: 0,
    opacity: 0,
    rotation: -180,
    duration: 0.8,
    ease: "back.out(1.7)",
  });

  // Language toggle — fade in at absolute time 0
  tl.from(".lang-toggle", {
    opacity: 0,
    y: -20,
    duration: 0.4,
    ease: "power2.out",
  }, 0);

  // Title — split into lines (word-spacing: 100vw makes each word a line)
  const title = document.querySelector(".header__title");
  if (title) {
    // Wrap each word in a span for staggered animation
    const words = title.textContent.trim().split(/\s+/);
    title.innerHTML = words
      .map((w) => `<span style="display:block;overflow:hidden"><span class="header__title-word" style="display:block">${w}</span></span>`)
      .join("");

    tl.from(".header__title-word", {
      yPercent: 110,
      duration: 0.9,
      ease: "power3.out",
      stagger: 0.12,
    });
  }

  // Subtitle — fade up with letter-spacing narrowing
  tl.from(".header__paragraph", {
    opacity: 0,
    y: 20,
    letterSpacing: "0.5em",
    duration: 0.6,
    ease: "power2.out",
  }, "-=0.3");

  // Nav items — stagger in
  tl.from(".list-item", {
    opacity: 0,
    y: 15,
    duration: 0.4,
    ease: "power2.out",
    stagger: 0.08,
  }, "-=0.2");

  // Nav dividers
  tl.from(".nav-section__divider", {
    opacity: 0,
    scale: 0,
    duration: 0.3,
    ease: "back.out(2)",
    stagger: 0.05,
  }, "-=0.3");

  // Scroll arrow — delayed bounce in
  tl.from("#scroll-arrow", {
    opacity: 0,
    y: -30,
    duration: 0.5,
    ease: "bounce.out",
    clearProps: "opacity,y",
  }, "-=0.1");
})();

// ============================================
// SECTION TITLE ANIMATIONS
// ============================================

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

// ============================================
// TIMELINE SCROLL ANIMATIONS
// ============================================
// Timeline elements are created dynamically on DOMContentLoaded by timelineData.js,
// so we wait for them to exist before setting up animations.
document.addEventListener("DOMContentLoaded", () => {
  requestAnimationFrame(() => {
    gsap.utils.toArray(".timeline-item").forEach((item) => {
      const circle = item.querySelector(".timeline-circle");
      const content = item.querySelector(".timeline-content");

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: item,
          start: "top 92%",
          toggleActions: "play none none none",
        },
      });

      // Content fades in and slides up
      if (content) {
        tl.from(content, {
          opacity: 0,
          y: 30,
          duration: 0.5,
          ease: "power2.out",
          clearProps: "opacity",
        });
      }

      // Circle scales in
      if (circle) {
        tl.from(circle, {
          scale: 0,
          duration: 0.4,
          ease: "back.out(2)",
        }, "-=0.5");
      }
    });
  });
});

// ============================================
// PARALLAX
// ============================================

// Parallax on images inside project detail pages
if (window.innerWidth >= 768) {
  gsap.utils.toArray(".image-container").forEach((container) => {
    const imgs = container.querySelectorAll("img");

    imgs.forEach((img) => {
      gsap.fromTo(img, {
        yPercent: 5,
      }, {
        yPercent: -5,
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
}

// ============================================
// SCROLL ENTRANCE ANIMATIONS
// ============================================

// Contact items — stagger slide-in from left
gsap.from(".contact-item", {
  scrollTrigger: { trigger: ".contact-content", start: "top 90%", toggleActions: "play none none none" },
  opacity: 0, x: -30, duration: 0.5, stagger: 0.12, ease: "power2.out"
});

// Social links — stagger scale-in
gsap.from(".social-link", {
  scrollTrigger: { trigger: ".social-links-grid", start: "top 90%", toggleActions: "play none none none" },
  opacity: 0, scale: 0.8, duration: 0.4, stagger: 0.08, ease: "back.out(1.5)"
});

// Trait items — stagger from bottom
gsap.from(".trait-item", {
  scrollTrigger: { trigger: ".traits-grid", start: "top 90%", toggleActions: "play none none none" },
  opacity: 0, y: 30, duration: 0.5, stagger: 0.1, ease: "power2.out"
});

// Skill tags — stagger pop-in
gsap.from(".skill-tags span", {
  scrollTrigger: { trigger: ".skill-tags", start: "top 90%", toggleActions: "play none none none" },
  opacity: 0, scale: 0.5, duration: 0.3, stagger: 0.05, ease: "back.out(2)"
});
