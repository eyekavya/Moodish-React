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
  // Add a new document with a generated ID
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

const getFrequentMoods = async (uid) => {
  if (!uid) {
    console.error("Error: UID is undefined. Cannot fetch moods.");
    return [];
  }

  try {
    const moods = await getMoodData(uid);

    // Get start of the week (Monday) and end of the week (Sunday)
    const now = new Date();
    const startOfWeek = new Date(now);
    startOfWeek.setDate(now.getDate() - now.getDay() + 1); // Monday
    startOfWeek.setHours(0, 0, 0, 0);

    const endOfWeek = new Date(now);
    endOfWeek.setDate(now.getDate() - now.getDay() + 7); // Sunday
    endOfWeek.setHours(23, 59, 59, 999);

    // Filter moods from this week
    const thisWeekMoods = moods.filter((mood) => {
      const moodTime = mood.moodTimeStamp.toDate(); // Convert Firestore timestamp
      return moodTime >= startOfWeek && moodTime <= endOfWeek;
    });

    // Count occurrences of each mood
    const moodCount = {};
    thisWeekMoods.forEach(({ mood }) => {
      moodCount[mood] = (moodCount[mood] || 0) + 1;
    });

    // Sort by frequency and get top 3
    const topMoods = Object.entries(moodCount)
      .sort((a, b) => b[1] - a[1]) // Sort by count (descending)
      .slice(0, 3) // Get top 3
      .map(([mood, count]) => ({ mood, count }));

    return topMoods;
  } catch (error) {
    console.error("Error fetching mood data:", error);
    return [];
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
  getFrequentMoods,
  getTimeStamp,
};

export default firestoreApi;
