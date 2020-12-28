import React from "react";
import {useForm} from "react-hook-form";
import {loginUser} from "../actions/authActions";
import {useDispatch, useSelector} from "react-redux";
import LoadingView from "./shared/LoadingView";


export default function LoginForm() {
  const {register, handleSubmit} = useForm()
  const dispatch = useDispatch()

  const error = useSelector(({auth}) => auth.login.error)
  const isChecking = useSelector(({auth}) => auth.login.isChecking)

  // if (isChecking) {
  //   return <LoadingView/>
  // }

  const onSubmit = data => {
    console.log(`trying to do login`, )
    dispatch(loginUser(data))
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="centered-container-form">
      <div className="header">Welcome!</div>
      <div className="subheader">Login and chat with other people!</div>
      <div className="form-container">
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            // defaultValue={"phil@phil.com"}
            defaultValue={"stuff@phil.com"}
            ref={register}
            name="email"
            type="email"
            className="form-control"
            id="email"
            aria-describedby="emailHelp"/>
          <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            autoFocus={true}
            defaultValue={'123456'}
            ref={register}
            name="password"
            type="password"
            className="form-control"
            id="password"/>
        </div>
        { error && <div className="alert alert-danger small">{error.message}</div>}
        <button type="submit" className="btn btn-outline-primary">Login
        </button>
      </div>
    </form>
  )
};