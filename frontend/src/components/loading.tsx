import React from 'react';
import { FaSpinner } from 'react-icons/fa';

const Loading = () => {
  return (
    <div className="fixed top-0 left-0 z-50 w-full h-full flex items-center justify-center bg-gray-500 bg-opacity-50">
      <div className=" p-5 rounded-lg">
        <div className="flex items-center justify-center mb-4">
          <FaSpinner className="animate-spin text-blue-500 mr-2" />
          <span className="text-blue-500">Loading...</span>
        </div>
      </div>
    </div>
  );
};

export default Loading;
