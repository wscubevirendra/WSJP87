import React, { createContext, useState } from 'react'
const MainContext = createContext();
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios';

function Context(props) {
    const [categories, setCategories] = useState([]);
    const API_BASE_URL = "http://localhost:5000/"
    const CATEGORY_URL = "category"

    const notify = (msg, flag) => toast(msg, { type: flag ? 'success' : 'error' });

    function getCategories(id = null) {
        let URL = API_BASE_URL + CATEGORY_URL
        //http://localhost:5000/category/id
        if (id != null) {
            URL = URL + `/${id}`

        }
        axios.get(URL).then(
            (response) => {
                if (response.data.flag === 1) {
                    setCategories(response.data.categories)
                }

            }
        ).catch(
            (error) => {
                setCategories([])
            }
        )
    }






    return (
        <MainContext.Provider value={{ API_BASE_URL, CATEGORY_URL, notify, getCategories, categories }}>
            <ToastContainer position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick={false}
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="colored"
            />
            {
                props.children
            }
        </MainContext.Provider>
    )
}

export default Context;
export { MainContext };
