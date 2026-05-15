import React from "react";
import { Outlet } from "react-router";
import Navbar from "../components/Navbar";

function Root() {
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Navbar */}
      <Navbar />

      {/* Main Content */}
      <main className="flex-grow">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="bg-gradient-to-r from-slate-900 via-blue-900 to-indigo-900 text-white mt-auto">
        <div className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h4 className="text-xl font-bold mb-3 text-blue-300">AI Resume Maker</h4>
              <p className="text-gray-300 text-sm">Your go-to tool for creating professional resumes with AI in minutes.</p>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-3 text-blue-300">Quick Links</h4>
              <ul className="space-y-2 text-sm text-gray-300">
                <li><a href="/about" className="hover:text-blue-400 transition">About Us</a></li>
                <li><a href="/services" className="hover:text-blue-400 transition">Services</a></li>
                <li><a href="/contact" className="hover:text-blue-400 transition">Contact</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-3 text-blue-300">Legal</h4>
              <ul className="space-y-2 text-sm text-gray-300">
                <li><a href="#" className="hover:text-blue-400 transition">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-blue-400 transition">Terms of Service</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-blue-800 mt-8 pt-8 text-center text-gray-400 text-sm">
            <p>&copy; 2026 AI Resume Maker. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Root;
