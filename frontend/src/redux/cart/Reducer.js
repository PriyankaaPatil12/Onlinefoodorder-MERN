const initialState = {
    cartData: {},
    success: false,
    error: null,
    isLoading: false,
  };

  const cartReducer = (state = initialState, action) => {
  switch (action.type) {
  
    case "add_cart_pending":
      return {
        ...state,
        isLoading: true,
      };
    case "add_cart_success":
      return {
        ...state,
        isLoading: false,
        success: true,
      };
    case "add_cart_failed":
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };

    case "get_carts_pending":
      return {
        ...state,
        isLoading: true,
      };
    case "get_carts_success":
      return {
        ...state,
        isLoading: false,
        success: true,
        cartData: action.payload,
      };
    case "get_carts_failed":
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };

    case "update_quantity_pending":
      return {
        ...state,
        isLoading: true,
      };
    case "update_quantity_success":
      return {
        ...state,
        isLoading: false,
        success: true,
      };
    case "update_quantity_failed":
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };

    case "remove_cart_pending":
      return {
        ...state,
        isLoading: true,
      };
    case "remove_cart_success":
      return {
        ...state,
        isLoading: false,
        success: true,
      };
    case "remove_cart_failed":
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};
export default cartReducer;
