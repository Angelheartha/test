import { useNavigate } from "react-router-dom";
import axios from 'axios';
import React , {useContext, useState, createContext, useEffect} from 'react';
import App from "../components/navbar";
import Link from 'next/link';
import { useRouter } from 'next/router'
import {LoginStatusContext} from '../pages/_app';
//import {local} from "../components/navbar";
import {username,setUsername } from '../pages/_app';
import {password, setPassword } from '../pages/_app';
import {email, setEmail }  from '../pages/_app';
//import local from  "../components/navbar";


const Signup = (props) => {


    const {username,setUsername } = useContext(LoginStatusContext);
    const {password, setPassword } = useContext(LoginStatusContext);
    const {email, setEmail } = useContext(LoginStatusContext);
     const {loggedInStatus, setLoggedInStatus } = useContext(LoginStatusContext);
   //  const {local } = useContext(LoginStatusContext);
     const router = useRouter();
     //const local = local();

const handleSuccessfulAuthentication = () =>{
        router.replace("/Dashboard");

   }

const local = () => {


var array = []

var crazy =  []

var obj = {
  'username': username,
  'email': email,
  'password':password
};


array.push(obj);
var setjson = JSON.stringify(obj);
localStorage.setItem('キー', setjson);


}








     const handleLogin = () =>{
     setLoggedInStatus("ログインなう");
  }



   const handleSubmit = (event) => {
         console.log("a")
         axios.post('http://127.0.0.1:8000/cores/user/create/',
             {
                            username: username,
                            email: email,
                            password:password
            },
            {withCredentials:true}
            ).then(response=>{
              handleLogin();
               if(response.statusText === 'Created'){
               handleSuccessfulAuthentication(response);
               local()
               console.log(response)
               }
            }).catch (error =>{
              console.log("registration error")
            })
            event.preventDefault()
            }



        return (
            <div>
                <p>Signup</p>

                <form className="form" onSubmit={handleSubmit}>
                    <input
                       type="email"
                       name="email"
                       placeholder="E-mail"
                       value={email}
                       onChange={event => setEmail(event.target.value)}
                    />
                    <input
                       type="password"
                       name="password"
                       placeholder="Password"
                       value={password}
                       onChange={event => setPassword(event.target.value)}
                    />
                    <input
                       type="username"
                       name="username"
                       placeholder="Username"
                       value={username}
                       onChange={event => setUsername(event.target.value)}
                    />

                   <button className="button" type="submit">Signup</button>
                </form>
            </div>
        )

}

export default Signup;