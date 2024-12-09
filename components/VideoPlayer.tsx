"use client"

// InteractiveVideoPlayer.tsx
import React, { useState } from "react";
import ReactPlayer from "react-player";
import { toast } from "react-hot-toast";
import { useDispatch } from "react-redux";
import { addToCart } from "@/store/cartSlice"; // Assuming you're using Redux for cart management
import { Product } from "@/types/types";
import Image from "next/image";

interface InteractiveVideoPlayerProps {
  videoUrl: string;
  products: Product[];
}

const InteractiveVideoPlayer = ({ videoUrl, products }: InteractiveVideoPlayerProps) => {
  const [showOffer, setShowOffer] = useState(false);
  const [offerDetails, setOfferDetails] = useState<Product | null>(null); // To hold offer details
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

  const handleOfferClick = (productId: number) => {
    // You can dispatch the product to the cart
    const product = products.find((prod) => prod.id === productId);
    if (product) {
      dispatch(addToCart(product));
      toast.success("Item Added To Cart");
    }
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
          <button
            onClick={() => handleOfferClick(offerDetails.id)}
            className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-full w-full transition duration-300"
          >
            Add to Cart
          </button>
        </div>
      )}
    </div>
  );
};

export default InteractiveVideoPlayer;
