import ProductCard from "./ProductCard.jsx";

const ShowProducts = ({ products }) => {

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product,ind) => (<ProductCard key={ind} product={product}/>))}
      </div>
    </div>
  );
};

export default ShowProducts;