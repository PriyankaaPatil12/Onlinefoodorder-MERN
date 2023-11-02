import React, { useState } from 'react';
import { Link, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getallpizza } from "../../../redux/pizza/Action";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { addtoCart, getAllCart } from "../../../redux/cart/Action";
import PropTypes from "prop-types";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useSpring, animated } from "@react-spring/web";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../../pages/style.css";

const Fade = React.forwardRef(function Fade(props, ref) {
  const {
    children,
    in: open,
    onClick,
    onEnter,
    onExited,
    ownerState,
    ...other
  } = props;
  const style = useSpring({
    from: { opacity: 0 },
    to: { opacity: open ? 1 : 0 },
    onStart: () => {
      if (open && onEnter) {
        onEnter(null, true);
      }
    },
    onRest: () => {
      if (!open && onExited) {
        onExited(null, true);
      }
    },
  });

  return (
    <animated.div ref={ref} style={style} {...other}>
      {React.cloneElement(children, { onClick })}
    </animated.div>
  );
});

Fade.propTypes = {
  children: PropTypes.element.isRequired,
  in: PropTypes.bool,
  onClick: PropTypes.any,
  onEnter: PropTypes.func,
  onExited: PropTypes.func,
  ownerState: PropTypes.any,
};

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 370,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 2,
};

// const descriptionStyle = {
//   maxWidth: "200px", // Set a fixed width or max-width for the description
//   overflow: "hidden",
//   whiteSpace: "nowrap",
//   textOverflow: "ellipsis",
// };

const Pizza = () => {
  const { id } = useParams();
  console.log(id);
  const dispatch = useDispatch();
  React.useEffect(() => {
    dispatch(getallpizza(id));
  }, [id]);

  const data = useSelector((state) => state.pizza.pizzas);
  console.log(data);

  const addtocart = (item) => {
    console.log(item);
    dispatch(addtoCart(item)).then(() => {
      dispatch(getAllCart());
      // Call the notify function here
      notify();
    });
  };

  const notify = () =>
    toast.success("Pizza Added To Cart", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,

      draggable: true,
      progress: undefined,
      theme: "colored",
    });

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [isExpanded, setIsExpanded] = useState(false);


  return (
    <>
      <div className=" space-y-12 grid sm:grid-cols-2 lg:grid-cols-3  lg:gap-x-6 lg:space-y-0 mt-20 mx-2">
        {data?.data &&
          data?.data.map((pizza, ind) => {
            console.log(pizza);
            return (
              <Card className="mb-4" key={pizza._id}>
                <Row className="g-0 ">
                  <Col md={5}>
                    <img
                      src={`${data.path}/${pizza.image}`}
                      key={ind}
                      className="w-full h-full m-0 p-2 rounded-3xl object-cover"
                      alt="..."
                    />
                  </Col>
                  <Col md={7}>
                    <Card.Body>
                      <Card.Title className="text-start">
                        {pizza.name}
                      </Card.Title>
                      <Card.Text className="description text-start text-xm text-[#848484]">
                      
                          {isExpanded
                            ? pizza.details
                            : pizza.details.slice(0, 45)}
                        
                        {pizza.details.length > 45 && (
                          <button className='text-[#02954c]' onClick={() => setIsExpanded(!isExpanded)}>
                            {isExpanded ? "Read less" : "...Read More"}
                          </button>
                        )}
                      </Card.Text>
                      <p className="text-start text-sm text-[#008000] mb-2">
                        Customisation Available
                      </p>
                      <p className="text-start mb-2">⭐⭐⭐⭐⭐</p>
                      <Card.Text>
                        <div className="flex flex-row justify-between">
                          <button
                            onClick={() => addtocart(pizza?._id)}
                            className="border rounded-lg	  text-[#02954c] px-3 rounded-sm  tracking-wider"
                          >
                            ADD+
                          </button>

                          <ToastContainer
                            position="top-right"
                            autoClose={5000}
                            hideProgressBar={false}
                            newestOnTop={false}
                            closeOnClick
                            rtl={false}
                            pauseOnFocusLoss
                            draggable
                            pauseOnHover
                            theme="colored"
                          />
                          {/* <Modal
                            aria-labelledby="spring-modal-title"
                            aria-describedby="spring-modal-description"
                            open={open}
                            onClose={handleClose}
                            closeAfterTransition
                            slots={{ backdrop: Backdrop }}
                            slotProps={{
                              backdrop: {
                                TransitionComponent: Fade,
                              },
                            }}
                          >
                            <Fade in={open}>
                              <Box sx={style}>
                                <Card.Img
                                  variant="top"
                                  src={`${data.path}/${pizza.image}`}
                                  className="m-0 p-2 rounded-3xl"
                                />
                                <Card.Body>
                                  <Card.Title className="font-bold my-2">
                                    {pizza.name}
                                  </Card.Title>
                                  <Card.Text className="text-[#666] text-sm">
                                    {pizza.details}
                                  </Card.Text>
                                  <Card.Text className="text-start text-sm text-[#008000] mb-2">
                                    Customisation Available
                                  </Card.Text>
                                  <Card.Text className="font-medium">
                                    ₹{pizza.price}
                                  </Card.Text>
                                  <button
                                    onClick={() => addtocart(pizza?._id)}
                                    className="bg-[#02954c] border text-white px-2 py-2 rounded-lg flex flex-center"
                                  >
                                    Add To Cart
                                  </button>
                               
                                </Card.Body>
                              </Box>
                            </Fade>
                          </Modal> */}
                          <h6 className="text-lg">₹{pizza.price}</h6>
                        </div>
                      </Card.Text>
                    </Card.Body>
                  </Col>
                </Row>
              </Card>
            );
          })}
      </div>
    </>
  );
};

export default Pizza;
