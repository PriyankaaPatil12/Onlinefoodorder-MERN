import axios from "axios"


export const getallpizza = () => {
    return (dispatch) => {
      dispatch({ type: "get_pizza_pending" });
      axios
        .get("http://localhost:8004/pizza/getallpizza")
        .then((res) => {
          console.log(res.data);
          dispatch({ type: "get_pizza_success", payload: res.data });
        })
        .catch((error) => {
          dispatch({ type: "get_pizza_failed", payload: error.message });
        });
    };
  };