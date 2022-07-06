import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"
import '../components/list/list.css'
import Buffer from "./Buffer";

const Products = () => {
    const [prd, setPrd] = useState([]);
    const [open, setOpen] = useState(true);
    const navigate = useNavigate();
    const view_prd = (_id) => {
        navigate("/products/single", {
            state: {
                _id
            }
        });
    }

    const add_prd = () => {
        navigate("/products/new", {
            state: {
                say: "not!"
            }
        });
    }
    const Get_prd_data = async () => {
        try {
            const res = await fetch("/products", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                },

            });
            const data = await res.json();
            if (data) {
                console.log("data is: ", data);
                setPrd(data);
                setOpen(false);
            }
        }
        catch (e) {
            console.log(e);

        }
    }
    const Del_prd_data = async (_id) => {
        try {
            const res = await fetch("/product/del", {
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
                Get_prd_data();
            }
        }
        catch (e) {
            console.log(e);

        }
    }
    useEffect(() => {
        Get_prd_data();
    }, []);
    return (
        <>
            <div>
                <div className="adduser">
                    <h1>PRODUCTS:</h1>
                    <button className="btn_adduser" onClick={add_prd}>Add New</button>
                </div>
                <table id="customers">
                    <tr>
                        <th>Name</th>
                        <th>Item</th>
                        <th>Amount</th>
                        <th>Discount</th>
                        <th>More Details...</th>
                    </tr>
                    {open ? <Buffer /> :
                        prd?.map((elem) => {
                            return (
                                <>
                                        <tr key={elem._id}>
                                            <td>{elem.name}</td>
                                            <td>{elem.item}</td>
                                            <td>{elem.amount}</td>
                                            <td>{elem.discount}%</td>
                                            <td>
                                                <button className="btn_view" onClick={() => {
                                                    view_prd(elem._id);
                                                }}>view</button>
                                                <button className="btn_del" onClick={() => {
                                                    Del_prd_data(elem._id);
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

export default Products;