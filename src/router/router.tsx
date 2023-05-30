import React, { useEffect, useState } from "react";
import { auth } from "../firebase";
import { useDispatch, useSelector } from "react-redux";
import { addUser, userSelector } from "../redux/reducers/userReducer";
import HomeNavigator from "../navigation/HomeNavigator";
import { NavigationContainer } from '@react-navigation/native';
import AuthNavigator from "../navigation/AuthNavigator";

const Router = () =>{
    const dispatch = useDispatch();
    useEffect(() => {
        const user = auth().currentUser;
        if (user){
            dispatch(addUser({
                uid: user.uid,
                fcmtoken: '',
            }),);
        }
    }, []);
   const userData = useSelector(userSelector);
   
   return <NavigationContainer>
    {
        userData.uid ? <HomeNavigator /> : <AuthNavigator />
    }
   </NavigationContainer>
}

export default Router;