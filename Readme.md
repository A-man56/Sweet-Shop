# Sweet Shop - MERN Application

A simple MERN stack application for managing sweet products with image uploads.

---

## 📌 Project Overview

Sweet Shop is a full‑stack web app that allows users to:

* View and search sweets
* Add and manage sweet items (admin)
* Upload product images (Cloudinary)

Technologies used: **React, Node.js, Express, MongoDB, Cloudinary**.

---

## ⚙️ Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/A-man56/Sweet-Shop
cd SweetShop
```

### 2. Backend Setup

```bash
cd backend
npm install
```

Create `.env`:

```
MONGO_URI=...
CLOUDINARY_CLOUD_NAME=...
CLOUDINARY_API_KEY=...
CLOUDINARY_API_SECRET=...
PORT=5000
```

Run backend:

```bash
npm run dev
```

### 3. Frontend Setup

```bash
cd frontend
npm install
npm run dev
```
Create `.env`:

```
VITE_CLOUDINARY_CLOUD_NAME=...
VITE_CLOUDINARY_UPLOAD_PRESET=...

Frontend runs at:

```
http://localhost:5173
```

---

## 🧪 Test Report (Sample)

```
PASS backend/tests/sweets.test.js
✓ GET /sweets works
✓ POST /sweets works
```

---

## 🖼️ Screenshots

(Add your images here)

---

## 🤖 My AI Usage

AI was used only for:

* Generating documentation (this README)
* Explaining Git commands
* Minor debugging assistance
* Some Coding assistance

Project logic, structure, and most of the code were written manually.

---

## 🌍 Deployment (Optional)

Add link if deployed:

```
https://your-app.vercel.app
```

---

## 📞 Contact

[your-email@example.com](mailto:your-email@example.com)
