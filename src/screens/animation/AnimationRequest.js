import React from 'react'
import { View, StyleSheet } from 'react-native'
import LottieView from 'lottie-react-native'

const AnimationRequest = () => {
    return (
        <View style={[StyleSheet.absoluteFillObject, style.container]}>
            <LottieView source={require('../../../assets/lottie/Animation - 1717792931634.json')} style={{
                width: 200,
                height: 200,
            }} autoPlay loop={false} />
        </View>
    );
};

const style = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fcf6d6',
        zIndex: 1,
    }
})


export default AnimationRequest