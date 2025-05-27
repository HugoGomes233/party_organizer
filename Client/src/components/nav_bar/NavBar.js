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
      
      <div class="nav-bar-container">
       
        <div>
            <img class="logo" src={Logo} alt="Cabra Sueca Logo"></img>
        </div>
        <div class="btns-container">
          {itemsToDisplay.map((item) => (
            <a
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
            </a>
          ))}
        
        </div>
        
        <div></div>
       
      </div>
     
    </header>
  );
};

export default NavBar;