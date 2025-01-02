import { useState } from "react";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [role] = useState(localStorage.getItem("role"));

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLogout = () => {
    localStorage.clear();
    window.location.href = "/";
  };

  return (
    <nav className="relative top-0 left-0 right-0 z-50 bg-white shadow-md">
      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo Section */}
          <div className="flex items-center">
            <a href="/" className="flex items-center space-x-2">
              <img
                src="logo.png"
                className="w-8 md:w-12"
                alt="logo"
                width={144}
                height={133}
              />
              <span className="text-xl md:text-2xl font-bold text-yellow-900">
                SI <span className="text-yellow-700">DAWET</span>
              </span>
            </a>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <a
              href="/"
              className="text-gray-600 hover:text-yellow-700 transition-colors"
            >
              Beranda
            </a>
            
            {/* Desktop Dropdown */}
            <div className="relative">
              <button
                onClick={toggleDropdown}
                className="flex items-center space-x-1 text-gray-600 hover:text-yellow-700"
              >
                <span>Layanan</span>
                <svg
                  className="w-4 h-4"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>

              {isOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1">
                  {role === "kelurahan" && (
                    <a
                      href="/addUser"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-yellow-50"
                    >
                      Add User
                    </a>
                  )}
                  {role === "rt" && (
                    <a
                      href="/dasawisma"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-yellow-50"
                    >
                      Dasawisma
                    </a>
                  )}
                  {(role === "rt" || role === "rw" || role === "kelurahan") && (
                    <a
                      href="/dashboard"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-yellow-50"
                    >
                      Dashboard
                    </a>
                  )}
                </div>
              )}
            </div>

            {/* Auth Buttons */}
            {localStorage.getItem("access_token") &&
            localStorage.getItem("access_token") !== "undefined" ? (
              <button
                onClick={handleLogout}
                className="px-6 py-2 bg-yellow-300 text-yellow-900 rounded-full hover:bg-yellow-200 transition-colors"
              >
                Logout
              </button>
            ) : (
              <a
                href="/login"
                className="px-6 py-2 bg-yellow-300 text-yellow-900 rounded-full hover:bg-yellow-200 transition-colors"
              >
                Login
              </a>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={toggleMenu}
            className="md:hidden p-2 rounded-md text-gray-600 hover:text-yellow-700 hover:bg-yellow-50"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {isMenuOpen ? (
                <path d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-white border-t">
            <div className="px-2 pt-2 pb-3 space-y-1">
              <a
                href="/"
                className="block px-3 py-2 rounded-md text-gray-600 hover:text-yellow-700 hover:bg-yellow-50"
              >
                Beranda
              </a>
              
              {/* Mobile Dropdown Items */}
              {role === "kelurahan" && (
                <a
                  href="/addUser"
                  className="block px-3 py-2 rounded-md text-gray-600 hover:text-yellow-700 hover:bg-yellow-50"
                >
                  Add User
                </a>
              )}
              {role === "rt" && (
                <a
                  href="/dasawisma"
                  className="block px-3 py-2 rounded-md text-gray-600 hover:text-yellow-700 hover:bg-yellow-50"
                >
                  Dasawisma
                </a>
              )}
              {(role === "rt" || role === "rw" || role === "kelurahan") && (
                <a
                  href="/dashboard"
                  className="block px-3 py-2 rounded-md text-gray-600 hover:text-yellow-700 hover:bg-yellow-50"
                >
                  Dashboard
                </a>
              )}

              {/* Mobile Auth Button */}
              {localStorage.getItem("access_token") &&
              localStorage.getItem("access_token") !== "undefined" ? (
                <button
                  onClick={handleLogout}
                  className="w-full text-left px-3 py-2 rounded-md text-yellow-900 bg-yellow-300 hover:bg-yellow-200"
                >
                  Logout
                </button>
              ) : (
                <a
                  href="/login"
                  className="block px-3 py-2 rounded-md text-yellow-900 bg-yellow-300 hover:bg-yellow-200"
                >
                  Login
                </a>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}