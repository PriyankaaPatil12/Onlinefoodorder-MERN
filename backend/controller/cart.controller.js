import pizzaModel from "../model/pizza.model";
import cartModel from "../model/cart.model";

export const getAllCartItem = async (req, res) => {
    try {
      const cartData = await cartModel.find();
      console.log(cartData);
      let total = 0;
      if (cartData) {
        cartData.map((ele) => {
          total += ele.subtotal;
        });
        // console.log("total", total);
        return res.status(200).json({
          data: cartData,
          message: "success",
          path: "http://localhost:8004/uploads/pizza",
          result: cartData.length,
          total: total,
        });
      }
    } catch (error) {
      return res.status(500).json({
        message: error.message,
      });
    }
  };
  
  export const addToCart = async (req, res) => {
    try {
      const pizzaid = req.params.pizza_ID;
      console.log(pizzaid);
      const productData = await pizzaModel.findOne({ _id: pizzaid });
  
      const existCartItem = await cartModel.findOne({
        pizzaID: pizzaid,
        //userID: userid,
      });
  
      console.log(existCartItem);
      if (existCartItem) {
        let quantity = existCartItem.quantity + 1;
        let price = productData.price * quantity;
        console.log(quantity, "quan");
        let updatedItem = await cartModel.updateOne(
          {
            _id: existCartItem._id,
          },
          {
            $set: {
              quantity: quantity,
              subtotal: price,
            },
          }
        );
  
        if (updatedItem.acknowledged) {
          return res.status(200).json({
            message: "updated",
          });
        }
      }
  
      const cartData = new cartModel({
        //userID: userid,
        pizzaID: pizzaid,
        name: productData.name,
        price: productData.price,
        quantity: 1,
        subtotal: productData.price,
        image: productData.image,
      });
      cartData.save();
      if (cartData) {
        return res.status(201).json({
          data: cartData,
          message: "Successfully added",
          path: "http://localhost:8004/uploads/pizza",
        });
      }
    } catch (error) {
      return res.status(500).json({
        message: error.message,
      });
    }
  };


 
  
  export const updateQuantity = async (req, res) => {
    try {
      const cartID = req.params.cart_id;
      const { updatetype } = req.query;
  
      const cartData = await cartModel.findOne({ _id: cartID });
  
      let quantity = cartData.quantity;
      let subtotal = cartData.price;
  
      if (updatetype === "increment") {
        quantity += 1;
        subtotal = subtotal * quantity;
      }
      if (updatetype === "decrement") {
        quantity -= 1;
        subtotal = subtotal * quantity;
      }
  
      const updatedQuantity = await cartModel.updateOne(
        { _id: cartID },
        {
          $set: {
            quantity: quantity,
            subtotal: subtotal,
          },
        }
      );
      if (updatedQuantity.acknowledged) {
        return res.status(200).json({
          message: "Updated",
        });
      }
    } catch (error) {
      return res.status(500).json({
        message: error.message,
      });
    }
  };
  

  export const removeFromCart = async (req, res) => {
    try {
      const cartId = req.params.cart_id;
  
      let removeCart = await cartModel.deleteOne({ _id: cartId });
  
      if (removeCart.acknowledged) {
        return res.status(200).json({
          data: removeCart,
          message: "deleted",
        });
      }
    } catch (error) {
      return res.status(500).json({
        message: error.message,
      });
    }
  };
  