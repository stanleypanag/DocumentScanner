import React from 'react'
import { View, StyleSheet, Text } from 'react-native'
import LottieView from 'lottie-react-native'

const AnimationRequestFailed = () => {
    return (
        <View style={[StyleSheet.absoluteFillObject, style.container]}>
            <LottieView source={require('../../../assets/lottie/Animation - 1718021831210.json')} style={{
                width: 200,
                height: 200,
            }} autoPlay loop={false} />
            <Text style={style.textAlert}>Upload Failed!</Text>
        </View>
    );
};

const style = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fcf6d6',
        zIndex: 1,
    },
    textAlert: {
        fontFamily: 'Poppins-Bold',
        color: '#e25b5b',
        fontSize: 30,
    }
})


export default AnimationRequestFailed;