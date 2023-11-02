import axios from "axios";
export const getUserLogin = (data) => {
  return (dispatch) => {
    dispatch({ type: "add_user_pending" });
    return axios
      .post("http://localhost:8004/user/login", data)
      .then((res) => {
        dispatch({ type: "add_user_success", payload: res.data });
        return Promise.resolve();
      })
      .catch((err) => {
        dispatch({ type: "add_user_failed", payload: err.message });
        return Promise.reject();
      });
  };
};