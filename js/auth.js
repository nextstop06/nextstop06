// Authentication JavaScript for NextStop

class AuthForm {
  constructor() {
    this.init()
  }

  init() {
    // Handle login form
    const loginForm = document.getElementById("login-form")
    if (loginForm) {
      loginForm.addEventListener("submit", (e) => this.handleLogin(e))
    }

    // Handle signup form
    const signupForm = document.getElementById("signup-form")
    if (signupForm) {
      signupForm.addEventListener("submit", (e) => this.handleSignup(e))
    }

    // Handle form switching
    this.setupFormSwitching()
  }

  setupFormSwitching() {
    const showSignupBtn = document.getElementById("show-signup")
    const showLoginBtn = document.getElementById("show-login")
    const loginContainer = document.getElementById("login-container")
    const signupContainer = document.getElementById("signup-container")

    if (showSignupBtn && showLoginBtn && loginContainer && signupContainer) {
      showSignupBtn.addEventListener("click", () => {
        loginContainer.classList.add("hidden")
        signupContainer.classList.remove("hidden")
      })

      showLoginBtn.addEventListener("click", () => {
        signupContainer.classList.add("hidden")
        loginContainer.classList.remove("hidden")
      })
    }
  }

  handleLogin(e) {
    e.preventDefault()

    const email = document.getElementById("login-email").value
    const password = document.getElementById("login-password").value
    const remember = document.getElementById("remember").checked

    if (!email || !password) {
      this.showError("Please fill in all fields")
      return
    }

    if (!this.isValidEmail(email)) {
      this.showError("Please enter a valid email address")
      return
    }

    const submitBtn = e.target.querySelector('button[type="submit"]')
    const hideSpinner = this.showLoadingSpinner(submitBtn, "Signing In...")

    setTimeout(() => {
      hideSpinner()

      // Store user data
      const userData = {
        email: email,
        firstName: "John",
        lastName: "Doe",
        phone: "+1 (555) 123-4567",
      }

      localStorage.setItem("isAuthenticated", "true")
      localStorage.setItem("userData", JSON.stringify(userData))

      if (remember) {
        localStorage.setItem("rememberMe", "true")
      }

      // Redirect to home page
      window.location.href = "index.html"
    }, 1500)
  }

  handleSignup(e) {
    e.preventDefault()

    const firstName = document.getElementById("firstName").value
    const lastName = document.getElementById("lastName").value
    const email = document.getElementById("signup-email").value
    const phone = document.getElementById("phone").value
    const password = document.getElementById("signup-password").value
    const confirmPassword = document.getElementById("confirmPassword").value
    const terms = document.getElementById("terms").checked

    if (!firstName || !lastName || !email || !phone || !password || !confirmPassword) {
      this.showError("Please fill in all fields")
      return
    }

    if (!this.isValidEmail(email)) {
      this.showError("Please enter a valid email address")
      return
    }

    if (password.length < 6) {
      this.showError("Password must be at least 6 characters long")
      return
    }

    if (password !== confirmPassword) {
      this.showError("Passwords do not match")
      return
    }

    if (!terms) {
      this.showError("Please agree to the Terms of Service and Privacy Policy")
      return
    }

    const submitBtn = e.target.querySelector('button[type="submit"]')
    const hideSpinner = this.showLoadingSpinner(submitBtn, "Creating Account...")

    setTimeout(() => {
      hideSpinner()

      // Store user data
      const userData = {
        firstName: firstName,
        lastName: lastName,
        email: email,
        phone: phone,
      }

      localStorage.setItem("isAuthenticated", "true")
      localStorage.setItem("userData", JSON.stringify(userData))

      // Redirect to home page
      window.location.href = "index.html"
    }, 2000)
  }

  isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }

  showError(message) {
    const existingError = document.querySelector(".error-message")
    if (existingError) {
      existingError.remove()
    }

    const errorDiv = document.createElement("div")
    errorDiv.className = "error-message"
    errorDiv.style.cssText = `
            background-color: #fef2f2;
            border: 1px solid #ef4444;
            color: #dc2626;
            padding: 0.75rem;
            border-radius: var(--radius);
            margin-bottom: 1rem;
            font-size: 0.875rem;
        `
    errorDiv.textContent = message

    const form = document.querySelector(".auth-form")
    form.insertBefore(errorDiv, form.firstChild)

    // Remove error after 5 seconds
    setTimeout(() => {
      if (errorDiv.parentNode) {
        errorDiv.remove()
      }
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
  new AuthForm()
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
