import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import passport from "passport";

import prisma from "../configs/prisma.js";

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: `/api/auth/google/callback`,
    },
    async (_, __, profile, done) => {
      try {
        let user = await prisma.user.findUnique({
          where: { oAuthId: profile.id },
        });

        if (!user) {
          user = await prisma.user.findUnique({
            where: { email: profile.emails[0].value },
          });

          if (user) {
            if (user.authProvider === "LOCAL") {
              user = await prisma.user.update({
                where: { email: profile.emails[0].value },
                data: {
                  oAuthId: profile.id,
                  authProvider: "OAUTH",
                  isVerified: true,
                },
              });
            }
          } else {
            user = await prisma.user.create({
              data: {
                name: profile.displayName,
                email: profile.emails[0].value,
                avatar: profile.photos ? profile.photos[0].value : null,
                oAuthId: profile.id,
                authProvider: "OAUTH",
                isVerified: true,
              },
            });
          }
        }

        done(null, user);
      } catch (error) {
        console.log("Error in google auth strategy", error);
        done(error, null);
      }
    }
  )
);

export default passport;
