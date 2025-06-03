// AuthForm.js
import React, { useContext, useEffect, useState } from "react";
import { FaEnvelope, FaUser, FaLock } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useSearchParams } from "react-router-dom";
import { setUser } from "../../redux/features/userSlice";
import { MainContext } from "../../Context";
import axios from "axios";

export default function AuthForm() {
    const user = useSelector((state) => state.user.data)
    const [searchParams, SetsearchParams] = useSearchParams()
    const { notify, API_BASE_URL, USER_URL } = useContext(MainContext)
    const [isSignUp, setIsSignUp] = useState(false);
    const dispacher = useDispatch()
    const navigator = useNavigate()
    const cartData = JSON.parse(localStorage.getItem("cart"));
    const cart = cartData ? cartData.items : null
    console.log(cart)

    function submitHandle(e) {
        e.preventDefault();

        const data = {
            email: e.target.email.value,
            password: e.target.password.value,
        };


        axios.post("http://localhost:5000/user/login", data)
            .then(
                async (response) => {
                    notify(response.data.msg, response.data.flag);
                    if (response.data.flag === 1) {
                        dispacher(setUser(
                            {
                                user: response.data.user,
                                user_token: response.data.token
                            }
                        ));

                        const updateCart = await axios.post(`${API_BASE_URL}cart/move-to-db`, {
                            cart: cart != null ? cart : null,
                            user_id: response.data?.user?._id
                        })
                        let final_total = 0;
                        let original_total = 0;
                        const cartUpdate = updateCart.data.cart.map(
                            (cd) => {
                                const { product_id, qty, user_id } = cd;
                                final_total += (product_id.finalPrice * qty)
                                original_total += (product_id.originalPrice * qty)

                                return {
                                    productId: product_id._id,
                                    qty: qty

                                }

                            }
                        )

                        localStorage.setItem("cart", JSON.stringify({
                            items: cartUpdate, final_total, original_total
                        }))

                        if (searchParams.get("ref") === "checkout") {
                            navigator("/checkout");

                        } else {
                            navigator("/")
                        }

                    }
                    // or your desired route
                })
            .catch((error) => {
                console.log(error);
                notify("Login failed. Check credentials.", "error");
            });

        console.log("end");
    }

    function registerHandle(e) {
        e.preventDefault();

        const data = {
            name: e.target.name.value,
            email: e.target.email.value,
            password: e.target.password.value,
        };

        axios.post("http://localhost:5000/user/register", data)
            .then((response) => {
                notify(response.data.msg, response.data.flag);
                if (response.data.flag === 1) {
                    dispacher(setUser(
                        {
                            user: response.data.user,
                            user_token: response.data.token
                        }
                    ));

                }
                navigator("/"); // or your desired route
            })
            .catch((error) => {
                console.log(error);
                notify("Login failed. Check credentials.", "error");
            });

        console.log("end");
    }
    useEffect(
        () => {
            if (user != null) {
                navigator("/")
            }
        },
        [user]
    )


    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
            <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8">
                <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">
                    {isSignUp ? "Create Account" : "Welcome Back"}
                </h2>

                {isSignUp ?
                    <form onSubmit={registerHandle} className="space-y-4">
                        <div className="relative">
                            <FaUser className="absolute left-3 top-3 text-gray-400" />
                            <input
                                type="text"
                                placeholder="Name"
                                name="name"
                                className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>

                        <div className="relative">
                            <FaEnvelope className="absolute left-3 top-3 text-gray-400" />
                            <input
                                type="email"
                                name="email"
                                placeholder="Email"
                                className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>

                        <div className="relative">
                            <FaLock className="absolute left-3 top-3 text-gray-400" />
                            <input
                                type="password"
                                name="password"
                                placeholder="Password"
                                className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>

                        <button
                            type="submit"
                            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition duration-300"
                        >
                            Sign Up
                        </button>
                    </form>
                    :
                    <form onSubmit={submitHandle} className="space-y-4">
                        <div className="relative">
                            <FaEnvelope className="absolute left-3 top-3 text-gray-400" />
                            <input
                                type="email"
                                name="email"
                                placeholder="Email"
                                className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>

                        <div className="relative">
                            <FaLock className="absolute left-3 top-3 text-gray-400" />
                            <input
                                type="password"
                                name="password"
                                placeholder="Password"
                                className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>

                        <button
                            type="submit"
                            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition duration-300"
                        >
                            Sign In
                        </button>
                    </form>
                }

                <div className="text-center mt-4">
                    <p className="text-sm text-gray-600">
                        {isSignUp ? "Already have an account?" : "Don't have an account?"}
                        <button
                            onClick={() => setIsSignUp(!isSignUp)}
                            className="ml-1 text-blue-600 hover:underline"
                        >
                            {isSignUp ? "Sign In" : "Sign Up"}
                        </button>
                    </p>
                </div>
            </div>
        </div>
    );
}




