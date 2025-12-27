const container = document.querySelector("#container");
const input = document.querySelector("#searchbar");

let timeoutId;

async function fetchDefaultShows() {
  try {
    const result = await axios.get(
      "https://api.tvmaze.com/search/shows?q=popular"
    );
    makeImage(result.data);
  } catch (error) {
    console.error("Error fetching default shows:", error);
  }
}

async function handleInput(event) {
  const inputData = input.value.trim();
  if (!inputData) {
    container.innerHTML = "";
    fetchDefaultShows();
    return;
  }

  clearTimeout(timeoutId);

  timeoutId = setTimeout(async () => {
    try {
      const config = { params: { q: inputData } };
      const result = await axios.get(
        "https://api.tvmaze.com/search/shows",
        config
      );
      makeImage(result.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }, 500);
}
function makeImage(shows) {
  container.innerHTML = "";
  shows.forEach((item) => {
    if (item.show.image) {
      const itemContainer = document.createElement("div");
      itemContainer.style.position = "relative";
      itemContainer.style.backgroundColor = "rgb(28, 26, 26)";
      itemContainer.style.display = "inline-block";
      itemContainer.style.margin = "10px";
      itemContainer.style.width = "170px";
      itemContainer.style.height = "250px";
      itemContainer.style.overflow = "hidden";
      itemContainer.style.cursor = "pointer";

      const imgElem = document.createElement("img");
      imgElem.src = item.show.image.medium;
      imgElem.alt = item.show.name;
      imgElem.style.width = "100%";
      imgElem.style.height = "100%";
      imgElem.style.objectFit = "cover";
      imgElem.style.transition = "transform 0.3s ease";

      const textOverlay = document.createElement("div");
      textOverlay.style.position = "absolute";
      textOverlay.style.bottom = "0";
      textOverlay.style.left = "0";
      textOverlay.style.width = "100%";
      textOverlay.style.background = "rgba(0, 0, 0, 0.7)";
      textOverlay.style.color = "white";
      textOverlay.style.textAlign = "center";
      textOverlay.style.padding = "10px";
      textOverlay.style.fontSize = "14px";
      textOverlay.innerHTML = `<strong>${item.show.name}</strong><br>${
        item.show.genres.join(" | ") || ""
      }<br>${Math.round(item.score * 100) / 10}`;

      itemContainer.addEventListener("mouseover", () => {
        imgElem.style.transform = "scale(0.9)";
      });
      itemContainer.addEventListener("mouseout", () => {
        imgElem.style.transform = "scale(1)";
      });

      itemContainer.addEventListener("click", () => {
        window.location.href = `details.html?id=${item.show.id}`;
      });

      itemContainer.appendChild(imgElem);
      itemContainer.appendChild(textOverlay);
      container.appendChild(itemContainer);
    }
  });
}

input.addEventListener("input", handleInput);

fetchDefaultShows();
