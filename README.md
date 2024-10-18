# STRIPE-E-COMMERCE

This project is a full-stack e-commerce web application built using Vite, React, Bulma, Sass, Formik, and Redux Toolkit on the client side, and Node.js with Express on the server side. It implements Stripe for payment processing and Firebase for authentication and data storage. Users can sign up, sign in, add products to their cart, and make purchases using either a new card or a saved payment method.

## Features

- **Authentication**: Users can sign up and sign in using Firebase Authentication.
- **Product Catalog**: A collection of bag products is available for browsing.
- **Cart Management**: Users can add products to their cart.
- **Stripe Payment Integration**: Authenticated users can complete purchases.
- **Responsive Design**: The UI is styled using Bulma and Sass for a mobile-friendly and responsive experience.

## Technologies Used

### Client Side

- **Vite + React**: For fast and modern client-side development.
- **Bulma**: A CSS framework for building responsive and modern interfaces.
- **Sass**: Preprocessor for writing cleaner, more maintainable CSS.
- **Formik**: For handling form states and validation.
- **Redux Toolkit**: For state management and API calls.
- **Stripe**: Integrated for secure payment processing.

### Server Side

- **Node.js + Express**: Backend server for handling API requests.
- **Stripe**: For payment processing and saving payment information.
- **Firebase**: For user authentication and data storage (Firestore).

## Getting Started

### Prerequisites

- **Node.js**
- **Firebase Account**: Set up Firebase project for authentication and Firestore database.
- **Stripe Account**: Create a Stripe account and get API keys.
- **service-account.json**: For Firebase initialization on server via the unified Admin SDK generate new private key in your project's settings and save the file as `service-account.json` in your `server` folder.

### Setup

#### 1. Clone the repository

```bash
git clone https://github.com/bohdanadev/stripe-e-commerce-clone.git
cd stripe-e-commerce
```

#### 2. Configure Environment Variables

Both the `client` and `server` require .env files for environment variables. Copy or rename the `.env.example` file to `.env` and fill it with your actual values.

#### 3. Install dependencies and run the application

```bash
cd client
npm ci
npm run dev
    # or
npm start
```

```bash
cd server
npm ci
npm run start:dev
     # or
npm start
```
