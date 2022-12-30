import { Component} from "react";
import React, {useEffect, useReducer, useContext, createContext } from 'react'
import { BrowserRouter, Router, Route, Routes} from "react-router-dom";
import Link from 'next/link'
import { useNavigate } from "react-router-dom";
import Login from "../pages/login";
import Signup from "../pages/signup";
import Home from "../pages/index";
import Dashboard from "../pages/Dashboard";
import {useState} from "react";
import axios from 'axios';
//import axiosInstance from "/utils/axiosApi";
import Modal from "../components/Modal";
import { useAlert } from 'react-alert'
import {LoginStatusContext} from '../pages/_app';
//import {username,setUsername } from '../pages/_app';
//import {password, setPassword }  from '../pages/_app';
//import { local }  from '../pages/_app';
//import {username,setUsername } from '../pages/_app';
//import {password, setPassword } from '../pages/_app';
//import {email, setEmail }  from '../pages/_app';
//import {loggedInStatus, setLoggedInStatus } from '../pages/_app';


const Navbar = () => {
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
  const [loggedInStatus, setLoggedInStatus]=useState("未ログイン");
//  const {handleLogout} = useContext(LoginStatusContext);



  useEffect(()=>{

  //console.log(local())


  },[])



const handleLogout = () => {
   setLoggedInStatus("未ログイン")
  //  setUser({})
  }




  const handleLogin = () =>{
     setLoggedInStatus("ログインなう")
     //setUser(data.user)//

  }


 // const err = () =>{
 //   setUsername("")
 //   }


 // const emm = () =>{
 //  setEmail("")
 // }

 // const pss =() =>{
 //  setPassword("")
 // }




  const handleSuccessfulAuthentication = () =>{
        navigate("/Dashboard");
        //handleLogin();

   }



  const componentDidMount = (props) => {
    refreshList();
  };

  const refreshList = (props) => {
    axios
      .get("http://127.0.0.1:8000/api/todos/")
      .then((res) => setTodoList(res.data))
      .catch((err) => console.log(err));
  };



const Act = (props) => {


const alertt = () =>{
window.setTimeout(function(){
        alert('Bye-Bye');
         },5000)

}



  return (
     <div id="overlay">
         <div id="modal" className="modall">
      <div>
        <form onSubmit={()=>{this.handleSubmit()}} >
          <p>E-mail</p>
          <input />
          <p>Message</p>
          <textarea />
          <p>I am available at this moment!</p>
        <button onClick={props.onClick}>Close</button>
        <button type="button" onClick={
        alertt()
        }>
        Submit
        </button>

        </form>

      </div>
    </div>
     </div>

  )
}

  var timerId;

  const showBox = () => {
  document.getElementById("temporaryBoX").style.display="block";
  timerId = setTimeout(closeBox, 5000);
  document.getElementById("btnShowBox").disabled=true;
  };



  const toggle = () => {
    setModal(!modal);
  };



  const handleSubmit = (item, props) => {
    setModal(!modal);

        if (item.id) {
       axios
         .put(`http://127.0.0.1:8000/api/todos/${item.id}/`, item)
         .then(() => refreshList());
       return;
     }
     axios
       .post("http://127.0.0.1:8000/api/todos/", item)
       .then(() => refreshList());

     alert('Well done!!!');

  };

   const handleDelete = (item,props) => {
    axios
      .delete(`http://127.0.0.1:8000/api/todos/${item.id}/`)
      .then((res) => refreshList());
    alert('Bye-Bye');
  };


  const createItem = (props) => {
    const item = { title: "", description: "", completed: false };
    setActiveItem(item);
    setModal(!modal);
  };

  const editItem = (item,props) => {
    setActiveItem(item);
    setModal(!modal);
  };


 const displayCompleted = (status) => {
    if (status) {
      return setViewCompleted(true);
    }else{
      return setViewCompleted(false);

  };
  };



  const renderTabList = (props) => {
    return (

      <div className="nav nav-tabs">
        <span
          onClick={() => displayCompleted(true)}
          className={viewCompleted ? "btn btn-danger active" : "btn btn-light"}
        >
          Complete
        </span>
        <span
          onClick={() => displayCompleted(false) }
          className={viewCompleted ? "btn btn-light" : "btn btn-danger active"}
        >
          Incomplete
        </span>
      </div>
    );
  };


  const renderItems = (props) => {

  const newItems = todoList.filter(
       (item) => item.completed === viewCompleted
     );




     return newItems.map((item, props) => (


       <li className="list-group-item d-flex justify-content-between align-items-center"
         key={item.id}

       >
         <span
           className={`todo-title mr-2 ${viewCompleted ? "completed-todo" : ""
             }`}
           title={item.description}
         >
           {item.title}
         </span>
         <span>
           <button
             className="btn btn-secondary mr-2"
             onClick={() => editItem(item)}
           >
             Edit
           </button>
           <button
             className="btn btn-danger"
             onClick={() => handleDelete(item)}
           >
             Delete
           </button>
         </span>
       </li>
     ));
  };


  const whattodo = () => {
      setDescription("You can write any recommendations for language studies on the Description. anything is ok");
  }


  const howtodo = () => {
    setDescription("You should write the day and to whom you write on the Title.⇒(ex).title:7/7 for Hamuster");
  }


  const closeModal = () => {
    setIsModalOpen(false)
  }


  const openModal = () => {
    setIsModalOpen(true)
  }



  const todolist = () => {
     return(
     <main className="container">
      <div className="nav-container">

<div className="button3">
        <button
          className="navi white How btn btn-primary"
          onClick={howtodo}
        >
          How to use
        </button>

        <button
          className="navi What btn btn-primary"
          onClick={whattodo}
        >
          What to write
        </button>


        <button
          className="navi contact btn btn-primary"
          onClick={() => { openModal() }}
        >
          Contact
        </button>
</div>

      {isModalOpen && <Act onClick={() => { closeModal() }} />}
      <p className="howtitle">{description}</p>
      <h1 className="text-uppercase text-center my-4">Memo</h1>
      <div className="row">
        <div className="col-md-6 col-sm-10 mx-auto p-0">
          <div className="card p-3">
            <div className="mb-4">
              <button
                className="btn btn-primary"
                onClick={createItem}
              >
                Add
              </button>
            </div>
            {renderTabList()}
            <ul className="list-group list-group-flush border-top-0">
              {renderItems()}
            </ul>
          </div>
        </div>
      </div>
      </div>
      {modal && (
        <Modal
          activeItem={activeItem}
          toggle={toggle}
          onSave={handleSubmit}
        />
      )}
    </main>


     )
  }










    //const handleLogout = async () => {
    //    try {
    //        const response = await axiosInstance.post('/blacklist/', {
    //            "refresh_token": localStorage.getItem("refresh_token")
    //        });
    //        localStorage.removeItem('access_token');
    //        localStorage.removeItem('refresh_token');
    //        axiosInstance.defaults.headers['Authorization'] = null;
    //        return response;
    //    }
    //    catch (e) {
    //        console.log(e);
    //    }
    //};


        return (


            <div className="site">

                 <nav className="bottonss">
                    <Link legacyBehavior href= "/" className="nav-linkk homehome" >
                     <a className="nav-linkk">Home</a>
                    </Link>


                    <Link legacyBehavior href= "/login/" className="nav-linkk" >
                     <a className="nav-linkk">Login</a>
                    </Link>


                    <Link legacyBehavior href="/signup/" className="nav-linkk" >
                      <a className="nav-linkk">Signup</a>
                    </Link>


                    <Link legacyBehavior href="/Dashboard/" className="nav-linkk d-none" >
                       <a className="nav-linkk d-none">Dashboard</a>
                    </Link>

                 </nav>

            </div>


        );
}

export default Navbar;