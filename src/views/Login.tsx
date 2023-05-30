import React, { useState } from "react";
import { View, Text, SafeAreaView, TextInput, TouchableOpacity, Image } from 'react-native';
import { globalStyle } from "../styles";
import { auth, FirebaseAuthTypes } from "../firebase";
import { useDispatch } from "react-redux";
import { addUser } from "../redux/reducers/userReducer";

const bg = require("../img/Background.png");

const LoginScreen = ({navigation}: any) =>{
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");

    const dispatch = useDispatch();

    const handleLoginWithEmail = () => {
        auth().signInWithEmailAndPassword(email, password)
        .then((userCredential: FirebaseAuthTypes.UserCredential) => {
            if(userCredential.user){
                const user = userCredential.user;
                dispatch(addUser({
                    uid: user.uid,
                    fcmtoken: '',
                }))
            }
        }).catch( e=> {
            setMessage(e.message);
        })
    }

    return (
       <View style={[globalStyle.container]}>
        <Image source={bg} style={[globalStyle.backImage]} />
        <View style={[globalStyle.whiteSheetSU]} />
        <SafeAreaView style={[globalStyle.form]}>
            <Text style={[globalStyle.title]}>Iniciar sesión</Text>
            <TextInput
            style={[globalStyle.input]}
            placeholder="Ingresar email"
            autoCapitalize="none"
            keyboardType="email-address"
            autoFocus={true}
            value={email}
            onChangeText={(text) => setEmail(text)} 
            />
            <TextInput
            style={[globalStyle.input]}
            placeholder="Ingresar contraseña"
            autoCapitalize="none"
            autoCorrect={false}
            secureTextEntry={true}
            textContentType="password"
            value={password}
            onChangeText={(text) => setPassword(text)} 
            />

            {message && ( <View>
                    <Text style={[globalStyle.errorText]}>{message}</Text>
                    </View>
                )}

            <TouchableOpacity style={[globalStyle.button]} onPress={handleLoginWithEmail}>
                <Text style={{fontWeight: 'bold', color:'#FFF', fontSize:18}}>Aceptar</Text>
            </TouchableOpacity>

            <View style={{marginTop: 20, flexDirection: 'row', alignItems: 'center', alignSelf:'center'}}>
                <Text style={{color: 'gray', fontWeight: '600', fontSize: 14}}>¿No tienes cuenta?    </Text>
                <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
                    <Text style={{color: '#640e8c', fontWeight: '600', fontSize: 14}}>Crear cuenta</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
       </View>
    );
}

export default LoginScreen;