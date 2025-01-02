import { useEffect, useState } from "react";
import ServerApi from "../helper/ServerApi";
import { useLocation, useNavigate } from "react-router-dom";

export default function EditUser() {
  const location = useLocation();
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
    console.log(data, "ini response rt");
    setDataRt(data);
  };
  // console.log(location.state, "ini location");
  const { id } = location.state || {};
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
    console.log(name, value, "ini name value");
    if (name === "RwId") {
      const filtered = dataRt.filter((item) => item.RWCode === parseInt(value));
      console.log(filtered, "ini filtered");
      setFilteredRT(filtered);
      setInput((prev) => ({
        ...prev,
        RtId: "",
      }));
    }
  };
  const getUser = async () => {
    const response = await fetch(`${ServerApi}users/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
      },
    });
    const data = await response.json();
    console.log(data, "ini response");
    setInput(data);
    // console.log(response.json(), "ini response json");
  };
  useEffect(() => {
    getUser();
    getRt();
  }, []);
  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch(`${ServerApi}users/${id}`, {
      method: "PATCH",
      body: JSON.stringify(input),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
      },
    });
    const res = await response.json();
    console.log(res);
    if (!res.ok) {
      Swal.fire({
        icon: "error",
        title: `${res.message}`,
        text: "I will close in 2 seconds.",
        timer: 2000,
      });
    }
    Swal.fire({
      icon: "success",
      title: `${res.message}`,
      text: "I will close in 2 seconds.",
      timer: 2000,
    });
    navigate("/dashboard");
    // setKk(data);
  };
  return (
    <>
      <section className="bg-gradient-to-r from-gray-100 via-[#feffbc] to-gray-100 dark:bg-gray-900">
        <div className="container px-6 py-24 mx-auto lg:py-32 min-h-screen ">
          <div className="relative min-h-screen flex flex-col sm:justify-center items-center">
            <div className="mt-8 lg:w-1/2 lg:mt-0 ">
              <span className="block text-2xl text-gray-700 text-center font-semibold mb-5">
                Edit User
              </span>
              <form onSubmit={handleSubmit} className="w-full lg:max-w-xl ">
                <div className="relative flex items-center mt-4">
                  <span className="absolute">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-6 h-6 mx-3 text-gray-300 dark:text-gray-500"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                      />
                    </svg>
                  </span>
                  <input
                    type="text"
                    name="nama"
                    value={input.nama}
                    onChange={handleChange}
                    className="block w-full py-3 text-gray-700 bg-white border rounded-lg px-11 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
                    placeholder="Nama Lengkap"
                  />
                </div>
                <div className="relative flex items-center mt-4">
                  <span className="absolute">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-6 h-6 mx-3 text-gray-300 dark:text-gray-500"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                      />
                    </svg>
                  </span>
                  <input
                    type="email"
                    name="email"
                    value={input.email}
                    onChange={handleChange}
                    className="block w-full py-3 text-gray-700 bg-white border rounded-lg px-11 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
                    placeholder="Email"
                  />
                </div>
                <div className="relative flex items-center mt-4">
                  <span className="absolute">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-6 h-6 mx-3 text-gray-300 dark:text-gray-500"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                      />
                    </svg>
                  </span>
                  <input
                    type="text"
                    name="noHp"
                    value={input.noHp}
                    onChange={handleChange}
                    className="block w-full py-3 text-gray-700 bg-white border rounded-lg px-11 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
                    placeholder="Nomor Handphone"
                  />
                </div>
                <div className="relative flex items-center mt-4">
                  <span className="absolute">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-6 h-6 mx-3 text-gray-300 dark:text-gray-500"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                      />
                    </svg>
                  </span>
                  <input
                    type="text"
                    name="alamat"
                    value={input.alamat}
                    onChange={handleChange}
                    className="block w-full py-3 text-gray-700 bg-white border rounded-lg px-11 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
                    placeholder="Alamat"
                  />
                </div>
                <div className="relative flex items-center mt-4">
                  <select
                    name="RoleId"
                    value={input.RoleId}
                    onChange={handleChange}
                    className="block w-full px-3 py-3 text-gray-700 bg-white border border-gray-200 rounded-lg file:bg-gray-200 file:text-gray-700 file:text-sm file:px-4 file:py-1 file:border-none file:rounded-full dark:file:bg-gray-800 dark:file:text-gray-200 dark:text-gray-300 placeholder-gray-400/70 dark:placeholder-gray-500 focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40 dark:border-gray-600 dark:bg-gray-900 dark:focus:border-blue-300"
                    placeholder="Pilih Role"
                  >
                    <option value="">Pilih Role</option>
                    <option value="1">Kelurahan</option>
                    <option value="2">RW</option>
                    <option value="3">RT</option>
                  </select>
                </div>
                {/* <div className="relative flex items-center mt-4">
                  <select
                    name="RwId"
                    value={input.RwId}
                    onChange={handleChange}
                    className="block w-full px-3 py-3 text-gray-700 bg-white border border-gray-200 rounded-lg file:bg-gray-200 file:text-gray-700 file:text-sm file:px-4 file:py-1 file:border-none file:rounded-full dark:file:bg-gray-800 dark:file:text-gray-200 dark:text-gray-300 placeholder-gray-400/70 dark:placeholder-gray-500 focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40 dark:border-gray-600 dark:bg-gray-900 dark:focus:border-blue-300"
                    placeholder="Pilih Role"
                  >
                    <option value="">Pilih RW</option>
                    {[...new Set(dataRt.map((item) => item.RWCode))].map(
                      (rw) => (
                        <option key={rw} value={rw}>
                          RW {rw}
                        </option>
                      )
                    )}
                  </select>
                </div>
                <div className="relative flex items-center mt-4">
                  <select
                    name="RtId"
                    value={input.RtId}
                    onChange={handleChange}
                    disabled={!filteredRT.length}
                    className="block w-full px-3 py-3 text-gray-700 bg-white border border-gray-200 rounded-lg file:bg-gray-200 file:text-gray-700 file:text-sm file:px-4 file:py-1 file:border-none file:rounded-full dark:file:bg-gray-800 dark:file:text-gray-200 dark:text-gray-300 placeholder-gray-400/70 dark:placeholder-gray-500 focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40 dark:border-gray-600 dark:bg-gray-900 dark:focus:border-blue-300"
                    placeholder="Pilih Role"
                  >
                    <option value="">Pilih RT</option>
                    {filteredRT.map((rt) => (
                      <option key={rt.id} value={rt.id}>
                        RT {rt.nomor}
                      </option>
                    ))}
                  </select>
                </div> */}
                {/* <div className="mt-4">
                  <p>Selected RW ID: {input.RwId}</p>
                  <p>Selected RT ID: {input.RtId}</p>
                </div> */}
                <div className="mt-8 md:flex md:items-center">
                  <button
                    type="submit"
                    className="block w-full px-10 py-3 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-500 rounded-lg hover:bg-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-50"
                  >
                    Update User
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
