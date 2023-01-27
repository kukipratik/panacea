import { signInWithEmailAndPassword ,signOut} from "firebase/auth";
import {auth} from '../../firebase'


export async function signIn(email,password){
    try{
        await signInWithEmailAndPassword(auth,email,password)
        return {
            success:true
        }
    }catch(error){
        console.log("error at signIn function : ",error)
        return {
            success:false,
            message:error.message
        }
    }
}

export async function signOutFunc(email){
    try{
        await signOut(auth)
    }catch(error){
        console.log("error at signOut function",error)
        return {
            success:false,
            message:error.message
        }
    }
}