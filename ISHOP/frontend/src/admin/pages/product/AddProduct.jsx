import { useContext, useEffect, useRef, useState } from "react";
import { FaPlus } from "react-icons/fa";
import { MainContext } from "../../../Context";
import Select from 'react-select'
import axios from "axios";

const AddProduct = () => {
  const { API_BASE_URL, PRODUCT_URL, notify, getCategories, categories, getColors, colors } = useContext(MainContext);
  const [selColors, setSelColors] = useState([]);

  const nameRef = useRef();
  const slugRef = useRef();
  const originalPriceRef = useRef();
  const discountPerRef = useRef()
  const finalPriceRef = useRef();


  function handleNameChange() {
    const name = nameRef.current.value;
    const slug = name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
    slugRef.current.value = slug;
  }

  function finalPriceCal() {
    const op = originalPriceRef.current.value;
    const dp = discountPerRef.current.value;
    const fp = Math.floor(op - (op * (dp / 100)));
    finalPriceRef.current.value = fp;

  }

  function submitHandler(e) {
    e.preventDefault();
    const formData = new FormData()
    formData.append('name', nameRef.current.value);
    formData.append('slug', slugRef.current.value);
    formData.append('originalPrice', originalPriceRef.current.value);
    formData.append('discountPercentage', discountPerRef.current.value);
    formData.append('finalPrice', finalPriceRef.current.value);
    formData.append('thumbnail', e.target.thumbnail.files[0]);
    formData.append('shortDescription', e.target.shortDescription.value);
    formData.append('longDescription', e.target.longDescription.value);
    formData.append("categoryId", e.target.categoryId.value);
    formData.append("colors", JSON.stringify(selColors))

    axios.post(API_BASE_URL + PRODUCT_URL + "/create", formData).then(
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
      getCategories()
      getColors()
    },
    []
  )
  return (
    <section className="bg-white">
      <div className="py-10 px-6 mx-auto max-w-5xl lg:py-20">
        <h2 className="mb-6 text-2xl font-bold text-gray-900">Add a New Product</h2>
        <form onSubmit={submitHandler} className="space-y-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {/* Name */}
            <div>
              <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900">
                Product Name
              </label>
              <input
                type="text"
                name="name"
                id="name"
                ref={nameRef}
                onChange={handleNameChange}
                className="block w-full rounded-xl border border-gray-200 bg-gray-50 p-3 text-sm text-gray-900 shadow-sm focus:border-primary-600 focus:ring-primary-600"
                placeholder="Product Name"
                required
              />
            </div>

            {/* Slug */}
            <div>
              <label htmlFor="slug" className="block mb-2 text-sm font-medium text-gray-900">
                Slug
              </label>
              <input
                type="text"
                name="slug"
                ref={slugRef}
                onChange={handleNameChange}
                readOnly
                id="slug"
                className="block w-full rounded-xl border border-gray-200 bg-gray-50 p-3 text-sm text-gray-900 shadow-sm focus:border-primary-600 focus:ring-primary-600"
                placeholder="product-name"
              />
            </div>

            <div className="col-span-full grid grid-cols-3 gap-4">
              {/* Original Price */}
              <div>
                <label htmlFor="originalPrice" className="block mb-2 text-sm font-medium text-gray-900">
                  Original Price
                </label>
                <input
                  type="number"
                  name="originalPrice"
                  ref={originalPriceRef}
                  onChange={finalPriceCal}
                  id="originalPrice"
                  className="block w-full rounded-xl border border-gray-200 bg-gray-50 p-3 text-sm text-gray-900 shadow-sm focus:border-primary-600 focus:ring-primary-600"
                  placeholder="100"
                />
              </div>

              {/* Discount Percentage */}
              <div>
                <label htmlFor="discountPercentage" className="block mb-2 text-sm font-medium text-gray-900">
                  Discount Percentage
                </label>
                <input
                  type="number"
                  ref={discountPerRef}
                  onChange={finalPriceCal}
                  name="discountPercentage"
                  id="discountPercentage"
                  className="block w-full rounded-xl border border-gray-200 bg-gray-50 p-3 text-sm text-gray-900 shadow-sm focus:border-primary-600 focus:ring-primary-600"
                  placeholder="2"
                />
              </div>

              {/* Final Price */}
              <div>
                <label htmlFor="finalPrice" className="block mb-2 text-sm font-medium text-gray-900">
                  Final Price
                </label>
                <input
                  type="number"
                  name="finalPrice"
                  ref={finalPriceRef}
                  readOnly
                  id="finalPrice"
                  className="block w-full rounded-xl border border-gray-200 bg-gray-50 p-3 text-sm text-gray-900 shadow-sm focus:border-primary-600 focus:ring-primary-600"
                  placeholder="99"
                />
              </div>
            </div>

            {/* Category */}
            <div>
              <label htmlFor="category" className="block mb-2 text-sm font-medium text-gray-900">
                Category ID
              </label>
              <Select name="categoryId" options={
                categories.map(
                  (cat, index) => {
                    return { value: cat._id, label: cat.name }

                  }
                )
              } />


            </div>

            {/* Colors */}
            <div>
              <label htmlFor="colors" className="block mb-2 text-sm font-medium text-gray-900">
                Colors (IDs, comma separated)
              </label>
              <Select
                onChange={
                  (color) => {
                    const col = color.map(o => o.value)
                    setSelColors(col)

                  }
                }
                isMulti closeMenuOnSelect={false} options={
                  colors.map(
                    (color, index) => {
                      return { value: color._id, label: color.name }

                    }
                  )
                } />
            </div>

            {/* Thumbnail */}
            <div className="col-span-full">
              <label htmlFor="thumbnail" className="block   mb-2 text-sm font-medium text-gray-900">
                Thumbnail
              </label>
              <input
                type="file"
                name="thumbnail"
                id="thumbnail"
                className="block w-full rounded-xl border border-gray-200 bg-gray-50 p-3 text-sm text-gray-900 shadow-sm focus:border-primary-600 focus:ring-primary-600"
                placeholder="https://example.com/image.jpg"
              />
            </div>


            {/* Short Description */}
            <div className="sm:col-span-2">
              <label htmlFor="shortDescription" className="block mb-2 text-sm font-medium text-gray-900">
                Short Description
              </label>
              <textarea
                id="shortDescription"
                name="shortDescription"
                rows="4"
                className="block w-full rounded-xl border border-gray-200 bg-gray-50 p-3 text-sm text-gray-900 shadow-sm focus:border-primary-600 focus:ring-primary-600"
                placeholder="Short description here"
              ></textarea>
            </div>

            {/* Long Description */}
            <div className="sm:col-span-2">
              <label htmlFor="longDescription" className="block mb-2 text-sm font-medium text-gray-900">
                Long Description
              </label>
              <textarea
                id="longDescription"
                name="longDescription"
                rows="6"
                className="block w-full rounded-xl border border-gray-200 bg-gray-50 p-3 text-sm text-gray-900 shadow-sm focus:border-primary-600 focus:ring-primary-600"
                placeholder="Detailed description here"
              ></textarea>
            </div>
          </div>

          <button
            type="submit"
            className="inline-flex items-center gap-2 rounded-xl bg-primary-600 px-6 py-3 text-sm font-medium text-balck shadow-md hover:bg-primary-700 focus:outline-none focus:ring-4 focus:ring-primary-300"
          >
            Save
          </button>
        </form>
      </div>
    </section>
  );
};

export default AddProduct;
