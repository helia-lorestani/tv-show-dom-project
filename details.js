document.addEventListener("DOMContentLoaded", async () => {
  const params = new URLSearchParams(window.location.search);
  const showId = params.get("id");
  const select = document.querySelector("select");
  if (!showId) {
    document.body.innerHTML = "<h1>No series found</h1>";
    return;
  }

  try {
    const [showResponse, seasonsResponse] = await Promise.all([
      axios.get(`https://api.tvmaze.com/shows/${showId}`),
      axios.get(`https://api.tvmaze.com/shows/${showId}/seasons`),
    ]);

    const showData = showResponse.data;
    const seasons = seasonsResponse.data;

    const titleElement = document.querySelector("#title");
    if (titleElement) {
      titleElement.innerText = showData.name;
    } else {
      console.error("Element 'title' not found!");
    }

    const container = document.querySelector("#episodes-container");
    if (!container) {
      console.error("Element 'episodes-container' not found!");
      return;
    }

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
        episodeImage.src = episode.image
          ? episode.image.medium
          : "https://via.placeholder.com/150";
        episodeImage.alt = episode.name;

        const episodeDetails = document.createElement("div");
        episodeDetails.classList.add("episode-details");

        const episodeIcon = document.createElement("i");
        episodeIcon.className = "bi bi-play-circle-fill";
        Object.assign(episodeIcon.style, {
          position: "absolute",
          bottom: "3px",
          right: "5px",
          fontSize: "xx-large",
          color: "rgb(0, 128, 75)",
        });

        const episodeLabel = `S${String(season.number).padStart(
          2,
          "0"
        )}-E${String(episode.number).padStart(2, "0")}`;

        episodeDetails.innerHTML = `${episodeLabel} ${episode.name}`;
        Object.assign(episodeDetails.style, {
          position: "absolute",
          bottom: "50px",
          left: "10px",
        });

        episodeIcon.addEventListener("click", () => {
          window.open(episode.url, "_blank");
        });

        const tooltip = document.createElement("div");
        tooltip.style.position = "absolute";
        tooltip.style.background = "black";
        tooltip.style.color = "white";
        tooltip.style.padding = "5px 10px";
        tooltip.style.borderRadius = "5px";
        tooltip.style.fontSize = "12px";
        tooltip.style.display = "none";
        tooltip.style.pointerEvents = "none";
        document.body.appendChild(tooltip);

        episodeCard.addEventListener("mouseover", (event) => {
          tooltip.innerHTML = episode.summary;
          tooltip.style.display = "block";
          tooltip.style.width = "200px";
          tooltip.style.minHeight = "100px";
          tooltip.style.top = event.pageY + 2 + "px";
          tooltip.style.left = event.pageX + 2 + "px";
        });

        episodeCard.addEventListener("mouseleave", () => {
          tooltip.style.display = "none";
        });

        const option = document.createElement("option");
        option.innerHTML = `${episodeLabel} ${episode.name}`;

        episodeCard.append(episodeImage, episodeDetails, episodeIcon);
        container.appendChild(episodeCard);
        select.appendChild(option);

        option.addEventListener("click", () => {
          window.location.href = `episode.html?id=${episode.id}`;
        });
      });
    }
  } catch (error) {
    console.error(error);
  }
});
