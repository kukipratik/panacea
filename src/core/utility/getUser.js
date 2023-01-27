import { collection, getDocs, limit, query, where } from "firebase/firestore";
import { db } from "../../firebase";
import store from '../../store'
import  userSlice  from '../state/userSlice';

//This function is used to get the user data from the database
//This function takes mail as argument and returns the data of the given mail
//Only been implemented for health worker for now
export async function getUserWithMail(mail) {
  let q = query(
    collection(db, "user"),
    where("email", "==", mail),
    limit(1)
  );
  try {
    let data = await getDocs(q);
    let result = [];
    data.forEach((snapShot) => {
      let snap = snapShot.data();
      store.dispatch(userSlice.actions.signIn({
        post:snap.post,
        name:snap.name,
        email:snap.email,
        contactNumber:snap.contactNumber,
        photoUrl:snap.photoUrl||null
      }))
      result.push({
        id: snapShot.id,
        email: snap.email,
        post: snap.post,
        name: snap.name,
      });
    });
    if (result.length === 0) {
      throw new Error("No staff with given user email exists");
    }
    return result[0];
  } catch (error) {
    console.log("error from getUserWithMail", error);
    throw error;
  }
}
