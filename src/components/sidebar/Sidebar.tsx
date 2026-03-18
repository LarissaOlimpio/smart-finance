import { Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { useState } from "react";
import { FaBars } from "react-icons/fa";
import { GrMoney } from "react-icons/gr";
import { LuLogOut, LuTrendingDown } from "react-icons/lu";
import { RxDashboard } from "react-icons/rx";
import { Tooltip } from "@radix-ui/themes";

interface MenuItem {
  name: string;
  path: string;
  icon: React.ReactNode;
}
export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const toggleModal = () => setIsOpen((prev) => !prev);
  const closeModal = () => setIsOpen(false);

  const menuItems: MenuItem[] = [
    { name: "Dashboard", path: "/dashboard", icon: <RxDashboard /> },
    { name: "Inflow", path: "/inflow", icon: <GrMoney /> },
    { name: "Outflow", path: "/outflow", icon: <LuTrendingDown /> },
    { name: "Logout", path: "/", icon: <LuLogOut /> },
  ];
  const mapMenuItems = menuItems.map((item) => (
    <Link
      key={item.name}
      to={item.path}
      onClick={closeModal}
      className="flex cursor-pointer items-center gap-5 rounded px-5 py-2 hover:bg-gray-700"
    >
      <Tooltip content={!isOpen ? item.name : undefined}>
        <span>{item.icon}</span>
      </Tooltip>

      {isOpen && <span className="whitespace-nowrap">{item.name}</span>}
    </Link>
  ));
  return (
    <>
      <button
        className="absolute top-4 left-4 z-50 p-3 text-black md:hidden"
        onClick={toggleModal}
      >
        <FaBars />
      </button>
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 md:hidden"
          onClick={closeModal}
        />
      )}
      <motion.div
        initial={{ width: 60 }}
        animate={{ width: isOpen ? 240 : 60 }}
        transition={{ duration: 0.4 }}
        className={`fixed top-0 left-0 z-50 flex min-h-screen flex-col overflow-hidden bg-gray-800 text-white transition-transform duration-300 ease-in-out md:relative md:translate-x-0 ${isOpen ? "translate-x-0" : "-translate-x-full"} `}
      >
        {" "}
        <button
          className="mb-10 hidden w-fit p-5 md:block"
          onClick={toggleModal}
        >
          <FaBars />
        </button>
        <nav className="mt-16 flex flex-col gap-8 md:mt-0">{mapMenuItems}</nav>
      </motion.div>
    </>
  );
}
