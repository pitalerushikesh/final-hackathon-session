// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {
  getFirestore,
  query,
  getDocs,
  collection,
  where,
  addDoc,
} from "firebase/firestore";
import {
  GoogleAuthProvider,
  signInWithPopup,
  getAuth,
  signOut,
} from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBWhptauEhB7sJrV_BkU2Dsp9ygz4jRmXg",
  authDomain: "cred-manager-7f41c.firebaseapp.com",
  projectId: "cred-manager-7f41c",
  storageBucket: "cred-manager-7f41c.appspot.com",
  messagingSenderId: "1022455773576",
  appId: "1:1022455773576:web:ffe81f5929e56ff059623d",
  measurementId: "G-TK7Q4NZ6WM",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
const analytics = getAnalytics(app);

export const auth = getAuth(app);

const googleProvider = new GoogleAuthProvider();
export const signInWithGoogle = async () => {
  try {
    const res = await signInWithPopup(auth, googleProvider);
    const user = res.user;
    const q = query(collection(db, "users"), where("uid", "==", user.uid));
    const docs = await getDocs(q);

    const document = await addDoc(collection(db, "users"), {
      uid: user.uid,
      name: user.displayName,
      authProvider: "google",
      email: user.email,
    });
    console.log("User added to the database", document);
    return res;
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};

export const handleCreateStore = async (websiteName, username, password) => {
  console.log("Create");
  console.log("AUTH", auth);
  console.log("WEBSITE", websiteName);
  console.log("USERNAME", username);

  //   const q = query(collection(db, "Storage"));
  //   const docs = await getDocs(q);
  if (auth) {
    const document = await addDoc(collection(db, "Storage"), {
      website: websiteName,
      username: username,
      password: password,
      email: auth?.currentUser?.email,
    });
    console.log("Data added to the database", document);
  }
};

export default db;
