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
    chatRooms: [
        {
            groupName: "YumChat Global",
            id: "todo",
            isGroupChat: true,
            users: ["xander"]
        }, {
            groupName: "Markus",
            id: "kj135j12",
            isGroupChat: false,
            users: ["xander", "Markus"]
        }],
    currentlyOpenChat: {
        groupName: "YumChat Global",
        id: "todo",
        isGroupChat: true,
        users: ["xander"]
    },
    messages: [
        {
            id: "mes1",
            chatId: "todo",
            message: "hi, message 1",
            imgUrl: "",
            sentBy: "Xander",
            timeSent: "todoTimestamp",
            readBy: [],
        },
        {
            id: "mes2",
            chatId: "todo",
            message: "hi, message 2",
            imgUrl: "",
            sentBy: "Xander",
            timeSent: "todoTimestamp",
            readBy: [],
        }]
}

const [reducer, actions] = reduxLeaves(initialState);
const store = createStore(reducer);

export {
    store,
    actions
}
