const ProductDetailsLoading = () => {
  return (
    <div className="min-h-screen bg-gray-100 py-8 animate-pulse">
      <div className="max-w-7xl mx-auto px-4">

        <div className="grid lg:grid-cols-2 gap-8">

          {/* Image Section */}
          <div className="bg-white rounded-2xl shadow p-6">
            <div className="h-[420px] bg-gray-200 rounded-xl"></div>

            <div className="flex justify-center gap-4 mt-5">
              <div className="w-20 h-20 bg-gray-200 rounded-lg"></div>
              <div className="w-20 h-20 bg-gray-200 rounded-lg"></div>
              <div className="w-20 h-20 bg-gray-200 rounded-lg"></div>
            </div>
          </div>

          {/* Details Section */}
          <div className="bg-white rounded-2xl shadow p-8">

            <div className="w-24 h-7 bg-gray-200 rounded-full"></div>

            <div className="w-3/4 h-10 bg-gray-200 rounded mt-5"></div>

            <div className="w-40 h-6 bg-gray-200 rounded mt-5"></div>

            <div className="w-48 h-10 bg-gray-200 rounded mt-6"></div>

            <div className="space-y-3 mt-8">
              <div className="h-4 bg-gray-200 rounded"></div>
              <div className="h-4 bg-gray-200 rounded"></div>
              <div className="h-4 bg-gray-200 rounded w-5/6"></div>
            </div>

            {/* Color */}
            <div className="mt-8">
              <div className="w-24 h-5 bg-gray-200 rounded mb-4"></div>

              <div className="flex gap-3">
                <div className="w-8 h-8 rounded-full bg-gray-200"></div>
                <div className="w-8 h-8 rounded-full bg-gray-200"></div>
                <div className="w-8 h-8 rounded-full bg-gray-200"></div>
                <div className="w-8 h-8 rounded-full bg-gray-200"></div>
              </div>
            </div>

            {/* Quantity */}
            <div className="mt-8">
              <div className="w-24 h-5 bg-gray-200 rounded mb-4"></div>

              <div className="w-36 h-12 bg-gray-200 rounded-xl"></div>
            </div>

            {/* Buttons */}
            <div className="grid sm:grid-cols-2 gap-4 mt-10">
              <div className="h-14 bg-gray-200 rounded-xl"></div>
              <div className="h-14 bg-gray-200 rounded-xl"></div>
            </div>

            {/* Features */}
            <div className="grid grid-cols-3 gap-4 mt-10">
              <div className="h-24 bg-gray-200 rounded-xl"></div>
              <div className="h-24 bg-gray-200 rounded-xl"></div>
              <div className="h-24 bg-gray-200 rounded-xl"></div>
            </div>

          </div>

        </div>

        {/* Description */}
        <div className="bg-white rounded-2xl shadow p-8 mt-8">
          <div className="w-56 h-8 bg-gray-200 rounded mb-6"></div>

          <div className="space-y-4">
            <div className="h-4 bg-gray-200 rounded"></div>
            <div className="h-4 bg-gray-200 rounded"></div>
            <div className="h-4 bg-gray-200 rounded"></div>
            <div className="h-4 bg-gray-200 rounded w-11/12"></div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default ProductDetailsLoading;