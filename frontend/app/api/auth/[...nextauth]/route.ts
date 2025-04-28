// // // import NextAuth from 'next-auth'
// // // import GoogleProvider from 'next-auth/providers/google'

// // // export const authOptions = {
// // //   providers: [
// // //     GoogleProvider({
// // //       clientId: process.env.GOOGLE_CLIENT_ID!,
// // //       clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
// // //     }),
// // //   ],
// // //   secret: process.env.NEXTAUTH_SECRET,
// // //   session: {
// // //     strategy: 'jwt' as const,
// // //     maxAge: 30 * 24 * 60 * 60, // 30 days
// // //   },
// // //   callbacks: {
// // //     async jwt({ token, account }: { token: any; account: any }) {
// // //       // Persist the OAuth access_token to the token right after signin
// // //       if (account) {
// // //         token.accessToken = account.access_token
// // //       }
// // //       return token
// // //     },
// // //     async session({ session, token }: { session: any; token: any }) {
// // //       // Send properties to the client, like an access_token from a provider
// // //       session.accessToken = token.accessToken
// // //       return session
// // //     },
// // //   },
// // // }

// // // const handler = NextAuth(authOptions)
// // // export { handler as GET, handler as POST }

// // import NextAuth from 'next-auth'
// // import GoogleProvider from 'next-auth/providers/google'

// // export const authOptions = {
// //   providers: [
// //     GoogleProvider({
// //       clientId: process.env.GOOGLE_CLIENT_ID!,
// //       clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
// //     }),
// //   ],
// //   secret: process.env.NEXTAUTH_SECRET,
// //   session: {
// //     strategy: 'jwt',
// //     maxAge: 30 * 24 * 60 * 60, // 30 days
// //   },
// //   callbacks: {
// //     async jwt({ token, account }) {
// //       if (account) {
// //         token.accessToken = account.access_token
// //         token.idToken = account.id_token // <<<<<<<<<<<< save idToken at signin time
// //       }
// //       return token
// //     },
// //     async session({ session, token }) {
// //       session.accessToken = token.accessToken
// //       session.idToken = token.idToken // <<<<<<<<<<<< pass idToken to session
// //       if (session.user) {
// //         session.user.id = token.sub
// //       }
// //       return session
// //     },
// //   },
// // }

// // const handler = NextAuth(authOptions)
// // export { handler as GET, handler as POST }

// import NextAuth from 'next-auth'
// import GoogleProvider from 'next-auth/providers/google'

// // Add refresh token function
// async function refreshAccessToken(token) {
//   try {
//     const url = 'https://oauth2.googleapis.com/token'
//     const response = await fetch(url, {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/x-www-form-urlencoded',
//       },
//       body: new URLSearchParams({
//         client_id: process.env.GOOGLE_CLIENT_ID!,
//         client_secret: process.env.GOOGLE_CLIENT_SECRET!,
//         grant_type: 'refresh_token',
//         refresh_token: token.refreshToken,
//       }),
//     })

//     const refreshedTokens = await response.json()

//     if (!response.ok) {
//       throw refreshedTokens
//     }

//     return {
//       ...token,
//       accessToken: refreshedTokens.access_token,
//       idToken: refreshedTokens.id_token,
//       expiresAt: Math.floor(Date.now() / 1000 + refreshedTokens.expires_in),
//       refreshToken: refreshedTokens.refresh_token ?? token.refreshToken,
//     }
//   } catch (error) {
//     console.error('Error refreshing access token', error)
//     return {
//       ...token,
//       error: 'RefreshAccessTokenError',
//     }
//   }
// }

// export const authOptions = {
//   providers: [
//     GoogleProvider({
//       clientId: process.env.GOOGLE_CLIENT_ID!,
//       clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
//       authorization: {
//         params: {
//           prompt: 'consent',
//           access_type: 'offline',
//           response_type: 'code',
//         },
//       },
//     }),
//   ],
//   secret: process.env.NEXTAUTH_SECRET,
//   session: {
//     strategy: 'jwt',
//     maxAge: 30 * 24 * 60 * 60, // 30 days
//   },
//   callbacks: {
//     async jwt({ token, account }) {
//       // Initial sign-in
//       if (account) {
//         token.accessToken = account.access_token
//         token.idToken = account.id_token
//         token.refreshToken = account.refresh_token
//         token.expiresAt = account.expires_at
//       }

//       // Return previous token if it hasn't expired yet
//       if (token.expiresAt && Date.now() < token.expiresAt * 1000) {
//         return token
//       }

//       // Token has expired, try to refresh it
//       return refreshAccessToken(token)
//     },
//     async session({ session, token }) {
//       session.accessToken = token.accessToken
//       session.idToken = token.idToken

//       // Add error field so you can detect refresh failures in UI
//       if (token.error) {
//         session.error = token.error
//       }

//       if (session.user) {
//         session.user.id = token.sub
//       }
//       return session
//     },
//   },
// }

// const handler = NextAuth(authOptions)
// export { handler as GET, handler as POST }

import NextAuth from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'

async function refreshAccessToken(token) {
  try {
    const url = 'https://oauth2.googleapis.com/token'
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        client_id: process.env.GOOGLE_CLIENT_ID!,
        client_secret: process.env.GOOGLE_CLIENT_SECRET!,
        grant_type: 'refresh_token',
        refresh_token: token.refreshToken,
      }),
    })

    const refreshedTokens = await response.json()

    if (!response.ok) {
      throw refreshedTokens
    }

    return {
      ...token,
      accessToken: refreshedTokens.access_token,
      idToken: refreshedTokens.id_token,
      expiresAt: Math.floor(Date.now() / 1000 + refreshedTokens.expires_in), // Store the expiration time
      refreshToken: refreshedTokens.refresh_token ?? token.refreshToken, // Use new refresh token if provided
    }
  } catch (error) {
    console.error('Error refreshing access token', error)
    return {
      ...token,
      error: 'RefreshAccessTokenError',
    }
  }
}

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      authorization: {
        params: {
          prompt: 'consent',
          access_type: 'offline', // Ensure offline access is enabled to get refresh tokens
          response_type: 'code',
        },
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  callbacks: {
    async jwt({ token, account }) {
      // On initial sign-in, store tokens and expiration info
      if (account) {
        token.accessToken = account.access_token
        token.idToken = account.id_token
        token.refreshToken = account.refresh_token
        token.expiresAt = Math.floor(Date.now() / 1000) + 3600 // Set an initial expiration time (1 hour)
      }

      // If the token hasn't expired yet, return it as is
      if (token.expiresAt && Date.now() < token.expiresAt * 1000) {
        return token
      }

      // Token expired, refresh it
      return refreshAccessToken(token)
    },
    async session({ session, token }) {
      session.accessToken = token.accessToken
      session.idToken = token.idToken

      // Handle any errors if the refresh failed
      if (token.error) {
        session.error = token.error
      }

      if (session.user) {
        session.user.id = token.sub
      }
      return session
    },
  },
}

const handler = NextAuth(authOptions)
export { handler as GET, handler as POST }
