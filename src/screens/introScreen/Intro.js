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

const Intro = () => {
    const navigation = useNavigation(); // Get navigation object

    const handleScanButtonPress = () => {
        navigation.navigate('CameraScreen'); // Navigate to the Camera screen
    };

    const handleUploadListButtonPress = () => {
        navigation.navigate('RTUScreen'); // Navigate to the RTU screen
    };

    return (
        <ImageBackground style={styles.container}>
            <TouchableOpacity
                style={styles.startButton1}
                onPress={handleScanButtonPress}>
                <Text style={styles.startButtonText1}>Scan Document</Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={styles.startButton2}
                onPress={handleUploadListButtonPress}>
                <Text style={styles.startButtonText2}>Staged List</Text>
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
    },
    startButton1: {
        backgroundColor: '#2e8162',
        paddingVertical: 50,
        paddingHorizontal: 50,
        marginBottom: 10,
        borderRadius: 10,
    },
    startButton2: {
        backgroundColor: '#003C43',
        paddingVertical: 50,
        paddingHorizontal: 70,
        borderRadius: 10,
    },
    startButtonText1: {
        color: '#fcf6d6',
        fontSize: 13,
        fontFamily: 'Poppins-Bold',
        borderRadius: 10,
    },
    startButtonText2: {
        color: '#fcf6d6',
        fontSize: 13,
        fontFamily: 'Poppins-Bold',
        borderRadius: 10,
    },
});

export default Intro;