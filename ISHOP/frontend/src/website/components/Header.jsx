import { FiChevronDown } from 'react-icons/fi';
import { BsCart2 } from 'react-icons/bs';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { lsToCart, emtyCart } from '../../redux/features/cartSlice';
import { userLogout } from '../../redux/features/userSlice';

const Header = () => {
    const dispatch = useDispatch();
    const cart = useSelector((state) => state.cart);
    const user = useSelector((state) => state.user.data)


    useEffect(
        () => {
            dispatch(lsToCart())
        },
        []
    )

    function logoutHandler() {
        dispatch(userLogout());
        dispatch(emtyCart());
    }
    return (
        <header className="w-full bg-white px-6 py-3 shadow flex flex-col  items-center justify-between">
            {/* Top Bar */}
            <div className="flex justify-between items-center w-full text-sm text-gray-600">
                <div className="flex gap-3 items-center">
                    <span className="bg-gray-100 px-2 py-1 rounded">Hotline 24/7</span>
                    <span className="font-semibold">(025) 3886 25 16</span>
                </div>
                <div className="flex items-center gap-6">
                    <a href="#" className="hover:underline">Sell on Swoo</a>
                    <a href="#" className="hover:underline">Order Tracki</a>
                    <div className="flex items-center gap-1">
                        <span>USD</span>
                        <FiChevronDown />
                    </div>
                    <div className="flex items-center gap-1">
                        <img src="https://flagcdn.com/us.svg" alt="US Flag" className="w-5 h-4" />
                        <span>Eng</span>
                        <FiChevronDown />
                    </div>
                </div>
            </div>

            {/* Bottom Navbar */}
            <div className="mt-5 flex flex-wrap items-center justify-between w-full">
                <div className="flex items-center gap-3">
                    {/* Logo */}
                    <div className="w-60 h-10 rounded-full flex items-center justify-center text-white text-xl font-semibold">
                        <img src="logo.png" alt="" />
                    </div>

                </div>

                {/* Navigation */}
                <nav className="flex gap-4 font-semibold text-sm text-black ml-6">
                    <Link to="/" className="flex items-center gap-1 hover:text-teal-600">HOMES </Link>
                    <a href="#" className="flex items-center gap-1 hover:text-teal-600">PAGES </a>
                    <Link to="/store" className="flex items-center gap-1 hover:text-teal-600">PRODUCTS </Link>
                    <a href="#" className="hover:text-teal-600">CONTACT</a>
                </nav>

                {/* Right Actions */}
                <div className="flex items-center gap-6">
                    <div className="text-right">
                        <p className="text-xs text-gray-400">WELCOME</p>
                        {
                            user == null ?
                                <Link to="/login?ref=header" className="text-sm cursor-pointer font-bold hover:underline">
                                    LOG IN / REGISTER</Link>
                                :
                                <div onClick={logoutHandler} className="text-sm font-bold cursor-pointer hover:underline">
                                    Logout</div>
                        }

                    </div>

                    {/* Cart */}
                    <Link to="/cart" className="relative">

                        <div className="relative flex items-center">
                            <BsCart2 size={24} />
                            <span className="absolute -top-3 left-2 bg-teal-600 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">{cart.items.length}</span>
                            <span className="ml-2   font-semibold">$1,689.00</span>
                        </div>
                    </Link>

                </div>
            </div>
        </header>
    );
};

export default Header;
