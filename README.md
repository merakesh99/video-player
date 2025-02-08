# Project README

## Table of Contents
- [Project README](#project-readme)
  - [Table of Contents](#table-of-contents)
  - [Project Overview](#project-overview)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Running the Project](#running-the-project)
  - [Folder Structure](#folder-structure)
  - [Technologies Used](#technologies-used)

---

## Project Overview
This project is a **video player application** built with **Next.js**, **Material-UI**, and **TypeScript**. The application allows users to:
- User can upload only video file , can edit video name also.
- User can drag & drop files
- View a list of videos in table List and Grid Format.
- Play videos on a dedicated page.
- Navigate through video details seamlessly.

---

## Prerequisites
Before you begin, ensure you have the following installed:

- **Node.js** (v16 or higher)
- **npm** (v8 or higher) or **yarn** (v1.22 or higher)
- **Git** (optional, for version control)

To verify installation:
```bash
node -v
npm -v
git --version
```

---

## Installation
Follow these steps to set up the project:

1. **Clone the Repository:**
   ```bash
   git clone <repository-url>
   cd <project-folder>
   ```

2. **Install Dependencies:**
   ```bash
   npm install
   # Or if you prefer yarn:
   yarn install
   ```

3. **Environment Variables:**
   Create a `.env.local` file in the root of your project and add the necessary environment variables:
   ```env
   CLOUDINARY_CLOUD_NAME=<your-cloud-name>
   CLOUDINARY_API_KEY=<your-api-key>
   CLOUDINARY_API_SECRET=<your-api-Secret-Key>
   ```
   Replace `<your-cloud-name>` and `<your-api-key>` and `<your-api-Secret-Key>` with actual values.

   For More go to: https://console.cloudinary.com/

---

## Running the Project

1. **Start the Development Server:**
   ```bash
   npm run dev
   # Or with yarn:
   yarn dev
   ```

   The application will be available at: `http://localhost:3000`

2. **Build for Production:**
   ```bash
   npm run build
   # Or with yarn:
   yarn build
   ```

3. **Run Production Build:**
   ```bash
   npm start
   # Or with yarn:
   yarn start
   ```

---

## Folder Structure
```
project-root
├── components          # Reusable React components
├── pages               # Next.js page components
│   ├── api             # API routes
│   └── video           # Video-specific pages
├── public              # Static assets
├── styles              # Global and module CSS files
├── utils               # Utility functions
├── .env.local          # Environment variables
├── package.json        # Project metadata and dependencies
└── README.md           # Documentation
```

---

## Technologies Used
- **Next.js**: React framework for server-side rendering.
- **Material-UI**: UI library for React components.
- **TypeScript**: Strongly typed JavaScript for scalable development.
- **Node.js**: Runtime environment for JavaScript.

---

