import { useState,useEffect,useRef,useContext } from "react";
import {faCheck,faTimes,faInfoCircle} from "@fortawesome/free-solid-svg-icons"
// import {faCheck,faTimes,faInfoCircle} from "@fortawesome/free-solid-svg-icons "
// import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
// import { Link,useNavigate } from "react-router-dom";
// import {Button, Col, Form, Row} from "react-bootstrap"
// import axios from 'axios';
import axios from "./api/axios"
// import React from 'react'
import AuthContext from "./context/AuthProvider";
const LOGIN_URL = '/Login'

const Login = () => {
    const {setAuth}=useContext(AuthContext)
    const userRef =useRef()
    const errRef =useRef()
    const [user,setUser]=useState("")
    const [pwd,setPwd]=useState("")
    const [errMsg,setErrMsg]=useState("")
    const [success,setSuccess]=useState("")

    useEffect(()=>{
        userRef.current.focus()
    },[])
    useEffect(()=>{
        setErrMsg("")
    },[user,pwd])
    const handleSubmit =async(e)=>{
        e.preventDefault()
        try{
                const response =await axios.post(LOGIN_URL,JSON.stringify({user,pwd}),{
                    headers: {'Content-Type': 'application/json'},
                    withCredentials:true,
                })
                    setAuth({user,pwd})
            console.log(user,pwd)
            setUser("")
            setPwd("")
            setSuccess(true)
        }catch(err){
            if(!err?.response){
                setErrMsg("No server response")
            }else if(err.response?.status === 400){
                setErrMsg("missing username or password")
            }else if(err.response?.status === 401){
                setErrMsg("unauthorized")
            }else{
                setErrMsg("login failed")
            }
            errRef.current.focus()
        }
       
    }
  return (
    <>
    { succes?(
        <section>
            <h1>you are logged in</h1>
            <p> <a href="#">go to home</a></p>
        </section>
    ):(
    <section>
        <p ref={errRef} className={errMsg?"errmsg":"offscreen"}
        aria-live="assertive">
            {errMsg}</p>
            <h1>Sign in</h1>
            <form  onSubmit={handleSubmit}>
                <label htmlFor="username">username:</label>
                <input type="text" 
                id="username"
                ref={userRef}
                autoComplete="off"
                onChange={(e)=>setUser(e.target.value)}
                value={user}
                required
                />
                <label htmlFor="password">Password:</label>
                <input type="password" 
                id="password"                
                onChange={(e)=>setPwd(e.target.value)}
                value={pwd}
                required
                />
                <button type="submit">Sign In</button>
            </form>
      
    </section>
            )}
       </>
  )
}

export default Login
