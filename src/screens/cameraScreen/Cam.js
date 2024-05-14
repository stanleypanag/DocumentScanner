import React, { useState, useEffect } from 'react';
import { Image } from 'react-native';
import DocumentScanner from 'react-native-document-scanner-plugin';
import { useNavigation } from '@react-navigation/native';

const Cam = () => {
    const navigation = useNavigation();
    const [scannedImages, setScannedImages] = useState([]);

    const scanDocument = async () => {
        const { status, scannedImages: imageURIs } = await DocumentScanner.scanDocument();

        if (status === 'success' && imageURIs && imageURIs.length > 0) {
            setScannedImages(imageURIs); // Set image URIs directly
        } else if (status === 'cancel') {
            navigation.goBack();
        }
    };

    useEffect(() => {
        scanDocument();
    }, []);

    return (
        <>
            {scannedImages.map((uri, index) => (
                <Image
                    key={index}
                    style={{ width: '100%', height: '100%' }}
                    source={{ uri }} // Use the image URI directly
                />
            ))}
        </>
    );
};

export default Cam;
