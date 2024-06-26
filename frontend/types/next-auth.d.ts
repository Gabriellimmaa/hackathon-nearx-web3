// eslint-disable-next-line @typescript-eslint/no-unused-vars
import NextAuth from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      email: string;
      image: string;
      name: string;
      id: string;
    };
    guilds: {
      icon: string;
      id: string;
      name: string;
      owner: boolean;
      permissions: number;
    }[];
  }
}
