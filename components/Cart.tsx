"use client";

import { useSelector} from "react-redux";

import Link from "next/link";
import { RootState } from "@/store/store";
import CartItem from "./cartItem";
import { Product } from "@/types/types";

const CartPage = () => {
  const items:Product[] = useSelector((state:RootState) => state.cart.items);
  const totalPrice = items.reduce((total, item) => total + item.price, 0);

  return (
    <div className="mb-10">
      {items.length > 0 ? (
        <div className="flex flex-row justify-center max-w-[1300px] mx-auto gap-x-5">
          {/* Cart Item  */}
          <div className="w-[60%] flex flex-col p-2">
            {items.map((product) => (
              <CartItem product={product} key={product.id} />
            ))}
          </div>

          {/* Summary */}
          <div className="w-[40%] mt-5 flex items-center justify-center flex-col">
            <div className="flex flex-col h-[100%]  p-5 gap-5 my-14">
              <div className="flex flex-col gap-5 ">
                <div className="font-semibold text-xl text-green-800 ">
                  Your Cart
                </div>
                <div className="font-semibold text-5xl text-green-700  -mt-5">
                  Summary
                </div>
                <p className="text-xl">
                  <span className="text-gray-700 font-semibold text-xl">
                    Total Items: {items.length}
                  </span>
                </p>
              </div>
              <p className="text-xl font-bold">
                <span className="text-gray-700 font-semibold">
                  Total Amount:
                </span>{" "}
                ${totalPrice}
              </p>
              <button className="bg-green-700 hover:bg-purple-50 rounded-lg text-white transition duration-300 ease-linear mt-5 border-2 border-green-600 font-bold hover:text-green-700 p-3 text-xl mr-10">
                CheckOut Now
              </button>
            </div>
            
          </div>
          
        </div>
      ) : (
        <div className="min-h-[80vh] flex flex-col justify-center items-center">
          <h1 className="text-gray-700 font-semibold text-xl mb-2">
            Your cart is empty!
          </h1>

          <Link href="/">
            <button className="uppercase bg-green-600 p-3 px-10 rounded-lg text-white mt-6 font-semibold tracking-wider hover:bg-purple-50 duration-300 transition-all ease-in hover:text-green-600 border-2 border-green-600">
              shop now
            </button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default CartPage;
