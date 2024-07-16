"use client";
import React, { useEffect, useState } from 'react';
import ProductCard from '../../components/ProductCard';
import { useRouter } from 'next/navigation';
import { useRecoilValue } from 'recoil';
import { userAtom } from '@/store/atoms/userAtom';
import { useAuth } from '@/hooks/useAuth';
import { userSelector } from '@/store/atoms/userSelector';

interface IProduct {
  id: string;
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

const ProductsPage: React.FC = () => {
  const [products, setProducts] = useState<IProduct[]>([]);
  const [loading, setLoading] = useState(true);

  const router = useRouter()
 
  const user = useRecoilValue(userSelector);
  const { logout } = useAuth()

  useEffect(()=>{
    if (!user) {
      router.push('/login');
    }
  },[user])

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('/api/product');
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error('Failed to fetch products:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

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