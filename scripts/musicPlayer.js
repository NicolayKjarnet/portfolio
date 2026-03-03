/** Simple audio manager — only one track plays at a time. */
let currentAudio = null;
let currentButton = null;

export function setupMusicPlayer() {
  document.querySelector('.project-section')?.addEventListener('click', (e) => {
    const playBtn = e.target.closest('.music-card__play');
    if (!playBtn) return;

    e.preventDefault();
    e.stopPropagation();

    const card = playBtn.closest('.music-card');
    const previewUrl = card?.dataset.previewUrl;
    if (!previewUrl) return;

    // If clicking the same button, toggle
    if (currentButton === playBtn && currentAudio) {
      if (currentAudio.paused) {
        currentAudio.play();
        playBtn.classList.add('playing');
      } else {
        currentAudio.pause();
        playBtn.classList.remove('playing');
      }
      return;
    }

    // Stop any currently playing
    if (currentAudio) {
      currentAudio.pause();
      currentButton?.classList.remove('playing');
    }

    currentAudio = new Audio(previewUrl);
    currentButton = playBtn;
    playBtn.classList.add('playing');
    currentAudio.play();

    currentAudio.addEventListener('ended', () => {
      playBtn.classList.remove('playing');
      currentAudio = null;
      currentButton = null;
    });
  });
}
