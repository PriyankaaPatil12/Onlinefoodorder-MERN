import React from "react";
import img1 from "../../../images/01.jpg";
import img2 from "../../../images/02.jpg";
import img3 from "../../../images/06.jpg";
import img4 from "../../../images/14.jpg";
import img5 from "../../../images/15.jpg";
import img6 from "../../../images/16.jpg";
import { Link } from "react-router-dom";

const callouts = [
  {
    imageSrc: img1,
    to: "/menu",
  },
  {
    imageSrc: img6,
    to: "/menu",
  },
  {
    imageSrc: img2,
    to: "/menu",
  },
  {
    imageSrc: img3,
    to: "/menu",
  },
  {
    imageSrc: img4,
    to: "/menu",
  },
  {
    imageSrc: img5,
    to: "/menu",
  },
];

const PizzaSection = () => {
  return (
    <div>
      <div className="">
        <div className=" px-4 sm:px-6 lg:px-8">
          <div className="py-16 sm:py-24 lg:max-w-none lg:py-32">
            <h2 className="text-3xl tracking-wider font-black text-gray-900 ">
              ORDER NOW
            </h2>

            <div className="mt-6 space-y-12 lg:grid lg:grid-cols-6  lg:space-y-0">
              {callouts.map((callout) => (
                <div key={callout.name} className="">
                  <div className="relative h-80 w-full overflow-hidden  bg-white sm:aspect-h-1 sm:aspect-w-2 lg:aspect-h-1 lg:aspect-w-1 group-hover:opacity-75 sm:h-64">
                   <Link to={callout.to}>
                   <img
                      src={callout.imageSrc}
                      className="h-full w-full object-cover object-center"
                    />
                   </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PizzaSection;
