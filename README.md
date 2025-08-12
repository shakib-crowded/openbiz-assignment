# 🚀 Open Biz Assignment

A **responsive multi-step UI form** inspired by the _Udyam Registration_ process, featuring **Aadhaar** and **PAN** verification with OTP authentication.

---

## ✨ Features

- 🔐 **Aadhaar Number Verification** with OTP authentication
- 🆔 **PAN Card Number Validation**
- 🧩 **Multi-step Form** with progress tracking
- 📱 **Responsive Design** for all devices
- 🛡️ **Secure Backend API** with proper validation

---

## 🛠 Tech Stack

**Frontend**

- ⚛️ React.js (Vite)
- 🎨 Material-UI (MUI)
- 📝 Formik + Yup (Form handling & validation)
- 🔗 Axios (API calls)

**Backend**

- 🟩 Node.js with Express
- 🍃 MongoDB + Mongoose (ODM)

---

## 🌐 Live Demo

- **Frontend:** [Vercel App](https://openbiz-assignment-delta.vercel.app)
- **Backend API:** [Render Service](https://openbiz-assignment.onrender.com)

---

## 📦 Setup Instructions

### ✅ Prerequisites

- Node.js (v16+)
- MongoDB Atlas account
- Git

---

### 🔹 Clone the Repository

```bash
git clone https://github.com/shakib-crowded/openbiz-assignment.git
🔹 Backend Setup

cd backend
npm install
cp .env.example .env
Edit .env with your MongoDB credentials and other settings.

Example .env


MONGODB_URI=your_mongodb_connection_string
PORT=5000
OTP_EXPIRE_MINUTES=5
NODE_ENV=development
MAX_OTP_ATTEMPTS=3
FRONTEND_URL=https://openbiz-assignment-delta.vercel.app/
🔹 Frontend Setup

cd ../frontend
npm install
cp .env.example .env.local
Example .env.local


VITE_API_BASE_URL=http://localhost:5000/api/registration
🖥 Local Development
In one terminal:

cd backend && npm start
In another terminal:

cd frontend && npm run dev
🚀 Deployment
Backend (Render)
Connect GitHub repository to Render

Root Directory: backend

Build Command:

npm install
Start Command:

node server.js
Add all environment variables from .env

Frontend (Vercel)
Import GitHub repository into Vercel

Root Directory: frontend

Build Command:

npm run build
Output Directory: dist

Set environment variable:


VITE_API_BASE_URL=https://<your-backend-url>/api/registration
📡 API Endpoints
Endpoint	Method	Description
/api/registration/verify-aadhaar	POST	Send OTP to Aadhaar number
/api/registration/verify-otp	POST	Verify Aadhaar OTP
/api/registration/verify-pan	POST	Validate PAN number
/api/registration/submit	POST	Submit complete registration

📂 Project Structure

openbiz-assignment/
├── frontend/              # Frontend code
│   ├── public/            # Static assets
│   ├── src/               # React components
│   └── vite.config.js     # Vite configuration
│
├── backend/               # Backend code
│   ├── controllers/       # Route controllers
│   ├── models/            # MongoDB models
│   ├── routes/            # API routes
│   └── server.js          # Express app entry point
│
├── .gitignore
└── README.md
🤝 Contributing
Fork the project

Create your feature branch

git checkout -b feature/AmazingFeature
Commit your changes


git commit -m 'Add some amazing feature'
Push to the branch


git push origin feature/AmazingFeature
Open a Pull Request

📜 License
Distributed under the MIT License. See LICENSE for more information.

📬 Contact
Shakib Ansari
📧 Email: shakibansari7405@gmail.com
🔗 Project Link: https://openbiz-assignment-delta.vercel.app/

```
