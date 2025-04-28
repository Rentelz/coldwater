// "use client" directive to mark the file as a client component

'use client'

import React from 'react'

import { useRouter } from 'next/navigation' // Use this for App Router

import { Button } from '@/components/ui/button' // Assuming ShadCN has a Button component

// Mock data for listings

const listingsData = [
  { id: 1, title: 'Listing 1', description: 'Description for Listing 1' },

  { id: 2, title: 'Listing 2', description: 'Description for Listing 2' },

  { id: 3, title: 'Listing 3', description: 'Description for Listing 3' },
]

const Listing: React.FC = () => {
  const router = useRouter()

  const handleSellClick = () => {
    router.push('/sell') // Navigate to the sell page
  }

  return (
    <div className="relative">
      {/* Listings */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 p-4">
        {listingsData.map((listing, index) => (
          <div key={index} className="border p-4 rounded shadow">
            <h2 className="text-lg font-bold">{listing.title}</h2>

            <p className="text-gray-600">{listing.description}</p>
          </div>
        ))}
      </div>
      {/* Sticky Sell Button */}

      <Button
        className="fixed bottom-4 right-4 p-4 bg-black text-white rounded-full flex items-center justify-center 
             hover:scale-105 hover:shadow-lg transition-transform duration-300 
             active:scale-95 active:shadow-md focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50"
        aria-label="Action"
      >
        <span className="text-xl font-bold">Action</span>
      </Button>
    </div>
  )
}

export default Listing
