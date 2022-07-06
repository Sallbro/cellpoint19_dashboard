import "../components/new/new.scss";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Addnewuser = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState({
        username: "", phoneno: "", email: "", password: ""
    });
    const { username, phoneno, email, password } = user;

    const Handlechange = async (e) => {
        e.preventDefault();
        const Name = e.target.name;
        const Value = e.target.value;

        setUser({ ...user, [Name]: Value });
        console.log("Name: " + Name);
        console.log("value: " + Value);
    }

    const Add_new_user = async (e) => {
        e.preventDefault();
        if (username !== "" && phoneno !== "" && email !== "" && password !== "") {
            try {
                const res = await fetch("/registration", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        username, phoneno, email, password
                    })
                });
                const data = await res.json();
                if (data) {
                    console.log("register succ data is: ", data);
                    alert("user register successfull...")
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
                                src="https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"

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
                                <button>Clear</button>
                                <button onClick={(e) => {
                                    Add_new_user(e);
                                }}>Send</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Addnewuser;