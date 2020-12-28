import React from 'react';
import {withBaseLayout} from "../layouts/Base";
import LoginForm from "../components/LoginForm";
import RegisterForm from "../components/RegisterForm";
import {useForm} from "react-hook-form";
const faker = require('faker');
import {useDispatch, useSelector} from "react-redux";

import {createChat} from "../actions/chatsActions";
import {useHistory} from "react-router-dom";



// name -> input, description -> textarea, image -> input
function ChatCreate() {
  const { register, handleSubmit } = useForm();
  const user = useSelector(({auth}) => auth.user);
  const dispatch = useDispatch();
  const history = useHistory();

  const onSubmit = data => {
    dispatch(createChat(data, user.uid))
    setTimeout(() => {
      history.push('/home')
    }, 200)
      // .then(_ => history.push('/home'))
  }


  let randomName = faker.name.jobTitle();
  let randomDescription = faker.lorem.sentence();
  let randomImage = faker.image.imageUrl();

  return (
    <div className="centered-view">
      <div className="centered-container">
        <div>Chat Create Form</div>
        <form onSubmit={handleSubmit(onSubmit)} className="centered-container-form">
          <div className="header">New Chat</div>
          <div className="subheader">Chat with other people!</div>
          <div className="form-container">
            <div className="form-group">
              <label htmlFor="name">Title</label>
              <input
                defaultValue={randomName}
                ref={register}
                name="name"
                type="text"
                className="form-control"
                id="name"
              />
            </div>
            <div className="form-group">
              <label htmlFor="description">Message</label>
              <textarea
                // autoFocus={true}
                defaultValue={randomDescription}
                ref={register}
                name="description"
                className="form-control"
                id="description"
              />
            </div>
            <div className="form-group">
              <label htmlFor="image">Image</label>
              <input
                ref={register}
                // defaultValue={"https://easydrawingguides.com/wp-content/uploads/2017/04/How-to-draw-a-cartoon-ninja-20.png"}
                defaultValue={randomImage}
                name="image"
                type="text"
                className="form-control"
                id="image"
              />
            </div>
            {/*{error && <div className="alert alert-danger small">{error.message}</div>}*/}
            <button type="submit" className="btn btn-outline-primary">
              Create
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default withBaseLayout(ChatCreate, {canGoBack: true})
