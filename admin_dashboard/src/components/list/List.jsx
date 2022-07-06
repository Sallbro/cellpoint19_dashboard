import { useNavigate } from "react-router-dom"
import "./list.css"

const List = ({ prd }) => {
  console.log("list prd ", prd);
  const navigate = useNavigate();
  const view_prd = () => {
    navigate("/products/single", {
      state: {
        say: "not!"
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
          
          {prd?.map((elem) => {
            return (
              <>
                <tr>
                  <td>{elem.name}</td>
                  <td>{elem.item}</td>
                  <td>{elem.amount}</td>
                  <td>{elem.discount}%</td>
                  <td>
                    <button className="btn_view" onClick={() => {
                      view_prd();
                    }}>view</button>
                    <button className="btn_del">Delete</button>
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

export default List