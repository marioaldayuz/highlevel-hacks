// Remove title if not populated
(() => {
  const hideIfEmpty = () => {
    const editors = document.querySelectorAll('.editor-content.rich-text-viewer');
    const about = document.getElementById('about-lesson-title');

    editors.forEach(el => {
      const textEmpty = el.textContent.replace(/\u00A0/g, '').trim() === '';
      const onlyP = el.children.length === 1 && el.firstElementChild.tagName === 'P';
      const pEmpty = onlyP && el.firstElementChild.innerHTML.replace(/&nbsp;|<br\s*\/?>/gi, '').trim() === '';

      if (textEmpty && (!el.firstElementChild || pEmpty)) {
        el.style.setProperty('display', 'none', 'important');
        if (about) about.style.setProperty('display', 'none', 'important');
      }
    });
  };

  // Run now or on DOM ready (covers cases where DOMContentLoaded already fired)
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', hideIfEmpty);
  } else {
    hideIfEmpty();
  }

  // Also handle SPA/dynamic updates (e.g., Vue renders later)
  new MutationObserver(hideIfEmpty).observe(document.documentElement, {
    childList: true,
    subtree: true
  });
})();
