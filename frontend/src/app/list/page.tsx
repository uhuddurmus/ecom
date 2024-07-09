"use client";
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/lib/store";
import { getList, Product } from "@/lib/slices/listSlice";
import FilterDropdown from "@/components/FilterDropdown";
import ProductList from "@/components/ProductList";
import Pagination from "@/components/Pagination";
import AddModal from "@/components/AddModal"; // Import AddModal component

const Page = () => {
  const dispatch = useDispatch();
  const { items, status, error } = useSelector(
    (state: RootState) => state.list
  );

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10; // Number of items per page

  // Initial filter values
  const [filters, setFilters] = useState({
    ProductType: "",
    ProductBrand: "",
    Color: "",
    SortBy: "",
    Name: "", // New input field for name search
  });

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [addModalOpen, setAddModalOpen] = useState(false); // State for modal visibility

  useEffect(() => {
    dispatch<any>(getList(filters));
  }, [dispatch, filters]);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const handleFilterChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = event.target;
    setCurrentPage(1); // Reset page number on filter change
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value,
    }));
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setCurrentPage(1); // Reset page number on input change
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value,
    }));
  };

  const clearFilters = () => {
    setFilters({
      ProductType: "",
      ProductBrand: "",
      Color: "",
      SortBy: "",
      Name: "",
    });
  };

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  const openAddModal = () => {
    setAddModalOpen(true);
  };

  const closeAddModal = () => {
    setAddModalOpen(false);
  };

  return (
    <div className="flex justify-end flex-wrap p-24 m-5 shadow-xl">
      <div className="flex  space-x-4">
        <FilterDropdown
          filters={filters}
          dropdownOpen={dropdownOpen}
          toggleDropdown={toggleDropdown}
          handleFilterChange={handleFilterChange}
          handleInputChange={handleInputChange}
          clearFilters={clearFilters} // clearFilters prop'unu doğru bir şekilde geçirildiğinden emin olun
        />
        <div className="w-full  mt-5">
          <div className="relative">
            <button
              onClick={openAddModal}
              className=" text-white bg-cyan-700 hover:text-gray-600 border border-gray-300 rounded-md px-3 py-2 flex items-center  dark:text-gray-400 dark:hover:text-gray-300 dark:border-gray-600 dark:bg-gray-900 dark:hover:bg-gray-700"
            >
              <svg
                fill="white"
                version="1.1"
                id="Capa_1"
                xmlns="http://www.w3.org/2000/svg"
                xmlnsXlink="http://www.w3.org/1999/xlink"
                width="30"
                height="30"
                viewBox="0 0 45 45"
                xmlSpace="preserve"
                className="me-1"
              >
                <g>
                  <path
                    d="M41.267,18.557H26.832V4.134C26.832,1.851,24.99,0,22.707,0c-2.283,0-4.124,1.851-4.124,4.135v14.432H4.141
		c-2.283,0-4.139,1.851-4.138,4.135c-0.001,1.141,0.46,2.187,1.207,2.934c0.748,0.749,1.78,1.222,2.92,1.222h14.453V41.27
		c0,1.142,0.453,2.176,1.201,2.922c0.748,0.748,1.777,1.211,2.919,1.211c2.282,0,4.129-1.851,4.129-4.133V26.857h14.435
		c2.283,0,4.134-1.867,4.133-4.15C45.399,20.425,43.548,18.557,41.267,18.557z"
                  />
                </g>
              </svg>
              New
            </button>
          </div>
        </div>
      </div>
      <ProductList
        items={items}
        currentPage={currentPage}
        itemsPerPage={itemsPerPage}
        paginate={paginate}
      />
      <Pagination
        items={items}
        currentPage={currentPage}
        itemsPerPage={itemsPerPage}
        paginate={paginate}
      />
      {addModalOpen && <AddModal show={addModalOpen} onClose={closeAddModal} />}
    </div>
  );
};

export default Page;
