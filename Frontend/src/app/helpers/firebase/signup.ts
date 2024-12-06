import { auth, db } from "@/app/helpers/firebase/firebase";
import { ref, set } from "firebase/database";
import { createUserWithEmailAndPassword } from "firebase/auth";

export const handleSignUp = (
  e: any,
  email: string,
  password: string,
  firstName: string,
  lastName: string,
  username: string
) => {
  e.preventDefault();
  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      const userData = {
        email: user.email,
        firstName,
        lastName,
        username,
      };
      set(ref(db, `users/${user.uid}`), userData).then(() => {
        alert("User created successfully");
      });
    })
    .catch((error) => console.log(error));
};
