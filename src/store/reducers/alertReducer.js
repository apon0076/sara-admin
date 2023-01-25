import { 
  SUCCESS, 
  ERROR, 
  CLEAR
  
} from "../actions/alertAction";

export default function alertReducer(state = {}, action) {
  switch (action.type) {
    case SUCCESS:
      return {
        type: "ALERT_SUCCESS",
        message: action.message,
      };

    case ERROR:
      return {
        type: "ALERT_DANGER",
        message: action.message,
      };

    case CLEAR:
      return {};

    default:
      return state;
  }
}
