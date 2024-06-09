import React from 'react'
import { View, StyleSheet } from 'react-native'
import LottieView from 'lottie-react-native'

const AnimationLogin = () => {
    return (
        <View style={[StyleSheet.absoluteFillObject, style.container]}>
            <LottieView source={require('../../../assets/lottie/Animation - 1717784371540.json')} style={{
                width: 200,
                height: 200,
            }} autoPlay loop />
        </View>
    );
};

const style = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(22, 27, 22, 0.59)',
        zIndex: 1,
    }
})


export default AnimationLogin