import PieChart from "../components/PieChart";

export default function Dashboard() {
  return (
    <div className="p-6">
      <div className="grid grid-cols-1 gap-4 sm:mt-8 sm:grid-cols-2 lg:grid-cols-2 gap-6 mb-8">
        <div className="bg-amber-100 rounded-md border border-gray-100 p-6 shadow-md shadow-black/20">
          <div className="flex justify-between mb-6">
            <div>
              <div className="flex items-center mb-1">
                <div className="text-2xl font-semibold">12</div>
              </div>
              <div className="text-sm font-medium text-gray-400">Total User</div>
            </div>
            <div className="dropdown">
              <button
                type="button"
                className="dropdown-toggle text-gray-400 hover:text-gray-600"
              >
                <i className="ri-more-fill" />
              </button>
              <ul className="dropdown-menu shadow-md shadow-black/5 z-30 hidden py-1.5 rounded-md bg-white border border-gray-100 w-full max-w-[140px]">
                <li>
                  <a
                    href="#"
                    className="flex items-center text-[13px] py-1.5 px-4 text-gray-600 hover:text-blue-500 hover:bg-gray-50"
                  >
                    Profile
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="flex items-center text-[13px] py-1.5 px-4 text-gray-600 hover:text-blue-500 hover:bg-gray-50"
                  >
                    Settings
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="flex items-center text-[13px] py-1.5 px-4 text-gray-600 hover:text-blue-500 hover:bg-gray-50"
                  >
                    Logout
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <a
            href="/users"
            className="text-[#f84525] font-medium text-sm hover:text-red-800"
          >
            View
          </a>
        </div>
        <div className="bg-amber-100 rounded-md border border-gray-100 p-6 shadow-md shadow-black/20">
          <div className="flex justify-between mb-4">
            <div>
              <div className="flex items-center mb-1">
                <div className="text-2xl font-semibold">100</div>
                <div className="p-1 rounded bg-emerald-500/10 text-emerald-500 text-[12px] font-semibold leading-none ml-2">
                  +30%
                </div>
              </div>
              <div className="text-sm font-medium text-gray-400">Total Laporan</div>
            </div>
          </div>
          <a
            href="/laporan"
            className="text-[#f84525] font-medium text-sm hover:text-red-800"
          >
            View
          </a>
        </div>
      </div>
      <PieChart/>
      
    </div>
  );
}
