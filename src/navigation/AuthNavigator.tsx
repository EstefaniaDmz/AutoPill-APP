import React from "react";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from "../views/Login";
import SignUpScreen from "../views/SignUp";

const AuthNavigator = () =>{
    const AuthStack = createNativeStackNavigator(); 

    return (
        <AuthStack.Navigator screenOptions={{headerShown: false}}>
            <AuthStack.Screen name="Login" component={LoginScreen} />
            <AuthStack.Screen name="SignUp" component={SignUpScreen} />
        </AuthStack.Navigator>
    );
};

export default AuthNavigator;