import '../styles/globals.css';
//import '/src/styles/style.css';
//import '/src/styles/App.css';
//import '/src/styles/index.css';
import 'bootstrap/dist/css/bootstrap.css';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useRoutes,
} from "react-router-dom";
import Navbar from "../components/navbar";
//import { BrowserRouter} from 'react-router-dom';
import React , {useContext, useState, createContext, useEffect} from 'react';
//import React , {useState, createContext} from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router'
import axios from 'axios';



export const LoginStatusContext = createContext();


export function MyApp ({ Component, pageProps }) {
 const [loggedInStatus, setLoggedInStatus]=useState("未ログイン");
 const [viewCompleted, setViewCompleted] = useState(false);
 const [todoList, setTodoList] = useState([]);
 const [modal, setModal] = useState(false);
 const [how, setHow] = useState("");
 const [what, setWhat] = useState("");
 const [activeItem, setActiveItem] = useState({title: "", description: "", completed: false });
 const [isModalOpen, setIsModalOpen] = useState(false);
 const [description,setDescription] = useState("");
 // const alert = useAlert()//
 const [input, setInput]=useState("");
 const [textarea, setTextarea]=useState("");
 const[email, setEmail] = useState("")
 const[password, setPassword] = useState("")
 const[username, setUsername] = useState("")
 //const [loggedInStatus, setLoggedInStatus]=useState("未ログイン");




 const handleLogout = () => {
    setLoggedInStatus("未ログイン")
    //setUser({})
  }







  return (
    <div id="root">
     <Navbar />
     <div className="golinks">
          <h1 className="message">You are always welcome!</h1>

      <LoginStatusContext.Provider
       value={{loggedInStatus,setLoggedInStatus,email,setEmail,username,setUsername,password,setPassword,handleLogout}}>
          <Component {...pageProps} />
      </LoginStatusContext.Provider>
     </div>

    </div>
  )
}

export default MyApp


//