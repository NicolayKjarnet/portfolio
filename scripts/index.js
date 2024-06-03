const scrollToElement = (elementId) => {
  const element = document.getElementById(elementId);
  const headerOffset = 80;
  const elementPosition = element.getBoundingClientRect().top;
  const offsetPosition = elementPosition - headerOffset;

  window.scrollTo({
    top: offsetPosition,
    behavior: "smooth",
  });
};

document.querySelectorAll('a[href^="#"]').forEach((a) => {
  a.addEventListener("click", function (e) {
    e.preventDefault();
    const href = this.getAttribute("href");
    scrollToElement(href.substring(1));
  });
});

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
