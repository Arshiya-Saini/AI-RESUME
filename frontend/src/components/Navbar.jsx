import React from "react";
import { Link } from "react-router";
function Navbar() {
  return (
    <div className="navbar bg-gradient-to-r from-slate-900 via-blue-900 to-indigo-900 text-white shadow-lg sticky top-0 z-50">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-slate-800 rounded-box z-[1] mt-3 w-52 p-2 shadow-xl text-white"
          >
            <li>
              <Link to={"/about"} className="hover:bg-blue-600">About</Link>
            </li>
            <li>
              <Link to={"/services"} className="hover:bg-blue-600">Services</Link>
            </li>
            <li>
              <Link to={"/contact"} className="hover:bg-blue-600">Contact Us</Link>
            </li>
          </ul>
        </div>
        <Link to={"/"} className="btn btn-ghost text-xl font-bold bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">
          🚀 AI Resume Maker
        </Link>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1 gap-2">
          <li>
            <Link to={"/about"} className="rounded-lg hover:bg-blue-600 transition">About</Link>
          </li>
          <li>
            <Link to={"/services"} className="rounded-lg hover:bg-blue-600 transition">Services</Link>
          </li>
          <li>
            <Link to={"/contact"} className="rounded-lg hover:bg-blue-600 transition">Contact Us</Link>
          </li>
        </ul>
      </div>
      <div className="navbar-end">
        <Link to="/generate-resume" className="btn bg-gradient-to-r from-blue-500 to-indigo-600 text-white border-none hover:from-blue-600 hover:to-indigo-700 transition-all">
          Get Started
        </Link>
      </div>
    </div>
  );
}

export default Navbar;
