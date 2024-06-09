import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, Button, Modal } from 'react-native';
import axios from 'axios';
import AnimationRequest from '../animation/AnimationRequest';
import { useNavigation } from '@react-navigation/native';
import _ from 'lodash';

const SCAN_API_URL = 'http://192.168.1.18:5000/api/confirm-document';

const OCRTextEditor = ({ responseFromServer }) => {
    const navigation = useNavigation();
    const [docType, setDocType] = useState('');
    const [docNumber, setDocNumber] = useState('');
    const [docTitle, setDocTitle] = useState('');
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        if (responseFromServer && responseFromServer.data && responseFromServer.data.docu_type) {
            const { data } = responseFromServer;
            setDocType(data.docu_type || '');
            setDocNumber(data.docu_number || '');
            setDocTitle(data.docu_title || '');
        }
    }, [responseFromServer]);

    const handleSubmit = async () => {
        setShowModal(true);

        try {
            const requestBody = {
                docu_type: docType,
                docu_number: docNumber,
                doc_title: docTitle,
            };

            console.log('Request body:', requestBody);

            const response = await axios.post(SCAN_API_URL, requestBody);

            console.log('Response from server:', response.data);

            setTimeout(() => {
                navigation.navigate('IntroScreen');
            }, 3000);

        } catch (error) {
            console.error('Error sending data to server:', error);
            setShowModal(false);
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.mainLabelContainer}>
                <Text style={styles.mainLabel}>Edit Extracted Text</Text>
            </View>

            <View style={{ padding: 50, flex: 1, justifyContent: 'center' }}>
                <Text style={styles.label}>Document Type:</Text>
                <TextInput
                    style={styles.textInput}
                    multiline
                    editable
                    value={docType}
                    onChangeText={setDocType}
                    placeholder="Loading..."
                />

                <Text style={styles.label}>Document Number:</Text>
                <TextInput
                    style={styles.textInput}
                    multiline
                    editable
                    value={docNumber}
                    onChangeText={setDocNumber}
                    placeholder="Loading..."
                />

                <Text style={styles.label}>Document Title:</Text>
                <TextInput
                    style={styles.textInputTitle}
                    multiline
                    editable
                    value={docTitle}
                    onChangeText={setDocTitle}
                    placeholder="Loading..."
                />

                <Button color="#003C43" title="Submit" onPress={handleSubmit} />
            </View>
            <Modal visible={showModal} animationType="fade">
                <View style={styles.modalContainer}>
                    <AnimationRequest />
                </View>
            </Modal>
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
        width: '100%',
        height: '20%',
    },
    mainLabel: {
        fontFamily: 'Poppins-Bold',
        color: '#fcf6d6',
        textTransform: 'uppercase',
        fontSize: 25,
        textAlign: 'center',
        marginTop: 50
    },
    label: {
        fontFamily: 'Poppins-Italic',
        marginBottom: 5,
        color: '#0D525A',
    },
    value: {
        marginBottom: 15,
    },
    textInput: {
        height: 40,
        borderColor: '#003C43',
        backgroundColor: 'rgba(0,0,0,0.3)',
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
        backgroundColor: 'rgba(0,0,0,0.3)',
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