import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { app } from "..";

const auth = getAuth(app);

async function signUpWithEmailPassword(signUpData) {
  return await createUserWithEmailAndPassword(
    auth,
    signUpData.email,
    signUpData.password
  ).catch((error) => {
    return error;
  });
}

async function signInWithEmailPassword(signInData) {
  return await signInWithEmailAndPassword(
    auth,
    signInData.email,
    signInData.password
  ).catch((error) => {
    return error;
  });
}

const handleLogout = async () => {
  return await auth.signOut();
};

const authApi = {
  signUpWithEmailPassword,
  signInWithEmailPassword,
  handleLogout,
};

export default authApi;
