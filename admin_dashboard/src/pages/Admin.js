import React from 'react'
// import { NavLink } from 'react-router-dom'
import { useState } from 'react';
import { useNavigate } from 'react-router';

const Admin = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const Getdatas = async (e) => {
        e.preventDefault();

        if (!username || !password) {
            alert("Please Fill All The Details");
        }
        else {
            try {
                console.log("log");
                const res = await fetch("/admin", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        username, password
                    })
                });
                console.log("log2");
                if (res.status === 200) {
                    alert("admin login succ");
                    navigate("/");
                }
                else {
                    res.send("something went wrong ");
                }

            }
            catch {
                // res.send("gadbad hai bhai");
                console.log("dimag kharab ");
                alert("try again something went wrong...");
            }
        }
    }
    return (
        <>
            <form method="POST">
                <div className="field">
                    <input type="text" value={username} name="username"
                        onChange={(e) => {
                            setUsername(e.target.value)
                        }}
                        placeholder="username" />
                    <label>Email Address</label>
                </div>
                <div className="field">
                    <input type="password" value={password} name="password"
                        onChange={(e) =>
                            setPassword(e.target.value)
                        }
                        placeholder="password" />
                    <label>Password</label>
                </div>
                <button onClick={Getdatas}>submit</button>
            </form>
        </>
    )
}

export default Admin;
