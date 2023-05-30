import React, { useEffect, useRef, useState } from 'react';
import { Image, TextInput, TouchableOpacity, View, Text, Alert, ToastAndroid, ScrollView } from 'react-native';
import { useSelector } from 'react-redux';
import { Dose } from '../model/Dosis';
import { userSelector } from '../redux/reducers/userReducer';
import { globalStyle } from '../styles';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { api } from '../fb';

const bg = require("../img/Background2.png");

const DoseForm = (({route, navigation} : any) => {
    const {dose}: {dose: Dose} = route ? route.params : {};
    const {idRec}: {idRec: ""} = route ? route.params : {};

    const [medicamento, setMedicamento] = useState("");
    const [cantidadTomar, setCantidadTomar] = useState("");
    const [cuantosDias, setCuantosDias] = useState("");
    const [cadaHora, setCadaHora] = useState("");
    const [fechaPrimeraToma, setFechaPrimeraToma] = useState("");
    const [fechaUltimaToma, setFechaUltimaToma] = useState("");
    const [recipiente, setRecipiente] = useState("");

    useEffect(()=> {
        if(dose && (dose.medicamento || dose.fechaPrimeraToma)){
            dose.medicamento && setMedicamento(dose.medicamento);
            dose.cantidadTomar && setCantidadTomar(dose.cantidadTomar.toString());
            dose.cuantosDias && setCuantosDias(dose.cuantosDias.toString());
            dose.cadaHora && setCadaHora(dose.cadaHora.toString());
            dose.fechaPrimeraToma && setFechaPrimeraToma(dose.fechaPrimeraToma.toString());
            dose.fechaUltimaToma && setFechaUltimaToma(dose.fechaUltimaToma.toString());
            dose.recipiente && setRecipiente(dose.recipiente);
        };
    }, [dose]);

    const handleSaveDose = () => {
        if(medicamento && fechaPrimeraToma && recipiente && cantidadTomar && cuantosDias && cadaHora && fechaUltimaToma){
            const fecha = new Date(fechaPrimeraToma);
            const fechaDos = new Date(fechaUltimaToma);
            fetch(api + "doses", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    medicamento: medicamento,
                    cantidadTomar: cantidadTomar,
                    cuantosDias: cuantosDias,
                    cadaHora: cadaHora,
                    fechaPrimeraToma: fecha,
                    fechaUltimaToma: fechaDos,
                    recipiente: recipiente,
                    estatus: true,
                    idReceta: idRec})
            }).then(response => response.json())
            .then(dato => {
                console.log('Datos insertados: ', dato);
            })
            .catch(error => {
                console.log("Error: ", error);
            });
        };
        navigation.navigate('HomeScreen');
    };

    const handleUpdateDose = () => {
        if(medicamento && fechaPrimeraToma && recipiente && cantidadTomar && cuantosDias && cadaHora && fechaUltimaToma){
            const fecha = new Date(fechaPrimeraToma);
            const fechaDos = new Date(fechaUltimaToma);
            fetch(api + "doses/" + dose.id, 
            {
                method: "PUT",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    medicamento: medicamento,
                    cantidadTomar: cantidadTomar,
                    cuantosDias: cuantosDias,
                    cadaHora: cadaHora,
                    fechaPrimeraToma: fecha,
                    fechaUltimaToma: fechaDos,
                    recipiente: recipiente
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

    const handleDeleteDose = () => {
        Alert.alert('Advertencia', '¿Seguro de eliminar para siempre esta dósis?', [
            {
                text: 'No',
                onPress: () => {},
            },
            {
                text: 'Sí',
                onPress: () => {
                    fetch(api + "doses/" + dose.id, {method: "DELETE",
                    headers: {
                        'Content-Type': 'application/json'
                    }})
                    .then(response => response.json())
                    .then(() => {
                        ToastAndroid.show("La dósis se ha eliminado correctamente", ToastAndroid.SHORT);
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

    return(<ScrollView style={[globalStyle.container]}>
            <Image source={bg} style={[globalStyle.backImage]} />
            <View style={{padding: 20}}>
                <View style={[globalStyle.nota]}>
                    <TouchableOpacity onPress={() => navigation.goBack()} style={{marginTop: 10,}}>
                        <MaterialIcons name="arrow-back-ios" size={35} color={"#6200ac"} />
                    </TouchableOpacity>

                    <TextInput value={medicamento}
                    placeholder='Medicamento'
                    style={[globalStyle.inputTitle]}
                    onChangeText={val => setMedicamento(val)}
                    maxLength={50}
                    />
                </View>
                <View style={{marginTop: 30}}>
                <Text style={{color: "black"}}>Cantidad a tomar:</Text>
                <TextInput value ={cantidadTomar.toString()}
                placeholder='Ej. 8'
                style={[globalStyle.inputCuerpo]}
                onChangeText={val => setCantidadTomar((val))}
                />
                <Text style={{color: "black"}}>Cantidad de Días:</Text>
                <TextInput value={cuantosDias.toString()}
                placeholder='Ej. 5'
                style={[globalStyle.inputCuerpo]}
                onChangeText={val => setCuantosDias((val))}
                /> 
                <Text style={{color: "black"}}>Cada cuántas Horas:</Text>
                <TextInput value={cadaHora.toString()}
                placeholder='Ej. 12'
                style={[globalStyle.inputCuerpo]}
                onChangeText={val => setCadaHora((val))}
                /> 
                <Text style={{color: "black"}}>Fecha primera toma:</Text>
                <TextInput value={fechaPrimeraToma}
                placeholder='Ej. 2023-12-12 15:21'
                style={[globalStyle.inputCuerpo]}
                onChangeText={val => setFechaPrimeraToma(val)}
                />
                <Text style={{color: "black"}}>Fecha última toma:</Text>
                <TextInput value={fechaUltimaToma}
                placeholder='Ej. 2023-12-12 15:21'
                style={[globalStyle.inputCuerpo]}
                onChangeText={val => setFechaUltimaToma(val)}
                />
                <Text style={{color: "black"}}>Recipiente:</Text>
                <TextInput value={recipiente}
                    placeholder='Ej. A1'
                    style={[globalStyle.inputCuerpo]}
                    onChangeText={val => setRecipiente(val)}
                    maxLength={50}
                    />
                </View>

                {!dose && (<TouchableOpacity style={[globalStyle.buttonCS]} onPress={handleSaveDose}>
                    <View style={{flexDirection: 'row', alignItems: 'center', alignSelf:'center'}}>
                        <MaterialIcons name="save" size={28} color={'#FFF'} />
                        <Text style={{color: "#FFF", fontWeight: 'bold', fontSize: 18}}> Guardar</Text>
                    </View>
                </TouchableOpacity>)}

                {dose && (
                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                        <TouchableOpacity style={[globalStyle.buttonDEL]} onPress={handleDeleteDose}>
                        <View style={{flexDirection: 'row', alignItems: 'center', alignSelf:'center'}}>
                            <MaterialIcons name="delete" size={28} color={'#FFF'} />
                            <Text style={{color: "#FFF", fontWeight: 'bold', fontSize: 18}}> Eliminar</Text>
                        </View>
                        </TouchableOpacity>
                        <TouchableOpacity style={[globalStyle.buttonSU]} onPress={handleUpdateDose}>
                        <View style={{flexDirection: 'row', alignItems: 'center', alignSelf:'center'}}>
                            <MaterialIcons name="save" size={28} color={'#FFF'} />
                            <Text style={{color: "#FFF", fontWeight: 'bold', fontSize: 18}}> Guardar</Text>
                        </View>
                        </TouchableOpacity>
                </View>)}

            </View>
        </ScrollView>);
});

export default DoseForm;