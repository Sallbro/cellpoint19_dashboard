import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import '../components/list/list.css'
import Buffer from "./Buffer";
const Notifications = () => {
    const [mess, setMess] = useState([]);
    const [open, setOpen] = useState(true);
    const navigate = useNavigate();
    const view_notification = (_id) => {
        navigate("/notifications/single", {
            state: {
                _id
            }
        });
    }
    const Get_mess_data = async () => {
        try {
            const res = await fetch("/message", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                },

            });
            const data = await res.json();
            if (data) {
                console.log("data is: ", data);
                setMess(data);
                setOpen(false);
            }
        }
        catch (e) {
            console.log(e);

        }
    }
    useEffect(() => {
        Get_mess_data();
    }, []);
    return (
        <>
            <div>
                <div className="adduser">
                    <h1>MESSAGES:</h1>
                    {/* <button className="btn_adduser">Add New</button> */}
                </div>
                <table id="customers">
                    <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Message</th>

                        <th>More Details...</th>
                    </tr>
                    {open ? <Buffer /> :
                        mess.map((elem) => {
                            return (
                                <>
                                    {elem?.messages?.map((dt) => {
                                        return (
                                            <>
                                                <tr>
                                                    <td>{dt.username}</td>
                                                    <td>{dt.email}</td>
                                                    <td>{dt.message}</td>

                                                    <td >
                                                        <button className="btn_view" onClick={() => {
                                                            view_notification(elem._id);
                                                        }}>view</button>

                                                    </td>
                                                </tr>
                                            </>
                                        )
                                    })}
                                </>
                            )
                        })
                    }
                </table>
            </div>
        </>
    )
}

export default Notifications;