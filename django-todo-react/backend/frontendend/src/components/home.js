import React from 'react';
import Signup from "./signup";
import { useNavigate } from "react-router-dom";
import axios from 'axios'
import axiosInstance from "../axiosApi";


const Home = (props) =>{
     const navigate = useNavigate()


const handleSuccessfulAuthentication = (data) =>{
        navigate("/Dashboard");
        props.handleLogin(data);


   }


const handleLogoutClick = () => {
        axios.get("http://52.194.229.247:8000/", { withCredentials: true })
            .then(response => {
                props.handleLogout()
                console.log("ll")
            }).catch(error => console.log("ログアウトエラー", error))
    }




  return(
  <div>
    <h1>Home</h1>
    <h2>ログイン状態:{props.loggedInStatus}</h2>

    <button onClick={handleLogoutClick}>ログアウト</button>

  </div>
  )
}

export default Home;