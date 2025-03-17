import React from "react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface ListingProps {
  title: string;
  price: string;
  location: string;
  imageUrl: string;
}

const ListingCard: React.FC<ListingProps> = ({ title, price, location, imageUrl }) => {
  return (
    <Card className="w-full max-w-sm shadow-md border rounded-lg overflow-hidden">
      <img src={imageUrl} alt={title} className="w-full h-48 object-cover" />
      <CardContent className="p-4">
        <h3 className="text-lg font-semibold">{title}</h3>
        <p className="text-gray-500">{location}</p>
        <p className="text-lg font-bold text-primary">{price}</p>
      </CardContent>
      <CardFooter className="p-4">
        <Button className="w-full">View Details</Button>
      </CardFooter>
    </Card>
  );
};

export default ListingCard;
