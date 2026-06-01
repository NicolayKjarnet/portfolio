/**
 * Cavai Chapter Video Player
 *
 * Usage:
 *   <div id="my-player"></div>
 *   <script>
 *     ChapterPlayer.create('my-player', {
 *       src: 'video.mp4',
 *       poster: 'poster.jpg',       // optional
 *       chapters: [
 *         { title: 'Intro',           time: 0 },
 *         { title: 'Animation System', time: 32 },
 *         { title: 'Bezier Editor',   time: 85 },
 *       ]
 *     });
 *   </script>
 */

const ChapterPlayer = (() => {

  /* ── Helpers ── */
  const fmt = s => {
    const m = Math.floor(s / 60);
    const sec = Math.floor(s % 60);
    return `${m}:${sec.toString().padStart(2, '0')}`;
  };

  const svg = (name) => {
    const icons = {
      play: '<svg viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>',
      pause: '<svg viewBox="0 0 24 24"><rect x="6" y="4" width="4" height="16"/><rect x="14" y="4" width="4" height="16"/></svg>',
      volume: '<svg viewBox="0 0 24 24"><path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3A4.5 4.5 0 0 0 14 8.5v7a4.47 4.47 0 0 0 2.5-3.5zM14 3.23v2.06a7.007 7.007 0 0 1 0 13.42v2.06A9.013 9.013 0 0 0 14 3.23z"/></svg>',
      mute: '<svg viewBox="0 0 24 24"><path d="M16.5 12A4.5 4.5 0 0 0 14 8.5v2.09l2.46 2.46c.03-.35.04-.68.04-1.05zM19 12c0 .94-.2 1.82-.54 2.64l1.51 1.51A8.796 8.796 0 0 0 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06a8.99 8.99 0 0 0 3.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4L9.91 6.09 12 8.18V4z"/></svg>',
      fullscreen: '<svg viewBox="0 0 24 24"><path d="M7 14H5v5h5v-2H7v-3zm-2-4h2V7h3V5H5v5zm12 7h-3v2h5v-5h-2v3zM14 5v2h3v3h2V5h-5z"/></svg>',
      chevron: '<svg viewBox="0 0 24 24"><path d="M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6z"/></svg>',
      playing: '<svg viewBox="0 0 14 14"><rect x="1" y="4" width="2.5" height="6" rx="1" fill="currentColor" opacity=".6"><animate attributeName="height" values="6;10;6" dur=".8s" repeatCount="indefinite"/><animate attributeName="y" values="4;2;4" dur=".8s" repeatCount="indefinite"/></rect><rect x="5.5" y="2" width="2.5" height="10" rx="1" fill="currentColor" opacity=".8"><animate attributeName="height" values="10;6;10" dur=".8s" repeatCount="indefinite"/><animate attributeName="y" values="2;4;2" dur=".8s" repeatCount="indefinite"/></rect><rect x="10" y="3" width="2.5" height="8" rx="1" fill="currentColor" opacity=".6"><animate attributeName="height" values="8;12;8" dur=".9s" repeatCount="indefinite"/><animate attributeName="y" values="3;1;3" dur=".9s" repeatCount="indefinite"/></rect></svg>',
    };
    return icons[name] || '';
  };

  const el = (tag, cls, html) => {
    const e = document.createElement(tag);
    if (cls) e.className = cls;
    if (html) e.innerHTML = html;
    return e;
  };

  /* ── Create player ── */
  function create(containerId, opts) {
    const container = document.getElementById(containerId);
    if (!container) return console.error(`ChapterPlayer: #${containerId} not found`);

    const { src, poster, chapters = [] } = opts;
    const state = { currentChapter: 0, chaptersOpen: false, seeking: false };

    // Sort chapters by time
    chapters.sort((a, b) => a.time - b.time);

    // ── Build DOM ──
    const root = el('div', 'cv-player');
    root.setAttribute('tabindex', '0');

    // Video wrapper (positions big play relative to video only)
    const videoWrap = el('div', 'cv-video-wrap');
    const video = document.createElement('video');
    video.src = src;
    video.preload = 'metadata';
    video.playsInline = true;
    if (poster) video.poster = poster;
    videoWrap.appendChild(video);

    // Big play button (inside video wrapper)
    const bigPlay = el('div', 'cv-big-play', `
      <div class="cv-big-play-icon">${svg('play')}</div>
    `);
    videoWrap.appendChild(bigPlay);
    root.appendChild(videoWrap);

    // Controls
    const controls = el('div', 'cv-controls');

    // Progress bar
    const progressWrap = el('div', 'cv-progress-wrap');
    const progressTrack = el('div', 'cv-progress-track');
    const tooltip = el('div', 'cv-progress-tooltip');
    progressWrap.appendChild(progressTrack);
    progressWrap.appendChild(tooltip);
    controls.appendChild(progressWrap);

    // Segments (created after metadata loads)
    const segments = [];

    // Button row
    const btnRow = el('div', 'cv-btn-row');

    const playBtn = el('button', 'cv-btn cv-play-btn', svg('play'));
    playBtn.title = 'Play';
    const timeEl = el('span', 'cv-time', '0:00 / 0:00');
    const chapterLabel = el('span', 'cv-chapter-label');
    const volWrap = el('div', 'cv-volume-wrap');
    const volBtn = el('button', 'cv-btn cv-vol-btn', svg('volume'));
    volBtn.title = 'Mute';
    const volSlider = document.createElement('input');
    volSlider.type = 'range';
    volSlider.className = 'cv-volume-slider';
    volSlider.min = '0'; volSlider.max = '1'; volSlider.step = '0.05'; volSlider.value = '1';
    volWrap.appendChild(volBtn);
    volWrap.appendChild(volSlider);
    const fsBtn = el('button', 'cv-btn cv-fs-btn', svg('fullscreen'));
    fsBtn.title = 'Fullscreen';

    btnRow.appendChild(playBtn);
    btnRow.appendChild(timeEl);
    btnRow.appendChild(chapterLabel);
    btnRow.appendChild(el('span', 'cv-spacer'));
    btnRow.appendChild(volWrap);
    btnRow.appendChild(fsBtn);
    controls.appendChild(btnRow);
    root.appendChild(controls);

    // Chapter list
    const chaptersEl = el('div', 'cv-chapters');
    const chaptersToggle = el('div', 'cv-chapters-toggle', `
      <span>Chapters (${chapters.length})</span>
      ${svg('chevron')}
    `);
    const chapterList = el('div', 'cv-chapter-list');

    chapters.forEach((ch, i) => {
      const item = el('div', 'cv-chapter-item');
      item.dataset.index = i;
      item.innerHTML = `
        <span class="cv-chapter-num">${i + 1}</span>
        <div class="cv-chapter-info">
          <div class="cv-chapter-name">${ch.title}</div>
        </div>
        <span class="cv-chapter-timestamp">${fmt(ch.time)}</span>
        <div class="cv-chapter-playing-icon">${svg('playing')}</div>
      `;
      item.addEventListener('click', () => {
        if (video.readyState >= 1) {
          video.currentTime = ch.time;
        }
        video.play();
      });
      chapterList.appendChild(item);
    });

    chaptersEl.appendChild(chaptersToggle);
    chaptersEl.appendChild(chapterList);
    if (chapters.length > 0) root.appendChild(chaptersEl);

    container.appendChild(root);

    /* ── Build segments after duration is known ── */
    function buildSegments() {
      progressTrack.innerHTML = '';
      segments.length = 0;
      const duration = video.duration || 1;

      chapters.forEach((ch, i) => {
        const next = chapters[i + 1] ? chapters[i + 1].time : duration;
        const pct = ((next - ch.time) / duration) * 100;
        const seg = el('div', 'cv-progress-segment');
        seg.style.flex = `0 0 ${pct}%`;
        seg.dataset.index = i;
        const fill = el('div', 'cv-progress-segment-fill');
        seg.appendChild(fill);
        progressTrack.appendChild(seg);
        segments.push({ el: seg, fill, start: ch.time, end: next, title: ch.title });
      });

      // If no chapters, one segment for full duration
      if (chapters.length === 0) {
        const seg = el('div', 'cv-progress-segment');
        seg.style.flex = '0 0 100%';
        const fill = el('div', 'cv-progress-segment-fill');
        seg.appendChild(fill);
        progressTrack.appendChild(seg);
        segments.push({ el: seg, fill, start: 0, end: duration, title: '' });
      }
    }

    /* ── Get chapter index for a time ── */
    function chapterAt(t) {
      for (let i = chapters.length - 1; i >= 0; i--) {
        if (t >= chapters[i].time) return i;
      }
      return 0;
    }

    /* ── Update UI ── */
    function update() {
      const t = video.currentTime;
      const d = video.duration || 1;

      // Time display
      timeEl.textContent = `${fmt(t)} / ${fmt(d)}`;

      // Segments
      segments.forEach((seg, i) => {
        const segDur = seg.end - seg.start;
        if (t >= seg.end) {
          seg.el.classList.add('past');
          seg.el.classList.remove('active');
          seg.fill.style.transform = 'scaleX(1)';
        } else if (t >= seg.start) {
          seg.el.classList.add('active');
          seg.el.classList.remove('past');
          const progress = (t - seg.start) / segDur;
          seg.fill.style.transform = `scaleX(${progress})`;
        } else {
          seg.el.classList.remove('active', 'past');
          seg.fill.style.transform = 'scaleX(0)';
        }
      });

      // Chapter label + list highlight
      const ci = chapterAt(t);
      if (ci !== state.currentChapter || !chapterLabel.classList.contains('visible')) {
        state.currentChapter = ci;
        if (chapters[ci]) {
          chapterLabel.textContent = chapters[ci].title;
          chapterLabel.classList.add('visible');
        }
        // Update list
        chapterList.querySelectorAll('.cv-chapter-item').forEach((item, i) => {
          item.classList.toggle('active', i === ci);
        });
      }
    }

    /* ── Events ── */
    video.addEventListener('loadedmetadata', () => {
      buildSegments();
      update();
    });

    video.addEventListener('timeupdate', update);

    // Play/pause
    const togglePlay = () => {
      if (video.paused) { video.play(); } else { video.pause(); }
    };

    video.addEventListener('click', togglePlay);
    bigPlay.addEventListener('click', togglePlay);
    playBtn.addEventListener('click', togglePlay);

    video.addEventListener('play', () => {
      playBtn.innerHTML = svg('pause');
      playBtn.title = 'Pause';
      bigPlay.classList.add('hidden');
    });
    video.addEventListener('pause', () => {
      playBtn.innerHTML = svg('play');
      playBtn.title = 'Play';
      bigPlay.classList.remove('hidden');
    });

    // Progress bar seeking
    const getSeekPct = (e) => {
      const rect = progressWrap.getBoundingClientRect();
      return Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
    };

    const seekTo = (pct) => {
      const d = video.duration;
      if (!d || !isFinite(d)) return;
      video.currentTime = pct * d;
    };

    const updateTooltip = (e) => {
      if (chapters.length === 0) return;
      const pct = getSeekPct(e);
      const d = video.duration;
      if (!d || !isFinite(d)) return;
      const t = pct * d;
      const ci = chapterAt(t);
      tooltip.textContent = `${chapters[ci].title} — ${fmt(t)}`;
      tooltip.style.left = `${pct * 100}%`;
      tooltip.classList.add('visible');
    };

    progressWrap.addEventListener('click', (e) => {
      seekTo(getSeekPct(e));
    });
    progressWrap.addEventListener('mousedown', (e) => {
      state.seeking = true;
      seekTo(getSeekPct(e));
    });
    progressWrap.addEventListener('mousemove', (e) => {
      if (state.seeking) seekTo(getSeekPct(e));
      updateTooltip(e);
    });
    document.addEventListener('mousemove', (e) => {
      if (state.seeking) seekTo(getSeekPct(e));
    });
    document.addEventListener('mouseup', () => { state.seeking = false; });
    progressWrap.addEventListener('mouseleave', () => {
      if (!state.seeking) tooltip.classList.remove('visible');
    });

    // Volume
    volSlider.addEventListener('input', () => {
      video.volume = volSlider.value;
      video.muted = false;
      volBtn.innerHTML = video.volume === 0 ? svg('mute') : svg('volume');
    });
    volBtn.addEventListener('click', () => {
      video.muted = !video.muted;
      volBtn.innerHTML = video.muted ? svg('mute') : svg('volume');
      if (video.muted) volSlider.value = '0';
      else volSlider.value = String(video.volume);
    });

    // Fullscreen
    fsBtn.addEventListener('click', () => {
      if (document.fullscreenElement) {
        document.exitFullscreen();
      } else {
        root.requestFullscreen?.() || root.webkitRequestFullscreen?.();
      }
    });

    // Chapters toggle
    chaptersToggle.addEventListener('click', () => {
      chaptersEl.classList.toggle('open');
      state.chaptersOpen = chaptersEl.classList.contains('open');
    });

    // Keyboard
    root.addEventListener('keydown', (e) => {
      switch (e.key) {
        case ' ':
        case 'k':
          e.preventDefault();
          togglePlay();
          break;
        case 'ArrowLeft':
          e.preventDefault();
          video.currentTime = Math.max(0, video.currentTime - 5);
          break;
        case 'ArrowRight':
          e.preventDefault();
          video.currentTime = Math.min(video.duration, video.currentTime + 5);
          break;
        case 'ArrowUp':
          e.preventDefault();
          video.volume = Math.min(1, video.volume + 0.1);
          volSlider.value = String(video.volume);
          break;
        case 'ArrowDown':
          e.preventDefault();
          video.volume = Math.max(0, video.volume - 0.1);
          volSlider.value = String(video.volume);
          break;
        case 'f':
          e.preventDefault();
          fsBtn.click();
          break;
        case 'm':
          e.preventDefault();
          volBtn.click();
          break;
      }
    });

    // Double-click fullscreen
    video.addEventListener('dblclick', (e) => {
      e.preventDefault();
      fsBtn.click();
    });

    return { video, root };
  }

  return { create };
})();
