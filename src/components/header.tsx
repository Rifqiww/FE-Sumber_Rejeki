import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import Logo from "../assets/LOGO.png";
import CartIcon from "../assets/icon/bag-01.svg";
import LikeIcon from "../assets/icon/heart.svg";
import { navLinks } from "../lib/nav";
import { initialUserProfile } from "../data/userProfile";
import { useCart } from "../context/CartContext";

const Header: React.FC = () => {
  const [activeLink, setActiveLink] = useState("");
  const location = useLocation();
  const { cartItems } = useCart();

  useEffect(() => {
    const currentLink = navLinks.find(
      (link) => link.path === location.pathname
    );
    if (currentLink) {
      setActiveLink(currentLink.name);
    } else {
      setActiveLink("");
    }
  }, [location.pathname]);

  return (
    <header className="bg-primary fixed top-0 left-0 right-0 z-50">
      <div className="w-full px-8 py-5">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <img src={Logo} alt="Sumber Rejeki Logo" className="w-16 h-auto" />
            <h1 className="ml-3 text-2xl font-pacifico text-white">
              Sumber Rejeki
            </h1>
          </div>

          <nav className="flex-1 px-12">
            <ul className="flex justify-center space-x-12">
              {navLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.path}
                    onClick={() => setActiveLink(link.name)}
                    className={`relative px-2 py-1 font-inter font-medium transition-all duration-300
                      ${
                        activeLink === link.name
                          ? "text-white font-bold"
                          : "text-white/70 hover:text-white"
                      }
                      after:content-[''] after:absolute after:bottom-0 after:left-1/2 after:w-0 after:h-0.5
                      after:bg-white after:transition-all after:duration-300 after:transform after:-translate-x-1/2
                      hover:after:w-full
                      ${activeLink === link.name ? "after:w-full" : ""}`}
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <div className="flex space-x-5 items-center">
            <Link to="/cart" className="relative">
              <img src={CartIcon} alt="CartLogo" className="w-8 h-auto" />
              {cartItems.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center border-2 border-primary">
                  {cartItems.length}
                </span>
              )}
            </Link>
            <Link to="/likes">
              <img src={LikeIcon} alt="LikeLogo" className="w-8 h-auto" />
            </Link>
            <Link to="Profile">
              <img
                src={initialUserProfile.profileImage}
                alt="User Profile"
                className="w-14 h-auto rounded-full"
              />
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
