import React, { useState } from 'react';
interface IProduct {
  id: string;
  name: string;
  price: {
    current: number;
    original: number;
    discountPercentage: number;
  };
  customisable: boolean;
  description: string;
  images: string[];
}

const ProductCard: React.FC<{ product: IProduct }> = ({ product }) => {
  const { current, original, discountPercentage } = product.price;
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const handleNextImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % product.images.length);
  };

  const handlePreviousImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex - 1 + product.images.length) % product.images.length);
  };

  return (
    <div className="border p-4 rounded-lg shadow-md relative bg-white w-[300px]">
      {product.customisable && (
        <span className="bg-white text-gray-500 text-sm font-semibold px-2 py-1 rounded-full absolute top-6 right-6 border-b-4 border-gray-300">
          *Customisable
        </span>
      )}
      <div className="relative group bg-[#f6f6f6]">
        <div className="overflow-hidden">
          <img src={product.images[currentImageIndex]} alt={product.name} className="w-full h-auto mb-4" />
        </div>
        <button 
          className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white text-black px-2 py-1 rounded-full"
          onClick={handlePreviousImage}
        >
          &lt;
        </button>
        <button 
          className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white text-black px-2 py-1 rounded-full"
          onClick={handleNextImage}
        >
          &gt;
        </button>
        <div className="inset-x-0 left-[50px] group-hover:flex -bottom-10 justify-center hidden group-hover:bottom-0">
          <button className=" text-black p-1 rounded-[20px] border-2 border-slate-300 w-[149px] h-[40px] text-center"
          style={{ 
              background: 'radial-gradient(rgb(0, 81, 255) 0%, rgb(163, 192, 255) 100%)', 
              // backgroundColor: 'rgb(246, 246, 246)', 
              transformOrigin: '50% 50% 0px',
              boxShadow: 'rgba(0, 0, 0, 0.25) 0px 1px 2px 0px',
              transition: 'opacity 0.5s ease-out, transform 0.5s ease-out',
              opacity: '0.9',
              transform: 'translateY(-10px)'
            }}
          >
            Place Order
          </button>
        </div>
      </div>
      <h2 className="text-lg font-medium mb-2 text-black">{product.name}</h2>
      <div className="text-gray-900 text-xl mb-2 relative box-content">
        ₹ {current.toLocaleString('en-IN')}
        <span className="text-gray-500 line-through text-base ml-2">₹ {original.toLocaleString('en-IN')}</span>
        <span className="text-green-600 ml-2 bg-green-100 px-2 py-1 rounded-full text-sm absolute right-0">
          {discountPercentage.toLocaleString('en-IN')}% OFF
        </span>
      </div>
      <div className="relative group">
        <p className="text-gray-500 text-sm font-semibold mb-4 max-h-12 overflow-hidden group-hover:max-h-full transition-all">
          {product.description}
        </p>
      </div>
    </div>
  );
};

export default ProductCard;

{/* <div className="relative inset-x-0 -bottom-10 justify-center hidden group-hover:flex">
          <button className="bg-[#3867d6] text-white px-6 py-2 rounded-full">
            Place Order
          </button>
        </div> */}