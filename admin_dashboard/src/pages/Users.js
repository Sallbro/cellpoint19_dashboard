import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import '../components/list/list.css'
import Buffer from "./Buffer";
const Users = () => {
    const navigate = useNavigate();
    const [open, setOpen] = useState(true);
    const [user, setUser] = useState([]);

    const view_user = (_id) => {
        navigate("/users/single", {
            state: {
                _id
            }
        });
    }
    const add_user = () => {
        navigate("/users/new", {
            state: {
                say: "not!"
            }
        });
    }

    const Get_user_data = async () => {
        try {
            const res = await fetch("/users", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                },

            });
            const data = await res.json();
            if (data) {
                console.log("data is: ", data);
                setUser(data);
                setOpen(false);
            }
        }
        catch (e) {
            console.log(e);

        }
    }
    const Del_user_data = async (_id) => {
        try {
            const res = await fetch("/user/del", {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    _id
                })
            });
            const data = await res.json();
            if (data) {
                console.log("data is: ", data);
                Get_user_data();
            }
        }
        catch (e) {
            console.log(e);

        }
    }
    useEffect(() => {
        Get_user_data();
    }, []);

    return (
        <>
            <div>
                <div className="adduser">
                    <h1>UERS:</h1>
                    <button className="btn_adduser" onClick={add_user}>Add New</button>
                </div>
                <table id="customers">
                    <tr>
                        <th>users</th>
                        <th>email</th>
                        <th>phoneno</th>
                        <th>Action</th>
                    </tr>
                    {open ? <Buffer /> :
                        user?.map((elem) => {
                            return (
                                <>
                                    <tr key={elem._id}>
                                        <td>{elem.username}</td>
                                        <td>{elem.email}</td>
                                        <td>{elem.phoneno}</td>
                                        <td >
                                            <button className="btn_view" onClick={() => {
                                                view_user(elem._id);
                                            }}>view</button>
                                            <button className="btn_del" onClick={() => {
                                                Del_user_data(elem._id);
                                            }}>Delete</button>

                                        </td>
                                    </tr>
                                </>
                            )
                        })}


                </table>
            </div>
        </>
    )
}

export default Users;