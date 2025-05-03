import React from 'react';
import {
    FiMenu,
    FiBell,
    FiUser,
    FiSearch,
    FiChevronDown,
} from 'react-icons/fi';

const Header = () => {
    return (
        <header className="bg-white shadow-sm px-6 py-3 flex items-center justify-between">
            {/* Left: Menu + Search */}
            <div className="flex items-center gap-4">
                <FiMenu className="text-2xl text-gray-700 cursor-pointer" />

                {/* Search bar */}
                <div className="relative hidden sm:block">
                    <input
                        type="text"
                        placeholder="Search..."
                        className="bg-gray-100 pl-10 pr-4 py-2 rounded-md text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <FiSearch className="absolute left-3 top-2.5 text-gray-500" />
                </div>
            </div>

            {/* Right: Icons and Profile */}
            <div className="flex items-center gap-4">
                {/* Notification icon */}
                <div className="relative">
                    <FiBell className="text-xl text-gray-700 cursor-pointer" />
                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-4 h-4 flex items-center justify-center rounded-full">
                        3
                    </span>
                </div>

                {/* Profile */}
                <div className="flex items-center gap-2 cursor-pointer">
                    <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center text-sm font-medium">
                        V
                    </div>
                    <span className="hidden sm:block text-sm font-medium text-gray-800">Admin</span>
                    <FiChevronDown className="text-gray-600 text-sm" />
                </div>
            </div>
        </header>
    );
};

export default Header;
