# 🍽️ FoodFlow AI

> An AI-powered food ordering platform that combines intelligent meal recommendations with a modern food delivery experience.

![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react)
![FastAPI](https://img.shields.io/badge/FastAPI-0.115-009688?style=for-the-badge&logo=fastapi)
![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-47A248?style=for-the-badge&logo=mongodb)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-4-38BDF8?style=for-the-badge&logo=tailwindcss)
![Framer Motion](https://img.shields.io/badge/Framer_Motion-Animations-black?style=for-the-badge)

---

## 📖 Overview

FoodFlow AI is a full-stack AI-powered food ordering platform built using **React**, **FastAPI**, and **MongoDB**.

The application combines modern food ordering with AI-assisted meal discovery, allowing users to search food naturally, manage carts, place orders, and explore personalized recommendations.

---

# ✨ Features

### 👤 Authentication
- User Registration
- Secure Login
- JWT Authentication
- Protected Routes

---

### 🤖 AI Food Search

- Natural language search
- Smart food recommendations
- AI intent-based matching
- Personalized suggestions
- Recommendation reasons

Examples:

- "Veg food under ₹300"
- "High protein dinner"
- "Spicy noodles"
- "Healthy breakfast"

---

### 🍕 Menu

- Dynamic menu from MongoDB
- Search
- Category filtering
- Sorting
- Responsive cards
- Food details

---

### 🛒 Shopping Cart

- Add to Cart
- Remove Items
- Quantity Management
- Live Cart Total
- Backend Integration

---

### 📦 Orders

- Place Orders
- View Previous Orders
- Live Order Status
- Order History

---

### 📊 Dashboard

- Revenue Statistics
- Total Orders
- Order Status Distribution
- Popular Items
- Recent Orders

---

### 🎨 UI/UX

- Premium Landing Page
- Responsive Design
- Glassmorphism
- Framer Motion Animations
- Modern Food UI
- Mobile Friendly

---

# 🛠 Tech Stack

## Frontend

- React 19
- Vite
- Tailwind CSS
- Framer Motion
- React Router
- Axios
- React Hot Toast
- Lucide Icons

---

## Backend

- FastAPI
- Python
- MongoDB Atlas
- Motor
- JWT Authentication
- Groq AI Integration

---

# 📂 Project Structure

```
FoodFlow-AI
│
├── client
│   ├── src
│   │   ├── api
│   │   ├── components
│   │   ├── context
│   │   ├── pages
│   │   └── assets
│   └── package.json
│
├── server
│   ├── app
│   │   ├── routers
│   │   ├── services
│   │   ├── database
│   │   ├── schemas
│   │   └── ai
│   └── main.py
│
└── README.md
```

---

# 🚀 Getting Started

## Clone Repository

```bash
git clone https://github.com/nikhilchavan2004/foodflow-ai.git
```

---

## Frontend

```bash
cd client
npm install
npm run dev
```

Runs on

```
http://localhost:5173
```

---

## Backend

```bash
cd server

pip install -r requirements.txt

python -m uvicorn main:app --reload
```

Runs on

```
http://localhost:8000
```

Swagger API

```
http://localhost:8000/docs
```

---

# 🔐 Environment Variables

### Frontend

```
VITE_API_BASE_URL=http://localhost:8000
```

---

### Backend

```
MONGODB_URL=YOUR_MONGODB_CONNECTION

DATABASE_NAME=foodflow

JWT_SECRET=YOUR_SECRET

GROQ_API_KEY=YOUR_GROQ_API_KEY
```

---

# 📸 Screenshots

> Add screenshots of:

- Home Page
- AI Search
- Menu
- Cart
- Dashboard
- Orders

---

# 🔮 Future Improvements

- AI Nutrition Planner
- Payment Gateway
- Live Order Tracking
- Push Notifications
- Voice Search
- Admin Panel
- Food Recommendation Analytics

---

# 👨‍💻 Developed By

**Nikhil Chavan**

📧 nikhilchavan4002@gmail.com

🔗 LinkedIn

https://www.linkedin.com/in/nikhil-chavan-795798256

🔗 GitHub

https://github.com/nikhilchavan2004

---

