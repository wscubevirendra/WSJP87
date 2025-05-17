import React, { useContext, useEffect, useRef, useState } from 'react';
import axios from 'axios';
import { MainContext } from '../../../Context';
import { useParams } from 'react-router-dom';

const EditCategory = () => {
    const { categoryId } = useParams()
    const { API_BASE_URL, CATEGORY_URL, notify, getCategories, categories } = useContext(MainContext)
    const nameRef = useRef();
    const slugRef = useRef();

    function handleNameChange() {
        const name = nameRef.current.value;
        const slug = name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
        slugRef.current.value = slug;
    }



    function submiHandle(e) {
        e.preventDefault();
        const formData = new FormData();
        formData.append("name", nameRef.current.value);
        formData.append("slug", slugRef.current.value);
        formData.append("image", e.target.category_image.files[0])

        axios.put(API_BASE_URL + CATEGORY_URL + "/update/" + categoryId, formData).then(
            (resp) => {
                notify(resp.data.msg, resp.data.flag)
                if (resp.data.flag === 1) {
                    e.target.reset()
                }

            }
        ).catch(
            (err) => {
                console.log(err)
                notify("Something is wrong", 0)


            }
        )

    }

    useEffect(
        () => {
            getCategories(categoryId)
        },
        [categoryId]
    )




    return (
        <div class="p-6">
            <div class="bg-white rounded-2xl p-8">

                <div class="flex items-center justify-between mb-8">
                    <h2 class="text-2xl font-bold text-gray-800">Category / Create</h2>
                    <button class="flex items-center gap-2 px-5 py-2 bg-blue-600 text-white text-sm font-semibold rounded-lg hover:bg-blue-700 transition-all">
                        Back to View
                    </button>
                </div>


                <div class="mx-auto p-8 rounded-xl">
                    <form onSubmit={submiHandle} class="space-y-6">

                        <div>
                            <label for="name" class="block text-sm font-medium text-gray-700 mb-2">
                                Category Name
                            </label>
                            <input
                                type="text"
                                id="name"
                                defaultValue={categories?.name}
                                ref={nameRef}
                                onChange={handleNameChange}
                                placeholder="Enter category name"
                                class="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all"
                            />
                        </div>


                        <div>
                            <label for="slug" class="block text-sm font-medium text-gray-700 mb-2">
                                Category Slug
                            </label>
                            <input
                                type="text"
                                id="slug"
                                ref={slugRef}
                                defaultValue={categories?.slug}
                                placeholder="Slug will be generated automatically"
                                class="w-full bg-gray-100 border border-gray-300 rounded-lg px-4 py-2 text-gray-600 focus:outline-none cursor-not-allowed"
                                readonly
                            />
                        </div>


                        <div>
                            <label for="category-image" class="block text-sm font-medium text-gray-700 mb-2">
                                Category Image
                            </label>
                            <input
                                type="file"
                                id="category-image"
                                name="category_image"
                                class="w-full bg-white border border-gray-300 rounded-lg px-4 py-2 text-gray-600 focus:outline-none"
                            />

                            <img width={100} src={`${API_BASE_URL}images/category/${categories.image}`} alt="" />

                        </div>


                        <div class="pt-4">
                            <button
                                type="submit"
                                class="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg shadow-md transition-all"
                            >
                                Create Category
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>

    );
};

export default EditCategory;
