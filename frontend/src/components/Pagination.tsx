// Pagination.tsx
import React from "react";

interface PaginationProps {
  items: any[]; // Buraya items'in tipini doğrudan veremiyoruz, en iyi şekilde ayarlaman gerekir
  currentPage: number;
  itemsPerPage: number;
  paginate: (pageNumber: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  items,
  currentPage,
  itemsPerPage,
  paginate,
}) => {
  return (
    <div className="flex justify-center mt-5">
      {items.length > itemsPerPage && (
        <nav
          className="relative z-0 inline-flex shadow-sm -space-x-px"
          aria-label="Pagination"
        >
          {Array.from(
            { length: Math.ceil(items.length / itemsPerPage) },
            (_, index) => (
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
            )
          )}
        </nav>
      )}
    </div>
  );
};

export default Pagination;
