export type FirestoreUser = {
  avatarUrl: string | null;
  email: string;
  firstName: string | null;
  lastName: string | null;
  userId: string;

  wins: {
    O: number | null;
    X: number | null;
  };
};

export type Invite = {
  id: string;
  fromUserId: string;
  toUserId: string;
  status: "pending" | "accepted" | "declined";
  createdAt: any;
  updatedAt: any;
};

export type Game = {
  id: string;
  matrix: ("X" | "O" | null)[];
  playerX: string;
  playerO: string;
  turn: "X" | "O";
  winner: "X" | "O" | "draw" | null;
  createdAt: any;
  updatedAt: any;
};
