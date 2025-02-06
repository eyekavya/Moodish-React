import {
  addDoc,
  collection,
  doc,
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

const getTimeStamp = () => {
  return serverTimestamp();
};

const getCurrentUserId = () => {
  const auth = getAuth();
  const user = auth.currentUser;
  return user ? user.uid : null;
};

const firestoreApi = { saveDoc, saveMood, getTimeStamp, getCurrentUserId };

export default firestoreApi;
