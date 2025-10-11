// Hero typing animation
const typingTexts = [
  "Full Stack Developer",
  "Visual & UI Aesthete",
  "Innovation Hacker",
  "Audio Architect",
  "Code + Creativity Enthusiast",
  "Tech Explorer from IIUC",
  "Video Visionary",
]
let textIndex = 0
let charIndex = 0
let isDeleting = false
const typingElement = document.querySelector(".hero-typing-text")

function typeText() {
  const currentText = typingTexts[textIndex]

  if (isDeleting) {
    typingElement.textContent = currentText.substring(0, charIndex - 1)
    charIndex--
  } else {
    typingElement.textContent = currentText.substring(0, charIndex + 1)
    charIndex++
  }

  let typeSpeed = isDeleting ? 50 : 100

  if (!isDeleting && charIndex === currentText.length) {
    typeSpeed = 2000
    isDeleting = true
  } else if (isDeleting && charIndex === 0) {
    isDeleting = false
    textIndex = (textIndex + 1) % typingTexts.length
    typeSpeed = 500
  }

  setTimeout(typeText, typeSpeed)
}

// Start typing animation when page loads
document.addEventListener("DOMContentLoaded", () => {
  typeText()
})

// Animated counter for stats
function animateCounter(element) {
  const target = Number.parseInt(element.getAttribute("data-target"))
  const duration = 2000
  const increment = target / (duration / 16)
  let current = 0

  const updateCounter = () => {
    current += increment
    if (current < target) {
      element.textContent = Math.floor(current)
      requestAnimationFrame(updateCounter)
    } else {
      element.textContent = target
    }
  }

  updateCounter()
}

// Intersection Observer for counter animation
const observerOptions = {
  threshold: 0.5,
  rootMargin: "0px",
}

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      const counters = entry.target.querySelectorAll(".stat-number")
      counters.forEach((counter) => {
        if (counter.textContent === "0") {
          animateCounter(counter)
        }
      })
      observer.unobserve(entry.target)
    }
  })
}, observerOptions)

// Observe the stats section
const statsSection = document.querySelector("#home")
if (statsSection) {
  observer.observe(statsSection)
}

// Mobile menu functionality
const mobileMenuBtn = document.getElementById("mobile-menu-btn")
const leftSidebar = document.getElementById("left-sidebar")
const mobileOverlay = document.getElementById("mobile-overlay")
const closeLeftSidebarBtn = document.getElementById("close-left-sidebar")

function toggleMobileMenu() {
  leftSidebar.classList.toggle("active")
  mobileOverlay.classList.toggle("active")
  document.body.classList.toggle("left-sidebar-open")
}

if (mobileMenuBtn) {
  mobileMenuBtn.addEventListener("click", toggleMobileMenu)
}

if (mobileOverlay) {
  mobileOverlay.addEventListener("click", toggleMobileMenu)
}

if (closeLeftSidebarBtn) {
  closeLeftSidebarBtn.addEventListener("click", toggleMobileMenu)
}

const mobileRightSidebarBtn = document.getElementById("mobile-right-sidebar-btn")
const rightSidebar = document.getElementById("right-sidebar")
const mobileRightOverlay = document.getElementById("mobile-right-overlay")
const closeRightSidebarBtn = document.getElementById("close-right-sidebar")

function toggleRightSidebar() {
  rightSidebar.classList.toggle("active")
  mobileRightOverlay.classList.toggle("active")
  document.body.classList.toggle("right-sidebar-open")
}

if (mobileRightSidebarBtn) {
  mobileRightSidebarBtn.addEventListener("click", toggleRightSidebar)
}

if (mobileRightOverlay) {
  mobileRightOverlay.addEventListener("click", toggleRightSidebar)
}

if (closeRightSidebarBtn) {
  closeRightSidebarBtn.addEventListener("click", toggleRightSidebar)
}

// Close mobile menu when clicking nav links
const navLinks = document.querySelectorAll(".nexus-nav-item")
navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    if (window.innerWidth <= 1024) {
      if (leftSidebar.classList.contains("active")) {
        toggleMobileMenu()
      }
    }
  })
})

// Active navigation highlighting based on scroll
const sections = document.querySelectorAll("section[id]")
const mainContent = document.getElementById("main-content")

function updateActiveNav() {
  const scrollY = mainContent.scrollTop

  sections.forEach((section) => {
    const sectionTop = section.offsetTop - 100
    const sectionHeight = section.offsetHeight
    const sectionId = section.getAttribute("id")

    if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
      navLinks.forEach((link) => {
        link.classList.remove("active")
        if (link.getAttribute("data-section") === sectionId) {
          link.classList.add("active")
        }
      })
    }
  })
}

if (mainContent) {
  mainContent.addEventListener("scroll", updateActiveNav)
}

// Scroll progress indicator
const scrollProgress = document.getElementById("scroll-progress")

function updateScrollProgress() {
  const scrollTop = mainContent.scrollTop
  const scrollHeight = mainContent.scrollHeight - mainContent.clientHeight
  const scrollPercentage = (scrollTop / scrollHeight) * 100
  scrollProgress.style.width = scrollPercentage + "%"
}

if (mainContent && scrollProgress) {
  mainContent.addEventListener("scroll", updateScrollProgress)
}

// Real-time system clock
function updateSystemTime() {
  const now = new Date()

  // Format time (HH:MM:SS)
  const hours = String(now.getHours()).padStart(2, "0")
  const minutes = String(now.getMinutes()).padStart(2, "0")
  const seconds = String(now.getSeconds()).padStart(2, "0")
  const timeString = `${hours}:${minutes}:${seconds}`

  // Format date (Month Day, Year)
  const options = { year: "numeric", month: "short", day: "numeric" }
  const dateString = now.toLocaleDateString("en-US", options)

  // Get timezone
  const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone
  const timezoneOffset = -now.getTimezoneOffset() / 60
  const timezoneString = `UTC${timezoneOffset >= 0 ? "+" : ""}${timezoneOffset}:00`

  // Update DOM elements
  const timeElement = document.getElementById("system-time")
  const dateElement = document.getElementById("system-date")
  const timezoneElement = document.getElementById("timezone")

  if (timeElement) timeElement.textContent = timeString
  if (dateElement) dateElement.textContent = dateString
  if (timezoneElement) timezoneElement.textContent = timezoneString
}

// Update uptime
const startTime = new Date()

function updateUptime() {
  const now = new Date()
  const diff = now - startTime

  const hours = Math.floor(diff / (1000 * 60 * 60))
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))
  const seconds = Math.floor((diff % (1000 * 60)) / 1000)

  const uptimeString = `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`

  const uptimeElement = document.getElementById("uptime")
  if (uptimeElement) uptimeElement.textContent = uptimeString
}

// Initialize time updates
updateSystemTime()
updateUptime()

// Update every second
setInterval(() => {
  updateSystemTime()
  updateUptime()
}, 1000)

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault()
    const target = document.querySelector(this.getAttribute("href"))
    if (target) {
      mainContent.scrollTo({
        top: target.offsetTop - 20,
        behavior: "smooth",
      })
    }
  })
})
// ===============================
// Visitor Counter (CountAPI)
// ===============================

document.addEventListener("DOMContentLoaded", () => {
  const counterElement = document.getElementById("visitor-count");
  if (!counterElement) return;

  fetch("https://api.countapi.xyz/hit/aeromsk.github.io/portfolio-visits")
    .then((res) => res.json())
    .then((data) => {
      counterElement.textContent = data.value.toLocaleString();
    })
    .catch((error) => {
      console.error("Visitor counter error:", error);
      counterElement.textContent = "—";
    });
});
