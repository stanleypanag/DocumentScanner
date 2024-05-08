import React from 'react'
import { View, Text, StyleSheet } from 'react-native'

const RTU = () => {
    return (
        <View style={style.container}>
            <Text style={style.text}>
                Ready To Upload Section
            </Text>
        </View>
    )
}

const style = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(255, 255, 255, 0.5)',
    },
    text: {
        color: 'black',
        fontWeight: 'bold',
    }
})

export default RTU