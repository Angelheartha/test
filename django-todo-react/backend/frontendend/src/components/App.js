import { Component} from "react";
import React, {useEffect, useReducer } from 'react'
import { BrowserRouter, Router, Route, Routes, Link} from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Login from "./login";
import Signup from "./signup";
import Home from "./home";
import Dashboard from "./Dashboard";
import {useState} from "react";
import axiosInstance from "../axiosApi";
import Modal from "./Modal";
import axios from "axios";
import { useAlert } from 'react-alert'




const App = () => {
  const [viewCompleted, setViewCompleted] = useState(false);
  const [todoList, setTodoList] = useState([]);
  const [modal, setModal] = useState(false);
  const [how, setHow] = useState("");
  const [what, setWhat] = useState("");
  const [activeItem, setActiveItem] = useState({title: "", description: "", completed: false });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [description,setDescription] = useState("");
  const alert = useAlert()
  const [input, setInput]=useState("");
  const [textarea, setTextarea]=useState("");
  const [loggedInStatus, setLoggedInStatus]=useState("未ログイン");
  const[email, setEmail] = useState("")
  const[password, setPassword] = useState("")
  const[username, setUsername] = useState("")
  //const [user, setUser]=useState({});//
  const navigate = useNavigate()




//console.log(see)



  useEffect(()=>{
  //refreshList();
  //console.log(local())
  checkLoginStatus();

  },[])



  //  useEffect(() => {


   //checkLoginStatus()
  //})


//var data[setEmail,setPassword,setUsername]
//cat = localStorage.setItem('key', data);
//var cat = localStorage.getItem("key");
//console.log(cat);


const local = () => {


var array = []

var crazy =  []

var obj = {
  //username:username,
  //email:email,
  //password:password,
  'username': username,
  'email': email,
  'password':password
};

array.push(obj);
var setjson = JSON.stringify(obj);
localStorage.setItem('キー', setjson);


//var getjson = localStorage.getItem('キー');
//var objj = JSON.parse(getjson);

//var pp = crazy.push(objj)
//console.log(pp)
}




const checkLoginStatus = () => {
   var getjson = localStorage.getItem('キー');
   var objj = JSON.parse(getjson);
   console.log(objj)
        if(objj === null){
         console.log("yeath");
        }else{
         axiosInstance.post("/token/refresh/" ,{
                           username:objj.username,
                              email:objj.email,
                           password:objj.password,
            },
            { withCredentials: true }
   ).then(response =>{
        if (response.data.refresh　&& loggedInStatus === "未ログイン") {
          console.log("looo");
          //console.log("yeath");
          setLoggedInStatus("ログインなう")
          //setUser(response.data.user)
        }else if (!response.data.refresh　&& loggedInStatus === "ログインなう") {
          setLoggedInStatus("未ログイン")
         // console.log("yeath");
          console.log("loloo");
          //setUser({})
        }
      })
      .catch(error => {
        console.log("ログインエラー", error)
    })

        }
}



const handleLogout = () => {
    setLoggedInStatus("未ログイン")
    //setUser({})
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
      .get("http://52.194.229.247:8000/api/todos/")
      .then((res) => setTodoList(res.data))
      .catch((err) => console.log(err));
  };



const Act = (props) => {
 const alert = useAlert()

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
        <button type="button" onClick={aalert}>
        Submit
        </button>

        </form>

      </div>
    </div>
     </div>

  )
}

  const aalert = () => {
  alert.success('your message is already sent!! i reply in 5 days bussine daysss');
  setInput([]);
  setTextarea([]);
  };



  const toggle = () => {
    setModal(!modal);
  };



  const handleSubmit = (item, props) => {
    setModal(!modal);

        if (item.id) {
       axios
         .put(`http://52.194.229.247:8000/api/todos/${item.id}/`, item)
         .then(() => refreshList());
       return;
     }
     axios
       .post("http://52.194.229.247:8000/api/todos/", item)
       .then(() => refreshList());

     alert.success('Well done!!!');

  };

   const handleDelete = (item,props) => {
    axios
      .delete(`http://52.194.229.247:8000/api/todos/${item.id}/`)
      .then((res) => refreshList());
    alert.success('Bye-Bye');
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
                    <Link className={"nav-linkk"} to={"/"}>Home</Link>
                    <Link className={"nav-linkk"} to={"/login/"}>Login</Link>
                    <Link className={"nav-linkk"} to={"/signup/"}>Signup</Link>
                    <Link className={"nav-linkk"} to={"/Dashboard/"}>Dashboard</Link>
                    <button className={"nav-bot"} onClick={handleLogout}>Logout</button>
                 </nav>
                 <div className="golinks">
                    <h1 className="message">You are always welcome!</h1>

                     <Routes>
                        <Route exact path={"/login/"}
                        element={
                        //<Login/>
                        <Login handleSuccessfulAuthentication={handleSuccessfulAuthentication} handleLogin={handleLogin} //err={err} emm={emm} pss={pss}
                        username={username} setUsername={setUsername} password={password} setPassword={setPassword} email={email} setEmail={setEmail} local={local}/>
                        }
                        />

                        <Route exact path={"/signup/"}
                        element={
                        <Signup handleSuccessfulAuthentication={handleSuccessfulAuthentication} handleLogin={handleLogin}
                        username={username} setUsername={setUsername} password={password} setPassword={setPassword} email={email} setEmail={setEmail} local={local}/>
                        }
                        />




                        <Route
                          exact path={"/"}
                          element={
                          <Home handleLogin={handleLogin} handleLogout={handleLogout} loggedInStatus={loggedInStatus} />
                          }
                          />



                        <Route
                          exact path={"/Dashboard/"}
                          element={
                          <Dashboard  loggedInStatus={loggedInStatus} />
                          }
                          />



                     </Routes>

                 </div>


            </div>










        );
}

export default App;