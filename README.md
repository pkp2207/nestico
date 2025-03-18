# Welcome to Nestico 👋

## 📋 Table of Contents
- [🤖 Introduction](#-introduction)
- [⚙️ Tech Stack](#-tech-stack)
- [🔋 Features](#-features)
- [🚀 Quick Start](#-quick-start)
- [🤝 Contributing](#-contributing)

---

## 🤖 Introduction

Nestico is a full-stack Real Estate application built with React Native, featuring Google authentication, dynamic property listings, and user profiles. Designed with modern tools like Expo SDK 52, Appwrite, Tailwind CSS, and TypeScript for a seamless and scalable experience. 

This project is still a work in progress, and I’m actively adding new features and improvements. If you’re interested, feel free to contribute! PRs are always welcome. 😊

---

## ⚙️ Tech Stack

- **Expo** - Fast and reliable React Native framework.
- **React Native** - Cross-platform mobile development.
- **TypeScript** - Type-safe and scalable codebase.
- **Nativewind** - Utility-first styling for React Native.
- **Appwrite** - Backend-as-a-service for authentication & database.
- **Tailwind CSS** - Elegant and responsive UI styling.

---

## 🔋 Features

👉 **Google Authentication**: Secure and seamless user sign-ins using Google’s authentication service.

👉 **Home Page**: Displays the latest and recommended properties with powerful search and filter functionality.

👉 **Explore Page**: Browse all types of properties with an intuitive interface.

👉 **Property Details Page**: Comprehensive property information, including images and key details.

👉 **Profile Page**: Customizable user settings and profile management.

👉 **Centralized Data Fetching**: Custom-built solution inspired by TanStack’s `useQuery` for efficient API calls.

…and much more in progress! 🚀

---

## 🚀 Quick Start

Follow these steps to set up the project locally on your machine.

### Prerequisites

Ensure you have the following installed:

- Git
- Node.js
- npm (Node Package Manager)

### Cloning the Repository

```sh
git clone https://github.com/pkp2207/nestico.git
cd nestico
```

### Installation

```sh
npm install
```

### Set Up Environment Variables

Create a new file named `.env.local` in the root of your project and add the following:

```sh
EXPO_PUBLIC_APPWRITE_ENDPOINT=https://cloud.appwrite.io/v1
EXPO_PUBLIC_APPWRITE_PROJECT_ID=
EXPO_PUBLIC_APPWRITE_DATABASE_ID=
EXPO_PUBLIC_APPWRITE_GALLERIES_COLLECTION_ID=
EXPO_PUBLIC_APPWRITE_REVIEWS_COLLECTION_ID=
EXPO_PUBLIC_APPWRITE_AGENTS_COLLECTION_ID=
EXPO_PUBLIC_APPWRITE_PROPERTIES_COLLECTION_ID=
```

Replace the values with your actual Appwrite credentials. You can obtain these by signing up & creating a new project on the [Appwrite website](https://appwrite.io/).

### Start the app

```sh
npx expo start
```

In the output, you'll find options to open the app in a:

- Development build
- Android emulator
- iOS simulator
- Expo Go (a limited sandbox for trying out app development with Expo)

You can start developing by editing the files inside the `app` directory. This project uses file-based routing.

---

## 🤝 Contributing

I’m actively working on Nestico, but I’d love to see contributions from the community! If you find a bug, have a feature request, or just want to improve something, feel free to raise a pull request.

🔹 Fork the repo
🔹 Create a new branch
🔹 Make your changes
🔹 Submit a PR 🚀

Let’s build something awesome together! 😊
