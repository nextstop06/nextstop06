// Profile page JavaScript for NextStop

class ProfileManager {
  constructor() {
    this.userData = this.loadUserData()
    this.init()
  }

  loadUserData() {
    try {
      return (
        JSON.parse(localStorage.getItem("userData")) || {
          firstName: "John",
          lastName: "Doe",
          email: "john.doe@example.com",
          phone: "+1 (555) 123-4567",
        }
      )
    } catch {
      return {
        firstName: "John",
        lastName: "Doe",
        email: "john.doe@example.com",
        phone: "+1 (555) 123-4567",
      }
    }
  }

  init() {
    if (!localStorage.getItem("isAuthenticated")) {
      window.location.href = "auth.html"
      return
    }

    this.populateProfile()
    this.loadBookings()
    this.setupEventListeners()
  }

  populateProfile() {
    document.getElementById("profile-name").textContent = `${this.userData.firstName} ${this.userData.lastName}`
    document.getElementById("profile-email").textContent = this.userData.email

    document.getElementById("firstName").value = this.userData.firstName
    document.getElementById("lastName").value = this.userData.lastName
    document.getElementById("email").value = this.userData.email
    document.getElementById("phone").value = this.userData.phone
  }

  setupEventListeners() {
    const profileForm = document.getElementById("profile-form")
    if (profileForm) {
      profileForm.addEventListener("submit", (e) => this.handleProfileUpdate(e))
    }
  }

  handleProfileUpdate(e) {
    e.preventDefault()

    const firstName = document.getElementById("firstName").value
    const lastName = document.getElementById("lastName").value
    const email = document.getElementById("email").value
    const phone = document.getElementById("phone").value

    if (!firstName || !lastName || !email || !phone) {
      this.showNotification("Please fill in all fields", "error")
      return
    }

    if (!this.isValidEmail(email)) {
      this.showNotification("Please enter a valid email address", "error")
      return
    }

    const submitBtn = e.target.querySelector('button[type="submit"]')
    const hideSpinner = this.showLoadingSpinner(submitBtn, "Updating...")

    setTimeout(() => {
      hideSpinner()

      // Update user data
      this.userData = { firstName, lastName, email, phone }
      localStorage.setItem("userData", JSON.stringify(this.userData))

      // Update profile display
      this.populateProfile()

      this.showNotification("Profile updated successfully!", "success")
    }, 1500)
  }

  loadBookings() {
    const bookings = JSON.parse(localStorage.getItem("bookings") || "[]")
    const bookingsList = document.getElementById("bookings-list")

    if (!bookingsList) return

    if (bookings.length === 0) {
      bookingsList.innerHTML = `
                <div class="no-bookings" style="text-align: center; padding: 2rem; color: var(--muted-foreground);">
                    <svg class="icon" style="width: 3rem; height: 3rem; margin-bottom: 1rem;" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                        <circle cx="9" cy="7" r="4"></circle>
                        <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                        <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                    </svg>
                    <h3 style="margin-bottom: 0.5rem;">No bookings yet</h3>
                    <p style="margin-bottom: 1rem;">Your booking history will appear here</p>
                    <a href="index.html" class="btn btn-primary">Book Your First Trip</a>
                </div>
            `
      return
    }

    const bookingCards = bookings
      .map(
        (booking) => `
            <div class="booking-item">
                <div class="booking-header">
                    <span class="booking-bus">Bus ${booking.busId}</span>
                    <span class="booking-date">${new Date(booking.date).toLocaleDateString()}</span>
                </div>
                <div class="booking-route">${booking.route}</div>
                <div style="display: flex; justify-content: space-between; align-items: center; margin-top: 0.5rem;">
                    <span style="font-size: 0.875rem; color: var(--muted-foreground);">${booking.time}</span>
                    <span style="font-weight: 600; color: var(--primary-color);">${booking.price}</span>
                </div>
            </div>
        `,
      )
      .join("")

    bookingsList.innerHTML = bookingCards
  }

  isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }

  showNotification(message, type = "info") {
    const notification = document.createElement("div")
    notification.className = `notification notification-${type}`
    notification.style.cssText = `
            position: fixed;
            top: 1rem;
            right: 1rem;
            z-index: 1000;
            padding: 1rem;
            border-radius: var(--radius);
            background-color: var(--card);
            border: 1px solid var(--border);
            box-shadow: var(--shadow-lg);
            color: var(--card-foreground);
            font-size: 0.875rem;
            transform: translateX(100%);
            transition: transform 0.3s ease-in-out;
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

    // Animate in
    setTimeout(() => {
      notification.style.transform = "translateX(0)"
    }, 10)

    // Auto remove
    setTimeout(() => {
      notification.style.transform = "translateX(100%)"
      setTimeout(() => {
        if (notification.parentNode) {
          notification.parentNode.removeChild(notification)
        }
      }, 300)
    }, 5000)
  }

  showLoadingSpinner(button, text) {
    const originalText = button.innerHTML
    button.innerHTML = `
            <svg class="icon animate-spin" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                <path d="M9 12l2 2 4-4"></path>
            </svg>
            ${text}
        `
    button.disabled = true

    return () => {
      button.innerHTML = originalText
      button.disabled = false
    }
  }
}

// Initialize when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  window.profileManager = new ProfileManager()
})

// Add CSS for animations
const style = document.createElement("style")
style.textContent = `
    @keyframes spin {
        from { transform: rotate(0deg); }
        to { transform: rotate(360deg); }
    }
    
    .animate-spin {
        animation: spin 1s linear infinite;
    }
`
document.head.appendChild(style)
