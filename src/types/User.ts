export type User = {
  name: string;
  email: string;
  password: any;
  comframPassword: any;
};

type UserInfo = {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  email: string;
  emailVerified: boolean;
  name: string;
  image?: string | null | undefined;
  location?: string;
  bio?: string;
};

export interface UserInfos {
  user: UserInfo | undefined;
}
