# 🚀 SnippetCraft AI - Code Review & Snippet Manager

<div align="center">

![SnippetCraft AI Banner](https://via.placeholder.com/1200x400.png?text=SnippetCraft+AI)

<br/>

[![GitHub](https://img.shields.io/badge/GitHub-View_Code-181717?style=for-the-badge&logo=github)](https://github.com/your-username/code_review_and_snippet_manager)

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge)](https://opensource.org/licenses/MIT)

[![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)](https://nodejs.org/)

[![React](https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev/)

[![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white)](https://mongodb.com/)

</div>


# 📌 Overview

**SnippetCraft AI** is a modern full-stack MERN application designed for developers to create, manage, organize, and analyze code snippets efficiently.

The platform combines a powerful **VS Code-like coding environment** with **AI-powered code review capabilities** using the **Groq API**, allowing developers to detect bugs, improve code quality, and receive intelligent suggestions.

The application implements secure authentication using **JWT with HTTP-only cookies**, robust backend validation using **Joi**, and a scalable architecture following modern MERN development practices.


---

# ✨ Features

## 🤖 AI Powered Code Review

- Integrated with **Groq AI API**
- Analyze source code instantly
- Detect potential bugs and errors
- Receive optimization suggestions
- Improve code quality using AI recommendations


---

## 🔐 Secure Authentication System

- JWT based authentication
- HTTP-only cookie storage
- Protected API routes
- User session management
- Secure login and registration workflow


---

## 🛡️ Data Validation & Security

- Joi schema validation
- Middleware-based request validation
- Prevents invalid user inputs
- Ensures API data consistency


---

## 💻 Advanced Code Editor

Powered by:

- Monaco Editor
- Syntax highlighting
- Multiple programming languages
- VS Code-like editing experience


Supported languages:

- JavaScript
- Python
- Java
- C++
- C
- HTML
- CSS
- More


---

## 📂 Snippet Management

Users can:

✅ Create snippets  
✅ View saved snippets  
✅ Update snippets  
✅ Delete snippets  
✅ Organize code efficiently  


---

## 🎨 Modern User Interface

- Responsive design
- Dark mode interface
- Glassmorphism UI
- Smooth navigation
- Developer-focused experience


---

# 🛠️ Tech Stack


## Frontend

| Technology | Purpose |
|------------|---------|
| React.js | User Interface |
| Vite | Build Tool |
| React Router DOM | Client Side Routing |
| Monaco Editor | Code Editing |
| Axios | API Communication |
| React Icons | UI Icons |


---

## Backend

| Technology | Purpose |
|------------|---------|
| Node.js | Runtime Environment |
| Express.js | Backend Framework |
| MongoDB | Database |
| Mongoose | ODM |
| JWT | Authentication |
| Cookies | Secure Token Storage |
| Joi | Validation |
| Groq SDK | AI Integration |


---

# 📂 Project Structure



code_review_and_snippet_manager/

│
├── backend/
│
│ ├── controllers/
│ │ ├── AuthController.js
│ │ └── EditorController.js
│ │
│ ├── middlewares/
│ │ └── AuthMiddleware.js
│ │
│ ├── models/
│ │ ├── UserModel.js
│ │ └── EditorModel.js
│ │
│ ├── routes/
│ │ ├── AuthRoutes.js
│ │ └── EditorRoutes.js
│ │
│ ├── services/
│ │ └── groq.service.js
│ │
│ ├── db.js
│ ├── server.js
│ └── package.json
│
│
└── frontend/

├── public/
│
├── src/
│
│   ├── assets/
│
│   ├── components/
│   │
│   │   ├── CodeEditor_Component.jsx
│   │   ├── Edit_Snippet_Component.jsx
│   │   ├── Login_Component.jsx
│   │   ├── Register_Component.jsx
│   │   ├── Saved_Snippets.jsx
│   │   └── Update_Profile.jsx
│   │
│   ├── context/
│   │
│   ├── pages/
│   │   └── Profile.jsx
│   │
│   ├── styles/
│   │
│   ├── App.jsx
│   └── main.jsx
│
└── package.json


---

# ⚙️ Installation & Setup


## Requirements

Before starting make sure you have:


- Node.js installed
- MongoDB installed or MongoDB Atlas account
- Groq API Key


---

# 1️⃣ Clone Repository


```bash
git clone https://github.com/your-username/code_review_and_snippet_manager.git

cd code_review_and_snippet_manager
2️⃣ Backend Setup

Move into backend folder:

cd backend

Install dependencies:

npm install

Create .env file:

PORT=3000

MONGO_URI=your_mongodb_connection_string

JWT_SECRET=your_secret_key

GROQ_API_KEY=your_groq_api_key


Start backend server:

npm run dev

Backend will run on:

http://localhost:3000
3️⃣ Frontend Setup

Open another terminal:

cd frontend

Install dependencies:

npm install

Run frontend:

npm run dev

Frontend will run on:

http://localhost:5173
🔑 Authentication Flow
User Registration

        |
        ↓

Password Hashing

        |
        ↓

User Stored In MongoDB

        |
        ↓

Login Request

        |
        ↓

JWT Generated

        |
        ↓

JWT Stored In HTTP-only Cookie

        |
        ↓

Protected Routes Access

🔌 API Endpoints
Authentication Routes
Register User
POST /api/auth/register
Login User
POST /api/auth/login
Logout User
POST /api/auth/logout
Snippet Routes
Create Snippet
POST /api/editor/create
Get Snippets
GET /api/editor/snippets
Update Snippet
PUT /api/editor/update/:id
Delete Snippet
DELETE /api/editor/delete/:id
AI Review API
Analyze Code
POST /api/editor/review

Request:

{
 "language":"javascript",
 "code":"console.log('hello')"
}

Response:

{
 "review":"Your code can be optimized..."
} 

🚀 Future Improvements

Future updates planned:

 AI Chat Assistant
 Code Execution Environment
 Syntax Error Highlighting
 Collaborative Code Editing
 User Dashboard Analytics
 Social Sharing of Snippets
 Code Export Feature
 Multiple AI Model Support
🤝 Contribution

Contributions are welcome!

Steps:

Fork the repository
Create your feature branch
git checkout -b feature/new-feature
Commit changes
git commit -m "Added new feature"
Push changes
git push origin feature/new-feature
Open a Pull Request
🐛 Issues

If you find any bugs or have suggestions, feel free to open an issue.

👨‍💻 Author

Your Name

GitHub:
https://github.com/Talha-Bin-Zubair2125

📄 License

This project is licensed under the MIT License.

You are free to use, modify, and distribute this project.

<div align="center">

⭐ If you like this project, consider giving it a star on GitHub!

</div>

This README is now suitable for a **portfolio-level MERN + AI project** and highlights the parts recruiters usually look for:
- AI integration
- Authentication architecture
- Backend security
- API design
- Project structure
- Scalability roadmap
- Developer documentation

You can directly save this as `README.md` in your repository.