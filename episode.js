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
        <p>${formattedTitle}</p>
      </div>
    `;
    const episodeIcon = document.createElement("i");
    const icon1 = document.createElement("i");
    const icon2 = document.createElement("i");
    const icon3 = document.createElement("i");
    const icon4 = document.createElement("i");
    episodeIcon.className = "bi bi-play-circle-fill";
    icon1.className = "bi bi-instagram";
    icon2.className = "bi bi-telegram";
    icon3.className = "bi bi-github";
    icon4.className = "bi bi-linkedin";
    icon1.style.position = "absolute";
    icon2.style.position = "relative";
    icon3.style.position = "relative";
    icon4.style.position = "relative";
    icon1.style.left = "812px";
    icon1.style.bottom = "300px";
    icon2.style.left = "20px";
    icon2.style.top = "145px";
    icon3.style.top = "109px";
    icon3.style.left = "-20px";
    icon4.style.top = "73px";
    icon4.style.left = "-65px";
    icon1.style.zIndex = "100";
    icon2.style.zIndex = "100";
    icon3.style.zIndex = "100";
    icon4.style.zIndex = "100";
    Object.assign(episodeIcon.style, {
      position: "absolute",
      left: "810px",
      top: "350px",
      fontSize: "xx-large",
      color: "rgb(0, 128, 75)",
    });

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
      option.textContent = `S${String(ep.season).padStart(2, "0")}-E${String(
        ep.number
      ).padStart(2, "0")} - ${ep.name}`;

      if (ep.id == episodeId) {
        option.selected = true;
      }

      select.appendChild(option);
      container.appendChild(episodeIcon);
      container.appendChild(icon1);
      container.appendChild(icon2);
      container.appendChild(icon3);
      container.appendChild(icon4);
    });

    select.addEventListener("change", (event) => {
      const selectedValue = event.target.value;
      if (selectedValue === "home") {
        window.location.href = `details.html?id=${showId}`;
      } else {
        window.location.href = `episode.html?id=${selectedValue}`;
      }
    });
  } catch (error) {
    console.error(error);
    document.body.innerHTML = `<h1>${error.message}</h1>`;
  }
});
