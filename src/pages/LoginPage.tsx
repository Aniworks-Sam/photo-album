import React, { useEffect } from 'react'
import { useForm } from "react-hook-form"
import { useNavigate } from 'react-router-dom'

import "../assets/CSS/LoginPage.css"

import { RegFormValue } from "../bo/UserInterface"
import { VARIABLES } from "../bo/Variables"

type Props = {
  setIsLoginPage: (isLoginPage: boolean) => void
}

function LoginPage({ setIsLoginPage }: Props) {
  const { register, handleSubmit } = useForm<RegFormValue>();
  const navigate = useNavigate();

  useEffect(() => {
    setIsLoginPage(true)
  }, [])

  useEffect(() => {
    document.title = VARIABLES.pageTitle.login;
    if (localStorage.getItem("userToken")) {
      navigate("/");
    } else {
      navigate("/login");
    }
  }, [])

  const formSubmit = async (data: RegFormValue) => {
    const item = { "username": data.username, "password": data.password, "scope": "master", "token": "true" }

    await fetch("https://mail.aniworks.live/mapi/authenticate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify(item)
    }).then(res => res.json()).then((data) => {
      console.log(data)
      localStorage.setItem("userToken", data.token)
      localStorage.setItem("userDataAll", JSON.stringify(data))
      setIsLoginPage(false)
      navigate("/")
    }).catch(err => {
      console.log("Error [LoginPage:FetchAPI(Auth)]: ", err)
    })
  }
  return (
    <>
      <main className="pa4 black-80">
        <form className="measure center" onSubmit={handleSubmit(formSubmit)}>
          <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
            <legend className="f4 fw6 ph0 mh0">Sign In</legend>
            <div className="mt3">
              <label className="db fw6 lh-copy f6" htmlFor="username">{VARIABLES.label.email}</label>
              <input className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" {...register("username")} placeholder={VARIABLES.placeholder.email} type="text" name="username" id="username" />
            </div>
            <div className="mv3">
              <label className="db fw6 lh-copy f6" htmlFor="password">{VARIABLES.label.password}</label>
              <input {...register("password")} className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="password" placeholder={VARIABLES.placeholder.password} name="password" id="password" />
            </div>
            <label className="pa0 ma0 lh-copy f6 pointer"><input type="checkbox" {...register("rememberMe")} />{VARIABLES.label.rememberMe}</label>
          </fieldset>
          <div className="">
            <input className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" type="submit" value="Sign in" />
          </div>
          <div className="lh-copy mt3">
            <a href="#0" className="f6 link dim black db">Sign up</a>
            <a href="#0" className="f6 link dim black db">Forgot your password?</a>
          </div>
        </form>
      </main>
    </>
  )
}

export default LoginPage