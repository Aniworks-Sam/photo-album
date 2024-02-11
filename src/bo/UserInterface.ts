export interface RegFormValue {
    "username": string;
    "password": string;
    "rememberMe": boolean;
}
export interface setIsLoginPage {
    "setIsLoginPage": () => boolean;
}
export interface ImageDataLocal {
    "imageData": string;
    "exifData": {
        "ApertureValue": number
        "DateTime": string
        "DateTimeDigitized": string
        "DateTimeOriginal": string
        "ExifIFDPointer": number
        "ExifVersion": string
        "ExposureTime": number
        "FNumber": number
        "Flash": string
        "FocalLength": number
        "GPSDateStamp": string
        "GPSInfoIFDPointer": number
        "GPSLatitude": any
        "GPSLatitudeRef": string
        "GPSLongitude": any
        "GPSLongitudeRef": string
        "GPSTimeStamp": any
        "ISOSpeedRatings": number
        "Make": any
        "MakerNote": any
        "MeteringMode": any
        "Model": any
        "Orientation": number
        "SubsecTime": any
        "SubsecTimeDigitized": any
        "SubsecTimeOriginal": any
        "WhiteBalance": any
        "thumbnail": { "JpegIFOffset": number, "JpegIFByteCount": number }
    }
}