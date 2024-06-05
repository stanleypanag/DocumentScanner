import { useEffect, useState } from 'react';
import DocumentScanner from 'react-native-document-scanner-plugin';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';

const Cam = () => {
    const navigation = useNavigation();

    const scanDoc = async () => {
        const { status, scannedImages: imageURIs } = await DocumentScanner.scanDocument();

        try {
            if (status === 'cancel' || !imageURIs || imageURIs.length === 0) {
                navigation.goBack();
            } else {
                const base64Images = await Promise.all(
                    imageURIs.map(async (uri) => {
                        const response = await fetch(uri);
                        const blob = await response.blob();
                        const base64 = await new Promise((resolve) => {
                            const reader = new FileReader();
                            reader.onload = () => resolve(reader.result.split(',')[1]);
                            reader.readAsDataURL(blob);
                        });
                        return base64;
                    })
                );

                // Create a new FormData object
                const formData = new FormData();

                // Add the base64 encoded images to the FormData object
                for (let i = 0; i < base64Images.length; i++) {
                    const pageName = `page${i + 1}`;
                    formData.append(pageName, base64Images[i]);
                }

                // Send the FormData object to the backend
                axios.post(URL + '/base64reciever', formData)
                    .then(res => {
                        if (res.ok) {
                            res.json().then(data => console.log(data))
                        } else {
                            console.log(res)
                            alert('Error processing image')
                        }
                    })
            }
        } catch (error) {
            console.error("ERROR:   ", error)
        }
    }


    useEffect(() => {
        scanDoc();
    }, []);

    return null; // Since you don't need to render anything, return null
};

export default Cam;
