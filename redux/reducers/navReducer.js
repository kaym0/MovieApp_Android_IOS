import { AppNavigator } from '../../router/AppNavigation';


const ActionForScreen1 = AppNavigator.router.getActionForPathAndParams(
	"Main"
);
const initialState = {
	routeName: "test"
}
//const initialState = AppNavigator.router.getStateForAction(AppNavigator.router.getActionForPathAndParams("Main"))
export const navigationReducer = (state = initialState, action) => {
  
    // **action**  will be of type: {"type": "Navigation/NAVIGATE", "routeName": SOME_ROUTE}
    // gets the new updated state of the navigator (previous state + new route), will return null if the action is not understandable.
    const newState = AppNavigator.router.getStateForAction(action, state)
    // return newState or previous state if newState is null
    return newState || state;
}