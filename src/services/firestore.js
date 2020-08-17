import {firestoreDb} from "./firebase"

export const doesUserExist = async (username) => {
    let snapshot = await firestoreDb.collection("users").where("username", "==", username).get();
    return !snapshot.empty;
}

export const updateUserInfo = async (email, userInfo) => {
    let snapshot = await firestoreDb.collection("users").where("email", "==", email).get();
    if (snapshot.isEmpty) return;
    return snapshot.docs[0].ref.update(userInfo)
}

export const createNewUser = async (userDocument) => {
    return await firestoreDb.collection("users").add(userDocument);
}

export const getUserByUid = async (uid) =>{
    let snapshot = await firestoreDb.collection("users").where("uid", "==", uid).get();
    return snapshot.docs[0].data();
}

// snapshot.docs[0].data();
// or snapshot.docs[0].get("field")
