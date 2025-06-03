import { useContext, useEffect } from "react";
import { FaMinus, FaPlus } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { MainContext } from "../../Context";
import { qtyHandle } from "../../redux/features/cartSlice";
import { useNavigate } from "react-router-dom"


const Cart = () => {
    const navigator = useNavigate()
    const dispatch = useDispatch();
    function handleCart(payload) {
        // Dispatch an action to add the product to the cart
        dispatch(qtyHandle(payload));
    }


    const { getProduct, products, API_BASE_URL } = useContext(MainContext)
    const cart = useSelector((state) => state.cart);
    const user = useSelector((state) => state.user);

    function checkoutHandler() {
        if (user.data && user.user_token) {
            navigator('/checkout')
        } else {
            navigator('/login?ref=checkout')

        }


    }


    useEffect(
        () => {
            getProduct();
        },
        []
    )

    return (
        <div className="min-h-screen bg-gray-100 p-6">
            <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-6">

                <div className="md:col-span-2 space-y-6">
                    {
                        cart?.items.map((item, index) => {
                            const product = products.find((p) => p._id === item.productId);
                            if (!product) return null; // Skip if product not found

                            return (
                                <div
                                    key={index}
                                    className="relative bg-white rounded-lg p-4 flex gap-4 items-start shadow-sm border"
                                >

                                    <img
                                        src={`${API_BASE_URL}images/product/${product.thumbnail}`}
                                        alt={product.name}
                                        className="w-24 h-24 object-contain"
                                    />

                                    <div className="flex-1 space-y-1">

                                        <h3 className="font-semibold">{product.name}</h3>
                                        <p className="text-red-500 font-bold text-lg">
                                            ${product.finalPrice.toFixed(2)}
                                        </p>

                                        {/* Quantity */}
                                        <div className="flex items-center gap-2 mt-1">
                                            <button onClick={() => {
                                                handleCart({ productId: item.productId, type: 'dec', final_price: product.finalPrice, original_price: product.originalPrice });
                                            }} className="border p-1 rounded hover:bg-gray-100">
                                                <FaMinus size={12} />
                                            </button>
                                            <span>{item.qty}</span>
                                            <button onClick={() => {
                                                handleCart({ productId: item.productId, type: 'inc', final_price: product.finalPrice, original_price: product.originalPrice });
                                            }} className="border p-1 rounded hover:bg-gray-100">
                                                <FaPlus size={12} />
                                            </button>
                                        </div>

                                        {/* Shipping Info */}
                                        <div className="flex items-center text-xs gap-2 mt-1">

                                            <span className="text-green-600 font-semibold">
                                                FREE SHIPPING
                                            </span>

                                        </div>


                                    </div>
                                </div>
                            )

                        })
                    }
                </div>




                <div className="bg-white rounded-lg p-6 border border-green-500">
                    <h2 className="text-lg font-semibold mb-4">Order Summary</h2>
                    <div className="space-y-2 text-sm text-gray-700">
                        <div className="flex justify-between">
                            <span>Original Total:</span>
                            <span>{cart.original_total}</span>
                        </div>
                        <div className="flex justify-between">
                            <span>Saving:</span>
                            <span>{cart.original_total - cart.final_total}</span>
                        </div>

                        <div className="flex justify-between font-bold text-black border-t pt-2">
                            <span>ORDER TOTAL:</span>
                            <span>{cart.final_total}</span>
                        </div>
                    </div>
                    <button onClick={checkoutHandler} className="mt-6 w-full bg-teal-600 hover:bg-teal-700 text-white py-2 rounded">
                        CHECKOUT
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Cart;



