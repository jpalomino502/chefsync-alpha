export default function SummaryLoading() {
  return (
    <div className="min-h-screen p-4 md:p-8 animate-pulse">
      <div className="h-10 w-64 bg-gray-200 rounded mb-6 md:mb-8"></div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-7 gap-4 md:gap-6 mb-6 md:mb-8">
        <div className="md:col-span-2 lg:col-span-3">
          <div className="h-8 w-32 bg-gray-200 rounded mb-3"></div>
          <div className="bg-gray-200 rounded-3xl h-[300px]"></div>
        </div>
        <div className="md:col-span-2 lg:col-span-4 flex flex-col">
          <div className="h-8 w-48 bg-gray-200 rounded mb-3"></div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 flex-grow">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-gray-200 rounded-3xl h-32"></div>
            ))}
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-7 gap-4 md:gap-6">
        <div className="lg:col-span-4 bg-gray-200 rounded-3xl p-6 h-[400px]"></div>
        <div className="lg:col-span-3 bg-gray-200 rounded-3xl h-[400px]"></div>
      </div>
    </div>
  )
}

