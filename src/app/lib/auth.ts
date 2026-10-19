import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "@better-auth/mongo-adapter";
import { emailOTP } from "better-auth/plugins";
import { sendEmail } from "./email";

const client = new MongoClient(process.env.MONGODB_URI as string);
const db = client.db("Todo-App");

export const auth = betterAuth({
  database: mongodbAdapter(db, {
    client,
  }),
  emailAndPassword: {
    enabled: true,
  },

  user: {
    deleteUser: {
      enabled: true,
    },
    additionalFields: {
      bio: {
        type: "string",
        required: false,
      },
      location: {
        type: "string",
        required: false,
      },
    },
  },

 

  plugins: [
    emailOTP({
      otpLength: 6,
      expiresIn: 300,

      async sendVerificationOTP({ email, otp, type }) {
       

        if (type === "forget-password") {
          try {
            await sendEmail({
              to: email,
              subject: "Your TaskFlow password reset code",
              text: `Your TaskFlow password reset code is ${otp}. It expires in 5 minutes. Never share this code with anyone.`,
              html: `
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </head>
      <body style="margin:0;padding:0;background:#f1f5f9;font-family:Arial,Helvetica,sans-serif;">
        <div style="display:none;max-height:0;overflow:hidden;">
          Your TaskFlow password reset code expires in 5 minutes.
        </div>

        <table role="presentation" width="100%" cellspacing="0" cellpadding="0"
          style="background:#f1f5f9;padding:32px 12px;">
          <tr>
            <td align="center">
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0"
                style="max-width:520px;background:#ffffff;border-radius:18px;overflow:hidden;">

                <tr>
                  <td align="center" style="padding:28px 24px;border-bottom:1px solid #f1f5f9;">
                    <div style="font-size:26px;font-weight:800;color:#0f172a;">
                      TaskFlow<span style="color:#3b82f6;">.</span>
                    </div>
                  </td>
                </tr>

                <tr>
                  <td style="padding:36px 28px 24px;">
                    <div style="font-size:12px;font-weight:700;letter-spacing:1.5px;color:#2563eb;">
                      PASSWORD RESET
                    </div>

                    <h1 style="margin:12px 0;color:#0f172a;font-size:27px;line-height:1.3;">
                      Reset your password
                    </h1>

                    <p style="margin:0;color:#64748b;font-size:15px;line-height:1.8;">
                      We received a request to reset your TaskFlow password.
                      Enter the verification code below to continue.
                    </p>

                    <div style="margin:28px 0;padding:24px 12px;text-align:center;background:#f8fafc;border:1px solid #dbeafe;border-radius:14px;">
                      <p style="margin:0 0 12px;color:#64748b;font-size:11px;font-weight:700;letter-spacing:1.5px;">
                        YOUR VERIFICATION CODE
                      </p>

                      <div style="font-size:36px;font-weight:800;letter-spacing:10px;color:#2563eb;">
                        ${otp}
                      </div>

                      <p style="margin:14px 0 0;color:#64748b;font-size:13px;">
                        Expires in <strong>5 minutes</strong>
                      </p>
                    </div>

                    <div style="padding:16px;background:#fffbeb;border-radius:10px;">
                      <p style="margin:0 0 6px;color:#92400e;font-size:14px;font-weight:700;">
                        Keep your account secure
                      </p>
                      <p style="margin:0;color:#92400e;font-size:13px;line-height:1.7;">
                        Never share this code with anyone. If you didn't request
                        a password reset, simply ignore this email.
                      </p>
                    </div>
                  </td>
                </tr>

                <tr>
                  <td align="center" style="padding:22px;background:#f8fafc;border-top:1px solid #e2e8f0;">
                    <p style="margin:0;color:#64748b;font-size:12px;">
                      Simple tools. Better focus.
                    </p>
                    <p style="margin:8px 0 0;color:#94a3b8;font-size:11px;">
                      © 2026 TaskFlow. All rights reserved.
                    </p>
                  </td>
                </tr>

              </table>
            </td>
          </tr>
        </table>
      </body>
    </html>
  `,
            });
          } catch (error) {
            console.error("EMAIL SENDING FAILED:", error);
            throw error;
          }
        }
      },
    }),
  ],

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
          "id" in profile && typeof profile.id === "string" ? profile.id : null;

        const email =
          profile.email ||
          (facebookId ? `facebook_${facebookId}@facebook-login.invalid` : null);

        if (!email) {
          throw new Error("Facebook returned neither email nor profile ID");
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
