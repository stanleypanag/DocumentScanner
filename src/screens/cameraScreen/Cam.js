import React, { useState, useEffect } from 'react';
import { Image } from 'react-native';
import DocumentScanner from 'react-native-document-scanner-plugin';

const Cam = () => {
    const [scannedImage, setScannedImage] = useState(null);

    const scanDocument = async () => {

        //**if you click the X button in the scanning session, only documentScanner is exiting and not the whole Cam component */
        const { scannedImages } = await DocumentScanner.scanDocument();

        if (scannedImages) {

            if (scannedImages.length > 0) {

                setScannedImage(scannedImages[0]);
            }
        }
    };

    useEffect(() => {
        scanDocument();
    }, [scannedImage]);

    console.log("Scanned Image URI:", scannedImage);

    return (
        <Image
            style={{ width: '100%', height: '100%' }}
            source={{ uri: scannedImage }}
        />
    );
};

export default Cam;
