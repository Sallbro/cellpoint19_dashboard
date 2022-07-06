import { useEffect, useState } from "react";
import '../components/list/list.css'
import Buffer from "./Buffer";

const Orders = () => {
  const [order, setOder] = useState([]);
  const [open, setOpen] = useState(true);

  const Get_order_data = async () => {
    try {
      const res = await fetch("/orders", {
        method: "GET",
        headers: {
          "Content-Type": "application/json"
        },

      });
      const data = await res.json();
      if (data) {
        console.log("data is: ", data);
        setOder(data);
        setOpen(false);
      }
    }
    catch (e) {
      console.log(e);
      // history.push("/singin");

    }
  }
  useEffect(() => {
    Get_order_data();
  }, []);

  return (
    <>
      <div>
        <div className="adduser">
          <h1>ODERS:</h1>
          <button className="btn_adduser">Add New</button>
        </div>
        <table id="customers">
          <tr>
            <th>Name</th>
            <th>Item</th>
            <th>Amount</th>

            <th>More Details...</th>
          </tr>
          {open ? <Buffer /> :
            order.map((elem) => {
              return (
                <>
                  {elem?.addtocarts?.map((dt) => {
                    return (
                      <>
                        <tr key={dt._id}>
                          <td>{dt.name}</td>
                          <td>{dt.item}</td>
                          <td>{dt.amount}</td>

                          <td >
                            <button className="btn_view" >Accept</button>
                            <button className="btn_del">Reject</button>
                          </td>
                        </tr>
                      </>
                    )
                  })}
                </>
              )
            })}

        </table>
      </div>
    </>
  )
}

export default Orders;