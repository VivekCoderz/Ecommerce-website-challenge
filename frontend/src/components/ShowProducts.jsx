import ProductCard from "./ProductCard";

const ShowProducts = ({ products }) => {
  return (
    <section className="bg-gray-100 min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4">

        <h1 className="text-3xl font-bold mb-8">
          Products
        </h1>

       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
  {products.map((product) => (
    <ProductCard key={product._id} product={product} />
  ))}
</div>

      </div>
    </section>
  );
};

export default ShowProducts;