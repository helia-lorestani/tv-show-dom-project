document.addEventListener("DOMContentLoaded", async () => {
  const params = new URLSearchParams(window.location.search);
  const showId = params.get("id");
  const select = document.getElementById("menu");
  const container = document.querySelector("#episodes-container");

  if (!showId) {
    document.body.innerHTML = "<h1>No series found</h1>";
    return;
  }

  const tooltip = document.createElement("div");
  Object.assign(tooltip.style, {
    position: "absolute",
    background: "black",
    color: "white",
    padding: "10px",
    borderRadius: "5px",
    fontSize: "12px",
    display: "none",
    pointerEvents: "none",
    zIndex: "9999",
    width: "250px"
  });
  document.body.appendChild(tooltip);

  select.addEventListener("change", (event) => {
    const selectedId = event.target.value;
    if (selectedId && selectedId !== "home") {
      window.location.href = `episode.html?id=${selectedId}`;
    }
  });

  try {
    const [showResponse, seasonsResponse] = await Promise.all([
      axios.get(`https://api.tvmaze.com/shows/${showId}`),
      axios.get(`https://api.tvmaze.com/shows/${showId}/seasons`),
    ]);

    const seasons = seasonsResponse.data;

    for (const season of seasons) {
      const episodesResponse = await axios.get(
        `https://api.tvmaze.com/seasons/${season.id}/episodes`
      );
      const episodes = episodesResponse.data;

      episodes.forEach((episode) => {
        const episodeCard = document.createElement("div");
        episodeCard.classList.add("episode-card");
        episodeCard.style.position = "relative";

        const episodeImage = document.createElement("img");
        episodeImage.src = episode.image ? episode.image.medium : "https://via.placeholder.com/150";
        
        const episodeLabel = `S${String(season.number).padStart(2, "0")}-E${String(episode.number).padStart(2, "0")}`;

        const episodeDetails = document.createElement("div");
        episodeDetails.classList.add("episode-details");
        episodeDetails.innerHTML = `${episodeLabel} ${episode.name}`;
        Object.assign(episodeDetails.style, {
          position: "absolute",
          bottom: "30px",
          left: 0 ,
        });

        const episodeIcon = document.createElement("i");
        episodeIcon.className = "bi bi-play-circle-fill";
        Object.assign(episodeIcon.style, {
          position: "absolute",
          bottom: "3px",
          right: "5px",
          fontSize: "xx-large",
          color: "rgb(0, 128, 75)",
          cursor: "pointer"
        });

        episodeIcon.addEventListener("click", () => {
          window.open(episode.url, "_blank");
        });

        episodeCard.addEventListener("mousemove", (event) => {
          if (episode.summary) {
            tooltip.innerHTML = episode.summary;
            tooltip.style.display = "block";
            tooltip.style.top = event.pageY + 15 + "px";
            tooltip.style.left = event.pageX + 15 + "px";
          } else {
            tooltip.style.display = "none";
          }
        });

        episodeCard.addEventListener("mouseleave", () => {
          tooltip.style.display = "none";
        });

        const option = document.createElement("option");
        option.value = episode.id;
        option.textContent = `${episodeLabel} - ${episode.name}`;

        episodeCard.append(episodeImage, episodeDetails, episodeIcon);
        container.appendChild(episodeCard);
        select.appendChild(option);
      });
    }
  } catch (error) {
    console.error(error);
  }
});