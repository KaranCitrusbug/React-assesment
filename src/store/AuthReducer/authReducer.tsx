import { AuthActionProps, LOGIN,LOGOUT } from "../../types/AuthActionType";
import { AuthStateProps } from "../../types/AuthStateProp";



const initialState  : AuthStateProps= {
  isUserLoggedIn: false,
  user: null,
};

const authReducer = (state = initialState, action:AuthActionProps):AuthStateProps => {
  switch (action.type) {
    case LOGIN:
      return {
        ...state,
        isUserLoggedIn: true,
        user: action.payload,
      };
    case LOGOUT:
      return {
        ...state,
        isUserLoggedIn: false,
        user: null,
      };
    default:
      return state;
  }
};

export default authReducer;
