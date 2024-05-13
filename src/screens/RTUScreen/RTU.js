import React, { useState } from 'react';
import { StyleSheet, TextInput, ImageBackground, View } from 'react-native';
import Background from '../../../assets/img/background1.jpg';
import { OrdinanceTemplate, ResolutionTemplate } from './template';
import { TouchableOpacity } from 'react-native-gesture-handler';


const RTU = () => {
    const [searchText, setSearchText] = useState(''); // State to store search term

    const handleSearchChange = (text) => {
        setSearchText(text);
        // Implement search functionality here, e.g., filtering data based on text
    };

    return (
        <ImageBackground style={styles.container} source={Background}>
            <View style={styles.searchBarContainer}>
                <TextInput
                    style={styles.searchBarInput}
                    placeholder="Search"
                    onChangeText={handleSearchChange}
                    value={searchText}
                />
            </View>
            <View>
                <TouchableOpacity>
                    <OrdinanceTemplate />
                </TouchableOpacity>
                <TouchableOpacity>
                    <ResolutionTemplate />
                </TouchableOpacity>

            </View>
        </ImageBackground>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#fcf6d6'
    },
    text: {
        color: 'white',
        fontFamily: 'Poppins-Bold',
    },
    searchBarContainer: {
        backgroundColor: '#2e8162',
        paddingHorizontal: 14,
        paddingVertical: 5,
        borderRadius: 5,
        width: '90%',
        marginTop: 30,
        marginBottom: 30,
    },
    searchBarInput: {
        fontSize: 16,
    },
});

export default RTU;
