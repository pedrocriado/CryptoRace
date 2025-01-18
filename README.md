![Express](https://img.shields.io/badge/-Express-373737?style=for-the-badge&logo=Express&logoColor=white)
![HTML5](https://img.shields.io/badge/html5-%23E34F26.svg?style=for-the-badge&logo=html5&logoColor=white)
![GraphQL](https://img.shields.io/badge/GraphQl-E10098?style=for-the-badge&logo=graphql&logoColor=white)
![MongoDB](https://img.shields.io/badge/-MongoDB-13aa52?style=for-the-badge&logo=mongodb&logoColor=white)
![NginX](https://img.shields.io/badge/Nginx-009639?logo=nginx&logoColor=white&style=for-the-badge)
![Node.JS](https://img.shields.io/badge/Node%20js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Redis](https://img.shields.io/badge/Redis-DC382D?style=for-the-badge&logo=redis&logoColor=white)
![Socket.IO](https://img.shields.io/badge/Socket.io-010101?&style=for-the-badge&logo=Socket.io&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-grey?style=for-the-badge&logo=tailwind-css&logoColor=38B2AC)
![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=Vite&logoColor=white)


# CryptoRace

A competitive cryptography web application where users solve cryptography problems and compete on leaderboards.

## Table of Contents
- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Installation](#installation)
- [Usage](#usage)
- [API Documentation](#api-documentation)

## Overview
Crypto Racer is a platform for cryptography enthusiasts, ARG enthusiasts, and students. Users can create or join lobbies to solve cryptographic puzzles competitively. A leaderboard tracks user progress, highlighting the fastest solvers.

## Features
- Competitive cryptography puzzles
- Real-time multiplayer functionality
- Leaderboard with percentile rankings
- User authentication (Google/GitHub sign-in)
- Redis-backed real-time leaderboard
- WebAssembly for faster cryptographic operations

## Tech Stack
- **Frontend**: React.js, HTML5, Tailwind CSS
- **Backend**: Node.js, Express.js
- **Database**: MongoDB, Redis
- **APIs**: RESTapi, GraphQL, WebSocket
- **Cryptography**: WebAssembly, C

## Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/pedrocriado/CryptoRace
2. Install dependencies:
    ```bash
    npm install
3. Configure the .env file with necessary variables:
    ```bash
    PORT = 1234
    MONGO_URL = your-mongodb-url
    REDIS_URL = your-redis-url
    AUTH_SECRET = your-secret-key
4. Start the development server:
    ```bash
    npm start
## Usage
1. Register or log in to your account.
2. Create or join a lobby to start solving cryptographic puzzles.
3. Compete with other players and track your progress on the leaderboard.

## API Documentation
- **POST /auth/login**:
  Logs in a user.
- **POST /auth/register**:
  Registers a new user.
- **POST /auth/logout**:
  Logs out a user.
- **DELETE /auth/delete**:
  Deletes the current user. The information stored in the leader will also be deleted. 
- **GET /leaderboard**:
  Retrieves the top 10 leaderboard entries. If the user **IS** logged in then the user's entrie will be returned. If the user is **NOT** logged in then the returned user field will be null
- **GET /leaderboard/rank**:
  Retrieves the users rank.
- **POST /leaderboard/addScore**:
  Registers or Updates users rank. (The score that is being ranked is an average of all the best times)