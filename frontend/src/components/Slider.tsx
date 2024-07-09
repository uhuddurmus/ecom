import React, { useState, useEffect } from "react";

interface Image {
  id: number;
  name: string;
  pictureUrl: string;
  description: string;
  popularity:number;
}

const Slider: React.FC<{ items: Image[] }> = ({ items }) => {
  const [selectedId, setSelectedId] = useState<number>(1);
  const [intervalId, setIntervalId] = useState<NodeJS.Timeout>();

  // Slice the first 5 items
  const item = items.slice(0, 5);

  // Modify pictureUrl to include "900"
  const imageitems = item.map((item: Image, index: number) => ({
    ...item,
    id: index + 1,
    pictureUrl: item.pictureUrl.slice(0, -3) + "900",
  }));

  // Function to go to previous image
  const prevImage = () => {
    setSelectedId((prev) => (prev <= 1 ? imageitems.length : prev - 1));
  };

  // Function to go to next image
  const nextImage = () => {
    setSelectedId((prev) => (prev >= imageitems.length ? 1 : prev + 1));
  };

  useEffect(() => {
    const id = setInterval(() => {
      setSelectedId((prev) => (prev >= imageitems.length ? 1 : prev + 1));
    }, 5000);
  
    setIntervalId(id);
  
    return () => {
      clearInterval(id); // Clear the interval using the local variable id
    };
  }, [imageitems.length]); 

  useEffect(() => {
    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [intervalId]);

  return (
    <div className="relative">
      {/* Main Image */}
      <div className="max-w-xl mx-auto overflow-hidden rounded-lg shadow-lg">
        {imageitems
          .filter((image) => image.id === selectedId)
          .map((image) => (
            <div key={image.id} className="relative">
              <img
                src={image.pictureUrl}
                alt={image.name}
                className="object-cover w-full h-64 sm:h-96 rounded-lg"
              />
              <div className="absolute bottom-0 right-0 left-0 bg-black bg-opacity-50 text-white p-2">
                <p className="text-sm font-semibold">{image.name}</p>
                <p className="text-xs">{image.description}</p>
                {/* Assuming there's a popularity field */}
                <div>
                  <p className="text-xs">{image.popularity / 10}/10</p>
                </div>
              </div>
            </div>
          ))}
      </div>

      {/* Thumbnails */}
      <div className="flex justify-center mt-4">
        {imageitems.map((image) => (
          <img
            key={image.id}
            src={image.pictureUrl}
            alt={image.name}
            className={`w-12 h-12 object-cover mx-2 cursor-pointer rounded-lg ${
              image.id === selectedId ? "border-2 border-blue-500" : ""
            }`}
            onClick={() => setSelectedId(image.id)}
          />
        ))}
      </div>

      {/* Navigation Buttons */}
      <div className="absolute top-1/2 transform -translate-y-1/2 flex justify-between w-full px-4">
        <button
          className="text-white text-xl font-bold bg-gray-300 rounded-full p-3 shadow-lg hover:bg-gray-400 focus:outline-none dark:bg-gray-800"
          onClick={prevImage}
        >
          {"<"}
        </button>
        <button
          className="text-white text-xl font-bold bg-gray-300 rounded-full p-3 shadow-lg hover:bg-gray-400 focus:outline-none dark:bg-gray-800"
          onClick={nextImage}
        >
          {">"}
        </button>
      </div>
    </div>
  );
};

export default Slider;
