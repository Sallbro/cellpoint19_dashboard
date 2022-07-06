import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import App from '../App'
import Orders from './Orders';
import Products from './Products';
import Users from './Users';
import Notifications from './Notifications';
import Mainlayout from '../Layouts/Mainlayout';
import Productslayout from '../Layouts/Productslayout';
import Userslayout from '../Layouts/Userslayout';
import Notificationlayout from '../Layouts/Notificationlayout';
import Addnewprd from './Addnewprd';
import Addnewuser from './Addnewuser';
import Singleproduct from './Singleproduct';
import Singleuser from './Singleuser';
import Oderslayout from '../Layouts/Oderslayout';
import Singleorder from './Singleorder';
import Editproduct from './Editproduct';
import Edituser from './Edituser';
const Routs = () => {

    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Mainlayout />}>
                        <Route index element={<App />} ></Route>

                        <Route path="orders" element={<Oderslayout />} >
                            <Route index element={<Orders />} ></Route>
                            <Route path="single" element={<Singleorder />}></Route>
                        </Route>

                        <Route path="products" element={<Productslayout />} >
                            <Route index element={<Products />}></Route>
                            <Route path="new" element={<Addnewprd />}></Route>
                            <Route path="single" element={<Singleproduct />}></Route>
                            <Route path="edit" element={<Editproduct />}></Route>

                        </Route>

                        <Route path="users" element={<Userslayout />} >
                            <Route index element={< Users />}></Route>
                            <Route path="new" element={<Addnewuser />}></Route>
                            <Route path="single" element={<Singleuser />}></Route>
                            <Route path="edit" element={<Edituser />}></Route>

                        </Route>

                        <Route path="notifications" element={<Notificationlayout />} >
                            <Route index element={<Notifications />} ></Route>
                            <Route path="single" element={<Singleuser />}></Route>
                        </Route>

                    </Route>
                </Routes>
            </BrowserRouter>
        </>
    )
}

export default Routs;