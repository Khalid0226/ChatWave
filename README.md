<div align="center">

# 💬 ChatWave

  <p><strong>An Enterprise-Grade, Real-Time Full-Stack Chat Application</strong></p>
  
  <p>
    <img src="https://img.shields.io/badge/Status-Active%20Development-emerald?style=for-the-badge&logo=git" alt="Status" />
    <img src="https://img.shields.io/badge/License-MIT-blue?style=for-the-badge" alt="License" />
    <img src="https://img.shields.io/badge/PRs-Welcome-brightgreen?style=for-the-badge" alt="PRs Welcome" />
  </p>

  <p>
    <a href="#-overview">Overview</a> •
    <a href="#-key-features">Features</a> •
    <a href="#-architecture--tech-stack">Tech Stack</a> •
    <a href="#-project-directory-structure">Structure</a> •
    <a href="#-getting-started">Getting Started</a>
  </p>
</div>

---

## 🚀 Overview

**ChatWave** is a robust, scalable real-time communication platform engineered with the MERN stack. Designed following modern UI/UX design systems (SaaS-grade glassmorphism and deep-slate palettes), it delivers instant bidirectional messaging, live tracking indicators, and secure session management with zero latency.

---

## ✨ Key Features

- **⚡ Real-Time Bi-Directional Event Streaming:** Built on top of WebSockets via `Socket.io` for instantaneous, zero-delay message delivery.
- **🟢 Dynamic Presence Tracking:** Real-time online/offline status detection for active users.
- **⌨️ Interactive Typing Indicators:** Live indicators showing when a peer is composing a message.
- **🔐 Enterprise Security Standards:** Protected password hashing, secure JWT-based stateless session management, and robust environment isolation.
- **🎨 Modern Glassmorphic Interface:** Crafted with Tailwind CSS, featuring bespoke gradients, dynamic ambient glows, and responsive component design.

---

## 🛠️ Architecture & Tech Stack

### **Frontend Layer**
- **Core Library:** React.js (Powered by Vite for blazing-fast HMR)
- **Styling Framework:** Tailwind CSS 
- **Iconography:** Lucide React
- **State Management:** React Hooks (`useState`, `useEffect`, Context API)

### **Backend Layer**
- **Runtime Environment:** Node.js
- **Framework:** Express.js REST API Architecture
- **Database:** MongoDB & Mongoose ODM (Schema design optimized for quick message querying)
- **Real-Time Engine:** Socket.io Server Engine

---

## 📁 Project Directory Structure

```text
ChatWave/
│
├── frontend/                     # React Vite Single Page Application
│   ├── public/                   # Static assets & favicons
│   ├── src/
|   ├── ├── auth/
│   │   ├── assets/               # Images and global media
│   │   ├── components/           # Reusable UI components (Login, Signup, ChatRoom)
│   │   ├── context/              # State & Socket contexts
│   │   ├── App.jsx               # Root routing component
│   │   ├── main.jsx              # Application mount point
│   │   └── index.css             # Tailwind stylesheet configuration
│   ├── package.json              # Frontend dependencies & scripts
│   └── vite.config.js            # Vite bundler configurations
│
├── backend/                      # Node.js & Express API Server
│   ├── controllers/              # Business logic controllers (Auth, Chat, User)
│   ├── models/                   # Mongoose Database Schemas (User, Message, Chat)
│   ├── routes/                   # API endpoint routers
│   ├── socket/                   # Socket.io event handlers and connection maps
│   ├── .env.example              # Template environment variables
│   ├── server.js                 # Server entry point
│   └── package.json              # Backend dependencies & scripts
│
└── .gitignore                    # Global ignore list (Node modules, env files, build artifacts)
