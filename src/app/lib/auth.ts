import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "@better-auth/mongo-adapter";

const client = new MongoClient(process.env.MONGODB_URI as string);
const db = client.db("Todo-App");

export const auth = betterAuth({
  database: mongodbAdapter(db, {
    client,
  }),
    emailAndPassword: {
    enabled: true,
  },



account: {
  accountLinking: {
    enabled: true,
    disableImplicitLinking: true,
    trustedProviders: ["google", "github", "discord"],
  },
},

socialProviders: {
  google: {
    clientId: process.env.GOOGLE_CLIENT_ID as string,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
  },

  github: {
    clientId: process.env.GITHUB_CLIENT_ID as string,
    clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
  },


facebook: {
  clientId: process.env.FACEBOOK_CLIENT_ID!,
  clientSecret: process.env.FACEBOOK_CLIENT_SECRET!,
  scopes: ["email", "public_profile"],

  mapProfileToUser: (profile) => {
    const facebookId =
      "id" in profile && typeof profile.id === "string"
        ? profile.id
        : null;

    const email =
      profile.email ||
      (facebookId
        ? `facebook_${facebookId}@facebook-login.invalid`
        : null);

    if (!email) {
      throw new Error(
        "Facebook returned neither email nor profile ID"
      );
    }
    return {
      name: profile.name || "Facebook User",
      email,
      emailVerified: false,
    };
  },
},



},

});
