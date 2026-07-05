import React from "react";

const showProducts = ({ products }) => {
    console.log(products)
  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => (
           <div className="bg-white rounded-xl shadow-md hover:shadow-xl transition overflow-hidden">
      <img
        src={product.image}
        alt={product.title}
        className="w-full h-60 object-cover"
      />

      <div className="p-4">
        <h2 className="text-lg font-bold">{product.title}</h2>

        <p className="text-gray-500 text-sm mt-2">
          {product.description}
        </p>

        <div className="flex justify-between items-center mt-4">
          <span className="text-xl font-bold text-indigo-600">
            ₹{product.price}
          </span>

          <button className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700">
            Add to Cart
          </button>
        </div>
      </div>
    </div>
        ))}
      </div>
    </div>
  );
};

export default showProducts;