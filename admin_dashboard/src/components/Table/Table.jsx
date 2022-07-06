import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import "./Table.css";
import { useNavigate } from "react-router-dom";


export default function BasicTable({ data }) {
  const navigate=useNavigate();
  const view_user = (_id) => {
    navigate("/users/single", {
      state: {
        _id
      }
    });
  }
  const view_prd = (_id) => {
    navigate("/products/single", {
        state: {
            _id
        }
    });
}
  return (
    <div className="Table">
      <h3>Recent Orders</h3>
      <TableContainer
        component={Paper}
        style={{ boxShadow: "0px 13px 20px 0px #80808029", marginBottom: "10px", width: "99%" }}
      >
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="left">Order ID</TableCell>
              <TableCell align="left">Product</TableCell>

              <TableCell align="left">Item</TableCell>
              <TableCell align="left">Amount</TableCell>
              <TableCell align="left">User</TableCell>
              <TableCell align="left">Product</TableCell>

            </TableRow>
          </TableHead>
          <TableBody style={{ color: "white" }}>

            {data.map((elem) => {
              return (
                <>
                  {elem?.addtocarts?.map((row) => {
                    return (
                      <>
                        <TableRow
                          key={row.name}
                          sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                        >
                          <TableCell component="th" scope="row">
                            {row._id}
                          </TableCell>
                          <TableCell align="left">{row.name}</TableCell>
                          <TableCell align="left">{row.item}</TableCell>
                          <TableCell align="left">{row.amount}</TableCell>
                          <TableCell align="left" className="Details" style={{ cursor: "pointer" }} onClick={()=>{
                            view_user(elem._id);
                          }}>Details</TableCell>
                          <TableCell align="left" className="Details" style={{ cursor: "pointer" }} onClick={()=>{
                            view_prd(row._id);
                          }}>Details</TableCell>
                        </TableRow>
                      </>
                    )
                  })}
                </>
              )
            })}

          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
