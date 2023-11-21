export interface AuthUser {
  user: {
    _id: string;
    name: string;
    email: string;
    password: string;
    __v: number;
  };
  token: string;
}

export interface IsAvailable {
  available: boolean;
}
