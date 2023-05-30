import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import HomeScreen from '../views/Home';
import RecipeForm from '../views/RecipeForm';
import DoseForm from '../views/DoseForm';
import RecipeDetails from '../views/RecipeDetails';

const HomeNavigator = () => {

    const HomeStack = createNativeStackNavigator();

    return (
      <HomeStack.Navigator screenOptions={{headerShown: false}}>
        <HomeStack.Screen name="HomeScreen" component={HomeScreen} />
        <HomeStack.Screen name="RecipeForm" component={RecipeForm} />
        <HomeStack.Screen name="DoseForm" component={DoseForm} />
        <HomeStack.Screen name="RecipeDetails" component={RecipeDetails} />
      </HomeStack.Navigator>
    );
};

export default HomeNavigator;