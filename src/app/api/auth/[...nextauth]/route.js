import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import ConnectDB from "@/utils/ConnectDB";
import userInfo from "@/model/userInfo";
import { verifyPassword } from "@/utils/nextPass";
// اینجا برای هندل کردن  توست چند زبونه به جای پیام کد استاتوس برگردوندم

export const authOptions = {
  session: { strategy: "jwt" },
  providers: [
    CredentialsProvider({
      async authorize(credentials) {
        const { userName, password } = credentials;

        try {
          await ConnectDB();
        } catch (error) {
          throw new Error("500"); //خطای سرور 
        }

        if (!userName || !password) {
          throw new Error("422"); // اطالاعات را وارد کنید
        }

        const user = await userInfo.findOne({ userName });
        if (!user) {
          throw new Error("404"); // کاربر یافت نشد
        }

        const isValid = await verifyPassword(password, user.password);
        if (!isValid) {
          throw new Error("401"); // رمز اشتباه
        }

    
        return { email: user.email, id: user._id };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {

      if (user) {
        token.email = user.email;
        token.sub = user.id; 
      }


      await ConnectDB();
      const updatedUser = await userInfo.findById(token.sub);
      if (updatedUser && updatedUser.email !== token.email) {
        token.email = updatedUser.email;
      }
      return token;
    },
    async session({ session, token }) {
      session.user.email = token.email;
      return session;
    },
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
