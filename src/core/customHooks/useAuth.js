import { onAuthStateChanged } from 'firebase/auth';
import { useEffect, useState } from 'react';
import {auth} from '../../firebase';
import { useSelector ,useDispatch} from 'react-redux';
import { getUserWithMail } from '../utility/getUser';
import { signOutFunc } from '../utility/SignInFeatures';
import userSlice from '../state/userSlice';

let useAuth = () =>{
    let [user,setUser] = useState(null)
    const email = useSelector((state)=>{
        return state.user.email
    })
    const dispatch = useDispatch();
    useEffect(()=>{
        onAuthStateChanged(auth,(user)=>{
            setUser(user)
            if(user){
                if(email.length === 0){
                        getUserWithMail(user.email).then((data)=>{
                            dispatch(userSlice.actions.signIn({
                                email:data.email,
                                name:data.name,
                                post:data.post,
                                id:data.id
                            }))
                        }).catch((err)=>{
                            console.log(err)
                            console.log("some error has occured");
                            signOutFunc()
                            dispatch(userSlice.actions.signOut())
                        });                 
                }
            }else{
                dispatch(userSlice.actions.signOut())
            }
        })
    })
    return user;
}

export default useAuth