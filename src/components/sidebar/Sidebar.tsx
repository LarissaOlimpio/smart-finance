import { Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { useState } from "react";
import { FaBars } from "react-icons/fa";
import { GrMoney } from "react-icons/gr";
import { LuLogOut, LuTrendingDown } from "react-icons/lu";
import { RxDashboard } from "react-icons/rx";
import { Tooltip } from "react-tooltip";
import { Tooltip } from "@radix-ui/themes";

interface MenuItem {
  name: string;
  path: string;
  icon: React.ReactNode;
}
export function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const menuItems: MenuItem[] = [
    { name: "Dashboard", path: "/dashboard", icon: <RxDashboard /> },
    { name: "Inflow", path: "/inflow", icon: <GrMoney /> },
    { name: "Outflow", path: "/outflow", icon: <LuTrendingDown /> },
    { name: "Logout", path: "/", icon: <LuLogOut /> },
  ];
  const mapMenuItems = menuItems.map((item) => (
    <Link
      onClick={() => setIsOpen((prev) => !prev)}
      key={item.name}
      to={item.path}
      className="flex items-center gap-5 cursor-pointer hover:bg-gray-700 rounded px-5 py-2"
    >
      <Tooltip content={!isOpen ? item.name : undefined}>
        <span>{item.icon}</span>
      </Tooltip>

      {isOpen && <span>{item.name}</span>}
    </Link>
  ));
  return (
    <div>
      <motion.div
        initial={{ width: 60 }}
        animate={{ width: isOpen ? 240 : 60 }}
        transition={{ duration: 0.4 }}
        className="w-64 h-screen bg-gray-800 text-white "
      >
        {" "}
        <button
          className="mb-10 p-5"
          onClick={() => setIsOpen((prev) => !prev)}
        >
          <FaBars />
        </button>
        <nav className=" flex flex-col gap-11">{mapMenuItems}</nav>
      </motion.div>
      {!isOpen && <Tooltip id="sidebar-tooltip" offset={30} />}
    </div>
  );
}
