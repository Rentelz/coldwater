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
