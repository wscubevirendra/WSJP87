import React from 'react';
import { FaShoppingCart, FaUser, FaSearch } from 'react-icons/fa';

const Header = () => {
    return (
        <header className="w-full shadow-md bg-white sticky top-0 z-50">
            <div className="container mx-auto px-4 py-3 flex items-center justify-between">

                {/* Logo */}
                <div className="text-2xl font-bold text-blue-600">ShopMate</div>

                {/* Navigation Links */}
                <nav className="hidden md:flex space-x-6 text-gray-700 font-medium">
                    <a href="#" className="hover:text-blue-600">Home</a>
                    <a href="#" className="hover:text-blue-600">Shop</a>
                    <a href="#" className="hover:text-blue-600">About</a>
                    <a href="#" className="hover:text-blue-600">Contact</a>
                </nav>

                {/* Search + Icons */}
                <div className="flex items-center space-x-4">
                    {/* Search */}
                    <div className="relative hidden sm:block">
                        <input
                            type="text"
                            placeholder="Search products..."
                            className="pl-10 pr-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />
                        <FaSearch className="absolute top-2.5 left-3 text-gray-500" />
                    </div>

                    {/* Icons */}
                    <button className="text-gray-700 hover:text-blue-600 text-xl">
                        <FaUser />
                    </button>
                    <button className="text-gray-700 hover:text-blue-600 text-xl relative">
                        <FaShoppingCart />
                        <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-1 rounded-full">2</span>
                    </button>
                </div>
            </div>
        </header>
    );
};

export default Header;
