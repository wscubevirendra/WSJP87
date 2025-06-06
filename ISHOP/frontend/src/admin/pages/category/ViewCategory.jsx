import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { FiEdit, FiPlus } from "react-icons/fi";
import { Link } from "react-router-dom";
import { MainContext } from '../../../Context';
import Swal from 'sweetalert2'
// import 'sweetalert2/src/sweetalert2.scss'





const ViewCategory = () => {
  const { API_BASE_URL, CATEGORY_URL, notify } = useContext(MainContext)
  const { getCategories, categories } = useContext(MainContext)


  function statusHandler(id) {
    axios.patch(API_BASE_URL + CATEGORY_URL + `/status/${id}`).then(
      (resp) => {
        notify(resp.data.msg, resp.data.flag)
        if (resp.data.flag === 1) {
          getCategories()
        }

      }
    ).catch(
      (err) => {
        console.log(err)
        notify("Something is wrong", 0)

      }
    )
  }

  function deleteHandler(id) {


    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: "Deleted!",
          text: "Your file has been deleted.",
          icon: "success"
        });

        axios.delete(API_BASE_URL + CATEGORY_URL + `/delete/${id}`).then(
          (resp) => {
            notify(resp.data.msg, resp.data.flag)
            if (resp.data.flag === 1) {
              getCategories()
            }

          }
        ).catch(
          (err) => {
            console.log(err)
            notify("Something is wrong", 0)

          }
        )



      }
    });





  }


  useEffect(
    () => {
      getCategories()
    },
    []
  )

  return (
    <div className="p-6">
      <div className="bg-white rounded-2xl shadow-md p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-gray-700">Category / View</h2>
          <Link t0="" className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 transition" to="/admin/category/add">  <FiPlus className="text-lg" />
            Add Category</Link>

        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead className="bg-gray-100 text-gray-700 uppercase text-xs">
              <tr>
                <th className="p-4 text-left">ID</th>
                <th className="p-4 text-left">Name</th>
                <th className="p-4 text-left">Slug</th>
                <th className="p-4 text-left">Image</th>
                <th className="p-4 text-left">Status</th>
                <th className="p-4 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="text-gray-600">
              {/* Example rows */}
              {Array.isArray(categories) && categories.map((cat, index) => (
                <tr className=" shadow hover:bg-gray-50">
                  <td className="p-4">{index + 1}</td>
                  <td className="p-4 font-medium">{cat.name}</td>
                  <td className="p-4">{cat.slug}</td>
                  <td className="p-4">
                    <img width='25px' src={`${API_BASE_URL}images/category/${cat.image}`} alt="" />
                  </td>
                  <td className="p-4">
                    <button onClick={() => statusHandler(cat._id)} className={`text-white px-4 rounded-2xl ${cat.status ? 'bg-green-400' : 'bg-red-500'} hover:text-yellow-600 transition`}>{
                      cat.status == true ?
                        "Active" : "Inactive"
                    }</button>
                  </td>

                  <td className="p-4 flex justify-center gap-4">
                    <Link className="text-yellow-500 hover:text-yellow-600 transition" to={`/admin/category/edit/${cat._id}`} >

                      <FiEdit className="text-lg" />
                    </Link>
                    <button onClick={() => deleteHandler(cat._id)} className="text-yellow-500 hover:text-yellow-600 transition">
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div >
    </div >
  );
};

export default ViewCategory;


