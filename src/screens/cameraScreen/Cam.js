import React, { useState, useEffect } from 'react';
import { Image } from 'react-native';
import DocumentScanner from 'react-native-document-scanner-plugin';
import { useNavigation } from '@react-navigation/native';
import PDFconverter from './utils/PDFconverter.js'; // Import the PDFConverter component

const Cam = () => {
    const navigation = useNavigation();
    const [scannedImages, setScannedImages] = useState([]);

    const scanDocument = async () => {
        const { status, scannedImages: imageURIs } = await DocumentScanner.scanDocument();

        if (status === 'success' && imageURIs && imageURIs.length > 0) {
            // Convert image URIs to Base64 strings
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

            setScannedImages(base64Images);
            // Call the PDFConverter component "Implement this when PDFconverter.js configured already"
            // PDFconverter(base64Images);
        } else if (status === 'cancel') {
            navigation.goBack();
        }
    };

    useEffect(() => {
        scanDocument();
    }, []);

    return (
        <>
            {scannedImages.map((base64Image, index) => (
                console.log(scannedImages),
                <Image
                    key={index}
                    style={{ width: '100%', height: '100%' }}
                    source={{ uri: `data:image/jpeg;base64,${base64Image}` }}
                />
            ))}
        </>
    );
};

export default Cam;
