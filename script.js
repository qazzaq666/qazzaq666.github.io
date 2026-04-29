const MUSIC_VIDEO_ID = "kuNixp-wvWM";
const MUSIC_VOLUME = 13;
const IS_FILE_PROTOCOL = window.location.protocol === "file:";

const gateEl = document.getElementById("entryGate");
const enterButtonEl = document.getElementById("enterSiteButton");
const entryTextEl = document.getElementById("entryText");

let player;
let isPlayerReady = false;
let shouldStartMusic = false;

if (gateEl && enterButtonEl) {
  document.body.classList.add("pre-entry");
  document.body.classList.add("locked");
  if (IS_FILE_PROTOCOL && entryTextEl) {
    entryTextEl.textContent =
      "Открой сайт через GitHub Pages или localhost, не через file:///";
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
        player.unMute();
        player.setVolume(MUSIC_VOLUME);
        if (enterButtonEl) {
          enterButtonEl.disabled = false;
        }
        if (entryTextEl) {
          entryTextEl.textContent = "Нажми, чтобы войти на сайт";
        }
        if (shouldStartMusic) {
          player.seekTo(0, true);
          player.playVideo();
        }
      },
      onError: (event) => {
        if (entryTextEl) {
          if (event && event.data === 153) {
            entryTextEl.textContent =
              "Ошибка 153: открой сайт через https/localhost и попробуй снова.";
            return;
          }
          entryTextEl.textContent =
            "Видео не встраивается. Используй другое видео ID.";
        }
      },
    },
  });
};

const openSite = () => {
  if (!gateEl) {
    return;
  }

  if (IS_FILE_PROTOCOL && entryTextEl) {
    entryTextEl.textContent =
      "Ошибка 153 на file:///. Запусти через localhost или GitHub Pages.";
    return;
  }

  if (player && isPlayerReady && typeof player.playVideo === "function") {
    shouldStartMusic = true;
    player.unMute();
    player.setVolume(MUSIC_VOLUME);
    player.seekTo(0, true);
    player.playVideo();
    gateEl.classList.add("hidden");
    document.body.classList.remove("pre-entry");
    document.body.classList.remove("locked");
    window.scrollTo({ top: 0, behavior: "instant" });
  } else if (entryTextEl) {
    entryTextEl.textContent = "Плеер еще грузится, попробуй еще раз через секунду";
  }
};

if (enterButtonEl) {
  enterButtonEl.addEventListener("click", openSite);
}
