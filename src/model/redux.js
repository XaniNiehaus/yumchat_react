import reduxLeaves from 'redux-leaves'
import {createStore} from "redux";

const initialState = {
    isUserLoggedIn: false,
    user: null,
    chatRooms: [],
    messages: []
}

const [reducer, actions] = reduxLeaves(initialState);
const store = createStore(reducer);

export {
    store,
    actions
}