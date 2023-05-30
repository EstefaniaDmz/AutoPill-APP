import React, { useEffect, useRef, useState } from 'react';
import { Image, TextInput, TouchableOpacity, View, Text, Alert, ToastAndroid, ScrollView } from 'react-native';
import { useSelector } from 'react-redux';
import { Recipe } from '../model/Receta';
import { userSelector } from '../redux/reducers/userReducer';
import { globalStyle } from '../styles';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { api } from '../fb';

const bg = require("../img/Background2.png");

const RecipeForm = (({route, navigation} : any) => {
    const {recipe}: {recipe: Recipe} = route ? route.params : {};

    const [etiqueta, setEtiqueta] = useState("");
    const [doctor, setDoctor] = useState("");
    const [consultorio, setConsultorio] = useState("");
    const [fechaConsulta, setFechaConsulta] = useState("");
    const [observacion, setObservacion] = useState("");

    const user = useSelector(userSelector);

    useEffect(() => {
        if (recipe && (recipe.estatus || recipe.fechaConsulta)){
            recipe.etiqueta && setEtiqueta(recipe.etiqueta);
            recipe.doctor && setDoctor(recipe.doctor);
            recipe.consultorio && setConsultorio(recipe.consultorio);
            recipe.fechaConsulta && setFechaConsulta(recipe.fechaConsulta.toString());
            recipe.observacion && setObservacion(recipe.observacion);
        }
    }, [recipe])

    const handleSaveRecipe = () => {
        if(doctor && consultorio && fechaConsulta){
            const fecha = new Date(fechaConsulta);
            fetch(api + "recipes", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    etiqueta: etiqueta,
                    doctor: doctor,
                    consultorio: consultorio,
                    fechaConsulta: fecha,
                    observacion: observacion ?? '',
                    idUsuario: user.uid,
                    estatus: true})
            }).then(response => response.json())
            .then(dato => {
                console.log('Datos insertados: ', dato);
            })
            .catch(error => {
                console.log("Error: ", error);
            });
        };
        navigation.goBack();
    };

    const handleUpdateRecipe = () => {
        if(consultorio && doctor && fechaConsulta){
            const fecha = new Date(fechaConsulta);
            fetch(api + "recipes/" + recipe.id, 
            {
                method: "PUT",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    etiqueta: etiqueta,
                    doctor: doctor,
                    consultorio: consultorio,
                    fechaConsulta: fecha,
                    observacion: observacion ?? ''
                })
            }).then(response => response.json())
            .then(dato => {
                console.log('Datos modificados: ', dato);
            })
            .catch(error => {
                console.log("Error: ", error);
            });
        };
        navigation.goBack();
    };

    const handleDeleteRecipe = () => {
        Alert.alert('Advertencia', '¿Seguro de eliminar para siempre esta receta con todas sus dósis?', [
            {
                text: 'No',
                onPress: () => {},
            },
            {
                text: 'Sí',
                onPress: () => {
                    fetch(api +"recipes/" + recipe.id, {method: "DELETE",
                    headers: {
                        'Content-Type': 'application/json'
                    }})
                    .then(response => response.json())
                    .then(() => {
                        ToastAndroid.show("La receta se ha eliminado correctamente", ToastAndroid.SHORT);
                        navigation.goBack();
                    }
                    )
                    .catch(error => {
                        console.log("Error: ", error);
                    });
                }
            }
        ])
    };

    return(
        <View style={[globalStyle.container]}>
            <Image source={bg} style={[globalStyle.backImage]} />
            <View style={{padding: 20}}>
                <View style={[globalStyle.nota]}>
                    <TouchableOpacity onPress={() => navigation.goBack()} style={{marginTop: 10,}}>
                        <MaterialIcons name="arrow-back-ios" size={35} color={"#6200ac"} />
                    </TouchableOpacity>

                    <TextInput value={etiqueta}
                    placeholder='Etiqueta'
                    style={[globalStyle.inputTitle]}
                    onChangeText={val => setEtiqueta(val)}
                    maxLength={50}
                    />
                </View>
                <View style={{marginTop: 30}}>
                <Text style={{color: "black"}}>Doctor:</Text>
                <TextInput value ={doctor}
                placeholder='Ej. Juan Peréz'
                style={[globalStyle.inputCuerpo]}
                maxLength={200}
                onChangeText={val => setDoctor(val)}
                />
                <Text style={{color: "black"}}>Consultorio:</Text>
                <TextInput value={consultorio}
                placeholder='Ej. Hospital IMSS'
                style={[globalStyle.inputCuerpo]}
                maxLength={100}
                onChangeText={val => setConsultorio(val)}
                /> 
                <Text style={{color: "black"}}>Fecha Consulta:</Text>
                <TextInput value={fechaConsulta}
                placeholder='Ej. 12-12-2020'
                style={[globalStyle.inputCuerpo]}
                onChangeText={val => setFechaConsulta(val)}
                /> 
                <Text style={{color: "black"}}>Observación:</Text>
                <TextInput value={observacion}
                placeholder='Ej. Antes de cada comida tomar agua.'
                style={[globalStyle.inputCuerpo]}
                maxLength={150}
                onChangeText={val => setObservacion(val)}
                />

                {!recipe && (<TouchableOpacity style={[globalStyle.buttonCS]} onPress={handleSaveRecipe}>
                    <View style={{flexDirection: 'row', alignItems: 'center', alignSelf:'center'}}>
                        <MaterialIcons name="save" size={28} color={'#FFF'} />
                        <Text style={{color: "#FFF", fontWeight: 'bold', fontSize: 18}}> Guardar</Text>
                    </View>
                </TouchableOpacity>)}

                {recipe && (
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <TouchableOpacity style={[globalStyle.buttonDEL]} onPress={handleDeleteRecipe}>
                        <View style={{flexDirection: 'row', alignItems: 'center', alignSelf:'center'}}>
                            <MaterialIcons name="delete" size={28} color={'#FFF'} />
                            <Text style={{color: "#FFF", fontWeight: 'bold', fontSize: 18}}> Eliminar</Text>
                        </View>
                    </TouchableOpacity>
                <TouchableOpacity style={[globalStyle.buttonSU]} onPress={handleUpdateRecipe}>
                    <View style={{flexDirection: 'row', alignItems: 'center', alignSelf:'center'}}>
                        <MaterialIcons name="save" size={28} color={'#FFF'} />
                        <Text style={{color: "#FFF", fontWeight: 'bold', fontSize: 18}}> Guardar</Text>
                    </View>
                </TouchableOpacity>
                </View>)}
                </View>
            </View>
        </View >
    );
})

export default RecipeForm;