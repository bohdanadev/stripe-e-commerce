// export const stripeConfig = {
//   secretKey: import.meta.env.VITE_PUBLISHABLE_KEY as string,
// };

// export const appConfig = {
//   port: import.meta.env.VITE_PORT || 3000,
// };

export const apiConfig = {
  apiUrl: import.meta.env.VITE_API_URL as string,
};

export const firebaseEnv = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN as string,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID as string,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET as string,
  messagingSenderId: import.meta.env
    .VITE_FIREBASE_MESSAGING_SENDER_ID as string,
  appId: import.meta.env.VITE_FIREBASE_APP_ID as string,
};
