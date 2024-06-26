import { useEffect, useState } from 'react';
import DocumentScanner from 'react-native-document-scanner-plugin';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import { Alert } from 'react-native';
import OCRTextEditor from './OCRTextEditor.js';

// TO BE CHANGED AS DYNAMIC DOMAIN
<<<<<<< HEAD
const SCAN_API_URL = `https://sbnaic-server.onrender.com/api/process-document`;
=======
const SCAN_API_URL = `http://localhost:5000/api/process-document`;
>>>>>>> 5151234ca6449f4e89fecd602c1e938cdba691e3

const axiosInstance = axios.create({
    maxBodyLength: Infinity,
    maxContentLength: Infinity,
});

const Cam = () => {
    const navigation = useNavigation();

    const [responseFromServer, setResponseFromServer] = useState({});

    useEffect(() => {
        const scanDocumentAsync = async () => {
            try {
                await scanDocument();
            } catch (error) {
                console.error('Error in scanDocumentAsync:', error);
            }
        };
        scanDocumentAsync();
    }, []);

    const handleScanError = (error) => {
        console.error('Error while scanning:', error);
    };

    const handleScanSuccess = async (imageURIs) => {
        try {
            if (!imageURIs || imageURIs.length === 0) {
                console.log('Scan cancelled or no images found');
                navigation.goBack();
                return;
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
            await sendBase64Images(base64Images);
        } catch (error) {
            console.log('Error While Converting to base64');
        }
    };

    const scanDocument = async () => {
        console.log('Scanning document...');
        try {
            const { status, scannedImages: imageURIs } = await DocumentScanner.scanDocument();
            console.log('Scan status:', status);
            console.log('Scanned images:', imageURIs);

            if (status === 'cancel') {
                handleScanSuccess(imageURIs); // Handle success even for cancelled scan (no images)
            } else {
                handleScanSuccess(imageURIs);
            }
        } catch (error) {
            handleScanError(error);
        }
    };

    const sendBase64Images = async (base64Images) => {

        try {
            const formData = new FormData();
            base64Images.forEach((image, index) => {
                const pageName = `page${index + 1}`;
                formData.append(pageName, image);
            });

            const response = await axiosInstance.post(SCAN_API_URL, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            setResponseFromServer(response.data);

            console.log('Server response status:', response.status);

            if (response.status === 200) {
                console.log('Response data:', response.data);
            } else {
                throw new Error(`Error processing images: ${response.status} - ${response.statusText}`);
            }

        } catch (error) {
            Alert.alert(error) // Here I will handle error and Notif the user for the error
        }
    };

    return (
        <OCRTextEditor responseFromServer={responseFromServer} />
    );
};

export default Cam;
