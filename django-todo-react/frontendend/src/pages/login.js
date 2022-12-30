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
     const { handleLogin} = useContext(LoginStatusContext);
     //const local = local();



  const handleSuccessfulAuthentication = () =>{
        router.replace("/Dashboard");

   }

const local = () => {


var array = []

var crazy =  []

var obj = {
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
                axios.post("http://127.0.0.1:8000/cores/token/obtain/",
            {
                    email: email,
                    password: password,
            },
            { withCredentials: true }
        ).then(response => {
            console.log(response)
            if (response.statusText === "OK") {
                 handleLogin();
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

            {/* フォーム内のpassword_confrmation入力フィールド削除 */}
            <form className="form" onSubmit={handleSubmit}>
            <div className="ke-tai">
            <div className="divdivdiv3">
            <p>メールアドレス:</p>
              <input
                    type="email"
                    name="email"
                    placeholder="E-mail"
                    value={email}
                    onChange={event=>setEmail(event.target.value)}
                />
            </div>
            <div className="divdivdiv3">
            <p>パスワード:</p>
            <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={password}
                    onChange={event=>setPassword(event.target.value)}
                />
            </div>
            </div>

                <table className="tableform" border="1">
                <tbody>
                <tr>
                <td>メールアドレス:</td><td>
                <input
                    type="email"
                    name="email"
                    placeholder="E-mail"
                    value={email}
                    onChange={event=>setEmail(event.target.value)}
                /></td>
                </tr>

                <tr>
                <td>パスワード:</td><td>
                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={password}
                    onChange={event=>setPassword(event.target.value)}
                /></td>
                </tr>
                </tbody>
                </table>




                <button className="button" type="submit">Login</button>
            </form>
        </div>
    )
}
