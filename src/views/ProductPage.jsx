import React, { useState, useEffect } from "react";
import { Helmet } from 'react-helmet-async'; 
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../config/firebase"; 
import ProductCard from "./ProductCard"; 
import Loading from "../components/Loading"; 
import { HiArrowUp, HiArrowDown } from "react-icons/hi";

function ProductPage({ id }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [sortOrder, setSortOrder] = useState('asc');

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const productsCollection = collection(db, "products");
        const q = query(productsCollection, where("stock", ">", 0));
        
        const querySnapshot = await getDocs(q);
        const productsData = querySnapshot.docs.map(doc => {
          const data = doc.data();

          const priceAsNumber = parseFloat(String(data.price).replace(/[^0-9.]/g, '')) || 0;

          return {
            id: doc.id,
            ...data,
            price: priceAsNumber, 
          };
        });
        
        setProducts(productsData);
      } catch (err) {
        console.error("Error fetching products: ", err);
        setError("Ürünler yüklenirken bir hata oluştu.");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const sortedProducts = [...products].sort((a, b) => {
    if (sortOrder === 'asc') {
      return a.price - b.price;
    } else {
      return b.price - a.price;
    }
  });

  if (loading) {
    // Replaced the simple text with your custom loading component
    return <Loading />;
  }

  if (error) {
    return <div className="h-screen flex items-center justify-center bg-brand-beige font-sans text-red-600">{error}</div>;
  }

  return (
    <>
      <Helmet>
        <title>Ürünlerimiz - Perenk Petshop</title>
        <meta name="description" content="Perenk Petshop'un evcil hayvanlarınız için özenle seçilmiş, kaliteli ve sağlıklı ürünlerini keşfedin." />
      </Helmet>
      
      {/* 4. ADDITION: Added the paw-background class for theme consistency */}
      <section id={id} className="w-full min-h-screen bg-brand-beige py-24 px-4 paw-background">
        <div className="max-w-7xl mx-auto">
          
          <div className="flex flex-col sm:flex-row justify-between items-center mb-12">
            <h2 className="font-serif text-4xl md:text-5xl font-bold text-brand-dark-turquoise mb-4 sm:mb-0">
              Ürünlerimiz
            </h2>
            <div className="flex items-center gap-2 font-sans">
              <span className="text-gray-600 font-bold">Fiyata Göre Sırala:</span>
              <button onClick={() => setSortOrder('asc')} className={`p-2 rounded-full transition-colors ${sortOrder === 'asc' ? 'bg-brand-dark-turquoise text-white' : 'bg-brand-light-turquoise text-brand-dark-turquoise'}`}>
                <HiArrowUp size={20} />
              </button>
              <button onClick={() => setSortOrder('desc')} className={`p-2 rounded-full transition-colors ${sortOrder === 'desc' ? 'bg-brand-dark-turquoise text-white' : 'bg-brand-light-turquoise text-brand-dark-turquoise'}`}>
                <HiArrowDown size={20} />
              </button>
            </div>
          </div>

          {sortedProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {sortedProducts.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : ( 
            <div className="text-center py-20">
              <p className="font-sans text-xl text-gray-500">Şu anda stokta hiç ürün bulunmamaktadır.</p>
              <p className="font-sans text-gray-500 mt-2">Lütfen daha sonra tekrar kontrol edin!</p>
            </div>
          )}
        </div>
      </section>
    </>
  );
}

export default ProductPage;