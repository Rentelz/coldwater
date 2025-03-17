import React from 'react'
import ListingCard from './ListingCard'
const listingsData = [
    {
      title: "iPhone 14 Pro Max",
      price: "$999",
      location: "New York, USA",
      imageUrl: "https://via.placeholder.com/300x200",
    },
    {
      title: "Gaming Laptop",
      price: "$1,299",
      location: "Los Angeles, USA",
      imageUrl: "https://via.placeholder.com/300x200",
    },
    {
      title: "Sony PlayStation 5",
      price: "$499",
      location: "Chicago, USA",
      imageUrl: "https://via.placeholder.com/300x200",
    },
  ];

const Listing: React.FC = () => {
  return (
    <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 p-4'>
    {listingsData.map((listing, index) => (
        <ListingCard key={index} {...listing} />
      ))}
    </div>
  )
}

export default Listing
