import { doc, setDoc } from "firebase/firestore";
import { db } from "./firebase.config";

export async function insertUserData(userId: string, data: any) {
  if (!userId) return;

  try {
    await setDoc(doc(db, "users", userId), {
      firstName: data?.firstName || null,
      lastName: data?.lastName || null,
      email: data?.email || null,
      wins: {
        X: data?.wins?.X ?? null,
        O: data?.wins?.O ?? null,
      },
      userId: userId,
      avatarUrl: data?.avatarUrl || null,
    });
  } catch (e) {
    console.error("Error adding document: ", e);
  }
}
