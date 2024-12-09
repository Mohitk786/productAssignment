"use client"

import React, { useState } from "react";
import ReactPlayer from "react-player";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, removeFromCart } from "@/store/cartSlice"; 
import { Product } from "@/types/types";
import Image from "next/image";
import toast from "react-hot-toast";
import { RootState } from "@/store/store";

interface InteractiveVideoPlayerProps {
  videoUrl: string;
  products:Product[]
}

const InteractiveVideoPlayer = ({ videoUrl, products}: InteractiveVideoPlayerProps) => {
  const [showOffer, setShowOffer] = useState(false);
  const [offerDetails, setOfferDetails] = useState<Product | null>(null); 
  const {items} = useSelector((state:RootState)=>state.cart)
  const dispatch = useDispatch();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleVideoProgress = (state: any) => {

    // Check for specific timestamps to display offers
    if (state.playedSeconds >= 10 && state.playedSeconds < 12) {
      setShowOffer(true);
      setOfferDetails({
        id: 14,
        price:125,
        title: "Headphone",
        description: "Special Offer: 20% off on HeadPhone",
        image: "globe.svg"
      });
    } else {
      setShowOffer(false);
    }
  };

  const handleAddItem = (productId: number) => {
   
    const product = products.find((prod) => prod.id === productId);
    if (product) {
      dispatch(addToCart(product));
    }
  };

  const handleRemoveItem = () => {
    dispatch(removeFromCart(14));  //hard coded because to offer product is also same 
    toast.error("Item Removed From Cart");
  };

  return (
    <div className="relative">
      <ReactPlayer
        url={videoUrl}
        playing
        controls
        onProgress={handleVideoProgress}
        width="100%"
        height="100%"
      />

      {showOffer && offerDetails && (
        <div className="absolute top-1/4 left-1/2 transform -translate-x-1/2 bg-black bg-opacity-70 text-white p-6 rounded-lg w-72 text-center">
          <Image
            width={150}
            height={150}
            src={offerDetails.image}
            alt={offerDetails.title}
            className="mx-auto mb-4 rounded-lg"
            style={{ maxHeight: "150px", objectFit: "cover" }}
          />
          <h2 className="text-xl font-semibold mb-2">{offerDetails.title}</h2>
          <p className="text-sm mb-4">{offerDetails.description}</p>
          
          {
            items.some((p) => p.id === offerDetails.id) ? (
              <button
                className="border-2 border-gray-700 text-gray-700 uppercase font-semibold px-3 py-1 rounded-full text-[12px] transition-all duration-300 ease-in hover:text-white hover:bg-gray-700"
                onClick={handleRemoveItem}
              >
                Remove Item
              </button>
            ) : (
              <button
                className="border-2 border-gray-700 text-gray-700 uppercase font-semibold px-3 py-1 rounded-full text-[12px] transition-all duration-300 ease-in hover:text-white hover:bg-gray-700"
                onClick={()=>handleAddItem(offerDetails.id)}
              >
                Add to Cart
              </button>
            )
          }
        </div>
      )}
    </div>
  );
};

export default InteractiveVideoPlayer;
