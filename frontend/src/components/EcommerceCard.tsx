import React, { useState } from "react";

export const EcommerceCard = (props: any) => {
  const [isHovered, setIsHovered] = useState(false);



  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  return (
    <div
      className={isHovered ?"max-w-sm rounded overflow-hidden bg-gray-100 dark:bg-gray-900 shadow-lg text-center":"max-w-sm rounded overflow-hidden shadow-lg text-center"}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <img
        className="w-full"
        src={props.item.pictureUrl}
        alt="Product"
      />
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2">{props.item.name}</div>
        <p className="text-gray-700 text-base">{props.item.description}</p>
      </div>
      <div className="px-6 pt-4 pb-2">
        <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
          {props.item.popularity / 10}/10
        </span>
        <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
          {props.item.productBrand}
        </span>
        <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
          {props.item.productType}
        </span>
        <br/>
        <span className="inline-block bg-yellow-200 rounded-full px-3 py-1 text-sm font-semibold text-yellow-700 mr-2 mb-2">
          {props.item.price}$
        </span>
      </div>
    </div>
  );
};
