import React, { useEffect } from 'react'
import { onAuthStateChanged, signOut } from "firebase/auth";
import {auth} from '../utils/Firebase'
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addUser, removeUser } from '../utils/userSlice';
import { LOGO, USER_AVATAR } from '../utils/Constants';

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((store)=>store.user);
  const handleSignOut=()=>{
    signOut(auth).then(() => {
      // Sign-out successfu
    }).catch((error) => {
      // An error happened.
    });
    
  }

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/auth.user
        const {uid,email,displayName} = user;
        dispatch(addUser({uid:uid,email:email,displayName:displayName}));
        navigate('/browse');

        // ...
      } else {
        // User is signed out
        // ...
        dispatch(removeUser());
        navigate('/');
        
      }
    });
  }, []);
  

  return (
    <div className='absolute px-8 py-2 bg-gradient-to-b from-black z-10 w-screen flex justify-between' >
      <img className='w-44  ' src={LOGO}/>

      {user && <div className='flex font-bold'>
        <img src={USER_AVATAR} alt="user"/>
        <button onClick={handleSignOut}>
          (Sign Out)
        </button>
      </div>}
    </div>

  )
}

export default Header