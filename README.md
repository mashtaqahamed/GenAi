# Gemini AI Chat App 💬✨

A fully functional, responsive, and visually appealing frontend for a Gemini-style conversational AI chat app — built with **React**, **Redux**, **React Hook Form**, **Zod**, and modern CSS. The app features OTP login, chatroom management, AI-like chat simulation, image uploads, dark mode, and much more.

---

## 🚀 Features

### ✅ Authentication
- OTP-based login/signup using country codes
- Country dial codes fetched from `restcountries.com`
- Simulated OTP send/validate with `setTimeout`
- Form validation using **React Hook Form** + **Zod**

### ✅ Dashboard
- Create/Delete chatrooms
- Toast notifications for actions
- Live search with debounce
- LocalStorage sync
- Optional avatar upload (base64 preview)
- Dark/Light mode switch
- Fully responsive layout

### ✅ Chatroom
- Simulated AI replies with throttled `setTimeout`
- Typing indicator: `"Gemini is typing..."`
- Auto-scroll to latest message
- Reverse infinite scroll using dummy messages
- Pagination (20 messages per page)
- Image upload and preview (no backend needed)
- Copy message to clipboard on hover
- Chat skeleton loader for message delay

---

## 🛠️ Tech Stack

| Category              | Library / Tool                  |
|----------------------|----------------------------------|
| Framework            | React                            |
| State Management     | Redux Toolkit + React Redux      |
| Form Validation      | React Hook Form + Zod            |
| UI Feedback          | React Toastify                   |
| Animation            | Framer Motion                    |
| Debounce             | Lodash.debounce                  |
| Routing              | React Router                     |
| Styling              | CSS Modules / Plain CSS          |
| Deployment           | Netlify                          |
| Accessibility        | Keyboard accessible elements     |
| Persistent Storage   | localStorage                     |

---

## 🧩 Folder Structure

📁 src/
│
├── assets/ # Images and static assets
├── components/ # Reusable UI components (toggle, loader, etc.)
├── pages/
│ ├── Login.jsx
│ ├── Dashboard.jsx
│ └── Chatroom.jsx
│
├── redux/
│ ├── store.js
│ ├── authSlice.js
│ └── chatSlice.js
│
├── App.jsx
├── App.css
└── main.jsx


---

## 🧪 Local Setup Instructions

```bash
# Clone the repo
git clone https://github.com/your-username/gemini-chat-app.git
cd gemini-chat-app

# Install dependencies
npm install

# Start development server
npm run dev


# GenAi
# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
