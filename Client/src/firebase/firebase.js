import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDBNpmwJw5U18V0t6FR5DQpbpWJTZB7qEU",
  authDomain: "cabrasuecapartyorganizer.firebaseapp.com",
  projectId: "cabrasuecapartyorganizer",
  storageBucket: "cabrasuecapartyorganizer.firebasestorage.app",
  messagingSenderId: "1057890312188",
  appId: "1:1057890312188:web:b6ce198aea5e3b13d31c79",
  measurementId: "G-87L7ZJ3FKC"
};

// Inicializa o Firebase
const app = initializeApp(firebaseConfig);

// Exporta o Auth para usar em toda aplicação
export const auth = getAuth(app);