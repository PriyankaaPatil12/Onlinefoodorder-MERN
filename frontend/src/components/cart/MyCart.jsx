import React, { useEffect } from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import { CiCircleRemove } from "react-icons/ci";
import { AiOutlinePlus, AiOutlineMinus } from "react-icons/ai";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useDispatch, useSelector } from "react-redux";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import cartimg from "../../images/cart.png";

import {
  getAllCart,
  removeFromCart,
  updateQuantity,
} from "../../redux/cart/Action";
import DeleteIcon from "@mui/icons-material/Delete";

const MyCart = () => {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.cart.cartData);

  const removeCart = (id) => {
    dispatch(removeFromCart(id)).then(() => {
      dispatch(getAllCart());
    });
  };
  const updatequantity = (id) => {
    let type = "increment";
    dispatch(updateQuantity(id, type)).then(() => {
      dispatch(getAllCart());
    });
  };

  const deletequantity = (id) => {
    let type = "decrement";
    dispatch(updateQuantity(id, type)).then(() => {
      dispatch(getAllCart());
    });
  };
  console.log(data);

  return (
    <>
      <div className="menusection">
        <h1 className="bg-slate-50 border text-black font-bold px-4 py-2">
          My Cart
        </h1>
      </div>
      <Container>
        <div className="mt-8">
          {data?.result ? (
            <Row className="g-4">
              <Col lg={8} md={8}>
                <Card>
                  <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                      <TableHead className=" bg-slate-900">
                        <TableRow>
                          <TableCell className="text-white" align="center">
                            Image
                          </TableCell>
                          <TableCell className="text-white" align="center">
                            Name
                          </TableCell>
                          <TableCell className="text-white" align="center">
                            Price
                          </TableCell>
                          <TableCell className="text-white" align="center">
                            Quantity
                          </TableCell>

                          <TableCell className="text-white" align="center">
                            Action
                          </TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {data?.data &&
                          data?.data?.map((cart) => (
                            <TableRow key={cart._id}>
                              <TableCell
                                component="th"
                                scope="row"
                                align="center"
                              >
                                <img
                                  src={`${data?.path}/${cart.image}`}
                                  alt=""
                                  className="viewcartImg object-center"
                                  width={90}
                                />
                              </TableCell>
                              <TableCell align="center">{cart.name}</TableCell>
                              <TableCell align="center">{cart.price}</TableCell>
                              <TableCell align="center">
                                <div className="w-24 overflow-hidden rounded-md border border-gray-200 text-center">
                                  <div className="flex justify-center items-center">
                                    <span
                                      className="text-xs"
                                      onClick={() => updatequantity(cart._id)}
                                    >
                                      <AiOutlinePlus />
                                    </span>

                                    <h5 className="mb-0 px-4 py-1 text-base text-canter font-normal">
                                      {cart.quantity}
                                    </h5>

                                    {cart.quantity > 1 ? (
                                      <span
                                        className="text-xs"
                                        onClick={() => deletequantity(cart._id)}
                                      >
                                        <AiOutlineMinus />
                                      </span>
                                    ) : (
                                      <span
                                        className="text-xs"
                                        style={{
                                          color: "gray",
                                          cursor: "not-allowed",
                                        }}
                                      >
                                        <AiOutlineMinus />
                                      </span>
                                    )}
                                  </div>
                                </div>
                              </TableCell>
                              <TableCell align="center">
                                <DeleteIcon
                                  className="text-red-600	"
                                  onClick={() => removeCart(cart._id)}
                                />
                              </TableCell>
                            </TableRow>
                          ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </Card>
              </Col>
              <Col lg={4} md={4}>
                <div className="  sm:px-6  subtotal">
                  <div className="text-2xl font-bold mb-4 ">Order History</div>
                  <div className="mb-2">
                    {data?.data &&
                      data?.data.map((cart) => {
                        return (
                          <div className="flex justify-between text-base font-medium text-gray-900 ">
                            <h5 className="font-medium text-sm">{cart.name}</h5>
                            <h6>
                              ₹ {cart.price} x {cart.quantity}
                            </h6>
                          </div>
                        );
                      })}
                  </div>
                  <div className="flex justify-between text-base font-medium text-gray-900  mt-4">
                    <h5 className="font-bold">SUBTOTAL:</h5>
                    <h5>₹ {data?.total}</h5>
                  </div>
                  <p className="mt-0.5 text-sm text-gray-500 text-start mt-4">
                    Tax included and shipping calculated at checkout
                  </p>
                  <div className="mt-8 ">
                    <Link
                      to="/address"
                      className="flex items-center justify-center bg-black  rounded-md border  no-underline	 px-6 py-3 text-xl font-medium "
                    >
                      <button className="text-white font-normal ">
                        CHECK OUT
                      </button>
                    </Link>
                  </div>
                </div>
              </Col>
            </Row>
          ) : (
            <div className="flex flex-col justify-center items-center">
              <img src={cartimg} width={100} />
              <h3 className="font-bold">Your Cart Is empty</h3>
              <p>We Know Your Food Cravings. Add Your Favorite Meal Now!</p>
            </div>
          )}
        </div>
      </Container>
    </>
  );
};

export default MyCart;
