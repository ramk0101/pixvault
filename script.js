// <!-- Step 4: script.js (with Unsplash API + Dark Mode) -->
//  HHiP4L97eNxBu0JtsoYzgG5gK_Im-Lfgu8a9ZSOT4Zw
const gallery = document.getElementById("gallery");
let page = 1;
const accessKey = "HHiP4L97eNxBu0JtsoYzgG5gK_Im-Lfgu8a9ZSOT4Zw";

async function loadImages() {
  const url = `https://api.unsplash.com/photos?page=${page}&per_page=20&client_id=${accessKey}`;
  const res = await fetch(url);
  const data = await res.json();

  data.forEach(photo => {
    const card = document.createElement("div");
    card.className = "image-card";
    const downloadUrl = `${photo.links.download}?force=true`; // Ensures correct image MIME
    card.innerHTML = `
      <img src="${photo.urls.small}" alt="${photo.alt_description}" />
      <div class="download-btn">
        <a href="${downloadUrl}" target="_blank" download>
          <img src="assets/icons/download.svg" alt="Download" />
        </a>
      </div>
    `;
    gallery.appendChild(card);
  });
}

window.addEventListener("scroll", () => {
  if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 100) {
    page++;
    loadImages();
  }
});

const toggleBtn = document.getElementById("toggle-theme");
toggleBtn.addEventListener("click", () => {
  document.body.classList.toggle("dark");
  toggleBtn.textContent = document.body.classList.contains("dark") ? "☀️" : "🌙";
});

const slider = document.getElementById("heroSlider");
const backgrounds = [
  "assets/slide1.jpeg",
  "assets/slide2.jpeg",
  "assets/slide3.jpeg",
  "assets/slide4.jpeg"
];
let slideIndex = 0;
setInterval(() => {
  slideIndex = (slideIndex + 1) % backgrounds.length;
  slider.style.backgroundImage = `url('${backgrounds[slideIndex]}')`;
}, 6000);

const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");

menuToggle.addEventListener("click", () => {
  navLinks.classList.toggle("show");
});


loadImages();
