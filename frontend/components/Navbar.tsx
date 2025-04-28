// "use client";

// import { useState } from "react";
// import { Input } from "@/components/ui/input";
// import { Button } from "@/components/ui/button";
// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
// import { signOut } from "next-auth/react";
// import { useRouter } from "next/navigation"; // ✅ Correct for App Router

// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuTrigger,
// } from "@/components/ui/dropdown-menu";
// import { Heart, ChevronDown, Search, User } from "lucide-react";

// export default function Navbar() {
//   const router = useRouter();

//   const [city, setCity] = useState("Select City");
//   const cities = ["Mumbai", "Delhi", "Bangalore", "Hyderabad", "Chennai"];
//   return (
//     <nav className="flex items-center justify-between bg-white shadow-md px-4 py-2">
//       {/* Left: Logo */}
//       <div className="text-2xl font-bold text-blue-600">YourLogo</div>

//       {/* City Selector */}
//       <DropdownMenu>
//         <DropdownMenuTrigger asChild>
//           <Button
//             variant="outline"
//             className="flex items-center text-sm px-3 py-1"
//           >
//             {city} <ChevronDown className="w-4 h-4 ml-1" />
//           </Button>
//         </DropdownMenuTrigger>
//         <DropdownMenuContent align="start">
//           {cities.map((c) => (
//             <DropdownMenuItem key={c} onClick={() => setCity(c)}>
//               {c}
//             </DropdownMenuItem>
//           ))}
//         </DropdownMenuContent>
//       </DropdownMenu>

//       {/* Search Bar */}
//       <div className="relative w-1/3 max-w-md">
//         <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500" />
//         <Input
//           placeholder="Search for products..."
//           className="pl-10 pr-3 py-1 text-sm border-gray-300 rounded-md w-full"
//         />
//       </div>

//       {/* Favorite Button */}
//       <Button variant="ghost" size="icon" className="rounded-full">
//         <Heart className="w-5 h-5 text-red-500" />
//       </Button>

//       {/* Profile Avatar */}
//       <DropdownMenu>
//         <DropdownMenuTrigger asChild>
//           <Avatar className="cursor-pointer w-9 h-9">
//             <AvatarImage src="/profile.jpg" alt="User" />
//             <AvatarFallback>
//               <User className="w-4 h-4 text-gray-500" />
//             </AvatarFallback>
//           </Avatar>
//         </DropdownMenuTrigger>
//         <DropdownMenuContent align="end">
//           <DropdownMenuItem

//         onClick={() => router.push("/profile")}

//           >Profile</DropdownMenuItem>
//           <DropdownMenuItem>Settings</DropdownMenuItem>
//           <DropdownMenuItem
//            onClick={async () => {
//             // Force clean session on client side first
//             await signOut({
//               redirect: false
//             });

//             // Then force a full page navigation (not just client routing)
//             window.location.href = '/';
//           }}
//           >
//             Logout
//           </DropdownMenuItem>
//         </DropdownMenuContent>
//       </DropdownMenu>
//     </nav>
//   );
// }

'use client'

import { useState } from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { signOut } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Heart, ChevronDown, Search, User, ShoppingCart } from 'lucide-react'

export default function Navbar() {
  const router = useRouter()

  const [city, setCity] = useState('Select City')
  const cities = ['Mumbai', 'Delhi', 'Bangalore', 'Hyderabad', 'Chennai']

  return (
    <nav className="flex items-center justify-between bg-white shadow-md px-6 py-4 border-b">
      {/* Left: Logo */}
      <div className="flex items-center space-x-4">
        <div className="text-3xl font-bold text-blue-600">YourLogo</div>
      </div>

      {/* Center: Search Bar */}
      <div className="relative flex items-center w-1/2 max-w-xl">
        <Input
          placeholder="Search for products..."
          className="pl-10 pr-3 py-2 text-sm border border-gray-300 rounded-md w-full focus:ring-2 focus:ring-blue-600"
        />
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500" />
      </div>

      {/* City Selector */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="outline"
            className="flex items-center text-sm px-4 py-2 bg-white border border-gray-300 rounded-md"
          >
            {city} <ChevronDown className="w-4 h-4 ml-2" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start">
          {cities.map((c) => (
            <DropdownMenuItem key={c} onClick={() => setCity(c)}>
              {c}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Right: Icons & Profile */}
      <div className="flex items-center space-x-4">
        {/* Favorite Button */}
        <Button
          variant="ghost"
          size="icon"
          className="rounded-full hover:bg-gray-100"
        >
          <Heart className="w-5 h-5 text-red-500" />
        </Button>

        {/* Cart Icon */}
        <Button
          variant="ghost"
          size="icon"
          className="rounded-full hover:bg-gray-100"
        >
          <ShoppingCart className="w-5 h-5 text-gray-600" />
        </Button>

        {/* Profile Avatar */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Avatar className="cursor-pointer w-10 h-10">
              <AvatarImage src="/profile.jpg" alt="User" />
              <AvatarFallback>
                <User className="w-5 h-5 text-gray-500" />
              </AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => router.push('/profile')}>
              Profile
            </DropdownMenuItem>
            <DropdownMenuItem>Settings</DropdownMenuItem>
            <DropdownMenuItem
              onClick={async () => {
                await signOut({ redirect: false })
                window.location.href = '/'
              }}
            >
              Logout
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </nav>
  )
}
