import React, {useState} from "react";
import {useSelector} from "react-redux";
import LoginForm from "../components/LoginForm";
import RegisterForm from "../components/RegisterForm";
import {Redirect} from "react-router";
import LoadingView from "../components/shared/LoadingView";
import BaseLayout from "../layouts/Base";


export default function Welcome() {
  const [isLoginView, setIsLogin] = useState(true)
  // const isChecking = useSelector(({auth}) => auth.login.isChecking)  // using redux to see if authentication is in progress
  const isChecking = useSelector(({auth}) => auth.isChecking)  // using redux to see if authentication is in progress

  // const entireState = useSelector(state => state)  // Note: this will give the entire state (good for debugging)
  // debugger


  if (isChecking) {  // want to show a loader if we're checking on the auth status
    console.log(`checking auth`, )
    return <LoadingView />
  }

  const user = useSelector(({auth}) => auth.user)  // using redux to check for the user
  if (user) {
    // console.log(`we have a user! Going to Home | user: `, JSON.stringify(user))
    return <Redirect to={"/home"} />
  }


  const optInText = isLoginView ?
    ['Need an account?', 'Register'] :
    ['Already registered?', 'Login'];

  return (
    <div className="centered-view">
      <div className="centered-container">
        {isLoginView ? <LoginForm /> : <RegisterForm />}

        <small className="form-text text-muted mt-2">{optInText[0]}
          <span
            onClick={() => setIsLogin(!isLoginView)}
            className="btn-link ml-2">{optInText[1]}</span></small>
      </div>
    </div>
  )
};