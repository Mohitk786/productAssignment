"use client"

import { ShoppingBagIcon } from "lucide-react";
import Link from "next/link";
import { RootState } from "@/store/store";
import { useSelector } from "react-redux";

const Navbar = () => {
  const { items } = useSelector((state:RootState) => state.cart);

  return (
        <div className="flex flex-row justify-between items-center h-20 max-w-6xl mx-auto">
      <Link href="/">
        <div className="ml-6">
           {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={"/next.svg"} className="h-4" alt="Logo" />
        </div>
      </Link>
      <div className="flex flex-row items-center gap-x-6 mr-6 text-slate-100 -tracking-tighter font-medium">
        <Link href="/">
          <p className="hover:text-green-400 text-gray-950 cursor-pointer duration-300 transition-all ease-in">
            Home
          </p>
        </Link>
        <Link href="/cart">
          <div className="relative">
            <ShoppingBagIcon className="text-2xl text-gray-950 " />
            {
              items.length > 0 &&
              <span className="absolute -top-1 -right-2 bg-green-600 rounded-full text-sm w-5 h-5 grid justify-items-center animate-bounce text-white">{items.length}</span>
            }
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
