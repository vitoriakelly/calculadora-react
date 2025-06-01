import React, { useState } from "react";
import { motion } from "framer-motion";

export default function Calculator({ darkMode }) {
  const [input, setInput] = useState("");

  const handleClick = (value) => setInput((prev) => prev + value);
  const handleClear = () => setInput("");
  const handleBackspace = () => setInput((prev) => prev.slice(0, -1));
  const handleEqual = () => {
    try {
      setInput(eval(input).toString());
    } catch {
      setInput("Erro");
    }
  };

  const buttons = [
    "7",
    "8",
    "9",
    "/",
    "4",
    "5",
    "6",
    "*",
    "1",
    "2",
    "3",
    "-",
    "0",
    ".",
    "=",
    "+",
  ];

  const getButtonClass = (btn) => {
    if (btn === "=") {
      return "bg-green-500 text-white";
    }
    return darkMode ? "bg-gray-700 hover:bg-gray-600" : "bg-gray-100 hover:bg-gray-200";
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`w-full max-w-sm mx-auto mt-12 p-6 rounded-2xl shadow-lg transition-colors duration-500 ${
        darkMode ? "bg-gray-800 text-white" : "bg-white text-black"
      }`}
    >
      <div className="mb-4">
        <input
          type="text"
          className="w-full text-right text-2xl border border-gray-300 rounded p-2 focus:outline-none bg-white text-black"
          value={input}
          disabled
        />
      </div>

      {/* Grade dos botões principais */}
      <div className="grid grid-cols-4 gap-3">
        {buttons.map((btn, index) => (
          <motion.button
            key={index}
            whileTap={{ scale: 0.9 }}
            onClick={() => (btn === "=" ? handleEqual() : handleClick(btn))}
            className={`p-4 text-xl rounded shadow transition-colors duration-300 ${getButtonClass(
              btn
            )}`}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.05 * index }}
          >
            {btn}
          </motion.button>
        ))}
      </div>

      {/* Linha dos botões apagar e limpar */}
      <div className="flex gap-3 mt-4">
        <motion.button
          whileTap={{ scale: 0.95 }}
          onClick={handleBackspace}
          className={`flex-1 max-w-[30%] bg-red-500 text-white p-3 rounded text-lg shadow transition-colors duration-300 hover:bg-red-600`}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
        >
          ⌫ Apagar
        </motion.button>

        <motion.button
          whileTap={{ scale: 0.95 }}
          onClick={handleClear}
          className={`flex-1 max-w-[65%] bg-red-700 text-white p-3 rounded text-lg shadow transition-colors duration-300 hover:bg-red-800`}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.85 }}
        >
          Limpar
        </motion.button>
      </div>
    </motion.div>
  );
}
