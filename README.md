# 🏠 PrimeStay — PG Booking App

<div align="center">
  <img src="https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=white" />
  <img src="https://img.shields.io/badge/Node.js-Express-339933?style=for-the-badge&logo=node.js&logoColor=white" />
  <img src="https://img.shields.io/badge/MongoDB-Mongoose-47A248?style=for-the-badge&logo=mongodb&logoColor=white" />
  <img src="https://img.shields.io/badge/Vite-Build%20Tool-646CFF?style=for-the-badge&logo=vite&logoColor=white" />
  <img src="https://img.shields.io/badge/TailwindCSS-4-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white" />
</div>

<br/>

> **PrimeStay** is a full-stack PG (Paying Guest) Booking platform designed for LPU students and residents. It allows users to browse, book, and manage PG accommodations with ease.

---

## ✨ Features

- 🔐 **User Authentication** — JWT-based login/signup with bcrypt password hashing
- 🏘️ **PG Listings** — Browse available PG accommodations with details
- 📅 **Booking System** — Book PG rooms and manage reservations
- 📧 **Email Notifications** — Nodemailer integration for booking confirmations
- 🛡️ **Protected Routes** — Middleware-based route protection
- 📱 **Responsive UI** — Mobile-friendly React frontend with TailwindCSS

---

## 🗂️ Project Structure

```
PrimeStayPGBOOKING/
│
├── client/                  # Frontend (React + Vite + TailwindCSS)
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   └── main.jsx
│   ├── index.html
│   ├── vite.config.js
│   └── package.json
│
├── server/                  # Backend (Node.js + Express + MongoDB)
│   ├── config/              # DB config
│   ├── middleware/          # Auth middleware
│   ├── models/              # Mongoose models
│   ├── routes/              # API routes
│   ├── scripts/             # Seed scripts
│   ├── utils/               # Helper utilities
│   ├── server.js            # Entry point
│   └── package.json
│
└── README.md
```

---

## 🛠️ Tech Stack

| Layer      | Technology                          |
|------------|-------------------------------------|
| Frontend   | React 19, React Router DOM, TailwindCSS 4, Vite |
| Backend    | Node.js, Express.js                 |
| Database   | MongoDB (via Mongoose)              |
| Auth       | JWT (jsonwebtoken), bcryptjs        |
| Email      | Nodemailer                          |
| Dev Tools  | Nodemon, ESLint, Vite               |

---

## 🚀 Getting Started

### Prerequisites

- Node.js >= 18
- MongoDB (local or Atlas)
- npm

---

### 1. Clone the Repository

```bash
git clone https://github.com/Prince980kumar/PrimeStayPGBOOKING.git
cd PrimeStayPGBOOKING
```

---

### 2. Setup Server (Backend)

```bash
cd server
npm install
```

Create a `.env` file inside the `server/` folder:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_email_password
```

Start the backend:

```bash
npm run dev
```

> Server runs on `http://localhost:5000`

---

### 3. Setup Client (Frontend)

```bash
cd client
npm install
npm run dev
```

> Frontend runs on `http://localhost:5173`

---

### 4. Seed Database (Optional)

```bash
cd server
npm run seed
```

---

## 📡 API Endpoints

| Method | Endpoint              | Description              |
|--------|-----------------------|--------------------------|
| POST   | `/api/auth/register`  | Register new user        |
| POST   | `/api/auth/login`     | Login user               |
| GET    | `/api/pg`             | Get all PG listings      |
| POST   | `/api/booking`        | Create a booking         |
| GET    | `/api/booking/:id`    | Get booking details      |

---

## 🤝 Contributing

Contributions are welcome! Feel free to fork this repo and submit pull requests.

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 👨‍💻 Author

**Prince Kumar**
- GitHub: [@Prince980kumar](https://github.com/Prince980kumar)

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

<div align="center">
  Made with ❤️ for LPU Students
</div>
