// import PDFDocument from 'pdfkit';
// import RNFS from 'react-native-fs'; // For file system operations
// import { Platform } from 'react-native';

// function PDFconverter(scannedImages) {
//     const doc = new PDFDocument();

//     scannedImages.forEach((base64Image) => {
//         const imageBuffer = Buffer.from(base64Image, 'base64');
//         doc.image(imageBuffer, { width: 400, height: 300 }); // Adjust dimensions
//         doc.addPage();
//     });

//     // Save the PDF to a file (or handle it as needed)
//     const outputPath = Platform.OS === 'ios' ? RNFS.DocumentDirectoryPath : RNFS.ExternalDirectoryPath;
//     const pdfPath = `${outputPath}/output.pdf`;

//     doc.pipe(RNFS.createWriteStream(pdfPath));
//     doc.end();

//     console.log('PDF created successfully at:', pdfPath);
// }

// export default PDFconverter;
