# Deployment:  https://devlinkers.netlify.app/

# DevLink: A Developer Social Network Platform

Welcome to DevLink, a social network platform designed for developers to connect, collaborate, and showcase their expertise!

## Features

- **Profile Discovery:** Explore a diverse range of developer profiles.
- **Secure Authentication:** Implement JWT authentication for enhanced security.
- **Persistent Sessions:** Store user tokens to maintain session continuity even after page reloads.
- **Protected Routes:** Ensure content privacy through protected routes.
- **Customizable Profiles:** Create profiles, showcase education, and professional experiences.
- **Interactive Engagement:** Post, comment, and appreciate posts through likes.
- **GitHub Integration:** Display a user's latest five GitHub projects on their profile.

## Getting Started

1. Clone this repository.
2. Install dependencies using `npm install`.
3. If you want to create your mongoDB storage change it in backend/config/db and then change the PROCESS.ENV.MONGO_URI to your mongoDB link
    - if PROCESS.ENV.MONGO_URI is somehow null then you can use .env file and access MONGO_URI value and paste it in this directory backend/config/db and change PROCESS.ENV.MONGO_URI to MONGO_URI value in .env
4. For running the backend and fronted use npm run dev
   - if concurrently is not installed use npm i -g concurrently
   - use package.json for more information

## Technologies Used

- Frontend: React, Redux, React Router
- Backend: Node.js, Express, MongoDB
- JWT Authentication


