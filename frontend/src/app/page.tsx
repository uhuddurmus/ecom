"use client";
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../lib/store";
import { getProducts, Product } from "../lib/slices/listSlice";
import Slider from "../components/Slider";
import marketplaceImage from "../components/market.png"; // Replace with your image path
import Image from "next/image";
import { EcommerceCard } from "@/components/EcommerceCard";
import Loading from "@/components/loading";

const Home: React.FC = () => {
  const dispatch = useDispatch();
  const { items, status, error } = useSelector((state: RootState) => state.list);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10; // Number of items per page

  useEffect(() => {
    dispatch<any>(getProducts());
  }, [dispatch]);

  if (status === "loading") {
    return <Loading />;
  }

  if (status === "failed") {
    return <div>Error: {error}</div>;
  }

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = items.slice(indexOfFirstItem, indexOfLastItem);
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  return (
    <div className="flex justify-end flex-wrap p-24 m-5 shadow-xl">
      
      {/* Image and Text Section */}
      <div className="flex w-full md:w-1/2 justify-center items-center mb-10 mt-20 ">
        <div className="mr-8">
          <Image
            src={marketplaceImage}
            alt="Welcome to Marketplace"
            className="w-full max-w-md"
          />
        </div>
        <div>
          <h1 className="text-4xl font-bold mb-4">Welcome to Dashboard of Marketplace </h1>
          <p className="text-lg">Discover our most popular items below.</p>
        </div>
      </div>

      {/* Slider Section */}
      <div className="w-full md:w-1/2 mt-20">{items && <Slider items={items} />}</div>

      <div className="w-full text-start border-t-2 mt-12">
        <p className="text-2xl font-bold mb-4 mt-11">Most Populer İtems;</p>
      </div>
      {/* Products Section */}
      <div className="grid grid-cols-1 lg:grid-cols-5 md:grid-cols-4 sm:grid-cols-3 gap-4 mt-8 w-full">
        {currentItems.map((product, index) => (
          <EcommerceCard item={product} key={index} />
        ))}
      </div>

      {/* Pagination */}
      <div className="flex justify-center mt-5">
        {items.length > itemsPerPage && (
          <nav className="relative z-0 inline-flex shadow-sm -space-x-px" aria-label="Pagination">
            {Array.from({ length: Math.ceil(items.length / itemsPerPage) }, (_, index) => (
              <a
                onClick={() => paginate(index + 1)}
                className={`cursor-pointer ${
                  currentPage === index + 1
                    ? "bg-blue-500 text-white hover:bg-blue-600"
                    : " text-gray-500 hover:bg-gray-200"
                } relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium`}
                key={index}
              >
                {index + 1}
              </a>
            ))}
          </nav>
        )}
      </div>
    </div>
  );
};

export default Home;
