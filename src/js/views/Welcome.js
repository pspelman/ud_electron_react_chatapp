import React, {useState} from "react";
import {useSelector} from "react-redux";
import LoginForm from "../components/LoginForm";
import RegisterForm from "../components/RegisterForm";
import {Redirect} from "react-router";


export default function Welcome() {
  const [isLoginView, setIsLogin] = useState(true)
  const user = useSelector(({auth}) => auth.user)  // using redux to check for the user
  const isChecking = useSelector(({auth}) => auth.isChecking)  // using redux to see if authentication is in progress

  if (isChecking) {
    console.log(`checking auth`, )

    return  <h1>Checking authentication status</h1>
  }

  if (user) {
    console.log(`we have a user! Going to Home`, )
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