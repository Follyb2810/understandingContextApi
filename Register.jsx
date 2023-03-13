import { useState,useEffect,useRef } from "react";
import {faCheck,faTimes,faInfoCircle} from "@fortawesome/free-solid-svg-icons"
// import {faCheck,faTimes,faInfoCircle} from "@fortawesome/free-solid-svg-icons "
// import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
// import { Link,useNavigate } from "react-router-dom";
// import {Button, Col, Form, Row} from "react-bootstrap"
// import axios from 'axios';
import axios from "./api/axios"
const USER_REGEX =/^[a-zA-Z][a-zA-Z0-9-_]{3,23}&/;
const PWD_REGEX =/^(?=.*[a-z])(?=.*[A_Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
const REGISTER="/register"
function Register() {
   const userRef =useRef()
   const errRef =useRef()

   const [user,setUser]=useState()
   const [validName,setValidName]=useState(false)
   const [userFocus,setUserFocus]=useState(false)
   
   const [pwd,setPwd]=useState("")
   const [validPwd,setValidPwd]=useState(false)
   const [pwdFocus,setPwdFocus]=useState(false)
   
   const [matchPwd,setMatchPwd]=useState("")
   const [validMatch,setValidMatch]=useState(false)
   const [matchFocus,setMatchFocus]=useState(false)
   
   const [errMsg,setErrMsg]=useState(false)
   const [succes,setSuccess]=useState("")
    const [companyname,setCompanyname]= useState("")
    const [psd,setPsd]= useState("")
    const [confirm,setConfirm] = useState("")
    const [email,setEmail] = useState('')
    const [match,setMatch] = useState('')
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [message,setMessage]=useState("")
    const [name,setName]=useState("")
    const [pic,setPic]=useState("")
    const [confirmPassword,setComfirmPassword]=useState("")
    const [error,setError]=useState("")
    const [loading,setLoading]=useState("")
    // const navigate = useNavigate()
    useEffect(()=>{
      userRef.current.focus()
    },[])
    useEffect(()=>{
      const result=USER_REGEX.test(user)
      setValidName(result)
    },[user])
    useEffect(()=>{
      const result=PWD_REGEX.test(pwd)
      setValidPwd(result)
      const match = pwd ===matchPwd
      setValidMatch(match)
    },[pwd,matchPwd])
    useEffect(()=>{
      setErrMsg("")
    },[user,pwd,matchPwd])
  const handleSubmit =async(e)=>{
    e.preventDefault()
    // ! secured the button incase of js hack
    const v1 =USER_REGEX.test(user)
    const v2 =USER_REGEX.test(pwd)
    if(v1 || v2){
      setErrMsg("invalid entry")
      return
    }
    try{
       const response = await axios.post(REGISTER,JSON.stringify({user,pwd}),{
        headers: {'Content-Type': 'application/json'},
        withCredentials: true
       })
       setSuccess(true)
    }catch(err){ 
      console.log(err)
      if(!err?.response){
        setErrMsg("no server response")
      }else if(err.response?.status){
        setErrMsg("username taken")
      }else{
        setErrMsg("registration fail")
      }
      errRef.current.focus()
    }
    // setSuccess(true)
    // console.log(user,pwd);

  }
    
     return(
      <>
      {    
      
          succes?(<section>
            <h1>Success</h1>
            <p>
              <a href="#">Sign In</a>
            </p>
            </section>):(
      <section>
                <p ref={errRef} className={errMsg? "errmsg":"offscreen"} aria-live="assertive">{errMsg}</p>
                <h1>Register</h1> 
                <form onSubmit={handleSubmit}>
                <label htmlFor="username">Username:
                <span className={validName?"valid":"hide"}>
                    <FontAwesomeIcon icon={faCheck}/>
                </span>
                <span className={validName?"valid":"hide"}>
                  <FontAwesomeIcon icon={faTimes}/>
                </span>
                </label>
                <input type="text"
                  id="username"
                  ref={userRef}
                  autoComplete="off"
                  onVolumeChange={(e)=>setUser(e.target.value)}
                  required
                  aria-invalid={validName?"false":"true"}
                  aria-describedby="uidnote"
                  onFocus={()=>setUserFocus(true)}
                  onBlur={()=>setUserFocus(true)}/>
         <p id="uidnote" className={userFocus&& user &!validName?"instruction":"offscreen"}> 
                <FontAwesomeIcon icom={faInfoCircle}/>
            4 to 24 character<br/>
            must begin with a letter.<br/>
            letters,numbers,underscore,hyphens allowd
         </p>
        <label htmlFor="password">Password:
        <span className={validPwd?"valid":"hide"}>
                    <FontAwesomeIcon icon={faCheck}/>
                </span>
                <span className={validPwd  || !pwd?"hide":"invalid"}>
                  <FontAwesomeIcon icon={faTimes}/>
                </span>
        </label>
        <input type="text"
                  id="password"
                  
                  onVolumeChange={(e)=>setPwd(e.target.value)}
                  required
                  aria-invalid={validPwd?"false":"true"}
                  aria-describedby="pwdnote"
                  onFocus={()=>setPwdFocus(true)}
                  onBlur={()=>setPwdFocus(true)}/>
                   <p id="pwdnote" className={userFocus&& user &!validName?"instruction":"offscreen"}> 
            <FontAwesomeIcon icom={faInfoCircle}/>
        8 to 24 character<br/>
         must iclude uppercase and lowercase letters, a number and a special character.<br/>
         allowed special characters<span aria-label="exclamation mark">!</span>
         <span aria-label="at symbol">@</span> <span aria-label="hashtag">#</span>
         <span aria-label="dollar sign">$</span>
         <span aria-label="percent">%</span>
         </p>
        <label htmlFor="password">Confirm Password:
        <span className={validPwd && matchPwd?"valid":"hide"}>
                    <FontAwesomeIcon icon={faCheck}/>
                </span>
                <span className={validPwd  || !matchPwd?"hide":"invalid"}>
                  <FontAwesomeIcon icon={faTimes}/>
                </span>
        </label>
        <input type="text"
                  id="password"
                  
                  onVolumeChange={(e)=>setMatchPwd(e.target.value)}
                  required
                  aria-invalid={validMatch?"false":"true"}
                  aria-describedby="confirmnote"
                  onFocus={()=>setMatchFocus(true)}
                  onBlur={()=>setMatchFocus(false)}/>
                   <p id="pwdnote" className={matchFocus&& !validMatch ?"instruction":"offscreen"}> 
            <FontAwesomeIcon icom={faInfoCircle}/>
       it must match the first character of the first password input
         </p>
         <button type="submit" disabled={!validName || !validPwd || !validMatch ?true:false}>Sign uUp</button>
                </form>
       
        </section>)
       }

       </>    
     )
}

export default Register;