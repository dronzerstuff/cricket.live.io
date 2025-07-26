const matchListElement = document.getElementById("matchList");
const videoPlayerModal = document.getElementById("videoPlayerModal");
const videoPlayer = document.getElementById("videoPlayer");
const videoSource = document.getElementById("videoSource");
const closeModal = document.querySelector(".close");

async function fetchMatches() {
  try {
    const response = await fetch(
      "https://raw.githubusercontent.com/drmlive/fancode-live-events/refs/heads/main/fancode.json"
    );
    const data = await response.json();
    loadMatchItems(data.matches);
  } catch (error) {
    console.error("Error fetching matches:", error);
  }
}

// Load match items into the list
function loadMatchItems(matches) {
  matchListElement.innerHTML = ""; // Clear existing items
  matches.forEach((match) => {
    if (match.status === "LIVE" && match.dai_url) {
      const li = document.createElement("li");
      const img = document.createElement("img");
      img.src = match.src;
      img.alt = match.title;
      li.appendChild(img); // Append the image to the list item

      const title = document.createElement("h3");
      title.textContent = match.title; // Set the title text
      li.appendChild(title); // Append the title to the list item

      li.onclick = () => openVideoPlayer(match.dai_url);
      matchListElement.appendChild(li);
    }
  });
}

// Open video player modal
function openVideoPlayer(src) {
  var video = document.getElementById("videoPlayer");
  var hls = new Hls();
  hls.loadSource(src);
  hls.attachMedia(video);
  videoPlayerModal.style.display = "block";
  
}

// Close modal
closeModal.onclick = () => {
  videoPlayerModal.style.display = "none";
  videoPlayer.pause();
};

// Close modal when clicking outside of it
window.onclick = (event) => {
  if (event.target === videoPlayerModal) {
    videoPlayerModal.style.display = "none";
    videoPlayer.pause();
  }
};

window.onload = function () {
  fetchMatches(); // Fetch matches from the API
};
