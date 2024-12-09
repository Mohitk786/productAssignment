"use client"

import { useEffect, useState } from "react";
import Spinner from "./Spinner";
import Item from "./Item";
import { Product } from "@/types/types";
import InteractiveVideoPlayer from "./VideoPlayer";

const Home = () => {
  const API_URL = "https://fakestoreapi.com/products";
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState<Product[]>([]);
  const videoUrl = "https://www.w3schools.com/html/mov_bbb.mp4";

  async function fetchProductsData() {
    setLoading(true);
    try {
      const output = await fetch(API_URL);
      const data = await output.json();
      setProducts(data);
    } catch (err) {
      console.log(err);
      setProducts([]);
    }
    setLoading(false);
  }

  useEffect(() => {
    fetchProductsData();
  }, []);

  return (
    <div className="flex flex-col items-center">
      <div className="h-[80%] w-[80%]">
        { products && <InteractiveVideoPlayer videoUrl={videoUrl} products={products} />}
      </div>
      <div>
        {loading ? (
          <Spinner />
        ) : products.length > 0 ? (
          <div className="grid xs:gridcols-1 sm:grid-cols-2  md:grid-cols-3 lg:grid-cols-4 max-w-6xl p-2 mx-auto space-y-10 space-x-5 min-h-[80vh]">
            {products.map((product) => (
              <Item key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div>No Products Found</div>
        )}
      </div>
    </div>
  );
};

export default Home;
