import { useEffect, useState } from "react";
import ServerApi from "../helper/ServerApi";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

export default function AddUser() {
  const [filteredRT, setFilteredRT] = useState([]);
  const [dataRt, setDataRt] = useState([]);
  const navigate = useNavigate();
  
  const getRt = async () => {
    const response = await fetch(`${ServerApi}rt`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
      },
    });
    const data = await response.json();
    setDataRt(data);
  };

  const [input, setInput] = useState({
    nama: "",
    email: "",
    noHp: "",
    alamat: "",
    RoleId: "",
    RwId: "",
    RtId: "",
    password: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setInput((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (name === "RwId") {
      const filtered = dataRt.filter((item) => item.RWCode === parseInt(value));
      setFilteredRT(filtered);
      setInput((prev) => ({
        ...prev,
        RtId: "",
      }));
    }
  };

  useEffect(() => {
    getRt();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch(`${ServerApi}addUser`, {
      method: "POST",
      body: JSON.stringify(input),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
      },
    });
    const res = await response.json();
    if (!res.message.includes("Created")) {
      Swal.fire({
        icon: "error",
        title: `${res.message}`,
        text: "I will close in 2 seconds.",
        timer: 2000,
      });
      return;
    }
    Swal.fire({
      icon: "success",
      title: `${res.message}`,
      text: "I will close in 2 seconds.",
      timer: 2000,
    });
    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-white to-blue-100">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-lg p-8">
          <h1 className="text-2xl font-bold text-gray-800 text-center mb-8">
            Create New User
          </h1>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-4">
              {/* Input fields with improved styling */}
              <div className="group">
                <input
                  type="text"
                  name="nama"
                  value={input.nama}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-gray-50 rounded-lg border border-gray-200 focus:border-blue-500 focus:bg-white transition-all duration-200 outline-none"
                  placeholder="Full Name"
                />
              </div>

              <div className="group">
                <input
                  type="email"
                  name="email"
                  value={input.email}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-gray-50 rounded-lg border border-gray-200 focus:border-blue-500 focus:bg-white transition-all duration-200 outline-none"
                  placeholder="Email Address"
                />
              </div>

              <div className="group">
                <input
                  type="text"
                  name="noHp"
                  value={input.noHp}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-gray-50 rounded-lg border border-gray-200 focus:border-blue-500 focus:bg-white transition-all duration-200 outline-none"
                  placeholder="Phone Number"
                />
              </div>

              <div className="group">
                <input
                  type="text"
                  name="alamat"
                  value={input.alamat}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-gray-50 rounded-lg border border-gray-200 focus:border-blue-500 focus:bg-white transition-all duration-200 outline-none"
                  placeholder="Address"
                />
              </div>

              {/* Dropdowns with consistent styling */}
              <div className="group">
                <select
                  name="RoleId"
                  value={input.RoleId}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-gray-50 rounded-lg border border-gray-200 focus:border-blue-500 focus:bg-white transition-all duration-200 outline-none"
                >
                  <option value="">Select Role</option>
                  <option value="1">Kelurahan</option>
                  <option value="2">RW</option>
                  <option value="3">RT</option>
                </select>
              </div>

              <div className="group">
                <select
                  name="RwId"
                  value={input.RwId}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-gray-50 rounded-lg border border-gray-200 focus:border-blue-500 focus:bg-white transition-all duration-200 outline-none"
                >
                  <option value="">Select RW</option>
                  {[...new Set(dataRt.map((item) => item.RWCode))].map((rw) => (
                    <option key={rw} value={rw}>
                      RW {rw}
                    </option>
                  ))}
                </select>
              </div>

              <div className="group">
                <select
                  name="RtId"
                  value={input.RtId}
                  onChange={handleChange}
                  disabled={!filteredRT.length}
                  className="w-full px-4 py-3 bg-gray-50 rounded-lg border border-gray-200 focus:border-blue-500 focus:bg-white transition-all duration-200 outline-none disabled:bg-gray-100 disabled:cursor-not-allowed"
                >
                  <option value="">Select RT</option>
                  {filteredRT.map((rt) => (
                    <option key={rt.id} value={rt.id}>
                      RT {rt.nomor}
                    </option>
                  ))}
                </select>
              </div>

              <div className="group">
                <input
                  type="password"
                  name="password"
                  value={input.password}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-gray-50 rounded-lg border border-gray-200 focus:border-blue-500 focus:bg-white transition-all duration-200 outline-none"
                  placeholder="Password"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-4 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg shadow-lg hover:shadow-xl transition-all duration-200 transform hover:-translate-y-0.5"
            >
              Create User
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}