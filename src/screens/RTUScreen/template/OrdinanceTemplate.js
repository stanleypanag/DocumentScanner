import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const OrdinanceTemplate = (props) => {
    const { title, description, date } = props; // Destructure props

    return (
        <View style={styles.itemContainer}>
            <Text style={styles.titleText}>Ordinance No. 8923</Text>
            <Text style={styles.dateText}>last edited: May 3, 2024</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    itemContainer: {
        backgroundColor: '#003C43', // Background color for the item
        width: 290,
        marginBottom: 10, // Add some margin between items
        borderRadius: 5, // Rounded corners
    },
    titleText: {
        fontSize: 15,
        fontFamily: 'Poppins-Bold',
        alignSelf: 'center'
    },
    dateText: {
        fontSize: 10,
        fontFamily: 'Poppins-Light',
        color: '#808080', // Subdued color for date
        alignSelf: 'center'
    },
});

export default OrdinanceTemplate;
