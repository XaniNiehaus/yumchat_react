import reduxLeaves from 'redux-leaves'
import {createStore} from "redux";

// const initialState = {
//     isUserLoggedIn: false,
//     user: null,
//     chatRooms: [],
//     messages: []
// }

const initialState = {
    isUserLoggedIn: true,
    user: {
        username: "num1",
        email: "1@1.com",
        uid: "grr"
    },
    chatRooms: [],
    messages: []
}

const [reducer, actions] = reduxLeaves(initialState);
const store = createStore(reducer);

export {
    store,
    actions
}
