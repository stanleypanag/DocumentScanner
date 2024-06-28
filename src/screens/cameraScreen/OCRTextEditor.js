import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, Button, Modal, ImageBackground } from 'react-native';
import axios from 'axios';
import AnimationRequest from '../animation/AnimationRequest';
import AnimationRequestFailed from '../animation/AnimationRequestFailed';
import { useNavigation } from '@react-navigation/native';
import _ from 'lodash';
import background from '../../../assets/img/background5.jpg'

// TO BE CHANGED AS DYNAMIC DOMAIN
<<<<<<< HEAD
const SCAN_API_URL = `https://sbnaic-server.onrender.com/api/confirm-document`;
=======
const SCAN_API_URL = `http://localhost:5000/api/confirm-document`;
>>>>>>> 5151234ca6449f4e89fecd602c1e938cdba691e3

const OCRTextEditor = ({ responseFromServer }) => {
    const navigation = useNavigation();
    const [docType, setDocType] = useState('');
    const [docNumber, setDocNumber] = useState('');
    const [docTitle, setDocTitle] = useState('');
    const [docSeriesYear, setDocSeriesYear] = useState('');
    const [showSuccessModal, setShowSuccessModal] = useState(false);
    const [showErrorModal, setShowErrorModal] = useState(false);
    const [isButtonDisabled, setIsButtonDisabled] = useState(true);

    useEffect(() => {
        if (responseFromServer && responseFromServer.data && responseFromServer.data.doc_type) {
            const { data } = responseFromServer;
            setDocType(data.doc_type || '');
            setDocNumber(data.doc_number || '');
            setDocTitle(data.doc_title || '');
            setDocSeriesYear(data.doc_series_yr || '');
            setIsButtonDisabled(false)
        }
    }, [responseFromServer]);

    const handleSubmit = async () => {

        try {
            // Possible to add user ID
            const requestBody = {
                doc_type: docType,
                doc_number: docNumber,
                doc_title: docTitle,
                doc_series_yr: docSeriesYear,
            };

            console.log('Request body:', requestBody);

            const response = await axios.post(SCAN_API_URL, requestBody);
            setShowSuccessModal(true);

            console.log('Response from server:', response.data);

            setTimeout(() => {
                navigation.navigate('IntroScreen');
            }, 3000);

        } catch (error) {

            console.error('Error sending data to server:', error);
            setShowSuccessModal(false);
            setShowErrorModal(true);
            setShowErrorModal(true);
            setTimeout(() => {
                setShowErrorModal(false);
            }, 3000);
        }
    };

    return (
        <View style={styles.container}>

            <ImageBackground source={background} style={{ padding: 30, flex: 1, justifyContent: 'center' }}>

                <View style={styles.mainLabelContainer}>
                    <Text style={styles.mainLabel}>Edit Extracted Text</Text>
                </View>

                <Text style={styles.label}>Document Type:</Text>
                <TextInput
                    style={styles.textInput}
                    multiline
                    editable
                    value={docType}
                    onChangeText={setDocType}
                    placeholder="Loading..."
                    placeholderTextColor="gray"
                />

                <Text style={styles.label}>Document Number:</Text>
                <TextInput
                    style={styles.textInput}
                    multiline
                    editable
                    value={docNumber}
                    onChangeText={setDocNumber}
                    placeholder="Loading..."
                    placeholderTextColor="gray"
                />

                <Text style={styles.label}>Document Series Year:</Text>
                <TextInput
                    style={styles.textInput}
                    multiline
                    editable
                    value={docSeriesYear}
                    onChangeText={setDocSeriesYear}
                    placeholder="Loading..."
                    placeholderTextColor="gray"
                />

                <Text style={styles.label}>Document Title:</Text>
                <TextInput
                    style={styles.textInputTitle}
                    multiline
                    editable
                    value={docTitle}
                    onChangeText={setDocTitle}
                    placeholder="Loading..."
                    placeholderTextColor="gray"
                />

                <Button color="#003C43" title="Submit" disabled={isButtonDisabled} onPress={handleSubmit} />
            </ImageBackground>
            {
                showErrorModal ?

                    <Modal visible={showErrorModal} animationType="fade">
                        <View style={styles.modalContainer}>
                            <AnimationRequestFailed />
                        </View>
                    </Modal> :
                    <Modal visible={showSuccessModal} animationType="fade">
                        <View style={styles.modalContainer}>
                            <AnimationRequest />
                        </View>
                    </Modal>
            }
        </View>
    );
};

export default OCRTextEditor;

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fcf6d6',
        flex: 1,
    },
    mainLabelContainer: {
        backgroundColor: '#0D525A',
        borderRadius: 60,
        width: '100%',
        height: '10%',
        marginBottom: 30,
    },
    mainLabel: {
        fontFamily: 'Poppins-Bold',
        color: '#fcf6d6',
        textTransform: 'uppercase',
        fontSize: 25,
        textAlign: 'center',
        marginTop: 20
    },
    label: {
        fontFamily: 'Poppins-BoldItalic',
        marginBottom: 5,
        color: '#0D525A',
    },
    value: {
        marginBottom: 15,
    },
    textInput: {
        height: 40,
        borderColor: '#003C43',
        backgroundColor: '#fcf6d6',
        borderWidth: 1,
        padding: 10,
        marginBottom: 15,
        textAlignVertical: 'top',
        color: '#003C43',
    },
    textInputTitle: {
        height: 200,
        borderColor: 'gray',
        borderColor: '#003C43',
        backgroundColor: '#fcf6d6',
        borderWidth: 1,
        padding: 10,
        marginBottom: 15,
        textAlignVertical: 'top',
        color: '#003C43',
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
    }
});