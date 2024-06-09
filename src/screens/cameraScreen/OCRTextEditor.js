import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, Button, Modal } from 'react-native';
import axios from 'axios';
import AnimationRequest from '../animation/AnimationRequest';
import AnimationProgress from '../animation/AnimationProgress';
import { useNavigation } from '@react-navigation/native';
import _ from 'lodash';

const SCAN_API_URL = 'http://192.168.1.5:5000/api/confirm-document'; // Stanley's IP

const OCRTextEditor = ({ responseFromServer }) => {
    const navigation = useNavigation();
    const [docType, setDocType] = useState('');
    const [docNumber, setDocNumber] = useState('');
    const [docTitle, setDocTitle] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        if (responseFromServer && responseFromServer.data && responseFromServer.data.docu_type) {
            const { data } = responseFromServer;
            setDocType(data.docu_type || '');
            setDocNumber(data.docu_number.toString() || '');
            setDocTitle(data.docu_title || '');
        }
    }, [responseFromServer]);

    const handleSubmit = async () => {
        setIsLoading(true);
        setShowModal(true);

        try {
            const requestBody = {
                docu_type: docType,
                docu_number: docNumber,
                doc_title: docTitle,
            };

            const response = await axios.post(SCAN_API_URL, requestBody, {
                onUploadProgress: ({ loaded, total }) => {
                    const progressValue = loaded / total;
                    setProgress(progressValue);
                },
            });

            console.log('Response from server:', response.data);

            setTimeout(() => {
                setShowModal(false);
                setIsLoading(false);
            }, 3000);

        } catch (error) {
            console.error('Error sending data to server:', error);
            setIsLoading(false);
            setShowModal(false);
        }
    };

    const handleModalClose = () => {
        setShowModal(false);
        navigation.goBack();
    };

    return (
        <View style={styles.container}>
            <View style={styles.mainLabelContainer}>
                <Text style={styles.mainLabel}>Edit Extracted Text</Text>
            </View>

            <View style={{ padding: 20, flex: 1, justifyContent: 'center' }}>
                <Text style={styles.label}>Document Type:</Text>
                <TextInput
                    style={styles.textInput}
                    multiline
                    editable
                    value={docType}
                    onChangeText={setDocType}
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
                />

                <Button color="#003C43" title="Submit" onPress={handleSubmit} />
            </View>
            <Modal visible={showModal} animationType="fade" onRequestClose={handleModalClose}>
                <View style={styles.modalContainer}>
                    {isLoading ? (
                        <AnimationProgress progress={progress} />
                    ) : (
                        <AnimationRequest />
                    )}
                </View>
                <Button color="#003C43" title="Close" onPress={handleModalClose} />
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
        color: 'black',
    },
    textInputTitle: {
        height: 200,
        borderColor: 'gray',
        backgroundColor: 'rgba(0,0,0,0.3)',
        borderWidth: 1,
        padding: 10,
        marginBottom: 15,
        textAlignVertical: 'top',
        color: 'black',
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center'
    }
});