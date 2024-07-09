import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addItem, Product } from "@/lib/slices/listSlice";

const productTypes = ["Electronics", "Clothing", "Food", "Furniture", "Toys"];
const productBrands = ["BrandA", "BrandB", "BrandC", "BrandD", "BrandE"];
const colors = ["Red", "Blue", "Green", "Yellow", "Black"];

const AddModal = (props: any) => {
  const dispatch = useDispatch();

  // Create local state for product attributes
  const [product, setProduct] = useState<any>({
    name: "",
    description: "",
    price: null,
    pictureUrl: "",
    productType: "",
    productBrand: "",
    color: "",
    popularity: null,
  });

  // Create local state for input errors
  const [inputErrors, setInputErrors] = useState<any>({
    price: "",
    popularity: "",
  });

  // Handle input changes
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setProduct({
      ...product,
      [name]: value,
    });

    // Clear error message when the user starts typing again
    setInputErrors({
      ...inputErrors,
      [name]: "",
    });
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // Prevent default form submission

    // Check if all required fields are filled
    if (!product.name || !product.description || !product.price || !product.pictureUrl || !product.popularity) {
      alert("Please fill in all required fields.");
      return;
    }

    // Validate number inputs
    if (!Number.isInteger(product.price) || !Number.isInteger(product.popularity)) {
      setInputErrors({
        ...inputErrors,
        price: "Please enter a valid price (integer)",
        popularity: "Please enter a valid popularity (integer)",
      });
      return;
    }

    await dispatch<any>(addItem(product));
    props.onClose();
  };

  return (
    <>
      {props.show ? (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white dark:bg-gray-900 outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
                  <h3 className="text-3xl font-semibold">Add New Product</h3>
                  <button
                    className="p-1 ml-auto bg-transparent border-0 text-black float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={props.onClose}
                  >
                    <span className="text-rose-500 h-6 w-6 text-2xl block outline-none focus:outline-none">
                      ×
                    </span>
                  </button>
                </div>
                {/*body*/}
                <div className="relative p-6 flex-auto">
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <input
                      type="text"
                      name="name"
                      value={product.name}
                      onChange={handleInputChange}
                      placeholder="Name"
                      className="w-full p-2 border border-gray-300 rounded"
                      required // Required attribute for HTML validation
                    />
                    <input
                      type="text"
                      name="description"
                      value={product.description}
                      onChange={handleInputChange}
                      placeholder="Description"
                      className="w-full p-2 border border-gray-300 rounded"
                      required // Required attribute for HTML validation
                    />
                    <input
                      type="number"
                      name="price"
                      value={product.price}
                      onChange={handleInputChange}
                      placeholder="Price"
                      className="w-full p-2 border border-gray-300 rounded"
                      required // Required attribute for HTML validation
                      title={inputErrors.price} // Tooltip for validation error
                    />
                    <input
                      type="text"
                      name="pictureUrl"
                      value={product.pictureUrl}
                      onChange={handleInputChange}
                      placeholder="Picture URL"
                      className="w-full p-2 border border-gray-300 rounded"
                      required // Required attribute for HTML validation
                    />
                    <select
                      name="productType"
                      value={product.productType}
                      onChange={handleInputChange}
                      className="w-full p-2 border border-gray-300 rounded"
                      required // Required attribute for HTML validation
                    >
                      <option value="">Select Product Type</option>
                      {productTypes.map((type, index) => (
                        <option key={type} value={type} >
                          {type}
                        </option>
                      ))}
                    </select>
                    <select
                      name="productBrand"
                      value={product.productBrand}
                      onChange={handleInputChange}
                      className="w-full p-2 border border-gray-300 rounded"
                      required // Required attribute for HTML validation
                    >
                      <option value="">Select Product Brand</option>
                      {productBrands.map((brand) => (
                        <option key={brand} value={brand}>
                          {brand}
                        </option>
                      ))}
                    </select>
                    <select
                      name="color"
                      value={product.color}
                      onChange={handleInputChange}
                      className="w-full p-2 border border-gray-300 rounded"
                      required // Required attribute for HTML validation
                    >
                      <option value="">Select Color</option>
                      {colors.map((color) => (
                        <option key={color} value={color}>
                          {color}
                        </option>
                      ))}
                    </select>
                    <input
                      type="number"
                      name="popularity"
                      value={product.popularity}
                      onChange={handleInputChange}
                      placeholder="Popularity"
                      className="w-full p-2 border border-gray-300 rounded"
                      required // Required attribute for HTML validation
                      title={inputErrors.popularity} // Tooltip for validation error
                    />
                    {/* Submit button */}
                    <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
                      <button
                        className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                        type="button"
                        onClick={props.onClose}
                      >
                        Close
                      </button>
                      <button
                        className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                        type="submit" // Use type submit for form submission
                      >
                        Add Product
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
    </>
  );
};

export default AddModal;
