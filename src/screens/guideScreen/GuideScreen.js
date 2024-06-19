import React from 'react';
import { View, Text, ImageBackground, Image, StyleSheet, ScrollView } from 'react-native';
import ScannerButton from '../../../assets/img/ScannerButton.jpg';
import InitialView from '../../../assets/img/InitialView.jpg';
import Scanning from '../../../assets/img/Scanning.jpg'
import DirtRemover from '../../../assets/img/DirtRemover.jpg'
import Deleting from '../../../assets/img/Deleting.jpg'
import Crop from '../../../assets/img/Crop.jpg'
import ChangeColor from '../../../assets/img/ChangeColor.jpg'
import ExtractedText from '../../../assets/img/extractedText.jpg'
import SuccessToDb from '../../../assets/img/SuceessToDb.jpg'
import background from '../../../assets/img/background1.jpg'


const UserGuide = () => {
    return (
        <ImageBackground style={styles.background} source={background} >
            <View style={styles.headerContainer}>
                <Text style={styles.headerText}>User Guide</Text>
            </View>
            <ScrollView>
                <View style={styles.contentContainer}>
                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>Click Scanner Button</Text>
                        <Image source={ScannerButton} style={styles.image} />
                    </View>
                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>This is where the scanning happens</Text>
                        <Image source={Scanning} style={styles.image} />
                    </View>
                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>View After you took or Import an image from your local storage</Text>
                        <Image source={InitialView} style={styles.image} />
                    </View>
                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>You can also remove dirt if it is there in your document you took or import</Text>
                        <Image source={DirtRemover} style={styles.image} />
                    </View>
                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>You can also delete page and retake the photo you have taken</Text>
                        <Image source={Deleting} style={styles.image} />
                    </View>
                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>Cropping and Skewing for text extraction accuracy and document viewing for the website</Text>
                        <Image source={Crop} style={styles.image} />
                    </View>
                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>You can also apply grayscale to enhance the image readiness for text extraction</Text>
                        <Image source={ChangeColor} style={styles.image} />
                    </View>
                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>Here is the page where the extracted text can be analyze again for quality control and word correction</Text>
                        <Image source={ExtractedText} style={styles.image} />
                    </View>
                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>Upon clicking Submit, the document you took will be placed in the website and was ready for public viewing</Text>
                        <Image source={SuccessToDb} style={styles.image} />
                    </View>

                </View>
            </ScrollView>
        </ImageBackground>
    );
};

const styles = StyleSheet.create({
    background: {
        flex: 1,
        alignItems: 'center',
    },
    headerContainer: {
        width: '100%',
    },
    headerText: {
        color: 'white',
        fontFamily: 'Poppins-Bold',
        padding: 20,
        backgroundColor: '#003C43',
        width: '100%',
        textAlign: 'center',
    },
    contentContainer: {
        width: '100%',
        padding: 20,
    },
    section: {
        marginBottom: 20,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
        color: 'white',
        backgroundColor: 'brown',
        padding: 10,
        borderRadius: 20,
        textAlign: 'center'
    },
    image: {
        width: '100%',
        height: 500,
        resizeMode: 'contain',
    },
});

export default UserGuide;
