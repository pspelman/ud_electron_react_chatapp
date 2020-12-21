import React from 'react';
import Navbar from "../components/Navbar";

export default function BaseLayout({children, ...props}) {
  return (
    <>
      <Navbar {...props} />
      {children}
    </>
  );
};


export const withBaseLayout = (Component) => {
  return (props) => {
    return (
      <>
        <Navbar />
        <Component {...props}/>
      </>
    )
  }
}