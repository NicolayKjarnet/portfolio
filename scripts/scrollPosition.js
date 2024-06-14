export const saveScrollPosition = () => {
  sessionStorage.setItem("scrollPosition", window.scrollY);
};

export const restoreScrollPosition = () => {
  const scrollPosition = sessionStorage.getItem("scrollPosition");
  if (scrollPosition !== null) {
    window.scrollTo(0, parseInt(scrollPosition, 10));
    sessionStorage.removeItem("scrollPosition");
  }
};
