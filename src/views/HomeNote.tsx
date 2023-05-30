import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import React, { useEffect, useState } from 'react';
import { globalStyle } from "../styles";
import { firestore, auth } from "../firebase";
import { useDispatch, useSelector } from "react-redux";
import { addUser, userSelector } from "../redux/reducers/userReducer";
import { Note } from "../model/Note";
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const bg = require("../img/Background1.png");

const HomeNoteScreen = ({navigation}: any) => {
    const [notes, setNotes] = useState<Note[]>([]);
    const user = useSelector(userSelector);

    useEffect(() => {
        if(user.uid){
            firestore()
            .collection('notas')
            .where('by', '==', user.uid)
            .orderBy('updatedAt')
            .onSnapshot(querySnapshot => {
                if(querySnapshot){
                    const itemsNote: Note[] = [];
                    querySnapshot.forEach(item =>{
                        itemsNote.unshift({
                            key: item.id,
                            ...item.data(),
                        })
                    });
                    setNotes(itemsNote);
                };
            })
        }
    }, [user.uid]);

    const dispatch = useDispatch();

    const handleLogout = () => {
        auth().signOut().then(()=>{
            dispatch(addUser({
                uid: '', 
                fcmtoken: '',
            }))
        })
    }
    return (
        <View style={[globalStyle.container]}>
            <Image source={bg} style={[globalStyle.backImage]} />
            <TouchableOpacity style={[globalStyle.buttonAN]} onPress={() => navigation.navigate('AddNewNote', {})}>
                <View style={{flexDirection: 'row', alignItems: 'center', alignSelf:'center'}}>
                <MaterialIcons name="post-add" size={28} color={'#FFF'}/>
                <Text style={{color: "#FFF", fontWeight: 'bold', fontSize: 18}}> AÑADIR RECETA</Text>
                </View>
            </TouchableOpacity>
           <ScrollView style={{padding: 20}}>
            {notes.map(item => item.estatus && (
                <TouchableOpacity key={item.key} style={[globalStyle.containerNotes]} onPress={() => navigation.navigate('AddNewNote', {note: item,})}>
                    <Text style={[globalStyle.titleNote]}>{item.title ? item.title : '(Nota sin título)'}</Text>
                </TouchableOpacity>
            ))}
           </ScrollView>
            <TouchableOpacity style={[globalStyle.buttonCS]} onPress={handleLogout}>
                <Text style={{color: "#FFF", fontWeight: 'bold', fontSize: 18}}>Cerrar sesión</Text>
            </TouchableOpacity>
            
        </View>
    );
}

export default HomeNoteScreen;