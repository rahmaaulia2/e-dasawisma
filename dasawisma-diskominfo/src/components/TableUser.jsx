import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import ServerApi from "../helper/ServerApi";
import Swal from "sweetalert2";

export default function TableUser() {
  const location = useLocation();
  const data = location.state.data;
  const navigate = useNavigate();
  const [user, setUser] = useState([]);

  useEffect(() => {
    setUser(data);
  }, [data]);

  const handleDelete = async(id) => {
    return Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async(result) => {
      if (result.isConfirmed) {
        const response = await fetch(`${ServerApi}users/${id}`, {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        });
        const data = await response.json();
        
        if(!response.ok){
          return Swal.fire({
            title: "Error!",
            text: data.message,
            icon: "error",
          });
        }

        Swal.fire({
          title: "Deleted!",
          text: data.message,
          icon: "success",
        });
        navigate('/dashboard');
      }
    });
  };  return (
    <div className="min-h-screen bg-gray-50">
      <div className="p-4 lg:p-6">
        <div className="mb-4">
          <Link
            to="/dashboard"
            className="inline-flex items-center gap-2 rounded-lg bg-gray-100 p-2 text-gray-600 hover:bg-gray-200"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 48 48"
              className="fill-current"
            >
              <path d="M24 4C12.972 4 4 12.972 4 24s8.972 20 20 20 20-8.972 20-20S35.028 4 24 4zm0 3c9.407 0 17 7.593 17 17s-7.593 17-17 17S7 33.407 7 24 14.593 7 24 7zm-1.529 9.486a1.5 1.5 0 00-1.032.453l-6 6a1.5 1.5 0 000 2.122l6 6a1.5 1.5 0 102.122-2.122L20.12 25.5H31.5a1.5 1.5 0 100-3H20.12l3.44-3.44a1.5 1.5 0 00-1.089-2.574z"/>
            </svg>
            <span className="hidden sm:inline">Back</span>
          </Link>
        </div>

        <div className="bg-white rounded-lg shadow-md">
          <div className="p-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-800">Manajemen User</h2>
          </div>

          {/* Table view for md and above screens */}
          <div className="hidden md:block overflow-x-auto">
            <div className="inline-block min-w-full align-middle">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="p-4 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">No</th>
                    <th className="p-4 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">Nama</th>
                    <th className="p-4 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">Email</th>
                    <th className="p-4 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">No Hp</th>
                    <th className="p-4 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">Alamat</th>
                    <th className="p-4 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">Role</th>
                    <th className="p-4 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {user.map((item, index) => (
                    <tr key={index} className="hover:bg-gray-50">
                      <td className="p-4 text-sm text-gray-600 whitespace-nowrap">{index + 1}</td>
                      <td className="p-4 text-sm text-gray-900 whitespace-nowrap">{item.nama}</td>
                      <td className="p-4 text-sm text-violet-500 whitespace-nowrap">{item.email}</td>
                      <td className="p-4 text-sm text-gray-500 whitespace-nowrap">{item.noHp}</td>
                      <td className="p-4 text-sm text-gray-500 whitespace-nowrap">{item.alamat}</td>
                      <td className="p-4 whitespace-nowrap">
                        <span className="px-2 py-1 text-xs font-medium text-emerald-700 bg-emerald-100 rounded-full">
                          {item.Role.name}
                        </span>
                      </td>
                      <td className="p-4 whitespace-nowrap">
                        <div className="flex gap-2">
                          <button
                            onClick={() => navigate('/editUser', {state: {id: item.id}})}
                            className="p-1 text-blue-600 hover:bg-blue-50 rounded-lg"
                            title="Edit"
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                              <path d="M21.731 2.269a2.625 2.625 0 00-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 000-3.712zM19.513 8.199l-3.712-3.712-12.15 12.15a5.25 5.25 0 00-1.32 2.214l-.8 2.685a.75.75 0 00.933.933l2.685-.8a5.25 5.25 0 002.214-1.32L19.513 8.2z" />
                            </svg>
                          </button>
                          <button
                            onClick={() => handleDelete(item.id)}
                            className="p-1 text-red-600 hover:bg-red-50 rounded-lg"
                            title="Delete"
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                              <path d="M10 2L9 3H5C4.4 3 4 3.4 4 4C4 4.6 4.4 5 5 5H7H17H19C19.6 5 20 4.6 20 4C20 3.4 19.6 3 19 3H15L14 2H10zM5 7V20C5 21.1 5.9 22 7 22H17C18.1 22 19 21.1 19 20V7H5zM9 9C9.6 9 10 9.4 10 10V19C10 19.6 9.6 20 9 20C8.4 20 8 19.6 8 19V10C8 9.4 8.4 9 9 9zM15 9C15.6 9 16 9.4 16 10V19C16 19.6 15.6 20 15 20C14.4 20 14 19.6 14 19V10C14 9.4 14.4 9 15 9z" />
                            </svg>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Card view for mobile screens */}
          <div className="md:hidden">
            {user.map((item, index) => (
              <div key={index} className="p-4 border-b border-gray-200">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <div className="text-sm font-medium text-gray-900">{item.nama}</div>
                    <div className="text-sm text-violet-500">{item.email}</div>
                  </div>
                  <span className="px-2 py-1 text-xs font-medium text-emerald-700 bg-emerald-100 rounded-full">
                    {item.Role.name}
                  </span>
                </div>
                <div className="space-y-1 mb-3">
                  <div className="text-sm text-gray-500">
                    <span className="font-medium">No HP:</span> {item.noHp}
                  </div>
                  <div className="text-sm text-gray-500">
                    <span className="font-medium">Alamat:</span> {item.alamat}
                  </div>
                </div>
                <div className="flex gap-2 justify-end">
                  <button
                    onClick={() => navigate('/editUser', {state: {id: item.id}})}
                    className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg"
                    title="Edit"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                      <path d="M21.731 2.269a2.625 2.625 0 00-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 000-3.712zM19.513 8.199l-3.712-3.712-12.15 12.15a5.25 5.25 0 00-1.32 2.214l-.8 2.685a.75.75 0 00.933.933l2.685-.8a5.25 5.25 0 002.214-1.32L19.513 8.2z" />
                    </svg>
                  </button>
                  <button
                    onClick={() => handleDelete(item.id)}
                    className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
                    title="Delete"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                      <path d="M10 2L9 3H5C4.4 3 4 3.4 4 4C4 4.6 4.4 5 5 5H7H17H19C19.6 5 20 4.6 20 4C20 3.4 19.6 3 19 3H15L14 2H10zM5 7V20C5 21.1 5.9 22 7 22H17C18.1 22 19 21.1 19 20V7H5zM9 9C9.6 9 10 9.4 10 10V19C10 19.6 9.6 20 9 20C8.4 20 8 19.6 8 19V10C8 9.4 8.4 9 9 9zM15 9C15.6 9 16 9.4 16 10V19C16 19.6 15.6 20 15 20C14.4 20 14 19.6 14 19V10C14 9.4 14.4 9 15 9z" />
                    </svg>
                  </button>
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>
    </div>
  );
}