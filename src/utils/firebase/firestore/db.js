import {
  addDoc,
  collection,
  doc,
  getDoc,
  getFirestore,
  serverTimestamp,
  setDoc,
} from "firebase/firestore";
import { app } from "..";
import { getAuth } from "firebase/auth";

const db = getFirestore(app);

const saveDoc = async (uid, data) => {
  const userDocRef = doc(db, "user", uid);
  return await setDoc(userDocRef, data).catch((error) => {
    return error;
  });
};

const saveMood = async (uid, data) => {
  const moodRef = collection(db, "user", uid, "mood");
  return await addDoc(moodRef, data).catch((error) => {
    return error;
  });
};

const getUserData = async (uid) => {
  try {
    const userDocRef = doc(db, "user", uid);
    const userDocSnap = await getDoc(userDocRef);
    return userDocSnap.data();
  } catch (error) {
    return error;
  }
};

const getTimeStamp = () => {
  return serverTimestamp();
};

const firestoreApi = {
  saveDoc,
  saveMood,
  getUserData,
  getTimeStamp,
};

export default firestoreApi;
