import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom"
import './App.css'
import MainDash from './components/MainDash/MainDash';

function App() {
  const [login, setLogin] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const check_admin_login = async () => {
      try {
        const res = await fetch("/admintest", {
          method: "GET",
          headers: {
            "Content-Type": "application/json"
          },

        });
        console.log("work1");
        // const data = await res.json();
        // console.log("data is: ", data);
        if (res.status === 200) {
          // console.log("data is: ", data);
          setLogin(true);
        } else {
          console.log("work3");
          navigate("/admin");
        }
      }
      catch (e) {
        console.log("adts ",e);
        navigate("/admin");

      }
    }
    check_admin_login();
  }, []);
  return (
    <>
      {login && <MainDash />}
    </>
  );
}

export default App;
