// Layout JavaScript - Common functionality for all pages

class LayoutManager {
  constructor() {
    this.init()
  }

  init() {
    this.setupMobileMenu()
    this.setupAuthState()
    this.setupLogout()
  }

  setupMobileMenu() {
    const mobileMenuBtn = document.getElementById("mobile-menu-btn")
    const mobileNav = document.getElementById("mobile-nav")
    const menuIcon = document.querySelector(".menu-icon")
    const closeIcon = document.querySelector(".close-icon")

    if (mobileMenuBtn && mobileNav) {
      mobileMenuBtn.addEventListener("click", () => {
        const isActive = mobileNav.classList.contains("active")

        if (isActive) {
          mobileNav.classList.remove("active")
          menuIcon.classList.remove("hidden")
          closeIcon.classList.add("hidden")
        } else {
          mobileNav.classList.add("active")
          menuIcon.classList.add("hidden")
          closeIcon.classList.remove("hidden")
        }
      })

      // Close mobile menu when clicking on links
      const mobileLinks = mobileNav.querySelectorAll("a")
      mobileLinks.forEach((link) => {
        link.addEventListener("click", () => {
          mobileNav.classList.remove("active")
          menuIcon.classList.remove("hidden")
          closeIcon.classList.add("hidden")
        })
      })
    }
  }

  setupAuthState() {
    const isAuthenticated = localStorage.getItem("isAuthenticated") === "true"

    // Desktop auth state
    const authLoggedOut = document.getElementById("auth-logged-out")
    const authLoggedIn = document.getElementById("auth-logged-in")

    // Mobile auth state
    const mobileAuthLoggedOut = document.getElementById("mobile-auth-logged-out")
    const mobileAuthLoggedIn = document.getElementById("mobile-auth-logged-in")

    if (isAuthenticated) {
      // Show logged in state
      if (authLoggedOut) authLoggedOut.classList.add("hidden")
      if (authLoggedIn) authLoggedIn.classList.remove("hidden")
      if (mobileAuthLoggedOut) mobileAuthLoggedOut.classList.add("hidden")
      if (mobileAuthLoggedIn) mobileAuthLoggedIn.classList.remove("hidden")
    } else {
      // Show logged out state
      if (authLoggedOut) authLoggedOut.classList.remove("hidden")
      if (authLoggedIn) authLoggedIn.classList.add("hidden")
      if (mobileAuthLoggedOut) mobileAuthLoggedOut.classList.remove("hidden")
      if (mobileAuthLoggedIn) mobileAuthLoggedIn.classList.add("hidden")
    }
  }

  setupLogout() {
    const logoutBtns = document.querySelectorAll("#logout-btn, #mobile-logout-btn")

    logoutBtns.forEach((btn) => {
      if (btn) {
        btn.addEventListener("click", () => {
          this.logout()
        })
      }
    })
  }

  logout() {
    localStorage.removeItem("isAuthenticated")
    localStorage.removeItem("userData")
    localStorage.removeItem("rememberMe")

    // Redirect to home page
    window.location.href = "index.html"
  }
}

// Initialize when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  window.layoutManager = new LayoutManager()
})
