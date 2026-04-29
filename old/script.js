const MUSIC_VOLUME = 5;

const gateEl = document.getElementById("entryGate");
const enterButtonEl = document.getElementById("enterSiteButton");
const entryTextEl = document.getElementById("entryText");
const bgMusicEl = document.getElementById("bgMusic");

if (gateEl && enterButtonEl && bgMusicEl) {
  bgMusicEl.volume = MUSIC_VOLUME / 100;
  document.body.classList.add("pre-entry");
  document.body.classList.add("locked");
  if (entryTextEl) {
    entryTextEl.textContent = "Click to enter the site";
  }
  enterButtonEl.disabled = false;
}

const openSite = () => {
  if (!gateEl || !bgMusicEl) {
    return;
  }

  bgMusicEl.volume = MUSIC_VOLUME / 100;
  bgMusicEl.currentTime = 0;

  bgMusicEl
    .play()
    .catch(() => {
      if (entryTextEl) {
        entryTextEl.textContent = "Failed to start music";
      }
    })
    .finally(() => {
      gateEl.classList.add("hidden");
      document.body.classList.remove("pre-entry");
      document.body.classList.remove("locked");
      window.scrollTo({ top: 0, behavior: "instant" });
    });
};

if (enterButtonEl) {
  enterButtonEl.addEventListener("click", openSite);
}
