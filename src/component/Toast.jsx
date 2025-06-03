// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { FiCheckCircle, FiXCircle } from "react-icons/fi";

const Toast = ({ message, type, onClose }) => {
  const bgColor = type === "success" ? "bg-green-100" : "bg-red-100";
  const textColor = type === "success" ? "text-green-700" : "text-red-700";
  const Icon = type === "success" ? FiCheckCircle : FiXCircle;

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      className={`fixed top-4 right-4 ${bgColor} ${textColor} p-4 rounded-lg shadow-lg flex items-center max-w-md z-50`}
    >
      <Icon className="mr-2 text-xl" />
      <span className="flex-1">{message}</span>
      <button
        onClick={onClose}
        className="ml-4 text-gray-500 hover:text-gray-700"
      >
        <FiXCircle />
      </button>
    </motion.div>
  );
};

export default Toast;
