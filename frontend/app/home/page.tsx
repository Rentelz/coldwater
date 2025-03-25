import React from "react";
import Navbar from "../../components/Navbar";
import Listing from "@/components/ui/ListingComps/Listing";
const HomePage = () => {
  return (
    <div className="px-4 md:px-8 lg:px-16">
      <Navbar />
      <h1 className="text-xl font-semibold mt-4">Home Page</h1>
      <Listing />
    </div>
  );
};

export default HomePage;


// app/home/page.tsx
// "use client";

// import { useSession } from "next-auth/react";
// import { useEffect } from "react";
// import { useRouter } from "next/navigation";
// import Navbar from "@/components/Navbar";

// export default function HomePage() {
//   const { data: session, status } = useSession();
//   const router = useRouter();
  
//   useEffect(() => {
//     if (status === "unauthenticated") {
//       router.replace("/");
//     }
//   }, [status, router]);
  
//   if (status === "loading") {
//     return <div>Loading...</div>;
//   }
  
//   if (!session) {
//     return <div>Not authenticated. Redirecting...</div>;
//   }
  
//   return (
//     <div>
//       <Navbar/>
//       <h1>Protected Home Page</h1>
//       <p>Welcome {session.user?.name}</p>
//       <p>You are authenticated!</p>
//     </div>
//   );
// }