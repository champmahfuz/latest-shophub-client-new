import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import {
  FiLogOut,
  FiUser,
  FiShoppingBag,
  FiChevronDown,
  FiX,
} from "react-icons/fi";
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from "framer-motion";

const Dashboard = () => {
  const [userData, setUserData] = useState(null);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const profileRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setIsProfileOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Fetch user data
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          navigate("/login");
          return;
        }

        const response = await fetch(
          "https://latest-shophub-client.onrender.com/api/auth/me",
          // "http://localhost:8000/api/auth/me",
          {
            credentials: "include",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!response.ok) throw new Error("Failed to fetch user data");

        const data = await response.json();
        setUserData(data.user);
      } catch (err) {
        setError(err.message);
        navigate("/login");
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [navigate]);

  const handleShopClick = (shopName) => {
    const cleanShopName = shopName
      .toLowerCase()
      .replace(/\s+/g, "-")
      .replace(/[^a-z0-9-]/g, "");
    window.location.href = `http://${cleanShopName}.localhost:5173`;
  };

  const handleLogout = async () => {
    try {
      await fetch(
        "https://latest-shophub-client.onrender.com/api/auth/logout",
        {
          method: "POST",
          credentials: "include",
        }
      );
      localStorage.removeItem("token");
      navigate("/login");
    } catch (err) {
      console.error("Logout error:", err);
      setError("Failed to logout. Please try again.");
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-50">
        <div className="flex flex-col items-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mb-4"></div>
          <p className="text-gray-600">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-50">
        <div className="text-center p-6 bg-white rounded-xl shadow-sm max-w-md w-full">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-red-100 mb-4">
            <FiX className="h-6 w-6 text-red-600" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            Error occurred
          </h3>
          <p className="text-sm text-gray-600 mb-6">{error}</p>
          <button
            onClick={() => navigate("/login")}
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none"
          >
            Return to Login
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Modern Navbar */}
      <nav className="bg-white shadow-sm relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <FiShoppingBag className="h-6 w-6 text-indigo-600 mr-2" />
              <h1 className="text-xl font-bold bg-gradient-to-r from-indigo-600 to-blue-600 bg-clip-text text-transparent">
                ShopHub Dashboard
              </h1>
            </div>

            {/* Profile Dropdown */}
            <div className="relative ml-4 flex items-center" ref={profileRef}>
              <button
                onClick={() => setIsProfileOpen(!isProfileOpen)}
                className="flex items-center cursor-pointer space-x-2 focus:outline-none group"
                aria-label="User profile"
              >
                <div className="h-8 w-8 rounded-full bg-gradient-to-r from-blue-500 to-indigo-500 flex items-center justify-center text-white font-medium shadow-sm group-hover:shadow-md transition-all">
                  {userData?.username?.charAt(0).toUpperCase()}
                </div>
                <div className="flex items-center">
                  <span className="text-sm font-medium text-gray-700">
                    {userData?.username}
                  </span>
                  <FiChevronDown
                    className={`ml-1 h-4 w-4 text-gray-500 transition-transform ${
                      isProfileOpen ? "rotate-180" : ""
                    }`}
                  />
                </div>
              </button>

              {/* Profile Dropdown Modal */}
              <AnimatePresence>
                {isProfileOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 20 }}
                    transition={{ type: "spring", damping: 20, stiffness: 300 }}
                    className="absolute right-0 top-full mt-2 w-72 origin-top-right rounded-xl bg-white shadow-xl ring-1 ring-black ring-opacity-5 focus:outline-none z-50 overflow-hidden"
                  >
                    <div className="py-2">
                      {/* Account Info Section */}
                      <div className="px-5 py-4">
                        <div className="flex items-center space-x-3">
                          <div className="flex-shrink-0 h-10 w-10 rounded-full bg-gradient-to-r from-blue-500 to-indigo-500 flex items-center justify-center text-white font-medium">
                            {userData?.username?.charAt(0).toUpperCase()}
                          </div>
                          <div>
                            <p className="text-sm font-semibold text-gray-900 truncate">
                              {userData?.username}
                            </p>
                            <p className="text-xs text-gray-500 truncate">
                              {userData?.email || "No email provided"}
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* Divider */}
                      <div className="border-t border-gray-100 mx-4"></div>

                      {/* Shops Section */}
                      <div className="px-5 py-3">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Your Shops
                          </span>
                          <span className="text-xs font-medium text-blue-600 bg-blue-50 px-2 py-1 rounded-full">
                            {userData?.shops?.length || 0}
                          </span>
                        </div>
                        <ul className="space-y-2 max-h-60 overflow-y-auto pr-2">
                          {userData?.shops?.map((shop, index) => (
                            <motion.li
                              key={index}
                              whileHover={{ x: 2 }}
                              className="text-sm text-gray-700 px-3 py-2 hover:bg-gray-50 rounded-lg transition-colors cursor-pointer flex items-center"
                            >
                              <FiShoppingBag className="text-gray-400 mr-2 flex-shrink-0" />
                              <span className="truncate">{shop}</span>
                            </motion.li>
                          ))}
                        </ul>
                      </div>

                      {/* Divider */}
                      <div className="border-t border-gray-100 mx-4"></div>

                      {/* Logout Button */}
                      <motion.button
                        whileTap={{ scale: 0.98 }}
                        onClick={() => {
                          setIsProfileOpen(false);
                          setShowLogoutModal(true);
                        }}
                        className="w-full text-left px-5 py-3 text-sm font-medium text-red-600 hover:bg-red-50 flex items-center transition-colors"
                      >
                        <FiLogOut className="mr-3 text-red-500" />
                        Sign out
                      </motion.button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Card */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl shadow-lg text-white p-6 mb-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div>
              <h2 className="text-2xl font-bold mb-2">
                Welcome back, {userData?.username}!
              </h2>
              <p className="opacity-90">
                You have {userData?.shops?.length || 0} active shops in your
                account.
              </p>
            </div>
            <div className="mt-4 md:mt-0">
              <button
                onClick={() => {}}
                className="px-4 py-2 bg-white text-blue-600 rounded-lg font-medium hover:bg-opacity-90 transition"
              >
                Add New Shop
              </button>
            </div>
          </div>
        </div>

        {/* Shops Section */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
            <FiShoppingBag className="mr-2 text-blue-500" />
            Your Shops
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {userData?.shops?.map((shop, index) => (
              <motion.div
                key={index}
                whileHover={{ y: -5 }}
                onClick={() => handleShopClick(shop)}
                className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-all cursor-pointer group"
              >
                <div className="p-5">
                  <div className="flex items-start">
                    <div className="flex-shrink-0 h-12 w-12 rounded-lg bg-blue-50 flex items-center justify-center text-blue-600 group-hover:bg-blue-100 transition">
                      {shop.charAt(0).toUpperCase()}
                    </div>
                    <div className="ml-4">
                      <h3 className="font-medium text-gray-900 group-hover:text-blue-600 transition">
                        {shop}
                      </h3>
                      <p className="mt-1 text-sm text-gray-500">
                        Click to manage shop
                      </p>
                    </div>
                  </div>
                </div>
                <div className="px-5 py-3 bg-gray-50 border-t border-gray-100">
                  <div className="text-sm text-blue-600 font-medium">
                    Visit Dashboard →
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
            <h4 className="text-sm font-medium text-gray-500 mb-1">
              Total Shops
            </h4>
            <p className="text-3xl font-bold text-gray-900">
              {userData?.shops?.length || 0}
            </p>
          </div>
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
            <h4 className="text-sm font-medium text-gray-500 mb-1">
              Active Since
            </h4>
            <p className="text-3xl font-bold text-gray-900">
              {new Date().toLocaleDateString("default", {
                month: "short",
                year: "numeric",
              })}
            </p>
          </div>
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
            <h4 className="text-sm font-medium text-gray-500 mb-1">Plan</h4>
            <p className="text-3xl font-bold text-gray-900">Starter</p>
          </div>
        </div>
      </main>

      {/* Logout Modal */}
      <AnimatePresence>
        {showLogoutModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-xl shadow-xl max-w-sm w-full overflow-hidden"
            >
              <div className="p-6">
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-red-100 mb-4">
                  <FiLogOut className="h-6 w-6 text-red-600" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 text-center mb-2">
                  Confirm Logout
                </h3>
                <p className="text-sm text-gray-600 text-center mb-6">
                  Are you sure you want to logout from your account?
                </p>
                <div className="flex space-x-3">
                  <button
                    onClick={() => setShowLogoutModal(false)}
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleLogout}
                    className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg text-sm font-medium hover:bg-red-700"
                  >
                    Logout
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Dashboard;
