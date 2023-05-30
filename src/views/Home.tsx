import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import React, { useEffect, useState } from 'react';
import { globalStyle } from "../styles";
import { firestore, auth } from "../firebase";
import { useDispatch, useSelector } from "react-redux";
import { addUser, userSelector } from "../redux/reducers/userReducer";
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { Recipe } from "../model/Receta";
import { api } from "../fb";

const bg = require("../img/Background1.png");

const HomeScreen = ({navigation}: any) => {
    const [recetas, setRecetas] = useState<Recipe[]>([]);

    const user = useSelector(userSelector);
    useEffect(() => {
        fetch(api + "recipes/" + user.uid, 
        {method: "GET", 
        headers: {
            'Content-Type': 'application/json'
        }})
        .then(response => response.json())
        .then(data => {
            setRecetas(data);
        })
        .catch(error => {
            console.error('Error: ', error);
        });
    }, []);

    const dispatch = useDispatch();
    const handleLogout = () => {
        auth().signOut().then(()=>{
            dispatch(addUser({
                uid: '', 
                fcmtoken: '',
            }))
        })
    };

    return (
        <View style={[globalStyle.container]}>
            <Image source={bg} style={[globalStyle.backImage]} />
            <TouchableOpacity style={[globalStyle.buttonAN]} onPress={() => navigation.navigate('RecipeForm', {})}>
                <View style={{flexDirection: 'row', alignItems: 'center', alignSelf:'center'}}>
                <MaterialIcons name="post-add" size={28} color={'#FFF'}/>
                <Text style={{color: "#FFF", fontWeight: 'bold', fontSize: 18}}> AÑADIR RECETA</Text>
                </View>
            </TouchableOpacity>
           <ScrollView style={{padding: 20}}>
            {recetas.map(item => item.estatus && (
                <TouchableOpacity key={item.id} style={[globalStyle.containerNotes]} onPress={() => navigation.navigate('RecipeDetails', {recipe: item})}>
                    <Text style={[globalStyle.titleNote]}>{item.etiqueta}</Text>
                </TouchableOpacity>
            ))}
           </ScrollView>
            <TouchableOpacity style={[globalStyle.buttonCS]} onPress={handleLogout}>
                <Text style={{color: "#FFF", fontWeight: 'bold', fontSize: 18}}>Cerrar sesión</Text>
            </TouchableOpacity>
            
        </View>
    );
};

export default HomeScreen;