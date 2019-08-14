import React from 'react';
import './HeaderComponent.css';

const HeaderComponent = (props) => {
  return (
    <div className="bg-primary pt-4 pb-4 pl-4">Welcome to chat, {props.name}. </div>
  );
}

export default HeaderComponent;