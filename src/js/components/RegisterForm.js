import React from "react";
import {useForm} from "react-hook-form";
import {useDispatch, useSelector} from "react-redux";
import {registerUser} from "../actions/authActions";



export default function RegisterForm() {
  const {register, handleSubmit} = useForm()
  const dispatch = useDispatch()

  const error = useSelector(({auth}) => auth.register.error)

  const onLogin = registerData => {
    dispatch(registerUser(registerData))
  }

  return (
    <form onSubmit={handleSubmit(onLogin)} className="centered-container-form">
      <div className="header">Create an account</div>
      <div className="form-container">
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            defaultValue={"stuff@phil.com"}
            ref={register}
            type="email"
            className="form-control"
            name="email"
            id="email"
            aria-describedby="emailHelp" />
          <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
        </div>
        <div className="form-group">
          <label htmlFor="username">Username</label>
          <input
            defaultValue={"stuff"}
            ref={register}
            type="text"
            name="username"
            className="form-control"
            id="username"
            aria-describedby="emailHelp" />
        </div>
        <div className="form-group">
          <label htmlFor="avatar">Avatar</label>
          <input
            defaultValue={"stuff"}
            ref={register}
            type="text"
            name="avatar"
            className="form-control"
            id="avatar"
            aria-describedby="emailHelp" />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            defaultValue={"1234"}
            ref={register}
            name="password"
            type="password"
            className="form-control"
            id="password" />
        </div>
        { error && <div className="alert alert-danger small">{error}</div>}
        <button type="submit" className="btn btn-outline-primary">Register</button>
      </div>
    </form>
  )
};