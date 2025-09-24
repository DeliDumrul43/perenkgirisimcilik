import React from "react";

function ProductCard({ product }) {
  const priceAsNumber = parseFloat(String(product.price).replace(/[^0-9.]/g, ''));

  console.log("Rendering Card:", product.name, "URL:", product.dropShipUrl);
  const formattedPrice = `₺${priceAsNumber.toFixed(2)}`;

  return (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden group transition-all duration-300 transform hover:shadow-2xl hover:-translate-y-2">
      {/* Product Image */}
      <div className="w-full h-56 overflow-hidden">
        <img
          src={product.imageUrl}
          alt={product.name} // Important for SEO and accessibility
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
        />
      </div>

      {/* Product Details */}
      <div className="p-6">
        <h3 className="font-serif text-xl font-bold text-brand-dark-turquoise mb-2 truncate">
          {product.name}
        </h3>
        <p className="font-sans text-lg font-bold text-gray-700 mb-4">
          {formattedPrice}
        </p>
        <a
          href={product.dropShipUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full block text-center font-sans font-bold text-white bg-brand-dark-turquoise hover:bg-brand-light-turquoise hover:text-brand-dark-turquoise transition-colors duration-300 py-2 px-4 rounded-full"
        >
          Satın Al
        </a>
      </div>
    </div>
  );
}

export default ProductCard;