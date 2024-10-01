import { useState } from "react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const toggleDropdown = () => {
    setIsOpen(!isOpen); // Membuka atau menutup dropdown
  };
  return (
    <>
      <div>
        <div className="mx-auto max-w-screen-xl px-6 lg:px-8 relative">
          <div className="relative flex h-16 space-x-10 w-full">
            <div className="flex justify-start">
              <a className="flex flex-shrink-0 items-center" href="/">
                <img className="block h-8 w-auto" height={32} src="logo.png" />
              </a>
            </div>
            <div className="flex-shrink-0 flex px-2 py-3 items-center space-x-8 flex-1 justify-end justify-self-end ">
              <a
                className="text-gray-700 hover:text-lime-700 text-sm font-medium"
                href="/login"
              >
                Beranda
              </a>
              <div className="relative inline-block text-left">
                <div>
                  <button
                    type="button"
                    className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                    id="menu-button"
                    aria-expanded={isOpen}
                    aria-haspopup="true"
                    onClick={toggleDropdown} // Menambahkan event onClick untuk membuka/menutup dropdown
                  >
                    Layanan
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
                </div>

                {/* Menambahkan animasi dengan class transition */}
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
                      href="/stunting"
                      className="block px-4 py-2 text-sm text-gray-700"
                      role="menuitem"
                      id="menu-item-0"
                    >
                      Peduli Stunting
                    </a>
                    <a
                      href="/e-asuh"
                      className="block px-4 py-2 text-sm text-gray-700"
                      role="menuitem"
                      id="menu-item-1"
                    >
                      E-Asuh
                    </a>
                    <a
                      href="/bumil-fit"
                      className="block px-4 py-2 text-sm text-gray-700"
                      role="menuitem"
                      id="menu-item-2"
                    >
                      Bumil Fit
                    </a>
                    <Link to={"/dasawisma"}>
                      <button
                        type="submit"
                        className="block w-full px-4 py-2 text-left text-sm text-gray-700"
                        role="menuitem"
                        id="menu-item-3"
                      >
                        Dasawisma
                      </button>
                    </Link>
                  </div>
                </div>
              </div>

              <a
                className="text-white bg-gray-800 hover:bg-gray-900 inline-flex items-center justify-center px-3 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm "
                href="/signup"
              >
                Login
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
