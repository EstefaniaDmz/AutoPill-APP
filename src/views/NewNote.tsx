import React, { useEffect, useRef, useState } from 'react';
import { Image, TextInput, TouchableOpacity, View, Text, Alert, ToastAndroid } from 'react-native';
import { useSelector } from 'react-redux';
import { Note } from '../model/Note';
import { userSelector } from '../redux/reducers/userReducer';
import { globalStyle } from '../styles';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { firestore } from '../firebase';

const bg = require("../img/Background2.png");

const AddNewNote = (({route, navigation}: any) => {
    const {note}: {note: Note} = route ? route.params : {};

    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');

    const contentRef = useRef<any>();
    const user = useSelector(userSelector);

    useEffect(() => {
        if(note && (note.title || note.content)){
            note.title && setTitle(note.title);
            note.content && setContent(note.content);
        }
    }, [note])

    const handleSaveNote = () => {
        if(title || content){
            const data: Note ={
                title: title ?? '',
                content: content ?? '',
                createdAt: new Date(),
                updatedAt: new Date(),
                by: user.uid,
                estatus: true,
            };
            firestore().collection('notas').add(data);
        };
        navigation.navigate('HomeScreen');
    };

    const handleUpdateNote = () => {
        if(title || content){
            firestore().collection('notas').doc(note.key)
            .update({
                title: title ?? '',
                content: content ?? '',
                updatedAt: new Date(),
            });
        };
        navigation.navigate('HomeScreen');
    };

    const handleDeleteNote = () => {
        Alert.alert('Aviso', '¿Seguro de eliminar la nota?', [
          {
            text: 'No',
            onPress: () => {},
          },
          {
            text: 'Sí',
            style: 'destructive',
            onPress: () => {
                firestore().collection('notas').doc(note.key)
                .update({
                    estatus: false,
                })
                .then(() => {
                  ToastAndroid.show('La nota se ha eliminado existosamente', ToastAndroid.SHORT);
                  navigation.navigate('HomeScreen');
                });
            },
          },
        ]);
      };

    return (
        <View style={[globalStyle.container]}>
            <Image source={bg} style={[globalStyle.backImage]} />
            <View style={{padding: 20}}>
                
                <View style={[globalStyle.nota]}>
                    <TouchableOpacity onPress={() => navigation.goBack()} style={{marginTop: 10,}}>
                        <MaterialIcons name="arrow-back-ios" size={35} color={"#6200ac"} />
                    </TouchableOpacity>

                    <TextInput value={title}
                    placeholder='Título'
                    style={[globalStyle.inputTitle]}
                    onChangeText={val => setTitle(val)}
                    maxLength={100}
                    />
                </View>
                <TextInput value={content}
                ref={contentRef}
                placeholder='Contenido'
                style={[globalStyle.inputCuerpo]}
                maxLength={1000}
                multiline={true}
                autoFocus={true}
                onChangeText={val => setContent(val)}
                />
                {!note && (<TouchableOpacity style={[globalStyle.buttonCS]} onPress={handleSaveNote}>
                    <View style={{flexDirection: 'row', alignItems: 'center', alignSelf:'center'}}>
                        <MaterialIcons name="save" size={28} color={'#FFF'} />
                        <Text style={{color: "#FFF", fontWeight: 'bold', fontSize: 18}}> Guardar</Text>
                    </View>
                </TouchableOpacity>)}

                {note && (
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <TouchableOpacity style={[globalStyle.buttonDEL]} onPress={handleDeleteNote}>
                        <View style={{flexDirection: 'row', alignItems: 'center', alignSelf:'center'}}>
                            <MaterialIcons name="delete" size={28} color={'#FFF'} />
                            <Text style={{color: "#FFF", fontWeight: 'bold', fontSize: 18}}> Eliminar</Text>
                        </View>
                    </TouchableOpacity>
                <TouchableOpacity style={[globalStyle.buttonSU]} onPress={handleUpdateNote}>
                    <View style={{flexDirection: 'row', alignItems: 'center', alignSelf:'center'}}>
                        <MaterialIcons name="save" size={28} color={'#FFF'} />
                        <Text style={{color: "#FFF", fontWeight: 'bold', fontSize: 18}}> Guardar</Text>
                    </View>
                </TouchableOpacity>
                </View>)}
                
            </View>
            
        </View>
    );

})

export default AddNewNote;