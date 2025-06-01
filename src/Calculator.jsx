import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function Calculator({ darkMode }) {
  const [input, setInput] = useState("");
  const [history, setHistory] = useState([]);

  useEffect(() => {
    const stored = localStorage.getItem("calc-history");
    if (stored) setHistory(JSON.parse(stored));
  }, []);

  useEffect(() => {
    localStorage.setItem("calc-history", JSON.stringify(history));
  }, [history]);

  const handleClick = (value) => setInput((prev) => prev + value);
  const handleClear = () => setInput("");
  const handleBackspace = () => setInput((prev) => prev.slice(0, -1));

  const handleEqual = () => {
    try {
      const result = eval(input).toString();
      const timestamp = new Date().toLocaleString("pt-BR");
      const newEntry = {
        expression: input,
        result,
        time: timestamp,
      };
      setHistory((prev) => [newEntry, ...prev.slice(0, 9)]);
      setInput(result);
    } catch {
      setInput("Erro");
    }
  };

  const handleClearHistory = () => setHistory([]);

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
    if (btn === "=") return "bg-green-500 text-white";
    return darkMode
      ? "bg-gray-700 hover:bg-gray-600"
      : "bg-gray-100 hover:bg-gray-200";
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
            transition={{ delay: 0.03 * index }}
          >
            {btn}
          </motion.button>
        ))}
      </div>
      <div className="flex gap-3 mt-4">
        <motion.button
          whileTap={{ scale: 0.95 }}
          onClick={handleBackspace}
          className={`flex-1 max-w-[30%] bg-red-500 text-white p-3 rounded text-lg shadow hover:bg-red-600`}
        >
          ⌫ Apagar
        </motion.button>

        <motion.button
          whileTap={{ scale: 0.95 }}
          onClick={handleClear}
          className={`flex-1 max-w-[65%] bg-red-700 text-white p-3 rounded text-lg shadow hover:bg-red-800`}
        >
          Limpar
        </motion.button>
      </div>
      {history.length > 0 && (
        <div className="mt-6">
          <div className="flex justify-between items-center mb-2">
            <h2 className="text-lg font-semibold">Histórico</h2>
            <button
              onClick={handleClearHistory}
              className="text-sm text-red-500 hover:underline"
            >
              Limpar histórico
            </button>
          </div>
          <ul className="text-sm max-h-40 overflow-y-auto space-y-1">
            {history.map((item, index) => (
              <li key={index} className="border-b pb-1 last:border-none">
                <div>
                  {item.expression} = <strong>{item.result}</strong>
                </div>
                <div className="text-xs text-gray-400">{item.time}</div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </motion.div>
  );
}
