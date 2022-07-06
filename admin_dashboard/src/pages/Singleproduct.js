import "../components/single/single.scss";
import { useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
const Singleproduct = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [data, setData] = useState('');
    console.log("data ", data);
    const edit_prd = () => {
        console.log("data ", data);
        navigate("/products/edit", {
            state: {
                data
            }
        });
    }
    const Get_prd_data = async (_id) => {
        try {
            const res = await fetch("/perticular_product", {
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
            }
        }
        catch (e) {
            console.log("Get_prd_data error ",e);

        }
    }

    useEffect(() => {
        if (location.state !== null) {
            Get_prd_data(location.state._id);
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
                            <div className="editButton" onClick={edit_prd}>Edit</div>
                            <h1 className="title">Information</h1>
                            <div className="item">
                                <img
                                    src={data?.img}
                                    alt=""
                                    className="itemImg"
                                />
                                <div className="details">
                                    <h1 className="itemTitle">{data?.name}</h1>
                                    <div className="detailItem">
                                        <span className="itemKey">Category:</span>
                                        <span className="itemValue">{data?.category}</span>
                                    </div>
                                    <div className="detailItem">
                                        <span className="itemKey">Amount:</span>
                                        <span className="itemValue">{data?.amount}</span>
                                    </div>
                                    <div className="detailItem">
                                        <span className="itemKey">Item:</span>
                                        <span className="itemValue">{data?.item}</span>
                                    </div>
                                    <div className="detailItem">
                                        <span className="itemKey">Discount:</span>
                                        <span className="itemValue">{data?.discount}%</span>
                                    </div>
                                    <div className="detailItem">
                                        <span className="itemKey">Describtion:</span>
                                        <span className="itemValue">{data?.describtion}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="right">
                            {/* <Chart aspect={3 / 1} title="User Spending ( Last 6 Months)" /> */}
                        </div>
                    </div>
                    <div className="bottom">
                        <h1 className="title">Last Transactions</h1>
                        {/* <List /> */}
                    </div>
                </div>
            </div>
        </>
    )
}
export default Singleproduct;