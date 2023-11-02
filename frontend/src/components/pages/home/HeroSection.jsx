import React from "react";
import { Link } from "react-router-dom";
import "./../style.css"
import PizzaSection from "./PizzaSection";
const products = [
  {
    id: 1,
    name: 'Basic Tee',
    href: '#',
    imageSrc: 'https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-01.jpg',
    imageAlt: "Front of men's Basic Tee in black.",
    price: '$35',
    color: 'Black',
  },
  // More products...
]

const HeroSection = () => {
  return (
    <div>
      <div className=" herosection">
        <div class="top">
          <h2 className="" >
          The
          </h2>
          <h1 className="" >
          PIZZA SHOP
          </h1>
          <h4 >TAKEOUT & DELIVERY</h4>
          <Link to="/menu" className="">
            <button className="mt-4  bg-black text-xl text-white px-4 py-2 tracking-wider">Order Online</button>
          </Link>
        </div>
      </div>

     
    <PizzaSection/>
    </div>
  );
};

export default HeroSection;
