import React from 'react'
import { View, StyleSheet } from 'react-native'
import * as Progress from 'react-native-progress';

const AnimationRequest = ({ process }) => {
    return (
        <View style={[StyleSheet.absoluteFillObject, style.container]}>
            <Progress.Bar progress={process} width={100} />
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