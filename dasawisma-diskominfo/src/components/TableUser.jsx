import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ServerApi from "../helper/ServerApi";

export default function TableUser() {
  const [user, setUser] = useState([]);
  const getUser = async () => {
    const response = await fetch(`${ServerApi}users`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
      },
    });
    const data = await response.json();
    // console.log(data);
    setUser(data);
  }
  useEffect(() => {
    getUser();
  }, []);
  
  const handleDelete = () => {
    return Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: "Deleted!",
          text: "Your file has been deleted.",
          icon: "success",
        });
      }
    });
  };
  return (
    <>
      <div className="p-6">
      <Link
            to={"/dashboard"}
            className="inline-block p-1 rounded bg-gray-500/10 text-gray-500 font-medium text-[12px] leading-none"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              x="px"
              y="0px"
              width="24"
              height="24"
              viewBox="0 0 48 48"
            >
              <path d="M 24 4 C 12.972066 4 4 12.972074 4 24 C 4 35.027926 12.972066 44 24 44 C 35.027934 44 44 35.027926 44 24 C 44 12.972074 35.027934 4 24 4 z M 24 7 C 33.406615 7 41 14.593391 41 24 C 41 33.406609 33.406615 41 24 41 C 14.593385 41 7 33.406609 7 24 C 7 14.593391 14.593385 7 24 7 z M 22.470703 16.486328 A 1.50015 1.50015 0 0 0 21.439453 16.939453 L 15.439453 22.939453 A 1.50015 1.50015 0 0 0 15.439453 25.060547 L 21.439453 31.060547 A 1.50015 1.50015 0 1 0 23.560547 28.939453 L 20.121094 25.5 L 31.5 25.5 A 1.50015 1.50015 0 1 0 31.5 22.5 L 20.121094 22.5 L 23.560547 19.060547 A 1.50015 1.50015 0 0 0 22.470703 16.486328 z"></path>
            </svg>
          </Link>
        <div className="grid grid-cols-1 gap-4 sm:mt-2 sm:grid-cols-2 lg:grid-cols-2 mb-2">
          <div className="bg-white border border-gray-200 shadow-md shadow-black/5 p-6 rounded-md lg:col-span-2">
            <div className="flex justify-between mb-4 items-start">
              <div className="font-medium">Manajemen User</div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full min-w-[460px]">
                <thead>
                  <tr>
                    <th className="text-[12px] uppercase tracking-wide font-medium text-gray-400 py-2 px-4 bg-gray-50 text-left rounded-tl-md rounded-bl-md">
                      No
                    </th>
                    <th className="text-[12px] uppercase tracking-wide font-medium text-gray-400 py-2 px-4 bg-gray-50 text-left rounded-tl-md rounded-bl-md">
                      Nama
                    </th>
                    <th className="text-[12px] uppercase tracking-wide font-medium text-gray-400 py-2 px-4 bg-gray-50 text-left">
                      Email
                    </th>
                    <th className="text-[12px] uppercase tracking-wide font-medium text-gray-400 py-2 px-4 bg-gray-50 text-left rounded-tr-md rounded-br-md">
                      No Hp
                    </th>
                    <th className="text-[12px] uppercase tracking-wide font-medium text-gray-400 py-2 px-4 bg-gray-50 text-left rounded-tr-md rounded-br-md">
                      Alamat
                    </th>
                    <th className="text-[12px] uppercase tracking-wide font-medium text-gray-400 py-2 px-4 bg-gray-50 text-left rounded-tr-md rounded-br-md">
                      <button
                        type="button"
                        title="Start buying"
                        className="inline-flex w-full py-2 px-6 text-xs uppercase rounded-full"
                      >
                        Role
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="-mr-1 h-5 w-5 text-gray-400"
                          fill="currentColor"
                          aria-hidden="true"
                          viewBox="0 0 55 55"
                        >
                          <path d="M42.586 29.586L36 36.172V19c0-1.104-.896-2-2-2s-2 .896-2 2v17.172l-6.586-6.586c-.78-.781-2.048-.781-2.828 0-.781.781-.781 2.047 0 2.828l10 10C32.976 42.805 33.488 43 34 43s1.024-.195 1.414-.586l10-10c.781-.781.781-2.047 0-2.828C44.634 28.805 43.366 28.805 42.586 29.586zM34 5A2 2 0 1034 9 2 2 0 1034 5zM34 11A2 2 0 1034 15 2 2 0 1034 11zM12 11.828V29c0 1.104.896 2 2 2s2-.896 2-2V11.828l6.586 6.586C22.976 18.805 23.488 19 24 19s1.024-.195 1.414-.586c.781-.781.781-2.047 0-2.828l-10-10c-.78-.781-2.048-.781-2.828 0l-10 10c-.781.781-.781 2.047 0 2.828.78.781 2.048.781 2.828 0L12 11.828zM14 39A2 2 0 1014 43 2 2 0 1014 39zM14 33A2 2 0 1014 37 2 2 0 1014 33z"></path>
                        </svg>
                      </button>
                    </th>
                    <th className="text-[12px] uppercase tracking-wide font-medium text-gray-400 py-2 px-4 bg-gray-50 text-left rounded-tr-md rounded-br-md">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {user.map((item, index)=>
                  <tr key={index}>
                    <td className="py-2 px-4 border-b border-b-gray-50">
                      <span className="text-gray-600 text-sm font-medium hover:text-blue-500 ml-2 truncate">
                        {index+1}
                      </span>
                    </td>
                    <td className="py-2 px-4 border-b border-b-gray-50">
                      <div className="flex items-center">
                        <a
                          href="#"
                          className="text-gray-600 text-sm font-medium hover:text-blue-500 ml-2 truncate"
                        >
                          {item.nama}
                        </a>
                      </div>
                    </td>
                    <td className="py-2 px-4 border-b border-b-gray-50">
                      <span className="text-[13px] font-medium text-violet-500">
                        {item.email}
                      </span>
                    </td>
                    <td className="py-2 px-4 border-b border-b-gray-50">
                      <span className="inline-block rounded text-zinc-500 font-medium text-[12px] leading-none">
                        {item.noHp}
                      </span>
                    </td>
                    <td className="py-2 px-4 border-b border-b-gray-50">
                      <span className="inline-block rounded text-zinc-500 font-medium text-[12px] leading-none">
                        {item.alamat}
                      </span>
                    </td>
                    <td className="py-2 px-4 border-b border-b-gray-50">
                      <span className="inline-block p-1 rounded bg-emerald-500/10 text-emerald-500 font-medium text-[12px] leading-none">
                        {item.Role.name}
                      </span>
                    </td>
                    <td className="py-2 px-4 border-b border-b-gray-50">
                      <div className="flex gap-2">
                        <button
                          className="relative h-5 max-h-[40px] w-5 max-w-[40px] select-none rounded-lg text-center align-middle font-sans text-xs font-medium uppercase text-slate-900 transition-all hover:bg-slate-900/10 active:bg-slate-900/20 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                          type="button"
                        >
                          <span className="absolute transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 24 24"
                              fill="currentColor"
                              aria-hidden="true"
                              className="w-4 h-4"
                            >
                              <path d="M21.731 2.269a2.625 2.625 0 00-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 000-3.712zM19.513 8.199l-3.712-3.712-12.15 12.15a5.25 5.25 0 00-1.32 2.214l-.8 2.685a.75.75 0 00.933.933l2.685-.8a5.25 5.25 0 002.214-1.32L19.513 8.2z"></path>
                            </svg>
                          </span>
                        </button>
                        <button
                          onClick={handleDelete}
                          className="relative h-5 max-h-[40px] w-5 max-w-[40px] select-none rounded-lg text-center align-middle font-sans text-xs font-medium uppercase text-slate-900 transition-all hover:bg-slate-900/10 active:bg-slate-900/20 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                          type="button"
                        >
                          <span className="absolute transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 24 24"
                              fill="currentColor"
                              aria-hidden="true"
                              className="w-4 h-4"
                            >
                              <path d="M 10 2 L 9 3 L 5 3 C 4.4 3 4 3.4 4 4 C 4 4.6 4.4 5 5 5 L 7 5 L 17 5 L 19 5 C 19.6 5 20 4.6 20 4 C 20 3.4 19.6 3 19 3 L 15 3 L 14 2 L 10 2 z M 5 7 L 5 20 C 5 21.1 5.9 22 7 22 L 17 22 C 18.1 22 19 21.1 19 20 L 19 7 L 5 7 z M 9 9 C 9.6 9 10 9.4 10 10 L 10 19 C 10 19.6 9.6 20 9 20 C 8.4 20 8 19.6 8 19 L 8 10 C 8 9.4 8.4 9 9 9 z M 15 9 C 15.6 9 16 9.4 16 10 L 16 19 C 16 19.6 15.6 20 15 20 C 14.4 20 14 19.6 14 19 L 14 10 C 14 9.4 14.4 9 15 9 z" />
                            </svg>
                          </span>
                        </button>
                      </div>
                    </td>
                  </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
