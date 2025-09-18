import React, { useState, useEffect} from "react";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../config/firebase"; // Make sure this path is correct
import ProductCard from "./ProductCard";
import { HiArrowUp, HiArrowDown } from "react-icons/hi";


function ProductPage({ id }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [sortOrder, setSortOrder] = useState('asc');

 
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        // Create a query to get products where stock is greater than 0
        const productsCollection = collection(db, "products");
        const q = query(productsCollection, where("stock", ">", 0));
        
        const querySnapshot = await getDocs(q);
        const productsData = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));
        
        setProducts(productsData);
      } catch (err) {
        console.error("Error fetching products: ", err);
        setError("Ürünler yüklenirken bir hata oluştu.");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []); // Empty dependency array ensures this runs only once on mount

  const sortedProducts = [...products].sort((a, b) => {
    if (sortOrder === 'asc') {
      return a.price - b.price;
    } else {
      return b.price - a.price;
    }
  });

  if (loading) {
    return <div className="h-screen flex items-center justify-center bg-brand-beige font-sans text-brand-dark-turquoise">Yükleniyor...</div>;
  }

  if (error) {
    return <div className="h-screen flex items-center justify-center bg-brand-beige font-sans text-red-600">{error}</div>;
  }

  return (
    <>
      
      <section id={id} className="w-full min-h-screen bg-brand-beige py-24 px-4">
        <div className="max-w-7xl mx-auto">
          
          {/* --- Section Header & Sorting --- */}
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

          {/* --- Product Grid --- */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {sortedProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

        </div>
      </section>
    </>
  );
}

export default ProductPage;