// ============================================
// LOADING SCREEN ANIMATION
// ============================================
document.addEventListener("DOMContentLoaded", function () {
  const loader = document.getElementById("loader");
  const mainContent = document.getElementById("main-content");
  const counter = document.getElementById("counter");
  const progressBar = document.getElementById("progressBar");

  let count = 0;
  const interval = setInterval(() => {
    count++;
    counter.textContent = count;
    progressBar.style.width = count + "%";

    if (count === 100) {
      clearInterval(interval);
      setTimeout(() => {
        loader.classList.add("fade-out");
        setTimeout(() => {
          loader.style.display = "none";
          mainContent.classList.add("show");
          startTypingAnimation();
        }, 500);
      }, 300);
    }
  }, 20);
});

// ============================================
// TYPING ANIMATION FOR HERO
// ============================================
function startTypingAnimation() {
  const text = "Halo, Saya Satria Wijaya Dwi Prayogo - Web Developer.";
  const typingElement = document.getElementById("typingText");
  let index = 0;

  typingElement.textContent = "";

  function type() {
    if (index < text.length) {
      typingElement.textContent += text.charAt(index);
      index++;
      setTimeout(type, 80);
    }
  }

  type();
}

// ============================================
// PROJECT FILTER FUNCTIONALITY (UPDATED)
// ============================================
const filterButtons = document.querySelectorAll(".filter-btn");
const projectItems = document.querySelectorAll(".project-item");

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const filter = button.getAttribute("data-filter");

    // Remove active class from all buttons
    filterButtons.forEach((btn) => btn.classList.remove("active"));
    button.classList.add("active");

    projectItems.forEach((item) => {
      const categories = item.getAttribute("data-category").split(" ");

      // Check if item should be shown
      let shouldShow = false;
      if (filter === "all") {
        shouldShow = true;
      } else {
        // Check if any of the item's categories match the filter
        shouldShow = categories.includes(filter);
      }

      if (shouldShow) {
        item.style.display = "block";
        setTimeout(() => {
          item.style.opacity = "1";
          item.style.transform = "scale(1)";
        }, 10);
      } else {
        item.style.opacity = "0";
        item.style.transform = "scale(0.8)";
        setTimeout(() => {
          item.style.display = "none";
        }, 300);
      }
    });
  });
});

// ============================================
// SMOOTH SCROLL NAVIGATION
// ============================================
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      window.scrollTo({
        top: target.offsetTop - 80,
        behavior: "smooth",
      });
    }
  });
});

// ============================================
// NAVBAR SCROLL EFFECT
// ============================================
window.addEventListener("scroll", () => {
  const navbar = document.querySelector(".navbar");
  if (window.scrollY > 50) {
    navbar.style.background = "rgba(10, 1, 24, 0.98)";
    navbar.style.boxShadow = "0 8px 32px rgba(0, 212, 255, 0.3)";
  } else {
    navbar.style.background = "rgba(10, 1, 24, 0.8)";
    navbar.style.boxShadow = "0 8px 32px rgba(0, 212, 255, 0.15)";
  }
});

// ============================================
// SCROLL ANIMATION FOR ELEMENTS
// ============================================
const animateOnScroll = () => {
  const elements = document.querySelectorAll(
    ".skill-card, .achievement-card, .project-card, .cv-card",
  );

  elements.forEach((element) => {
    const elementTop = element.getBoundingClientRect().top;
    const windowHeight = window.innerHeight;

    if (elementTop < windowHeight - 100) {
      element.style.opacity = "1";
      element.style.transform = "translateY(0)";
    }
  });
};

document
  .querySelectorAll(".skill-card, .achievement-card, .project-card, .cv-card")
  .forEach((el) => {
    el.style.opacity = "0";
    el.style.transform = "translateY(30px)";
    el.style.transition = "all 0.6s ease";
  });

window.addEventListener("scroll", animateOnScroll);
window.addEventListener("load", animateOnScroll);

