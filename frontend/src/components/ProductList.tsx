// ProductList.tsx
import React, { useState } from "react";
import { Product } from "@/lib/slices/listSlice";
import { EcommerceCard } from "@/components/EcommerceCard";
import EditModal from "@/components/EditModal"; // Import the Modal component

interface ProductListProps {
  items: Product[];
  currentPage: number;
  itemsPerPage: number;
  paginate: (pageNumber: number) => void;
}

const ProductList: React.FC<ProductListProps> = ({
  items,
  currentPage,
  itemsPerPage,
  paginate,
}) => {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = items.slice(indexOfFirstItem, indexOfLastItem);

  const handleCardClick = (product: Product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedProduct(null);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-5 md:grid-cols-4 sm:grid-cols-3 gap-4 mt-8 w-full">
      {currentItems.map((product) => (
        <div key={product.id} onClick={() => handleCardClick(product)}>
            <EcommerceCard item={product}   />
        </div>
        
      ))}
      {isModalOpen && selectedProduct && (
        <EditModal product={selectedProduct} show={isModalOpen} onClose={handleCloseModal} />
      )}
    </div>
  );
};

export default ProductList;
