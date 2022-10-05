import React from 'react';
import '../assets/styles/Sidebar.css';


const FooterSidebar = (props) => {
  return (
    <span className='containerFooterSidebar'>
      <p>{props.icon}</p>
      <p className='logOut'>{props.title}</p>
    </span>
  )
}
export default FooterSidebar