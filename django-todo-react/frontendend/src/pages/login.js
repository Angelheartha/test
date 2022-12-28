import {user} from 'react'
import React , {useContext, useState, createContext, useEffect} from 'react';
import axios from 'axios'
import App from "../components/navbar";
import Link from 'next/link';
import {LoginStatusContext} from '../pages/_app';
import { useRouter } from 'next/router'
//import local from "../components/navbar";
//import {username,setUsername } from '../pages/_app';
//import {password, setPassword } from '../pages/_app';
//import {email, setEmail }  from '../pages/_app';



export default function Login() {

     const {username,setUsername } = useContext(LoginStatusContext);
     const {password, setPassword } = useContext(LoginStatusContext);
     const {email, setEmail } = useContext(LoginStatusContext);
     const {loggedInStatus, setLoggedInStatus } = useContext(LoginStatusContext);
     const router = useRouter();
   //  const {local } = useContext(LoginStatusContext);
     //const local = local();

  const handleLogin = () =>{
  setLoggedInStatus("ログインなう");
  }


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






const errr = (data) =>{
   props.err(event.target.value);
}


const emmm = (data) =>{
   props.emm(event.target.value);
}

const psss = (data) =>{
   props.pss(event.target.value);
}


    const handleSubmit = (event) => {
     console.log("a")
                axios.post("http://127.0.0.1:8000/cores/token/obtain/",
            {
                    username: username,
                    email: email,
                    password: password

            },
            { withCredentials: true }
        ).then(response => {

            handleLogin()//
            //console.log(response)//
            console.log(response)
            if (response.statusText === "OK") {
                 handleSuccessfulAuthentication(response.data);
                 local()
            }
        }).catch(error => {
            console.log("registration error", error)
        })
        event.preventDefault()
    }



    return (
        <div>
            {/* ログインに変更 */}
            <p>Login</p>

            {/* フォーム内のpassword_confrmation入力フィールド削除 */}
            <form className="form" onSubmit={handleSubmit}>
                <input
                    type="email"
                    name="email"
                    placeholder="E-mail"
                    value={email}
                    onChange={event=>setEmail(event.target.value)}
                />
                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={password}
                    onChange={event=>setPassword(event.target.value)}
                />
                <input
                    type="username"
                    name="username"
                    placeholder="Username"
                    value={username}
                    onChange={event=>setUsername(event.target.value)}
                />



                <button className="button" type="submit">Login</button>
            </form>
        </div>
    )
}
