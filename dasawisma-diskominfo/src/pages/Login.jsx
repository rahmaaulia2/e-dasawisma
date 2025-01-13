import { useState } from "react";
import ServerApi from "../helper/ServerApi";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

export default function Login() {
  const navigate = useNavigate();
  const [nama, setNama] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      const response = await fetch(`${ServerApi}login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nama, password }),
      });

      const data = await response.json();
      if (!response.ok) {
        setIsLoading(false);
        Swal.fire({
          text: `${data.message}`,
          icon: "error",
        });
        return;
      }

      if (data.access_token) {
        localStorage.setItem("access_token", data.access_token);
        localStorage.setItem("role", data.role);
        Swal.fire({
          icon: "success",
          title: `Success Login`,
          text: "I will close in 2 seconds.",
          timer: 2000,
        });
        navigate("/");
      } else {
        Swal.fire({
          text: `${data.message}`,
          icon: "error",
        });
      }
    } catch (error) {
      console.error("Error during fetch:", error);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <dotlottie-player
          src="https://lottie.host/47837f57-413f-4424-9cc0-873217624825/97zYatYfkI.json"
          background="transparent"
          speed="1"
          style={{ width: 300, height: 300 }}
          loop
          autoPlay
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-white to-blue-100 flex items-center justify-center">
    <div className="container mx-auto px-4 py-8 lg:py-16 flex items-center justify-center">
      <div className="max-w-5xl w-full bg-white rounded-2xl shadow-lg overflow-hidden">
        <div className="lg:flex">
          <div className="lg:w-1/2 p-8 lg:p-12 bg-gray-50">
            <Link
              to="/"
              className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
                <path d="M19 12H5M12 19l-7-7 7-7"/>
              </svg>
            </Link>
            
            <img className="w-auto h-12 sm:h-16 mt-8" src="logo.png" alt="Logo" />
            
            <h2 className="mt-6 text-gray-600 text-lg">Wilujeng Sumping</h2>
            <h1 className="mt-4 text-3xl font-bold text-gray-800">Login to your account</h1>
          </div>

          <div className="lg:w-1/2 p-8 lg:p-12">
            <form onSubmit={handleLogin} className="space-y-6">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Username</label>
                  <input
                    type="text"
                    onChange={(e) => setNama(e.target.value)}
                    className="w-full px-4 py-3 rounded-lg border bg-gray-50 focus:bg-white focus:ring-2 focus:ring-blue-500 transition-all duration-200"
                    placeholder="Enter your username"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                  <input
                    type="password"
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full px-4 py-3 rounded-lg border bg-gray-50 focus:bg-white focus:ring-2 focus:ring-blue-500 transition-all duration-200"
                    placeholder="Enter your password"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3 px-6 text-white bg-blue-600 hover:bg-blue-700 rounded-lg font-medium shadow-lg hover:shadow-xl transition-all duration-200"
              >
                Sign In
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
  );
}