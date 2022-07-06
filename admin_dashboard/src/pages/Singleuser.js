import "../components/single/single.scss";
import { useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Buffer from "./Buffer";
const Singleuser = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [data, setData] = useState('');
    const [open, setOpen] = useState(true);
    console.log("data ", data);

    const Get_user_data = async (_id) => {
        try {
            const res = await fetch("/particular_users", {
                method: "POST",
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
                setData(data);
                setOpen(false);
            }
        }
        catch (e) {
            console.log(e);

        }
    }
    const edit_user = () => {
        navigate("/users/edit", {
            state: {
                data
            }
        });
    }

    useEffect(() => {
        if (location.state !== null) {
            Get_user_data(location.state._id);
        }
    }, [location]);
    return (
        <>

            <div className="single">
                {/* <Sidebar /> */}
                <div className="singleContainer">
                    {/* <Navbar /> */}
                    <div className="top">
                        <div className="left">
                            <div className="editButton" onClick={edit_user}>Edit</div>
                            <h1 className="title">Information</h1>
                            <div className="item">
                                <img
                                    src="https://w7.pngwing.com/pngs/419/473/png-transparent-computer-icons-user-profile-login-user-heroes-sphere-black-thumbnail.png"
                                    alt=""
                                    className="itemImg"
                                />
                                <div className="details">
                                    <h1 className="itemTitle">{data?.username}</h1>
                                    <div className="detailItem">
                                        <span className="itemKey">Email:</span>
                                        <span className="itemValue">{data?.email}</span>
                                    </div>
                                    <div className="detailItem">
                                        <span className="itemKey">Phone:</span>
                                        <span className="itemValue">{data?.phoneno}</span>
                                    </div>
                                    <div className="detailItem">
                                        <span className="itemKey">Address:</span>
                                        <span className="itemValue">
                                            Elton St. 234 Garden Yd. NewYork
                                        </span>
                                    </div>
                                    <div className="detailItem">
                                        <span className="itemKey">Country:</span>
                                        <span className="itemValue">INDIA</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="right">
                            {/* <Chart aspect={3 / 1} title="User Spending ( Last 6 Months)" /> */}
                        </div>
                    </div>
                    <div className="bottom">
                        <h1 className="title">User Message:</h1>
                    </div>
                    <div>
                        {/* <div className="adduser">
                            <h1>MESSAGES:</h1>
                        </div> */}
                        <table id="customers">
                            <tr>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Message</th>
                            </tr>
                            
                            {open ? <Buffer /> :
                                data?.messages?.map((elem) => {
                                    return (
                                        <>
                                            <tr>
                                                <td>{elem.username}</td>
                                                <td>{elem.email}</td>
                                                <td>{elem.message}</td>
                                            </tr>
                                        </>
                                    )
                                })
                            }

                        </table>
                    </div>
                </div>
            </div>
        </>
    )
}
export default Singleuser;