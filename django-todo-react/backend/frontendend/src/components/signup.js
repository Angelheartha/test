import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../axiosApi";


const Signup = (props) => {


   const[email, setEmail] = useState("")
 //  const[password, setPassword] = useState("")
 //  const[username, setUsername] = useState("")
 //  const navigate = useNavigate()




const handleSuccessfulAuthentication = (data) =>{
        navigate("/Dashboard");
       // props.handleLogin()


   }



   const handleSubmit = (event) => {
         axiosInstance.post('/user/create/',
             {
                            username: props.username,
                            email: props.email,
                            password:props.password
            },
            {withCredentials:true}
            ).then(response=>{
               props.handleLogin()
               if(response.statusText === 'Created'){
               //console.log(response)
               props.handleSuccessfulAuthentication(response);
               props.local()
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
                       value={props.email}
                       onChange={event => props.setEmail(event.target.value)}
                    />
                    <input
                       type="password"
                       name="password"
                       placeholder="Password"
                       value={props.password}
                       onChange={event => props.setPassword(event.target.value)}
                    />
                    <input
                       type="username"
                       name="username"
                       placeholder="Username"
                       value={props.username}
                       onChange={event => props.setUsername(event.target.value)}
                    />

                   <button className="button" type="submit">Signup</button>
                </form>
            </div>
        )

}

export default Signup;