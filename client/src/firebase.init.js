import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyD8HBdp_asztYRevR33OkSlMERz0w3wejM",
  authDomain: "aibot-a6f36.firebaseapp.com",
  projectId: "aibot-a6f36",
  storageBucket: "aibot-a6f36.appspot.com",
  messagingSenderId: "372711203332",
  appId: "1:372711203332:web:49232743696306d9600b51",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export default auth;
