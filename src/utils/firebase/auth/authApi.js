import {
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { app } from "..";
import { toast } from "sonner";

const auth = getAuth(app);

export const onAuthStateChange = (callback) =>
  onAuthStateChanged(auth, callback);

async function signUpWithEmailPassword(signUpData) {
  return await createUserWithEmailAndPassword(
    auth,
    signUpData.email,
    signUpData.password
  ).catch((error) => {
    toast.error(error.message);
  });
}

async function signInWithEmailPassword(signInData) {
  return await signInWithEmailAndPassword(
    auth,
    signInData.email,
    signInData.password
  ).catch((error) => {
    toast.error(error.message);
  });
}

const handleLogout = async () => {
  return await auth.signOut();
};

export async function resetPassword(email) {
  try {
    await sendPasswordResetEmail(auth, email);
  } catch (error) {
    console.error("Error sending password reset email:", error);
    throw error;
  }
}

const authApi = {
  signUpWithEmailPassword,
  signInWithEmailPassword,
  handleLogout,
};

export default authApi;
