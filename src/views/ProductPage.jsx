import React, { useState, useEffect } from "react";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../config/firebase";
import ProductCard from "./ProductCard";
import Loading from "../components/Loading";
import { HiArrowUp, HiArrowDown, HiChevronDown } from "react-icons/hi";

function ProductPage({ id }) {
  // State for all products fetched from Firebase
  const [allProducts, setAllProducts] = useState([]);
  
  // State for products that are currently visible after filtering
  const [filteredProducts, setFilteredProducts] = useState([]);

  // State for loading, error, and sorting
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [sortOrder, setSortOrder] = useState('asc');

  // --- NEW: State for the search bar ---
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [categories, setCategories] = useState(["All"]); // Will be populated from products

  // --- 1. Fetch data from Firebase (only once) ---
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const productsCollection = collection(db, "products");
        const q = query(productsCollection, where("stock", ">", 0));
        const querySnapshot = await getDocs(q);
        
        const productsData = querySnapshot.docs.map(doc => {
          const data = doc.data();
          const priceAsNumber = parseFloat(String(data.price).replace(/[^0-9.]/g, '')) || 0;
          return { id: doc.id, ...data, price: priceAsNumber };
        });

        setAllProducts(productsData);
        setFilteredProducts(productsData); // Initially, show all products

        const uniqueCategories = ["All", ...new Set(productsData.map(p => p.category).filter(Boolean))];
        setCategories(uniqueCategories);

      } catch (err) {
        console.error("Error fetching products: ", err);
        setError("Ürünler yüklenirken bir hata oluştu.");
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  useEffect(() => {
    let tempProducts = [...allProducts];

    // Filter by category
    if (selectedCategory !== "All") {
      tempProducts = tempProducts.filter(p => p.category === selectedCategory);
    }

    // Filter by search term (case-insensitive)
    if (searchTerm) {
      tempProducts = tempProducts.filter(p => 
        p.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Sort the filtered products
    tempProducts.sort((a, b) => {
      return sortOrder === 'asc' ? a.price - b.price : b.price - a.price;
    });

    setFilteredProducts(tempProducts);

  }, [searchTerm, selectedCategory, sortOrder, allProducts]);


  if (loading) return <Loading />;
  if (error) return <div className="h-screen flex items-center justify-center bg-brand-beige">{error}</div>;

  return (
    <section id={id} className="w-full min-h-screen relative bg-brand-beige py-24 px-4 paw-background">
      <div className="max-w-7xl mx-auto relative z-10">
        <h2 className="font-serif text-4xl md:text-5xl font-bold text-brand-dark-turquoise mb-8 text-center">
          Ürünlerimiz
        </h2>

        <div className="max-w-lg mx-auto mb-12">
          <div className="flex">
            {/* Category Dropdown Button */}
            <div className="relative">
              <button onClick={() => setIsDropdownOpen(!isDropdownOpen)} className="shrink-0 z-10 inline-flex items-center py-2.5 px-4 text-sm font-medium text-center text-brand-dark-turquoise bg-brand-light-turquoise/50 border border-brand-dark-turquoise/20 rounded-l-lg hover:bg-brand-light-turquoise focus:ring-2 focus:outline-none focus:ring-brand-light-turquoise" type="button">
                {selectedCategory} <HiChevronDown className="w-4 h-4 ml-2" />
              </button>
              {/* Dropdown Menu */}
              {isDropdownOpen && (
                <div className="absolute top-full mt-1 z-10 bg-white divide-y divide-gray-100 rounded-lg shadow-lg w-44">
                  <ul className="py-2 text-sm text-gray-700">
                    {categories.map(category => (
                      <li key={category}>
                        <button
                          type="button"
                          className="inline-flex w-full px-4 py-2 hover:bg-gray-100"
                          onClick={() => {
                            setSelectedCategory(category);
                            setIsDropdownOpen(false);
                          }}
                        >
                          {category}
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
            
            {/* Search Input */}
            <div className="relative w-full">
              <input
                type="search"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)} // Live search updates here
                className="block p-2.5 w-full z-20 text-sm text-brand-dark-turquoise bg-white rounded-r-lg border border-brand-dark-turquoise/20 focus:ring-brand-dark-turquoise focus:border-brand-dark-turquoise placeholder-gray-400"
                placeholder="Ürün ara..."
              />
            </div>
          </div>
        </div>

        {/* Sorting controls */}
        <div className="flex justify-end items-center mb-8">
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
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {filteredProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <p className="font-sans text-xl text-gray-500">Aramanızla eşleşen ürün bulunamadı.</p>
          </div>
        )}
      </div>
      <div 
          className="absolute bottom-0 left-0 w-full h-48 bg-gradient-to-t from-brand-dark-turquoise to-transparent"
          aria-hidden="true" 
        />
    </section>
  );
}

export default ProductPage;