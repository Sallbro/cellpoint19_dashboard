import "../components/single/single.scss";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
const Edituser = () => {
    const navigate = useNavigate();
    const location = useLocation();
    console.log("location ", location);
    const [user, setUser] = useState({
        username: "", phoneno: "", email: "", password: ""
    });
    const [user_id, setUser_id] = useState('');
    const { username, phoneno, email, password } = user;
    const [data, setData] = useState();
    console.log("data ", data);

    useEffect(() => {
        if (location.state != null) {
            setData(location.state.data);
        }
    }, [location]);

    useEffect(() => {
        if (data) {
            setUser({ username: data.username, phoneno: data.phoneno, email: data.email });
            setUser_id(data._id);
        }
    }, [data]);

    const Clear_detail = async (e) => {
        e.preventDefault();
        setUser({ username: "", phoneno: "", email: "", password: "" });
    }

    const Handlechange = async (e) => {
        e.preventDefault();
        const Name = e.target.name;
        const Value = e.target.value;

        setUser({ ...user, [Name]: Value });
        console.log("Name: " + Name);
        console.log("value: " + Value);
    }

    const Edit_user_data = async (e) => {
        e.preventDefault();
        if (username !== "" && phoneno !== "" && email !== "" && password !== "") {
            try {
                const res = await fetch("/user", {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        _id: user_id, username, phoneno, email, password
                    })
                });
                const data = await res.json();
                if (data) {
                    console.log("register succ data is: ", data);
                    navigate("/users");
                }
            }
            catch (e) {
                console.log("error in edit user ", e);

            }
        }
    }

    return (
        <>
            <div className="new">
                {/* <Sidebar /> */}
                <div className="newContainer">
                    {/* <Navbar /> */}
                    <div className="top">
                        <h1>Add New User:</h1>
                    </div>
                    <div className="bottom">
                        <div className="left">
                            <img
                                src="https://w7.pngwing.com/pngs/419/473/png-transparent-computer-icons-user-profile-login-user-heroes-sphere-black-thumbnail.png"

                                alt=""
                            />
                        </div>
                        <div className="right">
                            <form>

                                <div className="formInput" key="1">
                                    <label>UserName</label>
                                    <input type="text" placeholder="username" name="username" value={username} onChange={(e) => {
                                        Handlechange(e);
                                    }} />
                                </div>
                                <div className="formInput" key="2">
                                    <label>Email</label>
                                    <input type="text" placeholder="zxy@gmail.com" name="email" value={email} onChange={(e) => {
                                        Handlechange(e);
                                    }} />
                                </div>
                                <div className="formInput" key="3">
                                    <label>Password</label>
                                    <input type="text" placeholder="Password" name="password" value={password} onChange={(e) => {
                                        Handlechange(e);
                                    }} />
                                </div>
                                <div className="formInput" key="4">
                                    <label>PhoneNo</label>
                                    <input type="Number" placeholder="0912345678" name="phoneno" value={phoneno} onChange={(e) => {
                                        Handlechange(e);
                                    }} />
                                </div>

                                {/* {inputs.map((input) => (
                                    <div className="formInput" key={input.id}>
                                        <label>{input.label}</label>
                                        <input type={input.type} placeholder={input.placeholder} />
                                    </div>
                                ))} */}
                                <button onClick={(e) => {
                                    Clear_detail(e);
                                }}>Clear</button>
                                <button onClick={(e) => {
                                    Edit_user_data(e);
                                }}>Send</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
export default Edituser;