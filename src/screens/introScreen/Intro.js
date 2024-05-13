import React from 'react';
import {
    StyleSheet,
    Text,
    View,
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

            <View>
                <Text style={styles.userText1}>User:</Text>
                <Text style={styles.userText2}>Stanley</Text>
            </View>

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

            <Text style={styles.userText3}>Logout</Text>

        </ImageBackground>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fcf6d6',
        flexDirection: 'row'
    },
    startButton1: {
        backgroundColor: '#2e8162',
        paddingVertical: 50,
        paddingHorizontal: 15,
        marginRight: 10,
        borderRadius: 70,
    },
    startButton2: {
        backgroundColor: '#003C43',
        paddingVertical: 50,
        paddingHorizontal: 30,
        borderRadius: 70,
    },
    startButtonText1: {
        color: '#fcf6d6',
        fontSize: 10,
        fontFamily: 'Poppins-Bold',
    },
    startButtonText2: {
        color: '#fcf6d6',
        fontSize: 10,
        fontFamily: 'Poppins-Bold',
    },
    userText1: {
        color: '#2e8162',
        position: 'absolute',
        bottom: 150,
        left: 20,
        fontFamily: 'Poppins-Bold',
        fontSize: 20,
        textTransform: 'uppercase',

    },
    userText2: {
        color: '#003C43',
        position: 'absolute',
        bottom: 120,
        left: 20,
        fontFamily: 'Poppins-Bold',
        fontSize: 25,
        fontStyle: 'italic'
    },
    userText3: {
        color: '#2e8162',
        position: 'absolute',
        bottom: 120,
        left: 150,
        fontFamily: 'Poppins-Medium',
        fontSize: 15,
        textDecorationLine: 'underline'

    }
});

export default Intro;