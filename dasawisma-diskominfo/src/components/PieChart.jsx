export default function PieChart() {
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-5 items-start px-4 xl:p-0 gap-y-4 md:gap-6">
        <div className="col-start-1 col-end-5">
          <h2 className="text-xs md:text-sm text-gray-800 font-bold tracking-wide">
            Summary Transactions
          </h2>
        </div>
        <div className="col-span-2 bg-white p-6 rounded-xl border border-gray-50 flex flex-col space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 flex justify-between items-center">
            <div className="p-4 cursor-pointer border">
              <span className="text-xs text-gray-500 font-semibold">Daily</span>
              <h2 className="text-gray-800 font-bold tracking-wider">
                $ 27.80
              </h2>
            </div>
            <div className="p-4 cursor-pointer border">
              <span className="text-xs text-gray-500 font-semibold">
                Weekly
              </span>
              <h2 className="text-gray-800 font-bold tracking-wider">
                $ 192.92
              </h2>
            </div>
            <div className="p-4 cursor-pointer border">
              <span className="text-xs text-gray-500 font-semibold">
                Monthly
              </span>
              <h2 className="text-gray-800 font-bold tracking-wider">
                $ 501.10
              </h2>
            </div>
          </div>
          <canvas id="myChart" />
        </div>
        <div className="col-span-3 bg-white p-6 rounded-xl border border-gray-50 flex flex-col space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-sm text-gray-600 font-bold tracking-wide">
              Latest Transactions
            </h2>
            <a
              href="#"
              className="px-4 py-2 text-xs bg-blue-100 text-blue-500 rounded uppercase tracking-wider font-semibold hover:bg-blue-300"
            >
              More
            </a>
          </div>
          <ul className="divide-y-2 divide-gray-100 overflow-x-auto w-full">
            <li className="py-3 flex justify-between text-sm text-gray-500 font-semibold">
              <p className="px-4 font-semibold">Today</p>
              <p className="px-4 text-gray-600">McDonald</p>
              <p className="px-4 tracking-wider">Cash</p>
              <p className="px-4 text-blue-600">Food</p>
              <p className="md:text-base text-gray-800 flex items-center gap-2">
                16.90
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-4 h-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </p>
            </li>
            <li className="py-3 flex justify-between text-sm text-gray-500 font-semibold">
              <p className="px-4 font-semibold">Today</p>
              <p className="px-4 text-gray-600">McDonald</p>
              <p className="px-4 tracking-wider">Cash</p>
              <p className="px-4 text-blue-600">Food</p>
              <p className="md:text-base text-gray-800 flex items-center gap-2">
                16.90
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-4 h-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </p>
            </li>
            <li className="py-3 flex justify-between text-sm text-gray-500 font-semibold">
              <p className="px-4 font-semibold">Today</p>
              <p className="px-4 text-gray-600">McDonald</p>
              <p className="px-4 tracking-wider">Cash</p>
              <p className="px-4 text-blue-600">Food</p>
              <p className="md:text-base text-gray-800 flex items-center gap-2">
                16.90
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-4 h-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </p>
            </li>
            <li className="py-3 flex justify-between text-sm text-gray-500 font-semibold">
              <p className="px-4 font-semibold">Today</p>
              <p className="px-4 text-gray-600">McDonald</p>
              <p className="px-4 tracking-wider">Cash</p>
              <p className="px-4 text-blue-600">Food</p>
              <p className="md:text-base text-gray-800 flex items-center gap-2">
                16.90
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-4 h-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </p>
            </li>
            <li className="py-3 flex justify-between text-sm text-gray-500 font-semibold">
              <p className="px-4 font-semibold">Today</p>
              <p className="px-4 text-gray-600">McDonald</p>
              <p className="px-4 tracking-wider">Cash</p>
              <p className="px-4 text-blue-600">Food</p>
              <p className="md:text-base text-gray-800 flex items-center gap-2">
                16.90
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-4 h-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </p>
            </li>
            <li className="py-3 flex justify-between text-sm text-gray-500 font-semibold">
              <p className="px-4 font-semibold">Today</p>
              <p className="px-4 text-gray-600">McDonald</p>
              <p className="px-4 tracking-wider">Cash</p>
              <p className="px-4 text-blue-600">Food</p>
              <p className="md:text-base text-gray-800 flex items-center gap-2">
                16.90
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-4 h-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </p>
            </li>
          </ul>
        </div>
      </div>
      
    </>
  );
}
