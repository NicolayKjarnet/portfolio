document.querySelectorAll(".img-container").forEach((container) => {
  container.querySelectorAll("img").forEach((img) => {
    img.style.transition = "transform .3s ease-in-out";

    img.addEventListener("mousemove", (e) => {
      const rect = img.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      img.style.transformOrigin = `${x}px ${y}px`;
      img.style.transform = "scale(1.1)";
    });

    img.addEventListener("mouseleave", () => {
      img.style.transform = "scale(1)";
    });
  });
});
