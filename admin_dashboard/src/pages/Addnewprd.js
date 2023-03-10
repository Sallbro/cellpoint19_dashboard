import { useEffect, useState } from "react";
import {  useNavigate } from "react-router-dom";
import "../components/new/new.scss";
const Addnewprd = () => {
    const navigate = useNavigate();
    const [itemss, setItemss] = useState([]);
    const [input_itm, setInput_itm] = useState("");
    const [prd, setPrd] = useState({
        name: "", category: "", img: "", describtion: "", amount: "", item: "", discount: "", image_details: []
    });
    const { name, category, img, describtion, amount, item, discount, image_details } = prd

    const Handlechange = async (e) => {
        e.preventDefault();
        const Name = e.target.name;
        const Value = e.target.value;

        setPrd({ ...prd, [Name]: Value });
        console.log("Name: " + Name);
        console.log("value: " + Value);
    }

    const Additem = () => {
        // e.preventDefault();
        if (input_itm !== '') {
            setPrd({...prd,image_details:[...itemss,input_itm]});
            setItemss([...itemss, input_itm]);
            setInput_itm("");
        }
    }
    const Addchange = (e) => {
        e.preventDefault();
        setInput_itm(e.target.value);

    }
    const Delitem = (ind) => {
        const upd_items = itemss.filter((elem, idx) => {
            return idx !== ind;
        });
        setItemss(upd_items);
        setPrd({ ...prd, image_details: upd_items });
    }
    const Clearall = () => {
        setItemss([]);
    }

    useEffect(() => {
        console.log("input_itm ", input_itm);
    }, [input_itm]);

    useEffect(() => {
        // setPrd({ ...prd, image_details: itemss });
        console.log("items ", itemss);
        // console.log("prd ", prd);
    }, [itemss]);

    const Add_new_prd = async (e) => {
        e.preventDefault();
        if (name !== "" && category !== "" && img !== "" && describtion !== "" && amount !== "" && item !== "" && discount !== "") {
            try {
                const res = await fetch("/add_new_product", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        name, category, img, describtion, amount, item, discount, image_details
                    })
                });
                const data = await res.json();
                if (data) {
                    console.log("register succ data is: ", data);
                    alert("new prd added");
                    navigate("/products");
                }
            }
            catch (e) {
                console.log("error in edit user ", e);
                navigate("/admin");

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
                        <h1>Add New Product:</h1>
                    </div>
                    <div className="bottom">
                        <div className="Prd_left">
                            <img
                                src="https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"

                                alt=""
                            />
                        </div>
                        <div className="right">
                            <form>
                                <div className="formInput">
                                    <label htmlFor="file">
                                        Image URL:
                                        {/* <DriveFolderUploadOutlinedIcon className="icon" /> */}
                                    </label>
                                    <input
                                        type="text"
                                        id="file" placeholder="Enter url" name="img" value={img} onChange={(e) => {
                                            Handlechange(e);
                                        }}
                                    />
                                </div>

                                <div className="formInput" key="1">
                                    <label>Name</label>
                                    <input type="text" placeholder="sall" name="name" value={name} onChange={(e) => {
                                        Handlechange(e);
                                    }}
                                    />
                                </div>
                                <div className="formInput" key="2">
                                    <label>Category</label>
                                    <input type="text" placeholder="zxy@gmail.com" name="category" value={category} onChange={(e) => {
                                        Handlechange(e);
                                    }} />
                                </div>
                                <div className="formInput" key="3">
                                    <label>Description</label>
                                    <input type="text" placeholder="Description" name="describtion" value={describtion} onChange={(e) => {
                                        Handlechange(e);
                                    }} />
                                </div>
                                <div className="formInput" key="4">
                                    <label>Amount</label>
                                    <input type="Number" placeholder="Amount" name="amount" value={amount} onChange={(e) => {
                                        Handlechange(e);
                                    }} />
                                </div>
                                <div className="formInput" key="5">
                                    <label>Item</label>
                                    <input type="Number" placeholder="Item" name="item" value={item} onChange={(e) => {
                                        Handlechange(e);
                                    }} />
                                </div>
                                <div className="formInput" key="4">
                                    <label>Discount</label>
                                    <input type="Number" placeholder="Discount" name="discount" value={discount} onChange={(e) => {
                                        Handlechange(e);
                                    }} />
                                </div>

                                <button>Clear</button>
                                <button onClick={(e)=>{
                                    Add_new_prd(e);
                                }}>Send</button>
                            </form>
                        </div>
                    </div>
                    <div className="bottom">
                        <div className="right">
                            <div id="myDIV" class="header">
                                <h2 style={{ margin: "5px" }}>Image Detail</h2>
                                <input type="text" id="myInput" value={input_itm} name="input_itm" placeholder="Add image url..." onChange={(e) => {
                                    Addchange(e);
                                }} />
                                <button class="addBtn" style={{ cursor: "pointer" }} onClick={Additem}>Add</button>
                            </div>

                            <ul id="myUL">
                                {itemss.map((elem, index) => {
                                    return (
                                        <>
                                            <li key={index}>
                                                <h1 class="headitm">{elem}</h1>
                                                <button class="delitm" onClick={() => {
                                                    Delitem(index);
                                                }}>X</button>
                                            </li>

                                        </>
                                    )
                                })}
                            </ul>

                            <button className="btn_detailimg" onClick={Clearall}>Clear</button>
                            {/* <button className="btn_detailimg">Add All</button> */}
                        </div>
                        <div className="Prd_left">
                            <img
                                src="https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"

                                alt=""
                            />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Addnewprd;