import React from 'react';

interface IProduct {
  id: string; // Assuming `id` is part of the document interface
  name: string;
  imageUrl: string;
  price: {
    current: number;
    original: number;
    discountPercentage: number;
  };
  customisable: boolean;
  description: string;
}

const ProductCard: React.FC<{ product: IProduct }> = ({ product }) => {
  const { current, original, discountPercentage } = product.price;

  return (
    <div className="border p-4 rounded-lg shadow-md relative bg-white">
      {product.customisable && (
        <span className="bg-white text-gray-500 text-sm font-semibold px-2 py-1 rounded-full absolute top-6 right-6 border-b-4 border-gray-300">
          *Customisable
        </span>
      )}
      <img src={product.imageUrl} alt={product.name} className="w-full h-auto mb-4" />
      <h2 className="text-lg font-semibold mb-2 text-black">{product.name}</h2>
      <div className="text-gray-900 font-bold text-xl mb-2 relative box-content">
        ₹ {current.toLocaleString('en-IN')}
        <span className="text-gray-500 line-through text-base ml-2">₹ {original.toLocaleString('en-IN')}</span>
        <span className="text-green-600 ml-2 bg-green-100 px-2 py-1 rounded-full text-sm absolute right-0">
          {discountPercentage.toLocaleString('en-IN')}% OFF
        </span>
      </div>
      <p className="text-gray-500 text-sm font-semibold">{product.description}</p>
    </div>
  );
};

export default ProductCard;
