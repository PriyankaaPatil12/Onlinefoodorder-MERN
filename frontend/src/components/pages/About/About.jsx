import React from "react";
import { Col, Row } from "react-bootstrap";
import img1 from "../../../images/1441pizzeria-about-us.jpg";
import img2 from "../../../images/how-we-started.jpg";
import img3 from "../../../images/what-do-we-do.jpg";
import Container from "@mui/material/Container";
import "../../pages/style.css";

const About = () => {
  return (
    <>
      <div className="about">
        <h1 className="bg-slate-50 border text-black font-bold px-4 py-2">
          About Us
        </h1>
      </div>

      <Container>
        <section className="pt-10 text-start">
          <Row>
            <Col sm={6}>
              <div className="mainline">
                <h3 className="line text-3xl text-black font-bold	mb-6">
                  Who are we?
                </h3>
                <p className="text-lg leading-relaxed text-[#201C1D]">
                  1441 Pizzeria is inspired by 14° East and 41° North, the
                  coordinates of Naples, Italy where the first woodfired pizza
                  originated. Our menu is curated by Master Chef, Renato Viola
                  of Italy using special in-house sauces and choicest toppings
                  that will leave you craving for more.{" "}
                </p>
              </div>
            </Col>
            <Col sm={6}>
              <img src={img1} className="rounded-lg w-full h-4/5" />
            </Col>
          </Row>
        </section>
      </Container>

      <section className="pt-10 text-start bg-black " >
        <Container >
          <Row >
            <Col sm={6}>
              <img src={img2} className="rounded-xl w-full h-3/4" />
            </Col>
            <Col sm={6}>
              <div className="mainline ml-2 ">
                <h3 className="line text-3xl text-white font-bold	mb-6">
                  How We Started?
                </h3>
                <p className="text-lg leading-loose text-white">
                  A journey that started in Italy, 1441 Pizzeria is a venture by
                  Trofi Chain Factory Pvt. Ltd., a culinary art house.
                  Established in 2015 with the desire to bring Authentic Pizzas
                  from the streets of Naples to the heart of Mumbai, 1441
                  Pizzeria started its first outlet in Andheri, Mumbai.
                </p>
                <p className="mt-2 text-white">
                  Ever since 1441 has grown to 20+ outlets and a team of 200+
                  across India.{" "}
                </p>
                <p className="mt-2 text-white">
                  Whether it’s our dine-in or your doorstep, you choose, we
                  deliver!{" "}
                </p>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      <Container>
        <section className="pt-10 text-start ">
          <Row>
            <Col sm={6}>
              <div className="mainline">
                <h3 className="line text-3xl text-black font-bold	mb-6">
                  What do we do?
                </h3>
                <p className="my-4 text-xl">Spoil you! Yes, you heard it right.</p>
                <p className="text-lg leading-relaxed text-[#201C1D]">
                  We at 1441 Pizzeria want you to don the chef’s hat and Make
                  your Own Pizza by choosing from over 30 toppings, all prepared
                  fresh every morning and make a pizza that you can devour.
                </p>
              </div>
            </Col>
            <Col sm={6}>
              <img src={img3} className="rounded-lg w-full h-3/5" />
            </Col>
          </Row>
        </section>
      </Container>
    </>
  );
};

export default About;
