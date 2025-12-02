import React from 'react';
import { navLinks } from '../lib/nav';
import PhoneIcon from '../assets/icon/phone-call-01.svg';
import EmailIcon from '../assets/icon/email.svg';
import FacebookIcon from '../assets/icon/facebook.svg';
import InstagramIcon from '../assets/icon/instagram.svg';
import TiktokIcon from '../assets/icon/tiktok.svg';
import { Link } from 'react-router-dom';


const Footer: React.FC = () => {
  return (
    <footer className="bg-primary text-white">
      <div className="mx-14 py-5 space-y-8">
          <div className="border border-white" />
        {/* bagian kiri */}
        <div className='flex justify-between'>
        <div className='p-5 space-y-5'>
            <h1 className='font-cinzel text-xl'>HUBUNGI KAMI</h1>
            <div className='space-y-[10px]'>
              <div className='flex items-center space-x-2'>
                <img src={PhoneIcon} alt="PhoneIcon" className='w-10 h-auto' />
                <p className='font-inter font-semibold'>
                  +62 813 2576 8372
                </p>
              </div>
              <div className='flex items-center space-x-2'>
                <img src={EmailIcon} alt="EmailIcon" className='w-10 h-auto' />
                <p className='font-inter font-semibold'>
                  717sumberrejeki@gmail.com
                </p>
              </div>
            </div>
        </div>
        {/* bagian tengah */}
        <nav className="flex items-center justify-center">
          <ul className="underline space-y-10 text-center">
            {navLinks.map((link) => (
              <li key={link.name}>
                <Link
                  to={link.path}>
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <div className='p-8'>
          <h1 className='font-cinzel text-xl'>SOSIAL MEDIA KAMI</h1>
          <div className='flex space-x-4 mt-4'>
            <a href="#" className='hover:opacity-70 transition-opacity'>
              <img src={FacebookIcon} alt="Facebook" className='w-8 h-auto' />
            </a>
            <a href="#" className='hover:opacity-70 transition-opacity'>
              <img src={InstagramIcon} alt="Instagram" className='w-8 h-auto' />
            </a>
            <a href="#" className='hover:opacity-70 transition-opacity'>
              <img src={TiktokIcon} alt="TikTok" className='w-8 h-auto' />
            </a>
          </div>
        </div>
        </div>
          <div className="border border-white" />
        <div className="text-center font-montserrat items-center py-5">
          <p>Copyright © {new Date().getFullYear()} Sumber Rezeki. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;