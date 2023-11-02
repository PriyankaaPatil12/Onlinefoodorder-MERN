const initialState = {
    users: [],
    user: {},
    success: false,
    error: null,
    isLoading: false,
  };
  
  const UserReducer = (state = initialState, action) => {
    switch (action.type) {
      // get user
      case "add_user_pending":
        return {
          ...state,
          isLoading: true,
        };
      case "add_user_success":
        console.log(action.payload);
        return {
          ...state,
          isLoading: false,
          user: action.payload,
          success: true,
        };
      case "add_user_failed":
        return {
          ...state,
          isLoading: false,
          error: action.payload,
        };
      default:
        return state;
    }
  };
  
  export default UserReducer;