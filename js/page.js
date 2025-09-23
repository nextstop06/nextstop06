// Main page component for NextStop Bus Booking App

class Page {
  constructor() {
    this.currentPage = this.getCurrentPage()
    this.init()
  }

  getCurrentPage() {
    const path = window.location.pathname
    const filename = path.split("/").pop() || "index.html"

    if (filename.includes("auth")) return "auth"
    if (filename.includes("profile")) return "profile"
    return "index"
  }

  init() {
    // Initialize common functionality
    this.setupGlobalErrorHandling()
    this.setupPageTransitions()

    // Initialize page-specific functionality
    switch (this.currentPage) {
      case "index":
        this.initIndexPage()
        break
      case "auth":
        this.initAuthPage()
        break
      case "profile":
        this.initProfilePage()
        break
    }
  }

  setupGlobalErrorHandling() {
    window.addEventListener("error", (event) => {
      console.error("Global error:", event.error)
    })

    window.addEventListener("unhandledrejection", (event) => {
      console.error("Unhandled promise rejection:", event.reason)
    })
  }

  setupPageTransitions() {
    // Add smooth page transitions
    document.addEventListener("click", (e) => {
      const link = e.target.closest("a[href]")
      if (link && link.href.includes(window.location.origin)) {
        const href = link.getAttribute("href")
        if (href && !href.startsWith("#") && !href.startsWith("mailto:") && !href.startsWith("tel:")) {
          e.preventDefault()
          this.navigateToPage(href)
        }
      }
    })
  }

  navigateToPage(href) {
    // Add fade out effect
    document.body.style.opacity = "0.8"
    document.body.style.transition = "opacity 0.2s ease"

    setTimeout(() => {
      window.location.href = href
    }, 200)
  }

  initIndexPage() {
    // Index page is handled by js/index.js
    console.log("[v0] Index page initialized")
  }

  initAuthPage() {
    // Auth page is handled by js/auth.js
    console.log("[v0] Auth page initialized")
  }

  initProfilePage() {
    // Profile page is handled by js/profile.js
    console.log("[v0] Profile page initialized")
  }

  // Utility methods
  showNotification(message, type = "info") {
    const notification = document.createElement("div")
    notification.className = `notification notification-${type}`
    notification.style.cssText = `
      position: fixed;
      top: 1rem;
      right: 1rem;
      z-index: 1000;
      padding: 1rem;
      border-radius: 0.5rem;
      background: white;
      border: 1px solid #e2e8f0;
      box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1);
      color: #0f172a;
      font-size: 0.875rem;
      transform: translateX(100%);
      transition: transform 0.3s ease;
      max-width: 400px;
    `

    if (type === "success") {
      notification.style.borderColor = "#22c55e"
      notification.style.backgroundColor = "#dcfce7"
    } else if (type === "error") {
      notification.style.borderColor = "#ef4444"
      notification.style.backgroundColor = "#fef2f2"
    }

    notification.textContent = message
    document.body.appendChild(notification)

    setTimeout(() => {
      notification.style.transform = "translateX(0)"
    }, 10)

    setTimeout(() => {
      notification.style.transform = "translateX(100%)"
      setTimeout(() => {
        if (notification.parentNode) {
          notification.parentNode.removeChild(notification)
        }
      }, 300)
    }, 5000)
  }

  // Static method to get current page instance
  static getInstance() {
    if (!window.pageInstance) {
      window.pageInstance = new Page()
    }
    return window.pageInstance
  }
}

// Export as default
export default Page

// Also export as named export for compatibility
export { Page }

// Initialize when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  window.pageInstance = new Page()
})

// Make Page available globally
window.Page = Page
