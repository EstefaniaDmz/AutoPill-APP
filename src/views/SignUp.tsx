import React, { useState } from "react";
import { View, Text, SafeAreaView, TextInput, TouchableOpacity, Image } from 'react-native';
import { globalStyle } from "../styles";
import { FirebaseAuthTypes, auth } from "../firebase";
import { useDispatch } from "react-redux";
import { addUser } from "../redux/reducers/userReducer";

const bg = require("../img/Background.png");

const SignUpScreen = ({navigation}: any) =>{
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPass, setConfirmPass] = useState("");
    const [messageError, setMessageError] = useState("");

    const dispatch = useDispatch();

    const handleSignUpWithEmail = () => {
        if (email){
            setMessageError('');
            if (password && confirmPass){
                setMessageError('');

                if(password === confirmPass){
                    setMessageError('');
                    
                    auth().createUserWithEmailAndPassword(email, password)
                    .then((userCredential: FirebaseAuthTypes.UserCredential) => {
                        if(userCredential.user){
                            const user = userCredential.user;
                            dispatch(addUser({
                                uid: user.uid,
                                fcmtoken: '',
                            }))
                        }
                    }).catch(e => {
                        setMessageError(e.message);
                    })

                } else {
                    setMessageError('*Las contraseñas deben ser iguales');
                }
            } else {
                setMessageError('*Favor de llenar todos los campos');    
            }
        }else {
            setMessageError('*Favor de llenar todos los campos');
        }
    }

    return (
       <View style={[globalStyle.container]}>
        <Image source={bg} style={[globalStyle.backImage]} />
        <View style={[globalStyle.whiteSheetSU]} />
        <SafeAreaView style={[globalStyle.form]}>
            <Text style={[globalStyle.title]}>Crear cuenta</Text>
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
            <TextInput
            style={[globalStyle.input]}
            placeholder="Repetir contraseña"
            autoCapitalize="none"
            autoCorrect={false}
            secureTextEntry={true}
            textContentType="password"
            value={confirmPass}
            onChangeText={(text) => setConfirmPass(text)} 
            />

                {messageError && ( <View>
                    <Text style={[globalStyle.errorText]}>{messageError}</Text>
                    </View>
                )}

            <TouchableOpacity style={[globalStyle.button]} onPress={handleSignUpWithEmail}>
                <Text style={{fontWeight: 'bold', color:'#FFF', fontSize:18}}>Aceptar</Text>
            </TouchableOpacity>

            <View style={{marginTop: 20, flexDirection: 'row', alignItems: 'center', alignSelf:'center'}}>
                <Text style={{color: 'gray', fontWeight: '600', fontSize: 14}}>¿Ya tienes cuenta?    </Text>
                <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                    <Text style={{color: '#640e8c', fontWeight: '600', fontSize: 14}}>Iniciar sesión</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
       </View>
    );
}

export default SignUpScreen;