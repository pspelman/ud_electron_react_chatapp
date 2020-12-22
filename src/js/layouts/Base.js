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


function getDisplayName(Component) {
  return Component.displayName || Component.name || 'Component'
}

export const withBaseLayout = (Component, config) => props => {
  return (
    <>
      <Navbar {...config} view={getDisplayName(Component)}/>
      <Component {...props}/>
    </>
  )
}