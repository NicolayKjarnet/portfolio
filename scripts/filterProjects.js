export const setupProjectFiltering = () => {
  const filterItems = document.querySelectorAll(".filter-item");
  const filterDropdown = document.querySelector(".filter-dropdown");

  const filterProjects = (filterValue) => {
    const projectArticles = document.querySelectorAll(
      ".project-section__article"
    );
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
  };

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
};
