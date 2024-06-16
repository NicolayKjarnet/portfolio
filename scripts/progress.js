window.addEventListener("scroll", () => {
  const progressBar = document.getElementById("progressBar");
  const scrollTop = document.documentElement.scrollTop;
  const scrollHeight = document.documentElement.scrollHeight;
  const clientHeight = document.documentElement.clientHeight;
  const scrollPercentage = (scrollTop / (scrollHeight - clientHeight)) * 100;
  progressBar.style.width = scrollPercentage + "%";
});

// GSAP animations
gsap.registerPlugin(ScrollTrigger);

gsap.utils.toArray(".timeline-item").forEach((item, index) => {
  gsap.from(item.querySelector(".circle"), {
    scrollTrigger: {
      trigger: item,
      start: "top 80%",
      end: "bottom 60%",
      toggleActions: "play none none reverse",
      markers: false,
    },
    scale: 0,
    duration: 0.4,
    ease: "bounce.out",
  });
});
