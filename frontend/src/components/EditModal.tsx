import { updateItem, getList, deleteItem } from "@/lib/slices/listSlice";
import React, { useState } from "react";
import { useDispatch } from "react-redux";

const productTypes = ["Electronics", "Clothing", "Food", "Furniture", "Toys"];
const productBrands = ["BrandA", "BrandB", "BrandC", "BrandD", "BrandE"];
const colors = ["Red", "Blue", "Green", "Yellow", "Black"];

export default function EditModal(props: any) {
  const dispatch = useDispatch();

  // Create local state for product attributes
  const [product, setProduct] = useState(props.product);

  // Handle input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setProduct({
      ...product,
      [name]: value,
    });
  };

  // Handle form submission
  const handleSubmit = async () => {
    await dispatch<any>(updateItem(product));
    await dispatch<any>(getList({
        ProductType: "",
        ProductBrand: "",
        Color: "",
        SortBy: "",
        Name: "",
      }));
    props.onClose();
  };
  // Handle item deletion
  const handleDelete = async () => {
    await dispatch<any>(deleteItem(product.id));
    await dispatch<any>(getList({
        ProductType: "",
        ProductBrand: "",
        Color: "",
        SortBy: "",
        Name: "",
      }));
    props.onClose();
  };
  return (
    <>
      {props.show ? (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              {/*content*/}
              <div className="border-0 bg-white dark:bg-gray-900 rounded-lg shadow-lg relative flex flex-col w-full  outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
                  <h3 className="text-3xl font-semibold">Edit Product</h3>
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
                  <form className="space-y-4">
                    <input
                      type="text"
                      name="name"
                      value={product.name}
                      onChange={handleInputChange}
                      placeholder="Name"
                      className="w-full p-2 border border-gray-300 rounded"
                    />
                    <input
                      type="text"
                      name="description"
                      value={product.description}
                      onChange={handleInputChange}
                      placeholder="Description"
                      className="w-full p-2 border border-gray-300 rounded"
                    />
                    <input
                      type="number"
                      name="price"
                      value={product.price}
                      onChange={handleInputChange}
                      placeholder="Price"
                      className="w-full p-2 border border-gray-300 rounded"
                    />
                    <input
                      type="text"
                      name="pictureUrl"
                      value={product.pictureUrl}
                      onChange={handleInputChange}
                      placeholder="Picture URL"
                      className="w-full p-2 border border-gray-300 rounded"
                    />
                    <select
                      name="productType"
                      value={product.productType}
                      onChange={handleInputChange}
                      className="w-full p-2 border border-gray-300 rounded"
                    >
                      {productTypes.map((type) => (
                        <option key={type} value={type}>
                          {type}
                        </option>
                      ))}
                    </select>
                    <select
                      name="productBrand"
                      value={product.productBrand}
                      onChange={handleInputChange}
                      className="w-full p-2 border border-gray-300 rounded"
                    >
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
                    >
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
                    />
                  </form>
                  <div className="mt-5">
                    
                  <button
                    className="bg-red-500 text-white active:bg-red-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={handleDelete}
                  >
                    Delete Item
                  </button>
                  </div>
                </div>
                {/*footer*/}
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
                    type="button"
                    onClick={handleSubmit}
                  >
                    Save Changes
                  </button>
                  
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
    </>
  );
}
