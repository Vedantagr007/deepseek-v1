"use client";
import React, { useRef, useEffect } from "react";
import { useGoogleLogin, useGoogleOneTapLogin } from "@react-oauth/google";
import { useDispatch, useSelector } from "react-redux";
import googleAuth from "../store/api/authReducer";
import { ifErrorUser, setUser } from "../store/slice/user";
import { jwtDecode } from "jwt-decode";
import { getUser, addUser } from "../db/user";

const Header = ({
  darkMode,
  toggleDarkMode,
  toggleSidebar,
  toggleSearch,
  logo,
}) => {
  const checkUser = useRef(false);
  const isUserDB = useRef(false);
  const user = useSelector((state) => state.user.data);
  const dispatch = useDispatch();
  const colorStyle = darkMode ? { color: "white" } : {};

  /* Google One Tap Login */
  useGoogleOneTapLogin({
    onSuccess: (credentialResponse) => {
      const decode = jwtDecode(credentialResponse.credential);
      const decodedData = {
        email: decode.email,
        sub: decode.sub,
        given_name: decode.given_name,
        name: decode.name,
        picture: decode.picture,
        email_verified: decode.email_verified,
      };
      dispatch(setUser(decodedData));
    },
    onError: () => {
      dispatch(ifErrorUser("one_tap_error"));
    },
    promptMomentNotification: (notification) => {
      if (notification.isNotDisplayed() || notification.isSkippedMoment()) {
        dispatch(ifErrorUser("one_tap_failed"));
      }
    },
    auto_select: true,
    cancel_on_tap_outside: true,
    use_fedcm_for_prompt: true,
    disabled: !!user,
  });

  /* Google Login */
  const googleLogin = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      dispatch(googleAuth(tokenResponse.access_token));
    },
    onError: (errorResponse) => console.log(errorResponse),
    ux_mode: "popup",
  });

  /* User handling effects */
  useEffect(() => {
    const userHandler = async () => {
      if (user && !isUserDB.current) {
        await addUser(user);
        isUserDB.current = true;
      }
    };
    userHandler();
  }, [user]);

  useEffect(() => {
    const checkUserHandler = async () => {
      if (!checkUser.current) {
        const res = await getUser();
        if (res) {
          dispatch(setUser(res));
          isUserDB.current = true;
        }
        checkUser.current = true;
      }
    };
    checkUserHandler();
  }, []);

  return (
    <header className="header">
      <div className="header-left-controls">
        <button
          className="theme-toggle"
          onClick={toggleDarkMode}
          style={colorStyle}
        >
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

      <div className="header-brand">
        <img src={logo} alt="GameCre8 Logo" className="brand-logo" />
        <span
          className="brand-title"
          style={{
            fontWeight: "bold",
            background: "linear-gradient(to right, #8b5cf6, #ec4899)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          GameCre8
        </span>
      </div>

      <div className="header-controls">
        {user ? (
          <div className="user-info">
            <svg width="30" height="30">
              <defs>
                <clipPath id="circleMask">
                  <circle cx="13" cy="13" r="13"></circle>
                </clipPath>
              </defs>
              {user.picture && (
                <image
                  href={user.picture}
                  width="30"
                  height="30"
                  style={{ clipPath: "url(#circleMask)" }}
                />
              )}
            </svg>
          </div>
        ) : (
          <button
            className="login-button"
            onClick={googleLogin}
          >
            <img src="./google.svg" alt="google" />
          </button>
        )}
      </div>
    </header>
  );
};

export default Header;