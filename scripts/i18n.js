import en from './translations/en.js';
import no from './translations/no.js';

const translations = { en, no };
let currentLang = 'en';
const listeners = [];

function lookupKey(obj, key) {
  return key.split('.').reduce((o, k) => o?.[k], obj);
}

export function getLang() {
  const stored = localStorage.getItem('lang');
  if (stored === 'en' || stored === 'no') return stored;
  const nav = (navigator.language || '').toLowerCase();
  return nav.startsWith('nb') || nav.startsWith('nn') || nav.startsWith('no') ? 'no' : 'en';
}

export function t(keyOrValue, params = {}) {
  let result;

  if (keyOrValue && typeof keyOrValue === 'object' && ('en' in keyOrValue || 'no' in keyOrValue)) {
    result = keyOrValue[currentLang] ?? keyOrValue.en ?? '';
  } else if (typeof keyOrValue === 'string') {
    const looked = lookupKey(translations[currentLang], keyOrValue);
    result = looked !== undefined ? looked : keyOrValue;
  } else {
    return String(keyOrValue ?? '');
  }

  for (const [k, v] of Object.entries(params)) {
    result = result.replaceAll(`{${k}}`, v);
  }
  return result;
}

export function getTranslations() {
  return translations[currentLang];
}

function updateDOM() {
  document.documentElement.lang = currentLang;

  document.querySelectorAll('[data-i18n]').forEach((el) => {
    const key = el.dataset.i18n;
    const value = lookupKey(translations[currentLang], key);
    if (value !== undefined) el.textContent = value;
  });

  document.querySelectorAll('[data-i18n-aria]').forEach((el) => {
    const key = el.dataset.i18nAria;
    const value = lookupKey(translations[currentLang], key);
    if (value !== undefined) el.setAttribute('aria-label', value);
  });

  document.querySelectorAll('[data-i18n-alt]').forEach((el) => {
    const key = el.dataset.i18nAlt;
    const value = lookupKey(translations[currentLang], key);
    if (value !== undefined) el.alt = value;
  });

  const toggle = document.querySelector('[data-lang-toggle]');
  if (toggle) {
    toggle.querySelectorAll('.lang-toggle__option').forEach((opt) => {
      opt.classList.toggle('lang-toggle__option--active', opt.dataset.lang === currentLang);
    });
  }
}

export function setLang(lang) {
  if (lang !== 'en' && lang !== 'no') return;
  currentLang = lang;
  localStorage.setItem('lang', lang);
  updateDOM();
  listeners.forEach((fn) => fn(lang));
}

export function onLangChange(callback) {
  listeners.push(callback);
}

export function initI18n() {
  currentLang = getLang();
  updateDOM();

  document.querySelector('[data-lang-toggle]')?.addEventListener('click', (e) => {
    const opt = e.target.closest('[data-lang]');
    if (opt && opt.dataset.lang !== currentLang) {
      setLang(opt.dataset.lang);
    } else if (!opt) {
      setLang(currentLang === 'en' ? 'no' : 'en');
    }
  });
}
