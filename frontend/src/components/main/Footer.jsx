import React from 'react';
import { Link } from 'react-router-dom';
import img from "./../../images/pizza.png"
import LocationOnIcon from '@mui/icons-material/LocationOn';
import EmailIcon from '@mui/icons-material/Email';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import TwitterIcon from '@mui/icons-material/Twitter';
import PinterestIcon from '@mui/icons-material/Pinterest';

const Footer = () => {
  return (
    <footer className="footer mt-20">
      <div className="container">
        <div className="row py-4">
        <div className="col-xs-6 col-md-3 top">
            <h6 className='text-white text-xl tracking-widest font-bold text-gray-900  text-start'>Quick Links</h6>
            <ul className="footer-links text-start px-0">
              <li className='text-start'>Home </li>
              <li> Our Menu</li>
              <li> Contact Us</li>
          
            </ul>
          </div>

          <div className="col-xs-6 col-md-3 top">
            <h6 className='text-white text-xl tracking-widest font-bold text-gray-900 text-start'>Order & Pay</h6>
            <ul className="footer-links text-start px-0">
              <li>  Pay Online</li>
              <li> Pay with cash on delivery</li>
          
            </ul>
          </div>

          <div className="col-xs-6 col-md-3 top">
            <h6 className='text-white text-xl tracking-widest font-bold text-gray-900 text-start'>Contacts</h6>
            <ul className="footer-links text-start px-0 ">
              <li><LocationOnIcon className='text-red-600'/> Address: Mumbai </li>
              <li><EmailIcon className='text-red-600'/> Mail: Pri@gmail.com</li>
              <li><LocalPhoneIcon className='text-red-600'/> Phone: +123456789</li>
          
            </ul>
          </div>

          <div className="col-xs-6 col-md-3 icons top">
            <h6 className='text-white text-xl tracking-widest font-bold text-gray-900 text-start'>Find Us On</h6>
            <ul className="footer-links text-start px-0 ">
              <Link><FacebookIcon className='text-neutral-200 mr-2'/></Link>
              <Link><InstagramIcon className='text-neutral-200 mr-2'/></Link>
              <Link><TwitterIcon className='text-neutral-200 mr-2'/></Link>
              <Link><PinterestIcon className='text-neutral-200 mr-2'/></Link>
            </ul>
          </div>
        </div>
        <hr />
      </div>
      <div className="container">
        <div className="row">
          <div className="col-md-8 col-sm-6 col-xs-12">
            <p className="copyright-text text-start">Copyright &copy; 2017 All Rights Reserved by
              <a href="#">Scanfcode</a>.
            </p>
          </div>

         
        </div>
      </div>
    </footer>
  );
};

export default Footer;
