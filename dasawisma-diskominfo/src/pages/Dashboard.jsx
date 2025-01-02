import { useEffect, useState } from "react";
import PieChart from "../components/PieChart";
import ServerApi from "../helper/ServerApi";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const navigate = useNavigate()
  const [user, setUser] = useState([]);
  const [kk, setKk] = useState([]);

  const getUser = async () => {
    try {
      const response = await fetch(`${ServerApi}users`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      });
      const data = await response.json();
      console.log(data,"ini userr")
      setUser(data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  const getAllKk = async () => {
    try {
      const response = await fetch(`${ServerApi}KK`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      });
      const data = await response.json();
      setKk(data);
    } catch (error) {
      console.error("Error fetching KK:", error);
    }
  };

  useEffect(() => {
    getUser();
    getAllKk();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 mb-6 sm:mb-8">
          {/* Total Laporan Card */}
          <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm hover:shadow-md transition-shadow duration-300">
            <div className="flex flex-col h-full">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <div className="text-2xl sm:text-3xl font-bold text-gray-900">
                    {kk.length}
                  </div>
                  <div className="text-sm sm:text-base font-medium text-gray-500 mt-1">
                    Total Laporan
                  </div>
                </div>
                <div className="bg-amber-100 p-3 rounded-full">
                  <svg
                    className="w-6 h-6 text-amber-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                    />
                  </svg>
                </div>
              </div>
              <a
                href="/laporan"
                className="inline-flex items-center text-amber-600 hover:text-amber-700 font-medium text-sm mt-auto"
              >
                Lihat Detail
                <svg
                  className="w-4 h-4 ml-1"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </a>
            </div>
          </div>

          {/* Total User Card */}
          {localStorage.role === "kelurahan" && (
            <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm hover:shadow-md transition-shadow duration-300">
              <div className="flex flex-col h-full">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <div className="text-2xl sm:text-3xl font-bold text-gray-900">
                      {user.length}
                    </div>
                    <div className="text-sm sm:text-base font-medium text-gray-500 mt-1">
                      Total User
                    </div>
                  </div>
                  <div className="bg-amber-100 p-3 rounded-full">
                    <svg
                      className="w-6 h-6 text-amber-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
                      />
                    </svg>
                  </div>
                </div>
                <a
                  onClick={() => navigate("/users", { state: { data: user } })}
                  className="inline-flex items-center text-amber-600 hover:text-amber-700 font-medium text-sm mt-auto"
                >
                  Lihat Detail
                  <svg
                    className="w-4 h-4 ml-1"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </a>
              </div>
            </div>
          )}
        </div>

        {/* Chart Section */}
        <div className="bg-white rounded-lg border border-gray-200 p-4 sm:p-6 shadow-sm">
          <PieChart />
        </div>
      </div>
    </div>
  );
}