// ============================================
// CV DOWNLOAD FUNCTIONALITY
// ============================================
document.addEventListener("DOMContentLoaded", function () {
  const downloadBtn = document.getElementById("downloadCvBtn");

  if (downloadBtn) {
    downloadBtn.addEventListener("click", function (e) {
      const originalHtml = this.innerHTML;

      this.innerHTML =
        '<i class="fas fa-spinner fa-spin"></i><span>Downloading...</span>';
      this.style.pointerEvents = "none";

      setTimeout(() => {
        this.innerHTML = originalHtml;
        this.style.pointerEvents = "auto";
        showDownloadNotification();
      }, 1500);
    });
  }
});

// ============================================
// DOWNLOAD SUCCESS NOTIFICATION
// ============================================
function showDownloadNotification() {
  const existing = document.querySelectorAll(".download-notification");
  existing.forEach((n) => n.remove());

  const notification = document.createElement("div");
  notification.className = "download-notification";
  notification.innerHTML = `
    <div class="notification-content">
      <i class="fas fa-check-circle"></i>
      <span>CV berhasil diunduh! Periksa folder Downloads Anda.</span>
      <button class="notification-close">
        <i class="fas fa-times"></i>
      </button>
    </div>
  `;

  const styles = `
    position: fixed;
    top: 20px;
    right: 20px;
    background: linear-gradient(135deg, #00d4ff, #7b2ff7);
    color: white;
    padding: 20px 30px;
    border-radius: 15px;
    box-shadow: 0 10px 40px rgba(0, 212, 255, 0.5);
    z-index: 9999;
    animation: slideIn 0.4s cubic-bezier(0.68, -0.55, 0.265, 1.55);
    font-weight: 500;
    max-width: 400px;
  `;
  notification.style.cssText = styles;

  document.body.appendChild(notification);

  const closeBtn = notification.querySelector(".notification-close");
  closeBtn.addEventListener("click", () => {
    notification.style.animation = "slideOut 0.3s ease-out";
    setTimeout(() => notification.remove(), 300);
  });

  setTimeout(() => {
    if (notification.parentNode) {
      notification.style.animation = "slideOut 0.3s ease-out";
      setTimeout(() => notification.remove(), 300);
    }
  }, 5000);
}

// ============================================
// ADD NOTIFICATION ANIMATIONS
// ============================================
const style = document.createElement("style");
style.textContent = `
  @keyframes slideIn {
    from {
      transform: translateX(120%);
      opacity: 0;
    }
    to {
      transform: translateX(0);
      opacity: 1;
    }
  }
  
  @keyframes slideOut {
    from {
      transform: translateX(0);
      opacity: 1;
    }
    to {
      transform: translateX(120%);
      opacity: 0;
    }
  }
  
  .notification-content {
    display: flex;
    align-items: center;
    gap: 15px;
  }
  
  .notification-content i.fa-check-circle {
    font-size: 24px;
  }
  
  .notification-close {
    background: rgba(255, 255, 255, 0.2);
    border: none;
    color: white;
    cursor: pointer;
    width: 30px;
    height: 30px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.3s;
    margin-left: auto;
  }
  
  .notification-close:hover {
    background: rgba(255, 255, 255, 0.3);
    transform: scale(1.1);
  }
`;
document.head.appendChild(style);

// ============================================
// CONSOLE EASTER EGG
// ============================================
console.log(
  "%c👋 Halo Developer!",
  "color: #00d4ff; font-size: 24px; font-weight: bold; text-shadow: 0 0 10px rgba(0, 212, 255, 0.5);",
);
console.log(
  "%cTertarik dengan portfolio ini? Hubungi saya!",
  "color: #7b2ff7; font-size: 14px; font-weight: 500;",
);
console.log(
  "%c📧 Email: logichub122@gmail.com",
  "color: #fff; font-size: 12px;",
);
console.log(
  "%c📱 WhatsApp: +62 851-9492-8429",
  "color: #fff; font-size: 12px;",
);

// ============================================
// END OF SCRIPT.JS
// ============================================
