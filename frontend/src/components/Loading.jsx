const Loading = () => {
  return (
    <div className="max-w-7xl mx-auto px-6 py-10">
      <div className="h-10 w-60 bg-gray-200 rounded animate-pulse mb-8"></div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {[...Array(8)].map((_, index) => (
          <div
            key={index}
            className=" rounded-xl p-4 shadow bg-white"
          >
            <div className="h-52 w-full rounded-lg bg-gray-200 animate-pulse"></div>

            <div className="mt-4 h-6 w-3/4 rounded bg-gray-200 animate-pulse"></div>

            <div className="mt-3 h-4 w-full rounded bg-gray-200 animate-pulse"></div>

            <div className="mt-2 h-4 w-5/6 rounded bg-gray-200 animate-pulse"></div>

            <div className="mt-6 flex justify-between items-center">
              <div className="h-8 w-20 rounded bg-gray-200 animate-pulse"></div>

              <div className="h-10 w-28 rounded-lg bg-gray-200 animate-pulse"></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Loading;