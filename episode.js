document.addEventListener("DOMContentLoaded", async () => {
  const params = new URLSearchParams(window.location.search);
  const episodeId = params.get("id");

  if (!episodeId) {
    document.body.innerHTML = "<h1>No episode found</h1>";
    return;
  }

  try {
    const episodeResponse = await axios.get(
      `https://api.tvmaze.com/episodes/${episodeId}`
    );
    const episode = episodeResponse.data;

    let showId = episode.show?.id;

    if (!showId && episode._links?.show?.href) {
      const showResponse = await axios.get(episode._links.show.href);
      showId = showResponse.data.id;
    }

    if (!showId) {
      throw new Error("serial ID not found!");
    }

    const episodesResponse = await axios.get(
      `https://api.tvmaze.com/shows/${showId}/episodes`
    );
    const episodes = episodesResponse.data;

    const formattedTitle = `S${String(episode.season).padStart(
      2,
      "0"
    )}-E${String(episode.number).padStart(2, "0")} - ${episode.name}`;
    const container = document.getElementById("episode-container");
    container.innerHTML = `
      <div class="episode-card">
        <img src="${
          episode.image
            ? episode.image.medium
            : "https://via.placeholder.com/300"
        }" alt="${episode.name}">
       <p class="episode-title">${formattedTitle}</p>

      </div>
    `;
    const episodeIcon = document.createElement("i");
    episodeIcon.className = "bi bi-play-circle-fill";
    
   const iconsDiv = document.createElement("div");
iconsDiv.className = "social-icons";

const socialMedia = [
  { name: "instagram", url: "https://instagram.comt/tvmazecom" },
  { name: "telegram", url: "https://t.me/tvmazecom" },
  { name: "github", url: "https://github.com/helia-lorestani" },
  { name: "linkedin", url: "https://linkedin.com/tvmazecom" }
];

    
socialMedia.forEach((item) => {
  const anchor = document.createElement("a");
  anchor.href = item.url;
  anchor.target = "_blank";
  anchor.rel = "noreferrer";
  anchor.style.textDecoration = "none";
  anchor.style.color = "inherit";

  const icon = document.createElement("i");
  icon.className = `bi bi-${item.name}`;
  icon.style.cursor = "pointer";

  anchor.appendChild(icon);
  iconsDiv.appendChild(anchor);
});

const card = document.querySelector('.episode-card');
if (card) {
  card.appendChild(iconsDiv);
}

Object.assign(episodeIcon.style, {
  position: "absolute",
  right: "10px",
  bottom: "10px",
  fontSize: "35px",
  color: "rgb(0, 128, 75)",
  cursor: "pointer",
  zIndex: "10",
  top: "auto",
  left: "auto",
  margin: "0",
  padding: "0"
});


if (card) {
  card.appendChild(episodeIcon);
}

    episodeIcon.addEventListener("click", () => {
      window.open(episode.url, "_blank");
    });

    const select = document.getElementById("menu");

    const allEpisodesOption = document.createElement("option");
    allEpisodesOption.value = "home";
    allEpisodesOption.textContent = "All Episodes";
    select.appendChild(allEpisodesOption);

    episodes.forEach((ep) => {
      const option = document.createElement("option");
      option.value = ep.id;
      const epLabel = `S${String(ep.season).padStart(2, "0")}-E${String(ep.number).padStart(2, "0")}`;
      option.textContent = `${epLabel} - ${ep.name}`;

      if (ep.id == episodeId) {
        option.selected = true;
      }

      select.appendChild(option);
    });

    select.addEventListener("change", (event) => {
      const selectedId = event.target.value;
      if (selectedId === "home") {
        window.location.href = `details.html?id=${showId}`;
      } else {
        window.location.href = `episode.html?id=${selectedId}`;
      }
   
    });
  } catch (error) {
    console.error(error);
    document.body.innerHTML = `<h1>${error.message}</h1>`;
  }
});
 