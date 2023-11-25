import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import * as apiServer from '@/services/api.server';

const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID ?? '',
      clientSecret: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_SECRET ?? '',
    }),
  ],
  callbacks: {
    // async redirect({ url, baseUrl }: any) {
    //   if (url.startsWith('/')) return `${baseUrl}`;
    //   else if (new URL(url).origin === baseUrl) return url;
    //   return baseUrl;
    // },

    // async signIn({ user, account }: any) {
    //   try {
    //     await apiServer.continueWithGoogle({
    //       email: user.email ?? '',
    //       token: account?.access_token ?? '',
    //     });
    //     return true;
    //   } catch (error) {
    //     return '/login';
    //   }
    // },

    async jwt({ token, account }: any) {
      if (account) {
        token.accessToken = account.access_token;
      }
      return token;
    },
    async session({ session, token, user }: any) {
      session.accessToken = token.accessToken;
      return session;
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
