const MUSIC_VIDEO_ID = "kuNixp-wvWM";
const MUSIC_VOLUME = 13;
const IS_FILE_PROTOCOL = window.location.protocol === "file:";

const gateEl = document.getElementById("entryGate");
const enterButtonEl = document.getElementById("enterSiteButton");
const entryTextEl = document.getElementById("entryText");

let player;
let isPlayerReady = false;

if (gateEl && enterButtonEl) {
  document.body.classList.add("pre-entry");
  document.body.classList.add("locked");
  if (IS_FILE_PROTOCOL && entryTextEl) {
    entryTextEl.textContent = "Open via localhost or GitHub Pages";
  }
}

window.onYouTubeIframeAPIReady = () => {
  player = new YT.Player("youtubeMusicPlayer", {
    host: "https://www.youtube.com",
    videoId: MUSIC_VIDEO_ID,
    playerVars: {
      autoplay: 0,
      controls: 0,
      rel: 0,
      playsinline: 1,
      modestbranding: 1,
      origin: window.location.origin,
    },
    events: {
      onReady: () => {
        isPlayerReady = true;
        if (enterButtonEl) {
          enterButtonEl.disabled = false;
        }
        if (entryTextEl) {
          entryTextEl.textContent = "Click to enter the site";
        }
      },
      onError: () => {
        if (entryTextEl) {
          entryTextEl.textContent = "Video cannot be embedded (pick another ID)";
        }
      },
    },
  });
};

const openSite = () => {
  if (!gateEl || !player || !isPlayerReady) {
    return;
  }
  player.unMute();
  player.setVolume(MUSIC_VOLUME);
  player.seekTo(0, true);
  player.playVideo();

  gateEl.classList.add("hidden");
  document.body.classList.remove("pre-entry");
  document.body.classList.remove("locked");
  window.scrollTo({ top: 0, behavior: "instant" });
};

if (enterButtonEl) {
  enterButtonEl.addEventListener("click", openSite);
}
