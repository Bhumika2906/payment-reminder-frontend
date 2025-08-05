import React from "react";
import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  ClipboardList,
  PlusCircle,
  UserCircle, X,
  BadgeIndianRupee
} from "lucide-react";


function Sidebar({ isOpen , onClose }) {
if(!isOpen) return null;

const linkBase = "flex items-center gap-3 px-3 py-2 rounded-md hover:bg-[rgba(29,161,157,0.34)]";
const active = "bg-slate-300 font-semibold";


  return (
    <div className="fixed top-0 left-0 h-full w-64 text-[rgb(20,101,98)] bg-white shadow-md z-50 p-4">
      {/* Close icon inside */}
      <div className="flex justify-end mb-6">
        <button onClick={onClose}>
          <X className="w-6 h-6" />
        </button>
      </div>


      <h2 className="text-3xl font-bold mb-8 flex space-x-2">
      <BadgeIndianRupee size={38}/>
      <div className ="">TrustPay</div>

      </h2>
      <nav className="space-y-4">
         <NavLink
          to="/dashboard"
          className={({ isActive }) => `${linkBase} ${isActive ? active : ""}`}
          onClick={onClose}
        >
          <LayoutDashboard /> Dashboard
        </NavLink>

        <NavLink
          to="/billlist"
          className={({ isActive }) => `${linkBase} ${isActive ? active : ""}`}
          onClick={onClose}
        >
          <ClipboardList /> Bill List
        </NavLink>

        <NavLink
          to="/remainder"
          className={({ isActive }) => `${linkBase} ${isActive ? active : ""}`}
          onClick={onClose}
        >
          <PlusCircle /> Add Reminder
        </NavLink>

      </nav>
    </div>
  );
}


export default Sidebar;
