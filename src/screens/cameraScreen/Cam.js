import { useEffect, useState } from 'react';
import DocumentScanner from 'react-native-document-scanner-plugin';
import { useNavigation } from '@react-navigation/native';


const Cam = () => {

    const navigation = useNavigation();

    const [scannedImages, setScannedImages] = useState([])


    const scanDoc = async () => {
        const { status, scannedImages: imageURIs } = await DocumentScanner.scanDocument();

        try {

            if (status === 'cancel' && !imageURIs && imageURIs.length === 0) {
                navigation.goBack();
            }

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

        } catch (error) {
            console.error("ERROR:   ", error)
        }

    }

    useEffect(() => {
        scanDoc();
    }, []);

    return (
        console.log(scannedImages)
    );
};

export default Cam;
