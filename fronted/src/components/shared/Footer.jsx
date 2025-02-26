import React from "react";
import { FaFacebookF, FaTwitter, FaLinkedinIn, FaInstagram } from "react-icons/fa";

const Footer = () => {
    return (
        <footer className="bg-gradient-to-r from-gray-800 to-gray-700 text-gray-300 py-12 rounded-sm">
            <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center">
                {/* Left Section */}
                <div className="text-center md:text-left mb-6 md:mb-0">
                    <h2 className="text-3xl font-extrabold text-white">Job Hunt</h2>
                    <p className="text-sm mt-2 opacity-80">© 2024 Your Company. All rights reserved.</p>
                </div>

                {/* Navigation Links */}
                <div className="flex space-x-6 text-sm mb-6 md:mb-0">
                    <a href="/" className="hover:text-white transition-colors duration-300">Home</a>
                    <a href="/jobs" className="hover:text-white transition-colors duration-300">Jobs</a>
                    <a href="/browse" className="hover:text-white transition-colors duration-300">Browse</a>
                </div>

                {/* Social Media Icons */}
                <div className="flex space-x-4">
                    <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="p-3 bg-gray-700 rounded-full hover:bg-blue-600 transition-all duration-300">
                        <FaFacebookF className="text-white w-5 h-5" />
                    </a>
                    <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="p-3 bg-gray-700 rounded-full hover:bg-blue-400 transition-all duration-300">
                        <FaTwitter className="text-white w-5 h-5" />
                    </a>
                    <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="p-3 bg-gray-700 rounded-full hover:bg-blue-500 transition-all duration-300">
                        <FaLinkedinIn className="text-white w-5 h-5" />
                    </a>
                    <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="p-3 bg-gray-700 rounded-full hover:bg-pink-500 transition-all duration-300">
                        <FaInstagram className="text-white w-5 h-5" />
                    </a>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
