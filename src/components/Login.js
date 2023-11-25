import React, { useRef, useState } from "react";
import Header from "./Header";
import { ValidateFormData } from "../utils/ValidateFormData";
import {  createUserWithEmailAndPassword,signInWithEmailAndPassword } from "firebase/auth";
import {auth} from "../utils/Firebase"
import { useNavigate } from "react-router-dom";

const Login = () => {

  const navigate = useNavigate();

  const [isSignInForm,setisSignInForm] = useState(true);
  const [errorMsg,seterrorMsg] = useState(null);
  const email = useRef(null);
  const password = useRef(null);
  const handleValidation = (e) =>{
    // e.preventDefault();
    const msg = ValidateFormData(email.current.value,password.current.value);
    // console.log(msg);
    seterrorMsg(msg);
    if(msg) return;

    if(!isSignInForm)
    {
      createUserWithEmailAndPassword(auth, email.current.value, password.current.value)
      .then((userCredential) => {
        // Signed up 
        const user = userCredential.user;
        console.log(user);
        navigate('/browse');

        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        seterrorMsg(errorCode+ '-'+ errorMessage);
        // ..
      });
    }
    else{
      signInWithEmailAndPassword(auth, email.current.value, password.current.value)
      .then((userCredential) => {
        // Signed in 
        const user = userCredential.user;
        console.log(user);
        navigate('/browse');
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        seterrorMsg(errorCode+' '+errorMessage);
      });
    
    }

  }

  const toggleForm =()=>{
    setisSignInForm(!isSignInForm);
  }
  return (
    <div>
      <Header />
      <div className="absolute">
        <img src="https://assets.nflxext.com/ffe/siteui/vlv3/d1532433-07b1-4e39-a920-0f08b81a489e/67033404-2df8-42e0-a5a0-4c8288b4da2c/IN-en-20231120-popsignuptwoweeks-perspective_alpha_website_medium.jpg" />
      </div>
      <form onSubmit={(e)=>e.preventDefault()} className="w-3/12 absolute p-12 bg-black m-36 mx-auto rounded-lg right-0 left-0 text-white bg-opacity-80">
        <h1 className=" p-4 font-bold text-3xl  ">{isSignInForm?"Sign In":"Sign Up"}</h1>

        {!isSignInForm && <input className="m-4 p-4 w-full bg-gray-700" type="text" placeholder="Full Name" />}


        <input ref={email} className="m-4 p-4 w-full bg-gray-700" type="text" placeholder="Email Address" />

       
        <input ref={password} className="m-4 p-4 w-full bg-gray-700" type="password" placeholder="Password" />

        <p className="text-red-600 font-bold text-lg m-4">{errorMsg}</p>

        <button  className="m-4 p-6 w-full bg-red-600 rounded-lg" onClick={handleValidation} >{isSignInForm?"Sign In":"Sign Up"}</button>


        <p className="py-4 cursor-pointer" onClick={toggleForm}>
          {isSignInForm? "New to Netflix? Sign Up Now" : "Already a User? Sign In"}
        </p>
      </form>
    </div>
  );
};

export default Login;
