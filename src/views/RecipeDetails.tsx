import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import React, { useEffect, useState } from 'react';
import { globalStyle } from "../styles";
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { Dose } from "../model/Dosis";
import { Recipe } from "../model/Receta";
import { api } from "../fb";

const bg = require("../img/Background1.png");

const RecipeDetails = ({route, navigation}: any) => {
    const [dosis, setDosis] = useState<Dose[]>([]);
    const {recipe}: {recipe: Recipe} = route ? route.params : {};

    useEffect(() => {
        fetch(api + "doses/" + recipe.id,
        {method: "GET", 
        headers: {
            'Content-Type': 'application/json'
        }})
        .then(response => response.json())
        .then(data => {
            setDosis(data);
        })
        .catch(error => {
            console.error('Error: ', error);
        });
    }, []);

    return(
        <View style={[globalStyle.container]}>
            <Image source={bg} style={[globalStyle.backImage]} />
            <View style={[globalStyle.sheetRecipe]}>
                <View style={[globalStyle.nota]}>
                    <TouchableOpacity onPress={() => navigation.goBack()} style={{marginTop: 10, marginLeft: 10}}>
                        <MaterialIcons name="arrow-back-ios" size={35} color={"#e2b6fe"} />
                    </TouchableOpacity>
                    <Text style={[globalStyle.titleRecipe]}>{recipe.etiqueta}</Text>
                </View>
                <View style={{marginTop: 20, marginLeft: 20}}>
                    <Text style={{color: "black", fontSize: 16}}>Doctor: {recipe.doctor}</Text>
                    <Text style={{color: "black", fontSize: 16}}>Consultorio: {recipe.consultorio}</Text>
                    <Text style={{color: "black", fontSize: 16}}>Fecha consulta: {recipe.fechaConsulta?.toString()}</Text>
                    <Text style={{color: "black", fontSize: 16}}>Observación: {recipe.observacion}</Text>
                </View>
                <TouchableOpacity style={[globalStyle.buttonEditRecipe]} onPress={() => navigation.navigate('RecipeForm', {recipe: recipe})}>
                    <View style={{flexDirection: 'row', alignItems: 'center', alignSelf:'center'}}>
                        <MaterialIcons name="edit" size={24} color={'#FFF'}/>
                        <Text style={{color: "#FFF", fontWeight: 'bold', fontSize: 18}}> MODIFICAR RECETA</Text>
                    </View>
                </TouchableOpacity>
                <ScrollView style={{padding: 10}}>
                {dosis.map(item => item.estatus && (
                <TouchableOpacity key={item.id} style={[globalStyle.containerNotes]} onPress={() => navigation.navigate('DoseForm', {dose: item,idRec: recipe.id})}>
                    <Text style={[globalStyle.titleNote]}>{item.medicamento}</Text>
                </TouchableOpacity>
            ))}
                </ScrollView>
                <TouchableOpacity style={[globalStyle.buttonAddDose]} onPress={() => navigation.navigate('DoseForm', {idRec: recipe.id})}>
                    <MaterialIcons name="add-box" size={28} color={'#FFF'}/>
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default RecipeDetails;