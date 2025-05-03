import axios from "axios";
import { useEffect, useState } from "react";
import { ToastContainer, toast } from 'react-toastify';


const App = () => {
  const [users, setUsers] = useState([]);
  const [userDetail, setUserDetail] = useState(null);
  const notify = (msg, flag) => toast(msg, { type: flag ? "sucess" : "error" });


  function fetchData() {
    axios.get("http://localhost:5000/user/get-data").then(
      (response) => {
        setUsers(response.data.users);
      }
    ).catch(
      (error) => {
        setUsers([])

      }
    )
  }

  useEffect(
    () => {
      fetchData()
    },
    []
  )



  const submitHandler = (e) => {
    e.preventDefault();
    const data = {
      name: e.target.name.value,
      email: e.target.email.value,
      contact: e.target.contact.value
    }
    let API = null;
    if (userDetail == null) {
      API = axios.post("http://localhost:5000/user/create", data)
    } else {
      API = axios.put("http://localhost:5000/user/update/" + userDetail._id, data)
    }



    API.then(
      (response) => {
        notify(response.data.msg, response.data.flag)
        if (response.data.flag == 1) {
          fetchData()
          setUserDetail(null)
          e.target.reset()

        }

      }
    ).catch(
      (error) => {
        console.log(error)

      }
    )


  }

  function deleteHandler(id) {
    axios.delete("http://localhost:5000/user/delete/" + id).then(
      (response) => {
        notify(response.data.msg, response.data.flag)
        if (response.data.flag) {
          fetchData()
        }

      }
    ).catch(
      (error) => {

      }
    )
  }

  function statusHandler(id) {
    axios.patch(`http://localhost:5000/user/status/${id}`).then(
      (response) => {
        notify(response.data.msg, response.data.flag)
        if (response.data.flag === 1) {
          fetchData()
        }

      }
    ).catch(
      (error) => {
        console.log(error)

      }
    )
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <ToastContainer />
      <div className="max-w-[1300px] mx-auto bg-white p-8 rounded-xl shadow-lg">
        <h1 className="text-3xl font-bold mb-8 text-gray-800">User Management</h1>
        <div className="grid md:grid-cols-4 gap-6">

          {/* Form */}
          <form onSubmit={submitHandler} className="md:col-span-1 bg-gray-100 shadow-2xl p-4 rounded-lg  space-y-10">
            <input
              type="text"
              name="name"
              placeholder="Name"
              defaultValue={userDetail?.name}
              className="w-full border p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              defaultValue={userDetail?.email}
              className="w-full border p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <input
              type="text"
              name="contact"
              placeholder="Contact"
              defaultValue={userDetail?.contact}
              className="w-full border p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
            >
              Add User
            </button>
          </form>

          {/* Table */}
          <div className="md:col-span-3 overflow-x-auto">
            <table className="w-full text-left border border-gray-300 rounded-md overflow-hidden">
              <thead className="bg-gray-200">
                <tr>
                  <th className="p-3">#</th>
                  <th className="p-3">Name</th>
                  <th className="p-3">Email</th>
                  <th className="p-3">Contact</th>
                  <th className="p-3">Status</th>
                  <th className="p-3">Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.map((data, index) => (
                  <tr key={index} className="border-t">
                    <td className="p-3">{index + 1}</td>
                    <td className="p-3">{data.name}</td>
                    <td className="p-3">{data.email}</td>
                    <td className="p-3">{data.contact}</td>
                    <td className="p-3">
                      <button onClick={() => statusHandler(data._id)} className={`${data.status ? 'bg-green-500' : 'bg-red-500'} text-white px-3 py-1 rounded hover:bg-yellow-600`}>
                        {
                          data.status ?
                            "Active"
                            :
                            "Inactive"
                        }
                      </button>
                    </td>
                    <td className="p-3 space-x-2">
                      <button onClick={() => setUserDetail(data)} className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600">
                        Edit
                      </button>
                      <button onClick={() => deleteHandler(data._id)} className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600">
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

        </div>
      </div>
    </div>

  );
};

export default App;
