import axios from "axios";

export const addtoCart = (id) => {
    return (dispatch) => {
      dispatch({ type: "add_cart_pending" });
      return axios
        .get("http://localhost:8004/cart/addcart/" + id)
        .then((res) => {
          dispatch({ type: "add_cart_success", payload: res.data });
          return Promise.resolve();
        })
        .catch((error) => {
          dispatch({ type: "add_cart_failed", payload: error.message });
          return Promise.reject();
        });
    };
  };
  

  export const getAllCart = () => {
    return (dispatch) => {
      dispatch({ type: "get_carts_pending" });
      axios
        .get("http://localhost:8004/cart/getallcart")
        .then((res) => {
          //console.log(res.data);
          dispatch({ type: "get_carts_success", payload: res.data });
        })
        .catch((error) => {
          dispatch({ type: "get_carts_failed", payload: error.message });
        });
    };
  };

  export const removeFromCart = (id) => {
    return (dispatch) => {
      dispatch({ type: "remove_cart_pending" });
      return axios
        .delete(`http://localhost:8004/cart/deletecart/${id}`)
        .then((res) => {
          //console.log(res.data);
          dispatch({ type: "remove_cart_success", payload: res.data });
        })
        .catch((error) => {
          dispatch({ type: "remove_cart_failed", payload: error.message });
        });
    };
  };
  


  export const updateQuantity = (id, type) => {
    console.log(type);
    return (dispatch) => {
      dispatch({ type: "update_quantity_pending" });
      return axios
        .put(
          `http://localhost:8004/cart/updatecart/${id}?updatetype=${type}`
        )
        .then((res) => {
          //console.log(res.data);
          dispatch({ type: "update_quantity_success", payload: res.data });
        })
        .catch((error) => {
          dispatch({ type: "update_quantity_failed", payload: error.message });
        });
    };
  };
  
