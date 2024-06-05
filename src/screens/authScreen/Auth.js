import React, { useState } from 'react';
import 'react-native-url-polyfill/auto'
import { View, TextInput, Button, Alert, StyleSheet, Image, Text, ImageBackground } from 'react-native';
import { supabase } from '../../lib/supabase';
import LogoApp from '../../../assets/img/logoApp.png';
import LogoCompany from '../../../assets/img/logoCompany.png';


const Auth = ({ navigation }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async () => {
        if (email.trim() === '') {
            Alert.alert('Error', 'Please enter your email.');
            return;
        }

        try {
            const { error: signInError } = await supabase.auth.signInWithPassword({ email, password });

            if (signInError) {
                console.log('Sign-in error:', signInError);
                Alert.alert('Error', signInError.message || 'An unexpected error occurred during sign in.');
                return;
            }

            console.log('Sign-in successful, checking user role...');
            const { data: userData, error: userError } = await supabase
                .from('users')
                .select('is_admin')
                .eq('email', email);

            console.log('Query result:', userData);

            if (userError) {
                console.log('User fetch error:', userError);
                Alert.alert('Error', userError.message || 'An unexpected error occurred while fetching user data.');
                return;
            }

            if (!userData) {
                console.log('No user data found for email:', email);
                Alert.alert('Error', 'No user found with the provided email.');
                return;
            }

            let userRole;
            if (userData[0].is_admin === true) {
                userRole = 'admin';
            }

            if (userRole === 'admin') {
                navigation.navigate('IntroScreen');
            } else {
                Alert.alert('Error', 'You are not authorized to access this app.');
            }
        } catch (error) {
            console.error('Error:', error);
            Alert.alert('Error', error.message || 'An unexpected error occurred. Please try again later.');
        }
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
            <TextInput
                style={styles.textInput}
                placeholder="Enter your Password"
                onChangeText={setPassword}
                value={password}
                keyboardType="password"
                autoCapitalize="none"
                placeholderTextColor="#003C43"
            />
            <View style={styles.buttonContainer}>
                <Button color="#003C43" title="Login" onPress={handleLogin} />
            </View>

            <Image source={LogoCompany} style={styles.imageCompany} />
            <Text style={styles.headingCompany}>© 2024 Sangguniang Bayan ng Naic. All rights reserved.</Text>
        </ImageBackground>
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
