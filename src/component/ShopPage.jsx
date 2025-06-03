import { useEffect } from "react";
import { FiArrowLeft, FiShoppingBag, FiHome, FiLogIn } from "react-icons/fi";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const ShopPage = () => {
  // Extract and clean shop name from hostname
  const getShopName = () => {
    const hostParts = window.location.hostname.split(".");
    if (hostParts.length === 1 || hostParts[0] === "localhost") {
      return null;
    }
    return hostParts[0].replace(/[^a-zA-Z0-9-]/g, "");
  };

  const shopName = getShopName();
  const isHomePage = !shopName;

  useEffect(() => {
    document.title = isHomePage ? "ShopHub Home" : `${shopName} | ShopHub`;
  }, [shopName, isHomePage]);

  const handleBackToDashboard = () => {
    window.location.href = "http://localhost:5173";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div className="flex items-center">
            <FiShoppingBag className="h-6 w-6 text-indigo-600 mr-2" />
            <h1 className="text-xl font-bold bg-gradient-to-r from-indigo-600 to-blue-600 bg-clip-text text-transparent">
              ShopHub
            </h1>
          </div>
          <div className="flex items-center space-x-4">
            {!isHomePage && (
              <motion.button
                whileHover={{ x: -2 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleBackToDashboard}
                className="flex items-center text-sm font-medium text-gray-600 hover:text-indigo-600 transition-colors"
              >
                <FiArrowLeft className="mr-1" />
                Back to Dashboard
              </motion.button>
            )}
            <Link to="/login">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center cursor-pointer px-4 py-2 bg-indigo-600 text-white text-sm font-medium rounded-md hover:bg-indigo-700 transition-colors"
              >
                <FiLogIn className="mr-2" />
                Login
              </motion.button>
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white rounded-xl shadow-lg overflow-hidden"
        >
          <div className="p-8 md:p-12 text-center">
            {isHomePage ? (
              <>
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-indigo-100 mb-6">
                  <FiHome className="h-8 w-8 text-indigo-600" />
                </div>
                <h1 className="text-3xl font-bold text-gray-900 mb-4">
                  Welcome to ShopHub
                </h1>
                <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
                  A modern solution for managing multiple shops with dedicated
                  subdomains.
                </p>
                <div className="bg-gradient-to-r from-indigo-50 to-blue-50 p-6 rounded-lg border border-gray-100">
                  <h2 className="text-xl font-semibold text-gray-800 mb-3">
                    9am Solution Task
                  </h2>
                  <p className="text-gray-600">
                    This implementation showcases subdomain routing with React
                    and a modern UI design.
                  </p>
                </div>
              </>
            ) : (
              <>
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-indigo-100 mb-6">
                  <div className="text-2xl font-bold text-indigo-600">
                    {shopName.charAt(0).toUpperCase()}
                  </div>
                </div>
                <h1 className="text-3xl font-bold text-gray-900 mb-3">
                  Welcome to <span className="text-indigo-600">{shopName}</span>
                </h1>
                <p className="text-lg text-gray-600 mb-6">
                  Your dedicated shop dashboard
                </p>
                <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
                    <h3 className="font-medium text-gray-800 mb-2">
                      Shop Analytics
                    </h3>
                    <p className="text-sm text-gray-500">Coming soon</p>
                  </div>
                  <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
                    <h3 className="font-medium text-gray-800 mb-2">
                      Recent Orders
                    </h3>
                    <p className="text-sm text-gray-500">Coming soon</p>
                  </div>
                  <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
                    <h3 className="font-medium text-gray-800 mb-2">
                      Inventory
                    </h3>
                    <p className="text-sm text-gray-500">Coming soon</p>
                  </div>
                </div>
              </>
            )}
          </div>
        </motion.div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <p className="text-center text-sm text-gray-500">
            © {new Date().getFullYear()} ShopHub. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default ShopPage;
