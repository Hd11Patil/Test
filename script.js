(() => {
  const navbar = document.getElementById("navbar");
  const hamburger = document.getElementById("hamburger");
  const mobileDrawer = document.getElementById("mobileDrawer");
  const overlay = document.getElementById("mobileOverlay");
  const drawerClose = document.getElementById("drawerClose");

  // ── Scroll effect ──

  const onScroll = () => {
    navbar.classList.toggle("scrolled", window.scrollY > 20);
  };
  window.addEventListener("scroll", onScroll, { passive: true });

  // ── Mobile drawer open / close ──

  const openDrawer = () => {
    mobileDrawer.classList.add("open");
    overlay.classList.add("visible");
    hamburger.classList.add("open");
    document.body.style.overflow = "hidden";
  };

  const closeDrawer = () => {
    mobileDrawer.classList.remove("open");
    overlay.classList.remove("visible");
    hamburger.classList.remove("open");
    document.body.style.overflow = "";
  };

  hamburger.addEventListener("click", () => {
    mobileDrawer.classList.contains("open") ? closeDrawer() : openDrawer();
  });

  drawerClose.addEventListener("click", closeDrawer);
  overlay.addEventListener("click", closeDrawer);

  // Escape key

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeDrawer();
  });

  // ── Drawer accordion ──

  document.querySelectorAll(".drawer-toggle").forEach((btn) => {
    btn.addEventListener("click", () => {
      const item = btn.closest(".drawer-item");
      const dropdown = item.querySelector(".drawer-dropdown");
      const isOpen = btn.classList.contains("open");

      // Close all

      document.querySelectorAll(".drawer-toggle.open").forEach((b) => {
        b.classList.remove("open");
        b.closest(".drawer-item")
          .querySelector(".drawer-dropdown")
          .classList.remove("open");
      });

      // Toggle current

      if (!isOpen) {
        btn.classList.add("open");
        dropdown.classList.add("open");
      }
    });
  });

  // ── Desktop: close dropdown on outside click ──

  document.addEventListener("click", (e) => {
    if (!e.target.closest(".dropdown-parent")) {
      document
        .querySelectorAll(".nav-item.active")
        .forEach((i) => i.classList.remove("active"));
    }
  });
})();

// ----------------------------------------------------------------------
let currentSlideIndex = 0;
const slides = document.querySelectorAll(".slide");
const dots = document.querySelectorAll(".dot");

function showSlide(index) {
  // Loop back around if we go past the ends
  if (index >= slides.length) currentSlideIndex = 0;
  if (index < 0) currentSlideIndex = slides.length - 1;

  // Remove active classes
  slides.forEach((slide) => slide.classList.remove("active"));
  dots.forEach((dot) => dot.classList.remove("active"));

  // Add active classes to current slide
  slides[currentSlideIndex].classList.add("active");
  dots[currentSlideIndex].classList.add("active");
}

function changeSlide(direction) {
  currentSlideIndex += direction;
  showSlide(currentSlideIndex);
}

function setSlide(index) {
  currentSlideIndex = index;
  showSlide(currentSlideIndex);
}

// Optional: Auto-play the slider every 5 seconds
setInterval(() => {
  changeSlide(1);
}, 5000);
