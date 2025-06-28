# Chat-Bridge

A modern chatting platform with **live translation**, enabling seamless real-time multilingual communication.

---

## 🚀 Overview

Chat-Bridge solves the challenge of communicating across language barriers by providing a real-time chat platform that translates messages dynamically between users speaking different languages. 

Whether you're chatting with friends, colleagues, or new connections worldwide, Chat-Bridge ensures your conversations flow effortlessly in your preferred languages.

---

## 🔧 Proposed Solution

To achieve smooth, scalable, and reliable multilingual chat, the application uses a **microservices-based architecture** with the following key services:

### 1. Translation Service
- Performs **real-time translation** of chat messages between different languages.
- Supports multiple languages and automatically adapts based on each user’s language preferences.
- Ensures accurate and context-aware translations to maintain conversation clarity.

### 2. User Authentication Service
- Implements a **secure, scalable authentication system** for user registration, login, and session management.
- Integrates with external identity providers (e.g., Auth0) for streamlined login options.

### 3. Payment Service
- Integrates with a **payment gateway** to handle subscription-based transactions.
- Facilitates financial transactions to unlock premium features and enhance user experience.

---

## 🏗 Architecture Diagram

![Chat-Bridge Architecture](https://github.com/user-attachments/assets/48aaed7e-3e52-4cc5-bd78-b1a41f70793e)
 

---

## 📦 Features

- Real-time messaging with automatic language detection and translation.
- Multi-language support with customizable language preferences.
- Secure authentication with OAuth and social logins.
- Subscription model for premium services via integrated payment gateway.
- User-friendly interface with responsive design.

---

## ⚙️ Technology Stack
-------------------------------------------------
| Layer            | Technology/Service         |
|------------------|----------------------------|
| Frontend         | React, React Router        |
| Backend          | Node.js, Express           |
| Database         | MongoDB                    |
| Authentication   | Auth0                      |
| Translation API  | mymemory tranlation API    |
| Payment Gateway  | Stripe                     |
| Deployment       | Docker                     |
-------------------------------------------------

