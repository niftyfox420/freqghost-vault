const repoOwner = "niftyfox420";
const repoName = "freqghost-vault";

const videoGrid = document.getElementById("video-grid");

// Fetch the GitHub repo file list
fetch(`https://api.github.com/repos/${repoOwner}/${repoName}/contents`)
    .then(res => res.json())
    .then(files => {
        
        const videos = files.filter(file => file.name.toLowerCase().endsWith(".mp4"));

        videos.forEach(file => {
            const cleanName = file.name
                .replace(/-/g, " ")
                .replace(/_/g, " ")
                .replace(/\.mp4/i, "")
                .replace(/\s+/g, " ")
                .trim()
                .replace(/\b\w/g, c => c.toUpperCase());

            const card = document.createElement("div");
            card.classList.add("video-card");

            card.innerHTML = `
                <p class="video-title">${cleanName}</p>
                <div class="fx-player" data-src="${file.name}"></div>
            `;

            videoGrid.appendChild(card);
        });

        // Load custom players
        initPlayers();
    });
