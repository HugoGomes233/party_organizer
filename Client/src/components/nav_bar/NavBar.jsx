import React, { useState, useRef, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuthLogout } from "../../auth/AuthLogout";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRightFromBracket, faBars } from "@fortawesome/free-solid-svg-icons";
import styles from "./NavBar.module.css";
import Logo from "../../images/logo.png";

const NavBar = () => {
  const logout = useAuthLogout();
  const location = useLocation();
  const navigate = useNavigate();
  const menuRef = useRef(null);
  const [isOpenHamburguer, setIsOpenHamburger] = useState(false);

  const commonItems = [
    { name: "Eventos", navigation: "/Eventos" },
    { name: "Membros", navigation: "/Membros" },
    { name: "Galeria", navigation: "/Galeria" },
  ];

  const itemsToDisplay = [...commonItems];

  const renderNavItems = () =>
    itemsToDisplay.map((item) => (
      <li
        key={item.name}
        onClick={() => {
          navigate(item.navigation);
          setIsOpenHamburger(false); // fecha menu no mobile
        }}
        className={`${styles.navItem} ${
          location.pathname === item.navigation ? styles.active : ""
        }`}
      >
        {item.name}
      </li>
    ));

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsOpenHamburger(false);
      }
    };
    if (isOpenHamburguer) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpenHamburguer]);

  return (
    <header>
      <div className={styles.navBarContainer}>
        <div className={styles.navBarLeftContent}>
          <img className={styles.logo} src={Logo} alt="Cabra Sueca Logo" />

          {/* Menu Desktop */}
          <nav className={styles.btnsContainer}>
            <ul className={styles.navList}>{renderNavItems()}</ul>
          </nav>
        </div>

        <div className={styles.logoutContainer}>
          <FontAwesomeIcon
            onClick={logout}
            icon={faRightFromBracket}
            className={styles.faIcon}
          />
        </div>

        {/* Menu Mobile (hambúrguer) */}
        <div className={styles.hamburgerContainer}>
          <FontAwesomeIcon
            icon={faBars}
            className={styles.faIcon}
            onClick={() => setIsOpenHamburger((prev) => !prev)}
          />
          {isOpenHamburguer && (
            <nav className={styles.mobileMenu} ref={menuRef}>
              <ul className={styles.navList}>{renderNavItems()}</ul>
              <ul className={styles.navList}>
                <FontAwesomeIcon
                  onClick={logout}
                  icon={faRightFromBracket}
                  className={styles.faIcon}
                />
              </ul>
            </nav>
          )}
        </div>
      </div>
    </header>
  );
};

export default NavBar;
