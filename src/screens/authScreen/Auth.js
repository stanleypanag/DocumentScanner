import React, { useState } from 'react';
import 'react-native-url-polyfill/auto';
import { View, TextInput, Button, Alert, StyleSheet, Image, Text, ImageBackground, Modal } from 'react-native';
import { supabase } from '../../lib/supabase.js';
import LogoApp from '../../../assets/img/logoApp.png';
import LogoCompany from '../../../assets/img/logoCompany.png';
import AnimationLogin from '../animation/AnimationLogin.js';
import AnimationNotAdmin from '../animation/AnimationNotAdmin.js';
import background from '../../../assets/img/background5.jpg';

const Auth = ({ navigation }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [showNotAdminModal, setShowNotAdminModal] = useState(false);

    const handleLogin = async () => {
        if (email.trim() === '') {
            Alert.alert('Error', 'Please enter your email.');
            return;
        }

        setIsLoading(true);

        try {
            const { error: signInError } = await signInWithEmailAndPassword(email, password);

            if (signInError) {
                handleSignInError(signInError);
                return;
            }

            const userData = await fetchUserDataByEmail(email);

            if (!userData) {
                Alert.alert('Error', 'No user found with the provided email.');
                return;
            }

            if (userData[0].is_admin) {
                navigation.navigate('IntroScreen');
            } else {
                showNotAdminModalFn();
            }
        } catch (error) {
            handleError(error);
        } finally {
            await wait(2000); // Circular Loading
            setIsLoading(false);
        }
    };

    const signInWithEmailAndPassword = async (email, password) => {
        try {
            const { error } = await supabase.auth.signInWithPassword({ email, password });
            return { error };
        } catch (error) {
            throw error;
        }
    };

    const fetchUserDataByEmail = async (email) => {
        try {
            const { data, error } = await supabase
                .from('users')
                .select('is_admin')
                .eq('email', email);

            if (error) {
                throw error;
            }

            return data;
        } catch (error) {
            throw error;
        }
    };

    const handleSignInError = (error) => {
        console.log('Sign-in error:', error);
        Alert.alert('Error', error.message || 'An unexpected error occurred during sign in.');
    };

    const handleError = (error) => {
        console.error('Error:', error);
        if (supabase.isOfflineForTeam) {
            Alert.alert('Error', 'No internet connection. Please check your internet and try again.');
        } else {
            Alert.alert('Error', error.message || 'An unexpected error occurred. Please try again later.');
        }
    };

    const showNotAdminModalFn = () => {
        setShowNotAdminModal(true);
        setTimeout(() => setShowNotAdminModal(false), 2000); // Animation Not Authorized!
    };

    const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

    return (
        <>
            <ImageBackground source={background} style={styles.container}>
                <Image source={LogoApp} style={styles.imageApp} />
                <Text style={styles.headingApp}>DOCUMENT SCANNER</Text>
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
            {isLoading && <AnimationLogin />}

            <Modal
                visible={showNotAdminModal}
                transparent={true}
                animationType="fade"
            >
                <View style={styles.modalContainer}>
                    <AnimationNotAdmin />
                </View>
            </Modal>
        </>
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
        backgroundColor: '#fcf6d6',
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
        marginBottom: 50,
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
});