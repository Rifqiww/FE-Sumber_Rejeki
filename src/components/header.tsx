import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Logo from '../assets/LOGO.png';
import CartIcon from '../assets/icon/bag-01.svg';
import LikeIcon from '../assets/icon/heart.svg';
import User from '../assets/icon/DefaultProfile.png';
import { navLinks } from '../lib/nav';

const Header: React.FC = () => {
  const [activeLink, setActiveLink] = useState('');
  const location = useLocation();

  useEffect (() => {
    const currentLink = navLinks.find(link => link.path === location.pathname);
    if (currentLink) {
      setActiveLink(currentLink.name);
    } else {
      setActiveLink('');
    }
  }, [location.pathname]);

  return (
    <header className="bg-primary">
      <div className="container mx-auto py-3">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <img src={Logo} alt="Sumber Rejeki Logo" className="w-16 h-auto"/>
            <h1 className="ml-3 text-2xl font-pacifico text-white">Sumber Rejeki</h1>
          </div>

          <nav className="flex-1 px-12">
            <ul className="flex justify-center space-x-12">
              {navLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.path}
                    onClick={() => setActiveLink(link.name)}
                    className={`relative px-2 py-1 font-inter font-medium transition-all duration-300
                      ${activeLink === link.name ? 'text-white font-bold' : 'text-white/70 hover:text-white'}
                      after:content-[''] after:absolute after:bottom-0 after:left-1/2 after:w-0 after:h-0.5
                      after:bg-white after:transition-all after:duration-300 after:transform after:-translate-x-1/2
                      hover:after:w-full
                      ${activeLink === link.name ? 'after:w-full' : ''}`}
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <div className="flex space-x-5 items-center">
            <Link to="/cart">
              <img src={CartIcon} alt="CartLogo" className="w-8 h-auto"/>
            </Link>
            <Link to="/likes">
              <img src={LikeIcon} alt="LikeLogo" className="w-8 h-auto"/>
            </Link>
            <Link to="Profile">
              <img src={User} alt="User Profile" className="w-14 h-auto rounded-full"/>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;