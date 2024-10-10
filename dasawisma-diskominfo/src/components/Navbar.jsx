import { useState } from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false); // State untuk menu di mobile
  const [isOpen, setIsOpen] = useState(false); // State untuk dropdown layanan
  
  const toggleDropdown = () => {
    setIsOpen(!isOpen); // Membuka atau menutup dropdown layanan
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen); // Membuka atau menutup menu di mobile
  };

  return (
    <>
      <nav className="relative z-10 w-full mt-4 bg-white md:relative md:bg-transparent">
        <div className="container m-auto px-2 md:px-12 lg:px-7">
          <div className="flex flex-wrap items-center justify-between py-2 gap-6 md:py-2 md:gap-0">
            <div className="w-full px-6 flex justify-between lg:w-max md:px-0">
              <a
                href="https://tailus.io/blocks/hero-section"
                aria-label="logo"
                className="flex space-x-2 items-center"
              >
                <img
                  src="logo.png"
                  className="w-12"
                  alt="tailus logo"
                  width={144}
                  height={133}
                />
                <span className="text-2xl font-bold text-yellow-900">
                  SI <span className="text-yellow-700">DAWET</span>
                </span>
              </a>
              <button
                aria-label="hamburger"
                id="hamburger"
                className="relative w-10 h-10 -mr-2 lg:hidden"
                onClick={toggleMenu} // Tambahkan onClick untuk toggle menu
              >
                <div
                  aria-hidden="true"
                  id="line"
                  className="inset-0 w-6 h-0.5 m-auto rounded bg-yellow-900 transition duration-300"
                />
                <div
                  aria-hidden="true"
                  id="line2"
                  className="inset-0 w-6 h-0.5 mt-2 m-auto rounded bg-yellow-900 transition duration-300"
                />
              </button>
            </div>

            {/* Tambahkan logika untuk menampilkan menu di mobile */}
            <div
              className={`${
                isMenuOpen ? "block" : "hidden"
              } w-full lg:flex flex-wrap justify-end items-center space-y-6 p-6 rounded-xl bg-white md:space-y-0 md:p-0 md:flex-nowrap md:bg-transparent lg:w-7/12`}
            >
              <div className="text-gray-600 lg:pr-4">
                <ul className="space-y-6 tracking-wide font-medium text-sm md:flex md:space-y-0">
                  <li>
                    <a
                      href="/"
                      className="block md:px-4 transition hover:text-yellow-700"
                    >
                      <span>Beranda</span>
                    </a>
                  </li>
                </ul>
              </div>
              <div className="w-full space-y-2 border-yellow-200 lg:space-y-0 md:w-max lg:border-l">
                <button
                  type="button"
                  onClick={toggleDropdown}
                  title="Start buying"
                  className="inline-flex w-full py-2 px-6 text-center rounded-full transition active:bg-yellow-200 focus:bg-yellow-100 sm:w-max"
                >
                  <span className="block text-yellow-800 font-semibold text-sm">
                    Layanan
                  </span>
                  <svg
                    className="-mr-1 h-5 w-5 text-gray-400"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
                <div
                  className={`${
                    isOpen
                      ? "transition ease-out duration-100 transform opacity-100 scale-100"
                      : "transition ease-in duration-75 transform opacity-0 scale-95"
                  } absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none`}
                  role="menu"
                  aria-orientation="vertical"
                  aria-labelledby="menu-button"
                >
                  <div className="py-1" role="none">
                    <a
                      href="/dashboard"
                      className="block px-4 py-2 text-sm text-gray-700"
                      role="menuitem"
                      id="menu-item-0"
                    >
                      Dashboard
                    </a>
                    <a
                      href="/addUser"
                      className="block px-4 py-2 text-sm text-gray-700"
                      role="menuitem"
                      id="menu-item-0"
                    >
                      Add User
                    </a>
                    <a
                      href="/dasawisma"
                      className="block px-4 py-2 text-sm text-gray-700"
                      role="menuitem"
                      id="menu-item-2"
                    >
                      Dasawisma
                    </a>
                  </div>
                </div>
                <Link to={"/leubeut"}>
                  <button
                    type="button"
                    title="login"
                    className="w-full py-2 px-6 text-center rounded-full transition bg-yellow-300 hover:bg-yellow-100 active:bg-yellow-400 focus:bg-yellow-300 sm:w-max"
                  >
                    <span className="block text-yellow-900 font-semibold text-sm">
                      Login
                    </span>
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}
