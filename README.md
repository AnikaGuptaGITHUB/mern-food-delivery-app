# 🍔 Full Stack Food Ordering Website / App

A complete **Food Ordering Web Application** built using **React.js, Node.js, Express.js, MongoDB**, and **Stripe Payment Gateway**.  
This project includes a **User Frontend**, **Admin Panel**, and a **Backend Server** — providing a real-world full-stack development experience.

---

## 🚀 Features

### 🧑‍💻 User Features
- User authentication (Sign Up / Login)
- Browse and search food items
- Add items to cart
- Manage cart (add/remove items)
- Secure checkout using **Stripe**
- View past orders and track order status

### 🛠️ Admin Features
- Admin dashboard to manage food items
- Add, edit, or delete products
- View and update order status
- Manage users and transactions

---

## 🧩 Tech Stack

| Layer | Technology |
|--------|-------------|
| Frontend | React.js, HTML5, CSS3, JavaScript |
| Backend | Node.js, Express.js |
| Database | MongoDB (Mongoose ORM) |
| Payment | Stripe Payment Gateway |
| Authentication | JWT (JSON Web Token) |
| Environment Variables | dotenv |

---

## 📦 Project Structure

food-delivery-app/
│
├── client/ # React Frontend
│ ├── src/
│ ├── public/
│ └── package.json
│
├── admin/ # Admin Panel
│ ├── src/
│ ├── public/
│ └── package.json
│
├── backend/ # Express + MongoDB Server
│ ├── models/
│ ├── routes/
│ ├── controllers/
│ ├── config/
│ ├── server.js
│ └── package.json
│
├── .env # Environment variables (not committed)
├── .gitignore
└── README.md


---

## ⚙️ Installation & Setup

### 1️⃣ Clone the repository
```bash
git clone https://github.com/your-username/food-delivery-app.git
cd food-delivery-app

2️⃣ Backend setup
cd backend
npm install


Create a .env file inside /backend and add:

PORT=4000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
STRIPE_SECRET_KEY=your_stripe_secret_key


Run the backend server:

npm run dev

3️⃣ Frontend setup
cd ../client
npm install
npm run dev

4️⃣ Admin Panel setup 
cd ../admin
npm install
npm run dev