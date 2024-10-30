import { initializeApp } from "firebase/app";
const firebaseConfig = {
  apiKey: import.meta.env.VITE_API_KEY,
  authDomain: "reactchatapp-2af36.firebaseapp.com",
  projectId: "reactchatapp-2af36",
  storageBucket: "reactchatapp-2af36.appspot.com",
  messagingSenderId: "274715748752",
  appId: "1:274715748752:web:a6d78aae8391ff40092b15"
};

const app = initializeApp(firebaseConfig);