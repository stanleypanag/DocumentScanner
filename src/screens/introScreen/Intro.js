import React, { useEffect, useState } from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    ImageBackground,
    Image,
    Modal,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { supabase } from '../../lib/supabase';
import Profile from '../../../assets/img/profile2.png';
import ScannerImg from '../../../assets/img/scanner2.png';
import background from '../../../assets/img/background5.jpg'
import AnimationLogout from '../animation/AnimationLogout';

const Intro = () => {
    const navigation = useNavigation();
    const [dropdownVisible, setDropdownVisible] = useState(false);
    const [email, setEmail] = useState('');
    const [isLoggingOut, setIsLoggingOut] = useState(false);

    useEffect(() => {
        supabase.auth.getSession().then(({ data: { session } }) => {
            if (session) {
                setEmail(session.user.email);
            }
        });
    }, []);

    const handleScanButtonPress = () => {
        navigation.navigate('CameraScreen');
    };

    const handleButtonToGuide = () => {
        navigation.navigate('GuideScreen');
    };

    const toggleDropdown = () => {
        setDropdownVisible(!dropdownVisible);
    };

    const handleLogout = async () => {
        setIsLoggingOut(true);

        const { error } = await supabase.auth.signOut();
        if (error) {
            console.error('Error signing out:', error);
            setIsLoggingOut(false);
        } else {
            navigation.navigate('AuthScreen');
        }
    };

    return (
        <ImageBackground source={background} style={styles.container}>
            <Modal
                visible={isLoggingOut}
                transparent={true}
                animationType="fade"
            >
                <AnimationLogout onFinish={() => setIsLoggingOut(false)} />
            </Modal>

            <View style={styles.userTextContainer}>
                <TouchableOpacity style={styles.profileButton} onPress={toggleDropdown}>
                    <Image source={Profile} />
                </TouchableOpacity>
                <Text style={styles.userText1}>USER:</Text>
                <Text style={styles.userText2}>{email}</Text>
                {dropdownVisible && (
                    <View style={styles.dropdown}>
                        <TouchableOpacity onPress={handleLogout}>
                            <Text style={styles.dropdownText}>Logout</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={handleButtonToGuide}>
                            <Text style={styles.dropdownText}>User Guide</Text>
                        </TouchableOpacity>
                    </View>
                )}
            </View>

            <TouchableOpacity
                style={styles.scanDocumentContainer}
                onPress={handleScanButtonPress}>
                <Image style={styles.scannerImg} source={ScannerImg} />
                <Text style={{ color: '#fcf6d6', fontSize: 11, fontFamily: 'Poppins-Light' }}>Scan Document</Text>
            </TouchableOpacity>

        </ImageBackground>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fcf6d6',
        flexDirection: 'row',
    },
    scanDocumentContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        width: 200,
        height: 200,
        backgroundColor: '#003C43',
        borderRadius: 60,
    },
    userTextContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        position: 'absolute',
        backgroundColor: '#003C43',
        borderRadius: 40,
        width: '95%',
        height: '8%',
        top: 10,
    },
    scannerImg: {
        width: 100,
        height: 100,
    },
    startButtonText1: {
        color: '#fcf6d6',
        fontSize: 10,
        fontFamily: 'Poppins-Bold',
    },
    profileButton: {
        marginRight: 10,
        marginLeft: 10,
    },
    userText1: {
        color: '#fcf6d6',
        fontFamily: 'Poppins-Bold',
        fontSize: 13,
        marginRight: 5
    },
    userText2: {
        color: '#fcf6d6',
        fontFamily: 'Poppins-Light',
        fontSize: 13,
    },
    dropdown: {
        position: 'absolute',
        top: 75,
        left: 0,
        backgroundColor: 'white',
        borderRadius: 10,
        padding: 10,
        elevation: 5,
        shadowColor: '#000',
    },
    dropdownText: {
        color: '#2e8162',
        fontSize: 15,
        paddingVertical: 5,
    },
});

export default Intro;
