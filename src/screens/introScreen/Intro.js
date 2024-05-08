import React from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    TouchableOpacity,
    ImageBackground,
} from 'react-native';

import { useNavigation } from '@react-navigation/native'; // Import useNavigation hook
import Logo from '../../../assets/img/logo.png';

const Intro = () => {
    const navigation = useNavigation(); // Get navigation object

    const handleScanButtonPress = () => {
        navigation.navigate('CameraScreen'); // Navigate to the Camera screen
    };

    const handleUploadListButtonPress = () => {
        navigation.navigate('RTUScreen'); // Navigate to the RTU screen
    };

    return (
        <ImageBackground
            // source={Background} // Replace with your image path
            style={styles.container}>
            <Image source={Logo} style={styles.image} />
            <Text style={styles.heading1}>Sangguniang Bayan</Text>
            <Text style={styles.heading2}>Document Scanner</Text>
            <TouchableOpacity
                style={styles.startButton1}
                onPress={handleScanButtonPress}>
                <Text style={styles.startButtonText1}>Scan Document</Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={styles.startButton2}
                onPress={handleUploadListButtonPress}>
                <Text style={styles.startButtonText2}>Go to Upload List</Text>
            </TouchableOpacity>
        </ImageBackground>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(255, 255, 255, 0.5)',
    },
    heading1: {
        fontSize: 20,
        textTransform: 'uppercase',
        fontFamily: 'Poppins-Bold',
        color: 'black',
        fontWeight: 'bold',
    },
    heading2: {
        fontSize: 15,
        marginBottom: 100,
        fontFamily: 'Poppins-Light',
        color: 'black',
    },
    startButton1: {
        backgroundColor: 'blue',
        paddingVertical: 12,
        paddingHorizontal: 55,
        borderRadius: 30,
        marginBottom: 10,
    },
    startButton2: {
        backgroundColor: 'black',
        paddingVertical: 12,
        paddingHorizontal: 55,
        borderRadius: 30,
    },
    startButtonText1: {
        color: '#ffffff',
        fontSize: 13,
        fontWeight: 'bold',
        borderRadius: 10,
    },
    startButtonText2: {
        color: '#ffffff',
        fontSize: 13,
        fontWeight: 'bold',
        borderRadius: 10,
    },
    image: {
        marginBottom: 50,
    },
});

export default Intro;