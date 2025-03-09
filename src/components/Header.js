"use client"
import React, { useRef } from "react";
import { useGoogleLogin } from '@react-oauth/google';
import { useDispatch, useSelector } from 'react-redux';
import { removeToken, storeToken } from '../store/slice/token';
import googleAuth from '../store/api/authReducer';
import { useEffect } from 'react';
import { resetUser } from "../store/slice/user";



    {
      /*User data format being fetched from Google Login:
      email -------- user's email
      email_verified    ------ if user did email verification yet or nah
      given_name  ----------- user's gmail name
      name ----------------- user's gmail name
      picture ---------------- url of user's profile picture
      id ----------------------  user's id provided by Google
    */}

const Header = ({ darkMode, toggleDarkMode, toggleSidebar, toggleSearch, logo }) => {

  
        const checkToken = useRef(false);
        const user = useSelector((state)=>state.user.data);
        const dispatch = useDispatch(); 


        {/* Google Login */}
        const googleLogin = useGoogleLogin({
          onSuccess: async (tokenResponse) => {
            dispatch(storeToken(tokenResponse))
            dispatch(googleAuth(tokenResponse.access_token))
          },
          onError: errorResponse => console.log(errorResponse),
          
        });

        const googleLogout =()=>{
          localStorage.removeItem("access_token");
          dispatch(removeToken());
          dispatch(resetUser())
        }

      {/* Checking saved tokens in localStorage */}
      {/* Edit here as you like , write better logistics */}
      useEffect(()=>{
          const saved_token = JSON.parse(localStorage.getItem("access_token"));
          if(!checkToken.current && saved_token && Date.now()<saved_token.expires_in ){
              dispatch(googleAuth(saved_token.access_token));
              checkToken.current = true;
          }
          else{
            if(saved_token && Date.now()>=saved_token.expires_in){
                localStorage.removeItem("access_time");
            }
          }
      },[])

  return (
    <header>
      <button className="sidebar-toggle" onClick={toggleSidebar}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
          <line x1="9" y1="3" x2="9" y2="21"></line>
        </svg>
      </button>
      <div className="brand">
        <img src={logo} alt="GameCre8 Logo" className="brand-logo" />
        <span>GameCre8</span>
      </div>
      <div className="header-controls larger">
        <button className="search-button" onClick={toggleSearch}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="11" cy="11" r="8"></circle>
            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
          </svg>
        </button>
        {user ? (<>
            {/* Just a trial*/ }
            <svg width="40" height="40">
              <defs>
                  <clipPath id="circleMask">
                      <circle cx="20" cy="20" r="20"></circle>
                  </clipPath>
              </defs>
             {user.picture ? ( <image href={user.picture}  width="40" height="40" clipPath="url(#circleMask)"></image>):(<></>)}
            </svg>
            <h4>{user.name} (Made it frankly for testing)</h4>
            <button className="login-button" onClick={googleLogout}>LogOut</button>
        </>):(
        <button className="login-button" onClick={googleLogin}>Login</button>)}
        <button className="theme-toggle" onClick={toggleDarkMode}>
          {darkMode ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="12" cy="12" r="5"></circle>
              <line x1="12" y1="1" x2="12" y2="3"></line>
              <line x1="12" y1="21" x2="12" y2="23"></line>
              <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
              <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
              <line x1="1" y1="12" x2="3" y2="12"></line>
              <line x1="21" y1="12" x2="23" y2="12"></line>
              <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
              <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
            </svg>
          )}
        </button>
      </div>
    </header>
  );
};

export default Header;