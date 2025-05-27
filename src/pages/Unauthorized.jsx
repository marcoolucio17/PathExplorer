import React from 'react'
import { GlassCard } from 'src/components/shared/GlassCard'
import 'src/styles/Login.css'
import { useNavigate } from "react-router";


export const Unauthorized = () => {
  const navigate = useNavigate();

  return (
      <div id="login-form" style={{ display: "flex", alignItems: "center" , justifyContent:"center", marginTop:"2rem"}}>
        <div className="loginForm">
            <div className="mainLoginForm p-5" >
              <img src="/images/Acc_Logo_White_Purple_RGB 1.svg" width="170" height="170" />
              <p className="text-light" style={{ fontSize: "35px" }}>
                It seems you don't have access to this site. Please retry your login. 
              </p>
              <button
                type="button"
                onClick={() => navigate("/")}
                className="customSubmitButton">
                Return to Login
              </button>
            </div>

        </div>
      </div>
  )
}
