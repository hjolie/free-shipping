import NextAuth from "next-auth";
import Line from "next-auth/providers/line";

export const { handlers, auth, signIn, signOut } = NextAuth({
    providers: [
        Line({
            checks: ["state"],
        }),
    ],
    callbacks: {
        jwt({ token, account, profile }) {
            if (account && profile) {
                // console.log("Profile: ", profile);
                token.id = profile.sub as string;
            }
            // console.log("JWT Token: ", token);
            return token;
        },
        session({ session, token }) {
            // console.log("Session Token: ", token);
            session.user.id = token.id as string;
            // console.log("Session: ", session);
            return session;
        },
    },
});
