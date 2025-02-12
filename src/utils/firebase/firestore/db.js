import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  getFirestore,
  serverTimestamp,
  setDoc,
} from "firebase/firestore";
import { app } from "..";

// Initialize Firestore
const db = getFirestore(app);

// Save user data to Firestore

const saveDoc = async (uid, data) => {
  // Create a reference to the user document
  const userDocRef = doc(db, "user", uid);
  return await setDoc(userDocRef, data).catch((error) => {
    return error;
  });
};

// Save User's mood data to Firestore
const saveMood = async (uid, data) => {
  const moodRef = collection(db, "user", uid, "mood");
  return await addDoc(moodRef, data).catch((error) => {
    return error;
  });
};

// Get user data from Firestore
const getUserData = async (uid) => {
  try {
    const userDocRef = doc(db, "user", uid);
    const userDocSnap = await getDoc(userDocRef);
    return userDocSnap.data();
  } catch (error) {
    return error;
  }
};

// Get user's mood data from Firestore
const getMoodData = async (uid) => {
  if (!uid) {
    console.error("Error: UID is undefined. Cannot fetch moods.");
    return [];
  }
  try {
    const moodRef = collection(db, "user", uid, "mood");
    const moodSnap = await getDocs(moodRef);

    if (!moodSnap.empty) {
      return moodSnap.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
    } else {
      return [];
    }
  } catch (error) {
    return error;
  }
};

// Get current timestamp
const getTimeStamp = () => {
  return serverTimestamp();
};

// Export all functions
const firestoreApi = {
  saveDoc,
  saveMood,
  getUserData,
  getMoodData,
  getTimeStamp,
};

export default firestoreApi;
