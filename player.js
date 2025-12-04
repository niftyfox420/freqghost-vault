document.querySelectorAll(".fx-player").forEach(player => {
    
    const video = document.createElement("video");
    video.src = player.dataset.src;

    // Container
    const container = document.createElement("div");
    container.classList.add("fx-video-container");
    container.appendChild(video);

    // Controls
    const controls = document.createElement("div");
    controls.classList.add("fx-controls");

    const playBtn = document.createElement("button");
    playBtn.classList.add("fx-play");
    playBtn.textContent = "▶";

    const timeDisplay = document.createElement("span");
    timeDisplay.classList.add("fx-time");
    timeDisplay.textContent = "0:00 / 0:00";

    const progress = document.createElement("input");
    progress.type = "range";
    progress.classList.add("fx-progress");
    progress.min = 0;
    progress.max = 100;
    progress.value = 0;

    const volume = document.createElement("input");
    volume.type = "range";
    volume.classList.add("fx-volume");
    volume.min = 0;
    volume.max = 1;
    volume.step = 0.01;
    volume.value = 0.8;

    const fullBtn = document.createElement("button");
    fullBtn.classList.add("fx-full");
    fullBtn.textContent = "⛶";

    controls.append(playBtn, timeDisplay, progress, volume, fullBtn);
    player.append(container, controls);

    // ---- PLAYER LOGIC ----

    playBtn.addEventListener("click", () => {
        if (video.paused) {
            video.play();
            playBtn.textContent = "⏸";
        } else {
            video.pause();
            playBtn.textContent = "▶";
        }
    });

    video.addEventListener("timeupdate", () => {
        progress.value = (video.currentTime / video.duration) * 100;
        timeDisplay.textContent = 
            `${format(video.currentTime)} / ${format(video.duration)}`;
    });

    progress.addEventListener("input", () => {
        video.currentTime = (progress.value / 100) * video.duration;
    });

    volume.addEventListener("input", () => {
        video.volume = volume.value;
    });

    fullBtn.addEventListener("click", () => {
        if (video.requestFullscreen) video.requestFullscreen();
    });

    function format(t) {
        if (isNaN(t)) return "0:00";
        let m = Math.floor(t / 60);
        let s = Math.floor(t % 60).toString().padStart(2, "0");
        return `${m}:${s}`;
    }
});
