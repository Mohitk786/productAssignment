import { useDispatch } from "react-redux";
import { toast } from "react-hot-toast";
import { removeFromCart } from "@/store/cartSlice";
import {Trash } from "lucide-react";
import { ItemProps } from "./Item";
import Image from "next/image";

const CartItem = ({ product }:ItemProps) => {
  const dispatch = useDispatch();

  const handleRemove = () => {
    dispatch(removeFromCart(product.id));
    toast.error("Item Removed From Cart");
  };
  return (
    <div className="flex items-center p-5 justify-between mt-2 mb-2 mx-5 border-b-[3px] border-slate-500  ">
      <div className="flex flex-row p-3 gap-5 items-center">
        <div className="w-[30%]">
          <Image 
            alt="cart Item"
            src={product.image} 
            className="object-cover" 
            width={200}
            height={200}
            />
        </div>
        <div className="w-[70%] self-start space-y-5 ml-5">
          <h1 className="text-xl text-slate-700 font-semibold">{product.title}</h1>
          <p className="text-base text-slate-700 font-medium">{product.description}</p>
          <div className="flex items-center justify-between">
            <p className="text-green-600 font-bold text-lg">${product.price}</p>
            <button className="text-red-800  bg-red-200 group hover:bg-red-400 transition-transform duration-300 cursor-pointer rounded-full p-3 mr-3" onClick={handleRemove}>
              <Trash />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItem;