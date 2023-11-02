const initialState = {
    pizzas: [],
    pizza: {},
    success: false,
    error: null,
    isLoading: false,
  };
  

  const pizzaReducer = (state = initialState, action) => {
    switch (action.type) {
      case " get_pizza_pending":
        return {
          ...state,
          isLoading: true,
        };
      case "get_pizza_success":
        return {
          ...state,
          isLoading: false,
          pizzas: action.payload,
        };
      case "get_pizza_failed":
        return {
          ...state,
          isLoading: false,
          error: action.payload,
        };
        default:
            return state;
    } 
    
}

export default pizzaReducer;
