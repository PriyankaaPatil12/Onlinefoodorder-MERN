import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/main/Header';
import axios from 'axios';
import Menu from './components/pages/ourmenu/Menu';
import HeroSection from './components/pages/home/HeroSection';
import Footer from './components/main/Footer';
import Pizza from './components/pages/ourmenu/Pizza';
import MyCart from './components/cart/MyCart';
import Address from './components/cart/Address';
import Login from './components/auth/Login';
import About from './components/pages/About/About';

function App() {
  axios.interceptors.request.use(
    function (config) {
      // Do something before request is sent
      config.headers["Authorization"] = `${localStorage.getItem("token")}`;
      config.headers["Content-Type"] = "application/json";
      config.headers["Name"] = "alsdfjlsfdjflsjfdsljf";
      return config;
    },
    function (error) {
      // Do something with request error
      return Promise.reject(error);
    }
  );

  // Add a response interceptor
  axios.interceptors.response.use(
    function (response) {
      // Any status code that lie within the range of 2xx cause this function to trigger
      // Do something with response data
      return response;
    },
    function (error) {
      // Any status codes that falls outside the range of 2xx cause this function to trigger
      // Do something with response error
      return Promise.reject(error);
    }
  );
  return (
    <div className="App">
        <Router>
        <Header/>
        <Routes>
          <Route path="/" element={<HeroSection/>}/>
          <Route path="/menu" element={<Menu/>}/>
          <Route path="/about" element={<About/>}/>
          <Route path="/cart" element={<MyCart/>}/>
          <Route path="/address" element={<Address/>}/>
          <Route path="/login" element={<Login  />}/>
        </Routes>
        <Footer/>
      </Router>
    </div>
  );
}


export default App;
