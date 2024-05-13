import React, { useState, useEffect } from 'react';
import { Image, Button } from 'react-native';
import DocumentScanner from 'react-native-document-scanner-plugin';
import { useNavigation } from '@react-navigation/native'; // Assuming React Navigation

const Cam = () => {
    const navigation = useNavigation();
    const [scannedImage, setScannedImage] = useState(null);

    const scanDocument = async () => {
        const { status, scannedImages } = await DocumentScanner.scanDocument();

        if (status === 'success' && scannedImages && scannedImages.length > 0) {
            setScannedImage(scannedImages[0]);
        } else if (status === 'cancel') {
            navigation.goBack();
        }
    };

    useEffect(() => {
        scanDocument();
    }, []);

    return (
        <Image
            style={{ width: '100%', height: '100%' }}
            source={{ uri: scannedImage }}
        />
    );
};

export default Cam;
