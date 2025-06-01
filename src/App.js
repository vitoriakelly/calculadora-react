import React, { useState } from "react";
import Calculator from "./Calculator";
import { motion } from "framer-motion";
import { FaGithub } from "react-icons/fa";

function App() {
  const [darkMode, setDarkMode] = useState(false);

  return (
    <div
      className={`min-h-screen flex flex-col items-center justify-center transition-colors duration-500 ${
        darkMode ? "bg-gray-900 text-white" : "bg-gray-50 text-black"
      }`}
    >
      <div className="absolute top-5 right-5">
        <motion.div
          whileTap={{ scale: 0.9 }}
          className={`w-16 h-8 flex items-center px-1 rounded-full cursor-pointer relative ${
            darkMode ? "bg-gray-700" : "bg-yellow-300"
          }`}
          onClick={() => setDarkMode(!darkMode)}
        >
          <motion.div
            className="absolute w-7 h-7 bg-white rounded-full shadow-md flex items-center justify-center text-base"
            layout
            transition={{
              type: "spring",
              stiffness: 700,
              damping: 30,
            }}
            style={{
              left: darkMode ? "2px" : "calc(100% - 26px)",
              top: "1px",
            }}
          >
            {darkMode ? "🌙" : "☀️"}
          </motion.div>
        </motion.div>
      </div>
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className={`text-4xl font-semibold  mt-10 mb-4 drop-shadow-sm cursor-default select-none ${
          darkMode ? "text-white" : "text-black"
        }`}
      >
        Calculadora
      </motion.h1>

      <Calculator darkMode={darkMode} />
      <footer
        className={`w-full py-6 flex justify-center items-center gap-2 text-sm transition-colors duration-500 ${
          darkMode ? "text-gray-400" : "text-gray-600"
        }`}
      >
        <span>© 2025</span>
        <a
          href="https://github.com/seu-usuario"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1 underline hover:text-blue-500"
        >
          <FaGithub />
          <span>https://github.com/vitoriakelly</span>
        </a>
      </footer>
    </div>
  );
}

export default App;
