// Index page JavaScript

class IndexPage {
  constructor() {
    this.busesData = [
      {
        id: "12A",
        time: "10:30 AM",
        totalSeats: 40,
        availableMen: 10,
        availableWomen: 8,
        route: "Central Station → North Terminal",
        duration: "2h 30m",
        price: "$25",
      },
      {
        id: "45B",
        time: "11:15 AM",
        totalSeats: 50,
        availableMen: 20,
        availableWomen: 15,
        route: "South Terminal → East Station",
        duration: "3h 15m",
        price: "$30",
      },
      {
        id: "78C",
        time: "12:45 PM",
        totalSeats: 45,
        availableMen: 15,
        availableWomen: 12,
        route: "Central Station → South Terminal",
        duration: "2h 45m",
        price: "$28",
      },
    ]
    this.init()
  }

  init() {
    this.setupSearchForm()
    this.setupDateInput()
    this.renderBuses()
    this.setupBookingButtons()
  }

  setupSearchForm() {
    const searchForm = document.getElementById("search-form")
    if (searchForm) {
      searchForm.addEventListener("submit", (e) => {
        e.preventDefault()
        this.handleSearch()
      })
    }
  }

  setupDateInput() {
    const dateInput = document.getElementById("date-input")
    if (dateInput) {
      // Set minimum date to today
      const today = new Date().toISOString().split("T")[0]
      dateInput.min = today
      dateInput.value = today
    }
  }

  handleSearch() {
    const from = document.getElementById("from-select").value
    const to = document.getElementById("to-select").value
    const date = document.getElementById("date-input").value

    if (!from || !to || !date) {
      alert("Please fill in all search fields")
      return
    }

    // Scroll to buses section
    const busesSection = document.querySelector(".buses-section")
    if (busesSection) {
      busesSection.scrollIntoView({ behavior: "smooth" })
    }

    // Filter and re-render buses (for demo, we'll show all)
    this.renderBuses()
  }

  renderBuses() {
    const busesGrid = document.getElementById("buses-grid")
    if (!busesGrid) return

    const busCards = this.busesData.map((bus) => this.createBusCard(bus)).join("")
    busesGrid.innerHTML = busCards
  }

  createBusCard(bus) {
    return `
            <div class="bus-card">
                <div class="bus-card-header">
                    <div class="bus-card-title-row">
                        <h3 class="bus-card-title">Bus No: ${bus.id}</h3>
                        <span class="bus-card-time">${bus.time}</span>
                    </div>
                    <div class="bus-card-route">
                        <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                            <circle cx="12" cy="10" r="3"></circle>
                        </svg>
                        <span>${bus.route}</span>
                    </div>
                    <div class="bus-card-duration">
                        <div style="display: flex; align-items: center; gap: 0.25rem;">
                            <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <circle cx="12" cy="12" r="10"></circle>
                                <polyline points="12,6 12,12 16,14"></polyline>
                            </svg>
                            <span>${bus.duration}</span>
                        </div>
                        <span class="bus-card-price">${bus.price}</span>
                    </div>
                </div>

                <div class="bus-card-content">
                    <div class="bus-stats">
                        <div class="bus-stat">
                            <span class="bus-stat-number">${bus.totalSeats}</span>
                            <span class="bus-stat-label">Total Seats</span>
                        </div>
                        <div class="bus-stat">
                            <span class="bus-stat-number">${bus.availableMen}</span>
                            <span class="bus-stat-label">Available (Men)</span>
                        </div>
                        <div class="bus-stat">
                            <span class="bus-stat-number">${bus.availableWomen}</span>
                            <span class="bus-stat-label">Available (Women)</span>
                        </div>
                    </div>

                    <button class="btn btn-primary bus-book-btn" data-bus-id="${bus.id}">
                        <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                            <circle cx="9" cy="7" r="4"></circle>
                            <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                            <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                        </svg>
                        Book Now
                    </button>
                </div>
            </div>
        `
  }

  setupBookingButtons() {
    document.addEventListener("click", (e) => {
      if (e.target.closest(".bus-book-btn")) {
        const busId = e.target.closest(".bus-book-btn").dataset.busId
        this.handleBooking(busId)
      }
    })
  }

  handleBooking(busId) {
    const bus = this.busesData.find((b) => b.id === busId)
    if (!bus) return

    // Check if user is authenticated
    const isAuthenticated = localStorage.getItem("isAuthenticated") === "true"
    if (!isAuthenticated) {
      alert("Please login to book a bus")
      window.location.href = "auth.html"
      return
    }

    // Show booking confirmation
    const confirmed = confirm(`Book Bus ${bus.id} (${bus.time}) for ${bus.price}?`)
    if (confirmed) {
      this.processBooking(bus)
    }
  }

  processBooking(bus) {
    const bookBtn = event.target.closest(".bus-book-btn")
    const originalText = bookBtn.innerHTML

    bookBtn.innerHTML = `
            <svg class="icon animate-spin" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                <path d="M9 12l2 2 4-4"></path>
            </svg>
            Booking...
        `
    bookBtn.disabled = true

    setTimeout(() => {
      bookBtn.innerHTML = originalText
      bookBtn.disabled = false
      alert(`Successfully booked Bus ${bus.id}! Confirmation details will be sent to your email.`)
    }, 2000)
  }
}

// Initialize when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  window.indexPage = new IndexPage()
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
