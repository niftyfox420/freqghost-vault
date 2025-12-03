async function loadTracks() {
    const resp = await fetch("tracks/");
    const text = await resp.text();

    // Extract filenames
    const files = [...text.matchAll(/href="([^"]+)"/g)]
        .map(m => m[1])
        .filter(name => name.match(/\.(mp3|mp4)$/i));

    const grid = document.getElementById("track-grid");

    files.forEach(file => {
        const card = document.createElement("div");
        card.className = "track-card";

        const title = file.replace(/\.(mp3|mp4)/i, "").replace(/_/g, " ");

        card.innerHTML = `
            <div class="track-title">${title}</div>
            ${
                file.endsWith(".mp4")
                ? `<video controls src="tracks/${file}"></video>`
                : `<audio controls src="tracks/${file}"></audio>`
            }
        `;

        grid.appendChild(card);
    });
}

loadTracks();
