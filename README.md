# 🛒 NovaCart - Full Stack E-commerce Website Challenge

NovaCart is a modern full-stack e-commerce web application that I'm building completely from scratch as part of my daily coding challenge.

---

# 🚀 Live Links

### 🌐 Live Website
https://novacart-topaz.vercel.app/

### ⚙️ Backend API
https://novacart-backend-45p2.onrender.com

---

# 📅 Day 1 Progress

Today I completed the foundation of the project.

## 🎨 Frontend

- ✅ Built Responsive Home Page
- ✅ Created Reusable Product Card Component
- ✅ Added Professional Navbar
- ✅ Added Responsive Footer
- ✅ Connected Frontend with Backend using Axios
- ✅ Displayed Products from MongoDB
- ✅ Implemented Loading State

---

## ⚙️ Backend

- ✅ Production-ready MVC Architecture
- ✅ Connected MongoDB with Mongoose
- ✅ Created Product APIs
- ✅ Custom Error Handling Middleware
- ✅ Built ErrorMaker Class for Consistent Error Responses
- ✅ Clean and Scalable Code Structure

---

# 🚀 Deployment

| Service | Platform |
|---------|----------|
| Frontend | Vercel |
| Backend | Render |

---

# 🛠️ Tech Stack

## Frontend

- React
- Vite
- Tailwind CSS
- Redux Toolkit
- Axios

## Backend

- Node.js
- Express.js
- MongoDB
- Mongoose

---

# 🎯 Upcoming Features

- Product Details Page
- Shopping Cart
- Wishlist
- Authentication
- Search
- Category Filter
- Checkout
- Payment Integration
- User Profile
- Orders
- Admin Dashboard

---


Stay tuned for **Day 2** 🚀

## ⭐ If you like this project, don't forget to star the repository.

---

# 📅 Day 2 – Authentication & Redux Integration

## 🚀 What I Accomplished

Today, I focused on implementing the authentication module while following a clean and scalable project architecture.

### ✅ Frontend
- Built a fully responsive **Login Page**
- Built a fully responsive **Register Page**
- Improved the overall UI using **Tailwind CSS**
- Added loading states for authentication requests
- Added proper form handling and validation

### ✅ Redux Toolkit
- Created an **Auth Slice**
- Managed global authentication state
- Implemented:
  - `loading`
  - `isAuthenticated`
  - `user`
  - `error`

### ✅ Dynamic Navbar
Implemented conditional rendering based on authentication status.

- Before Login
  - Login Button
  - Register Button

- After Login
  - Greeting with User Name
  - Cart Icon

### ✅ Authentication Planning
Researched and planned a production-level authentication flow using:
- JWT Authentication
- HTTP-only Cookies
- Redux Toolkit
- Persistent Login (`Load User`)

---

## 📚 Key Learnings

Today I learned how real-world applications manage authentication state using Redux Toolkit instead of local component state. I also understood why production applications use HTTP-only cookies and the `Load User` approach to keep users logged in after refreshing the page.

---

## 🎯 Next Goals (Day 3)

- Implement JWT Authentication
- Store Token in HTTP-only Cookies
- Build `GET /me` API
- Persistent Login after Refresh
- Protected Routes
- Logout Functionality