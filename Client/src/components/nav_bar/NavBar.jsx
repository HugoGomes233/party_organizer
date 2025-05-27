import React from 'react';
import { useNavigate, useLocation } from "react-router-dom";
import './NavBar.css'
import Logo from '../../images/logo.png'

const NavBar = () => {
  const location = useLocation(); 
  const navigate = useNavigate();

  // Define global items
  const commonItems = [
    { name: "Eventos", navigation: "/Eventos" },
    { name: "Membros", navigation: "/Membros" },
    { name: "Galeria", navigation: "/Galeria" },
  ];

  // Define admin items
  const adminItems = [{ name: "Utilizadores", navigation: "/Utilizadores" }];

  // Conditionally add admin items
  const itemsToDisplay = [
    ...commonItems,
    //...(UserRole === "Admin" ? adminItems : []), // Add admin items if the user is Admin
  ];

  const hasActive = itemsToDisplay.some(item => location.pathname === item.navigation);

  return (
    <header>
      
      <div className="nav-bar-container">
       
        <div className='nav-bar-left-content'>
          <img className="logo" src={Logo} alt="Cabra Sueca Logo"></img>
      
          <div className="btns-container">
            {itemsToDisplay.map((item) => (
              <span
                key={item.name}
                href={item.navigation || "#"}
                onClick={
                  item.navigation
                    ? (e) => {
                        e.preventDefault();
                        navigate(item.navigation);
                      }
                    : undefined
                }
                className={`nav-item ${location.pathname === item.navigation ? "active" : ""}`}
              >
                {item.name}
              </span>
            ))}
          
          </div>
        </div>
        <div>LOGOUT</div>
       
      </div>
     
    </header>
  );
};

export default NavBar;