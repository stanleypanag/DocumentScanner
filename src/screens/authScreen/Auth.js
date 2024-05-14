import React, { useState } from 'react';
import { View, TextInput, Button, Alert, StyleSheet, Image, Text, ImageBackground } from 'react-native';
import LogoApp from '../../../assets/img/logoApp.png';
import LogoCompany from '../../../assets/img/logoCompany.png';

const Auth = ({ navigation }) => {
    const [email, setEmail] = useState('');

    const handleLogin = () => {
        if (email.trim() === '') {
            Alert.alert('Error', 'Please enter your email.');
            return;
        }
        //* Perform authentication logic here, such as sending the email to a server for validation

        //* For simplicity, just navigate to the Home screen for now
        navigation.navigate('IntroScreen');
    };

    return (
        <ImageBackground style={styles.container}>
            <Image source={LogoApp} style={styles.imageApp} />
            <Text style={styles.headingApp}>Document Scanner!</Text>
            <TextInput
                style={styles.textInput}
                placeholder="Enter your email"
                onChangeText={setEmail}
                value={email}
                keyboardType="email-address"
                autoCapitalize="none"
                placeholderTextColor="#003C43"
            />
            <View style={styles.buttonContainer}>
                <Button color="#003C43" title="Login" onPress={handleLogin} />
            </View>

            <Image source={LogoCompany} style={styles.imageCompany} />
            <Text style={styles.headingCompany}>© 2024 Sangguniang Bayan ng Naic. All rights reserved.</Text>


        </ ImageBackground>
    );
};

export default Auth;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fcf6d6'
    },
    textInput: {
        height: 40,
        width: 300,
        borderColor: '#003C43',
        borderWidth: 2,
        marginBottom: 10,
        paddingHorizontal: 10,
        color: "#003C43"
    },
    headingCompany: {
        fontSize: 8,
        fontFamily: 'Poppins-Light',
        color: '#003C43',
        marginTop: 10,
        // color: '#9AC8CD'
    },
    headingApp: {
        fontSize: 20,
        marginBottom: 50,
        fontFamily: 'Poppins-Bold',
        color: '#003C43'
    },
    imageApp: {
        width: 300,
        height: 250,
        marginTop: 170,
    },
    imageCompany: {
        width: 20, height: 20
    },
    buttonContainer: {
        width: 300,
        backgroundColor: "#003C43",
        marginBottom: 80,
    }
});