"use client";
import React, { useEffect, useState } from 'react';
import ProductCard from '../../components/ProductCard';
import { useRouter } from 'next/navigation';
import { useRecoilValue } from 'recoil';
import { userAtom } from '@/store/atoms/userAtom';
import { useAuth } from '@/hooks/useAuth';
import { userSelector } from '@/store/atoms/userSelector';

// interface IProduct {
//   id: string;
//   name: string;
//   imageUrl: string;
//   price: {
//     current: number;
//     original: number;
//     discountPercentage: number;
//   };
//   customisable: boolean;
//   description: string;
// }

interface IProduct {
  id: string; // Assuming `id` is part of the document interface
  name: string;
  price: {
    current: number;
    original: number;
    discountPercentage: number;
  };
  customisable: boolean;
  description: string;
  images: string[]; // Add an array of images for the slider
}


const products: IProduct[] = [
  {
  id: '1',
  name: 'Wireless Earbuds',
  price: {
    current: 2999,
    original: 4999,
    discountPercentage: 40,
  },
  customisable: true,
  description: 'High-quality wireless earbuds with noise-cancellation and long battery life.',
  images: [
    '/image.png',
    '/image2.webp',
    '/image3.webp',
  ],
},
{
  id: '2',
  name: 'Smart Watch',
  price: {
    current: 9999,
    original: 14999,
    discountPercentage: 33,
  },
  customisable: false,
  description: 'Feature-rich smart watch with heart rate monitoring and GPS tracking.',
  images: [
   '/image.png',
    '/image2.webp',
    '/image3.webp',
  ],
}
];
const ProductsPage: React.FC = () => {
  // const [products, setProducts] = useState<IProduct[]>([]);
  const [loading, setLoading] = useState(true);

  const router = useRouter()
 
  const user = useRecoilValue(userSelector);
  const { logout } = useAuth()

  useEffect(()=>{
    if (!user) {
      router.push('/login');
    }
  },[user])

  // useEffect(() => {
  //   const fetchProducts = async () => {
  //     try {
  //       const response = await fetch('/api/product');
  //       const data = await response.json();
  //       setProducts(data);
  //     } catch (error) {
  //       console.error('Failed to fetch products:', error);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   fetchProducts();
  // }, []);

  // if (loading) {
  //   return <div>Loading...</div>;
  // }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Products</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {products.map((product, index) => (
        <ProductCard key={`${product.id}-${index}`} product={product} />
      ))}
      </div>
    </div>
  );
};

export default ProductsPage;
