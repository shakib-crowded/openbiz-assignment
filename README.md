# Open Biz Assignment

A responsive UI form mimicking the Udyam registration process with Aadhaar and PAN verification.

## Features

- Aadhaar number verification with OTP authentication
- PAN card number validation
- Multi-step form with progress tracking
- Responsive design for all devices
- Secure backend API with proper validation

## Tech Stack

**Frontend:**

- React.js with Vite
- Material-UI (MUI) for UI components
- Formik & Yup for form handling
- Axios for API calls

**Backend:**

- Node.js with Express
- MongoDB for database
- Mongoose for ODM

## Live Demo

- Frontend: [Vercel App](https://openbiz-assignment-delta.vercel.app)
- Backend API: [Render Service](https://openbiz-assignment.onrender.com)

## Setup Instructions

### Prerequisites

- Node.js (v16 or higher)
- MongoDB Atlas account
- Git

### Local Development

1. **Clone the repository**
   ```bash
   git clone https://github.com/shakib-crowded/openbiz-assignment.git
   ```
2. **Setup Backend**
   cd backend
   npm install
   cp .env.example .env

Edit .env with your MongoDB credentials and other settings.

3. **Setup Frontend**
   cd ../frontend
   npm install
   cp .env.example .env.local

Set VITE_API_BASE_URL=http://localhost:5000 for local development

4. **Run The Application.**
   In one terminal:

cd backend && npm start

In another terminal:
cd frontend && npm run dev

Environment Variables
Backend (backend/.env)

MONGODB_URI=your_mongodb_connection_string
PORT=5000
OTP_EXPIRE_MINUTES=5
NODE_ENV=development
PORT=5000
MAX_OTP_ATTEMPTS=3
FRONTEND_URL=https://openbiz-assignment-delta.vercel.app/

Frontend (frontend/.env.local)
VITE_API_BASE_URL=http://localhost:5000/api/registration

Deployment
Backend Deployment (Render)
Connect your GitHub repository to Render

Set environment variables

Set build command: npm install

Set start command: node server.js

Frontend Deployment (Vercel)
Import your GitHub repository

Set root directory to client

Set build command: npm run build

Set output directory: dist

Add environment variables

API Endpoints
Endpoint Method Description
/api/registration/verify-aadhaar POST Send OTP to Aadhaar number
/api/registration/verify-otp POST Verify Aadhaar OTP
/api/registration/verify-pan POST Validate PAN number
/api/registration/submit POST Submit complete registration
Project Structure
text
openbiz-assignment/
├── frontend/ # Frontend code
│ ├── public/ # Static assets
│ ├── src/ # React components
│ ├── vite.config.js # Vite configuration
├── backend/ # Backend code
│ ├── controllers/ # Route controllers
│ ├── models/ # MongoDB models
│ ├── routes/ # API routes
│ ├── server.js # Express app
├── .gitignore
└── README.md
Contributing
Fork the project

Create your feature branch (git checkout -b feature/AmazingFeature)

Commit your changes (git commit -m 'Add some amazing feature')

Push to the branch (git push origin feature/AmazingFeature)

Open a Pull Request

License
Distributed under the MIT License. See LICENSE for more information.

Contact
Shakib Ansari - shakibansari7405@gmail.com

Project Link: https://openbiz-assignment-delta.vercel.app/
