import { useAuthContext } from "@/hooks/use-auth-context";
import { db } from "@/lib/firebase.config";
import { FirestoreUser, Game, Invite } from "@/lib/types";
import {
  collection,
  doc,
  onSnapshot,
  or,
  query,
  serverTimestamp,
  updateDoc,
  where,
  writeBatch,
} from "firebase/firestore";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

type FirestoreContextType = {
  users: FirestoreUser[];
  receivedInvites: Invite[];
  sentInvites: Invite[];
  games: Game[];
  acceptInvite: (invite: Invite) => Promise<string>;
  declineInvite: (inviteId: string) => Promise<void>;
};

const firestoreContext = createContext<FirestoreContextType | null>(null);

export function useFirestoreContext() {
  const context = useContext(firestoreContext);
  if (!context) {
    throw new Error(
      "useFirestoreContext must be used within an FirestoreProvider"
    );
  }
  return context;
}
export function FirestoreProvider({ children }: { children: React.ReactNode }) {
  const { user } = useAuthContext();
  const [users, setUsers] = useState<FirestoreUser[]>([]);
  const [receivedInvites, setReceivedInvites] = useState<Invite[]>([]);
  const [sentInvites, setSentInvites] = useState<Invite[]>([]);
  const [games, setGames] = useState<Game[]>([]);

  const acceptInvite = useCallback(
    async (invite: Invite): Promise<string> => {
      if (!user) return "";

      const batch = writeBatch(db);

      const inviteRef = doc(db, "invites", invite.id);
      batch.update(inviteRef, { status: "accepted" });

      const gameRef = doc(collection(db, "games"));
      batch.set(gameRef, {
        id: gameRef.id,
        matrix: Array(9).fill(null),
        playerX: invite.toUserId,
        playerO: invite.fromUserId,
        turn: "X",
        winner: null,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      });

      await batch.commit();
      return gameRef.id;
    },
    [user]
  );

  const declineInvite = useCallback(async (inviteId: string) => {
    const inviteRef = doc(db, "invites", inviteId);
    await updateDoc(inviteRef, { status: "declined" });
  }, []);

  useEffect(() => {
    if (!user) return;
    const q = query(collection(db, "users"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const fetchedUsers: FirestoreUser[] = [];
      querySnapshot.forEach((doc) => {
        fetchedUsers.push(doc.data() as FirestoreUser);
      });
      setUsers(fetchedUsers);
    });

    return () => unsubscribe();
  }, [setUsers, user]);

  useEffect(() => {
    if (user) {
      const receivedInvitesQuery = query(
        collection(db, "invites"),
        where("toUserId", "==", user.uid)
      );
      const sentInvitesQuery = query(
        collection(db, "invites"),
        where("fromUserId", "==", user.uid)
      );

      const unsubscribeReceived = onSnapshot(
        receivedInvitesQuery,
        (querySnapshot) => {
          const fetchedInvites: Invite[] = [];
          querySnapshot.forEach((doc) => {
            fetchedInvites.push({ id: doc.id, ...doc.data() } as Invite);
          });
          setReceivedInvites(fetchedInvites);
        }
      );

      const unsubscribeSent = onSnapshot(sentInvitesQuery, (querySnapshot) => {
        const fetchedInvites: Invite[] = [];
        querySnapshot.forEach((doc) => {
          fetchedInvites.push({ id: doc.id, ...doc.data() } as Invite);
        });
        setSentInvites(fetchedInvites);
      });

      return () => {
        unsubscribeReceived();
        unsubscribeSent();
      };
    }
  }, [user, setReceivedInvites, setSentInvites]);

  useEffect(() => {
    if (user) {
      const gamesQuery = query(
        collection(db, "games"),
        or(where("playerX", "==", user.uid), where("playerO", "==", user.uid))
      );

      const unsubscribe = onSnapshot(gamesQuery, (querySnapshot) => {
        const fetchedGames: Game[] = [];
        querySnapshot.forEach((doc) => {
          fetchedGames.push({ id: doc.id, ...doc.data() } as Game);
        });
        setGames(fetchedGames);
      });

      return () => unsubscribe();
    }
  }, [user, setGames]);

  return (
    <firestoreContext.Provider
      value={{
        users,
        receivedInvites,
        sentInvites,
        games,
        acceptInvite,
        declineInvite,
      }}
    >
      {children}
    </firestoreContext.Provider>
  );
}
