// FilterDropdown.tsx
import React from "react";

interface FilterDropdownProps {
  filters: {
    ProductType: string;
    ProductBrand: string;
    Color: string;
    SortBy: string;
    Name: string;
  };
  dropdownOpen: boolean;
  toggleDropdown: () => void;
  handleFilterChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  handleInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  clearFilters: () => void;
}

const FilterDropdown: React.FC<FilterDropdownProps> = ({
  filters,
  dropdownOpen,
  toggleDropdown,
  handleFilterChange,
  handleInputChange,
  clearFilters,
}) => {
  return (
    <div className="w-full mt-5">
      <div className="relative">
        <button
          onClick={toggleDropdown}
          className="text-gray-500 hover:text-gray-600 border border-gray-300 rounded-md px-3 py-2 flex items-center dark:text-gray-400 dark:hover:text-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:hover:bg-gray-700"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="30"
            viewBox="0 0 1792 1792"
            width="30"
            fill="currentColor"
            className="dark:text-gray-400"
          >
            <path d="M1595 295q17 41-14 70l-493 493v742q0 42-39 59-13 5-25 5-27 0-45-19l-256-256q-19-19-19-45v-486l-493-493q-31-29-14-70 17-39 59-39h1280q42 0 59 39z" />
          </svg>
          Filters
        </button>

        {dropdownOpen && (
          <div className="absolute z-10 mt-2 w-64 shadow-lg bg-gray-200 rounded-md border border-gray-200 dark:border-gray-600 dark:bg-gray-800">
            <div className="p-4">
              <input
                type="text"
                name="Name"
                value={filters.Name}
                onChange={handleInputChange}
                placeholder="Search by name"
                className="block w-full px-3 py-2 border border-gray-300 rounded-md mb-2 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              />
              <select
                name="ProductType"
                value={filters.ProductType}
                onChange={handleFilterChange}
                className="block w-full px-3 py-2 border border-gray-300 rounded-md mb-2 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              >
                <option value="">Select Product Type</option>
                <option value="Electronics">Electronics</option>
                <option value="Clothing">Clothing</option>
                <option value="Food">Food</option>
                <option value="Furniture">Furniture</option>
                <option value="Toys">Toys</option>
              </select>
              <select
                name="ProductBrand"
                value={filters.ProductBrand}
                onChange={handleFilterChange}
                className="block w-full px-3 py-2 border border-gray-300 rounded-md mb-2 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              >
                <option value="">Select Product Brand</option>
                <option value="BrandA">BrandA</option>
                <option value="BrandB">BrandB</option>
                <option value="BrandC">BrandC</option>
                <option value="BrandD">BrandD</option>
                <option value="BrandE">BrandE</option>
              </select>
              <select
                name="Color"
                value={filters.Color}
                onChange={handleFilterChange}
                className="block w-full px-3 py-2 border border-gray-300 rounded-md mb-2 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              >
                <option value="">Select Color</option>
                <option value="Red">Red</option>
                <option value="Blue">Blue</option>
                <option value="Green">Green</option>
                <option value="Yellow">Yellow</option>
                <option value="Black">Black</option>
              </select>
              <select
                name="SortBy"
                value={filters.SortBy}
                onChange={handleFilterChange}
                className="block w-full px-3 py-2 border border-gray-300 rounded-md mb-2 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              >
                <option value="">Sort By</option>
                <option value="PriceAsc">Price - Ascending</option>
                <option value="PriceDesc">Price - Descending</option>
                <option value="PopularityAsc">Popularity - Ascending</option>
                <option value="PopularityDesc">
                  Popularity - Descending
                </option>
                <option value="NameAsc">Name - Ascending</option>
                <option value="NameDesc">Name - Descending</option>
              </select>
              <button
                onClick={() => {
                  clearFilters();
                  toggleDropdown();
                }}
                className=" px-3 py-2 rounded-md mt-2 dark:bg-gray-600 dark:hover:bg-gray-500 dark:text-white bg-gray-200 text-gray-700 hover:bg-gray-300"
              >
                Clear Filters
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default FilterDropdown;