import React, { useState } from 'react'
import { useContext } from 'react';
import { MainContext } from '../../Context';
import { useEffect } from 'react';
import { Link, useParams, useSearchParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addItem } from '../../redux/features/cartSlice';
import axios from 'axios';

const Store = () => {
    const user = useSelector((state) => state.user.data)
    const dispacher = useDispatch()
    const { categorySlug } = useParams();
    console.log(categorySlug, "categorySlug")
    const [limit, setLimit] = useState(0);
    const [colorSlug, setColorSlug] = useState(null);
    const [searchParams, setSearchParams] = useSearchParams();
    const { getProduct, API_BASE_URL, products, getCategories, categories, getColors, colors } = useContext(MainContext)

    useEffect(
        () => {
            getCategories();
            getColors();

            if (searchParams.get("limit")) {
                setLimit(searchParams.get("limit"));
            }
            if (searchParams.get("colorSlug")) {
                setColorSlug(searchParams.get("colorSlug"));
            }
        },
        []
    )

    useEffect(
        () => {
            const query = {};
            if (limit) {
                query.limit = limit;
            }
            if (colorSlug) {
                query.colorSlug = colorSlug;
            }
            setSearchParams(query);
            getProduct(null, limit, categorySlug, colorSlug)
        },
        [limit, categorySlug, colorSlug]
    )

    async function cartHandler(data) {
        if (user !== null) {
            const response = await axios.post(API_BASE_URL + `cart/add-to-cart`, {
                userId: user?._id,
                productId: data.productId,
                qty: 1
            })
            console.log(response)
        }

        dispacher(
            addItem(data)
        )
    }


    return (
        <div className="flex min-h-screen bg-gray-50">
            {/* Left Filter Sidebar */}
            <aside className="w-1/5 p-6 bg-white border-r">
                <h2 className="text-lg font-bold mb-4">Filters</h2>

                {/* Category Filter */}
                <div className="mb-6 bg-gray-200 p-4 rounded-lg">
                    <h3 className="font-semibold mb-2">Category</h3>

                    <ul className="space-y-1">
                        <li className=" cursor-pointer  " >
                            <Link to="/store">All</Link>
                        </li>
                        {categories.map((cat) => (

                            <li className=" cursor-pointer flex justify-between  " key={cat}>
                                <Link to={`/store/${cat.slug}`}> {cat.name}
                                </Link>
                                <span>({cat.productCount})</span>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Color Filter */}
                <div className='mt-6 bg-gray-200 p-4 rounded-lg'>
                    <h3 className="font-semibold mb-2">Color</h3>
                    <ul className="space-y-1 gap-4 flex">
                        {colors.map((color) => (
                            <li onClick={() => setColorSlug(color.slug)} key={color} className='w-8 h-8 rounded-full' style={{ backgroundColor: color.hexcode }} title={color.name}>

                            </li>
                        ))}
                    </ul>
                </div>
            </aside>

            {/* Right Product Section */}
            <main className="w-4/5 p-6">
                <h2 className="text-2xl font-bold mb-6 text-gray-800">Products</h2>

                <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2 px-4">
                        <span className="text-sm text-gray-600">Sort by:</span>
                        <select onChange={(e) => setLimit(e.target.value)} className="border border-gray-300 rounded px-6 border-none py-1 text-sm">
                            <option value="0">All</option>
                            <option value="2">2</option>
                            <option value="4">4</option>
                            <option value="6">6</option>
                        </select>
                    </div>
                </div>


                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {products.map((product, index) => {
                        return (
                            <div
                                key={product._id}
                                className="bg-white shadow rounded-xl overflow-hidden hover:shadow-lg transition-all duration-200"
                            >
                                <img src={`${API_BASE_URL}images/product/${product.thumbnail}`} alt={product.name} className="w-full h-48 object-cover" />
                                <div className="p-4 space-y-2">
                                    <h3 className="text-sm font-semibold text-gray-800 truncate">{product.name}</h3>
                                    <div className="text-sm text-gray-500 line-through">{product.originalPrice.toFixed(2)}</div>
                                    <div className="text-orange-600 font-bold text-lg">${product.finalPrice.toFixed(2)}</div>
                                    <button onClick={() => {
                                        cartHandler(
                                            {
                                                productId: product._id,
                                                final_price: product.finalPrice,
                                                original_price: product.originalPrice,
                                            }
                                        )
                                    }} className="w-full mt-2 bg-orange-500 text-white text-sm font-semibold py-2 rounded hover:bg-orange-600 transition">
                                        Add to Cart
                                    </button>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </main>
        </div>
    );
};

export default Store;
