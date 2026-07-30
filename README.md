# 🚀 SnippetCraft AI - Code Review & Snippet Manager

---

# 📌 Overview

**SnippetCraft AI** is a modern full-stack MERN application designed for developers to create, manage, organize, and analyze code snippets efficiently.

The platform combines a powerful **VS Code-like coding environment** with **AI-powered code review capabilities** using the **Groq API**, allowing developers to detect bugs, improve code quality, and receive intelligent suggestions.

The application implements secure authentication using **JWT with HTTP-only cookies**, robust backend validation using **Joi**, and a scalable architecture following modern MERN development practices.

---

# ✨ Features

## 🤖 AI-Powered Code Review

* Integrated with **Groq AI API**
* Analyze source code instantly
* Detect potential bugs and errors
* Receive optimization suggestions
* Improve code quality using AI recommendations

## 🔐 Secure Authentication System

* JWT-based authentication
* HTTP-only cookie storage
* Protected API routes
* User session management
* Secure login and registration workflow

## 🛡️ Data Validation & Security

* Joi schema validation
* Middleware-based request validation
* Prevents invalid user inputs
* Ensures API data consistency

## 💻 Advanced Code Editor

Powered by **Monaco Editor**:

* Syntax highlighting
* Multiple programming languages
* VS Code-like editing experience
* **Supported Languages:** JavaScript, Python, Java, C++, C, HTML, CSS, and more.

## 📂 Snippet Management

* Create snippets
* View saved snippets
* Update snippets
* Delete snippets
* Organize code efficiently

## 🎨 Modern User Interface

* Responsive design
* Dark mode interface
* Glassmorphism UI
* Smooth navigation
* Developer-focused experience

---

# 🛠️ Tech Stack

## Frontend

| Technology | Purpose |
| --- | --- |
| React.js | User Interface |
| Vite | Build Tool |
| React Router DOM | Client-Side Routing |
| Monaco Editor | Code Editing |
| Axios | API Communication |
| React Icons | UI Icons |

## Backend

| Technology | Purpose |
| --- | --- |
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

```text
code_review_and_snippet_manager/
│
├── backend/
│   ├── controllers/
│   │   ├── AuthController.js
│   │   └── EditorController.js
│   ├── middlewares/
│   │   └── AuthMiddleware.js
│   ├── models/
│   │   ├── EditorModel.js
│   │   └── UserModel.js
│   ├── routes/
│   │   ├── AuthRoutes.js
│   │   └── EditorRoutes.js
│   ├── services/
│   │   └── groq.service.js
│   ├── db.js
│   ├── server.js
│   └── package.json
│
└── frontend/
    ├── public/
    ├── src/
    │   ├── assets/
    │   ├── components/
    │   │   ├── CodeEditor_Component.jsx
    │   │   ├── Edit_Snippet_Component.jsx
    │   │   ├── Login_Component.jsx
    │   │   ├── Register_Component.jsx
    │   │   ├── Saved_Snippets.jsx
    │   │   └── Update_Profile.jsx
    │   ├── context/
    │   ├── pages/
    │   │   └── Profile.jsx
    │   ├── styles/
    │   ├── App.jsx
    │   └── main.jsx
    └── package.json

```

---

# ⚙️ Installation & Setup

## Prerequisites

Before starting, make sure you have:

* Node.js installed
* MongoDB installed or a MongoDB Atlas account
* Groq API Key

---

### 1️⃣ Clone Repository

```bash
git clone https://github.com/Talha-Bin-Zubair2125/backend_projects.git
cd code_review_and_snippet_manager

```

### 2️⃣ Backend Setup

Move into the backend folder:

```bash
cd backend

```

Install dependencies:

```bash
npm install

```

Create a `.env` file in the backend root directory:

```env
PORT=3000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
GROQ_API_KEY=your_groq_api_key

```

Start the backend development server:

```bash
npm run dev

```

*(Backend will run on `http://localhost:3000`)*

### 3️⃣ Frontend Setup

Open another terminal window, navigate to the frontend folder, and install dependencies:

```bash
cd frontend
npm install

```

Run the frontend development server:

```bash
npm run dev

```

*(Frontend will run on `http://localhost:5173`)*

---

# 🔑 Authentication Flow

```text
User Registration 
       │
       ▼
Password Hashing 
       │
       ▼
User Stored In MongoDB 
       │
       ▼
Login Request 
       │
       ▼
JWT Generated 
       │
       ▼
JWT Stored In HTTP-only Cookie 
       │
       ▼
Protected Routes Access

```

---

# 🔌 API Endpoints

### Authentication Routes

* **Register User:** `POST /api/auth/register`
* **Login User:** `POST /api/auth/login`
* **Logout User:** `POST /api/auth/logout`

### Snippet Routes

* **Create Snippet:** `POST /api/editor/create`
* **Get Snippets:** `GET /api/editor/snippets`
* **Update Snippet:** `PUT /api/editor/update/:id`
* **Delete Snippet:** `DELETE /api/editor/delete/:id`

### AI Review API

* **Analyze Code:** `POST /api/editor/review`

**Request Example:**

```json
{
  "language": "javascript",
  "code": "console.log('hello')"
}

```

**Response Example:**

```json
{
  "review": "Your code can be optimized..."
}

```

---

# 🚀 Future Improvements

* 🤖 AI Chat Assistant
* ⚡ Code Execution Environment
* 🔍 Syntax Error Highlighting
* 👥 Collaborative Code Editing
* 📊 User Dashboard Analytics
* 🌐 Social Sharing of Snippets
* 📥 Code Export Feature
* 🔄 Multiple AI Model Support

---

# 🤝 Contribution

Contributions are welcome! Follow these steps:

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/new-feature`)
3. Commit changes (`git commit -m "Added new feature"`)
4. Push changes (`git push origin feature/new-feature`)
5. Open a Pull Request

---

# 🐛 Issues

If you find any bugs or have suggestions, feel free to open an issue.

---

# 👨‍💻 Author

**Talha Bin Zubair**

GitHub: [Talha-Bin-Zubair2125](https://github.com/Talha-Bin-Zubair2125)

---

# 📄 License

This project is licensed under the **MIT License**. You are free to use, modify, and distribute this project.

⭐ If you like this project, consider giving it a star on GitHub!
