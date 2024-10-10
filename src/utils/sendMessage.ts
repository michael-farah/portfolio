import { ref, push, serverTimestamp } from "firebase/database";
import { database } from "../firebase";
import type { User } from "firebase/auth";

interface SendMessageParams {
  user: User;
  message: string;
}

export const sendMessage = async ({ user, message }: SendMessageParams) => {
  const messagesRef = ref(database, "messages");
  return push(messagesRef, {
    userId: user.uid,
    email: user.email,
    message: message.trim(),
    timestamp: serverTimestamp(),
  });
};