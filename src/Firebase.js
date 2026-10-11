import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBCYGAkKVxrSZgAcM4nxf-3OpWGApwHjk0",
  authDomain: "velora-94bb6.firebaseapp.com",
  projectId: "velora-94bb6",
  storageBucket: "velora-94bb6.firebasestorage.app",
  messagingSenderId: "780681682001",
  appId: "1:780681682001:web:d1c3bbd7d720398c162c70",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

export default app;
