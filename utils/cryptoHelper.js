require('dotenv').config();
const CryptoJS = require("crypto-js");

const secretKey = process.env.AES_ENCRYPT_SECRET_KEY;

const generateSecretKey = () => {
    const keyLength = 32; // 32 bytes = 256 bits (AES-256)
    const buffer = new Uint8Array(keyLength);
    crypto.getRandomValues(buffer);
    return Array.from(buffer, (byte) =>
        byte.toString(16).padStart(2, '0')
    ).join('');
};

/**
 * This method encrypts plain-text data and generated url-friendly encrypted encode data
 * @param data plain-text data to be encrypted
 */
const encryptData = (data) => {
    const encryptedData = CryptoJS.AES.encrypt(JSON.stringify(data), secretKey).toString();
    const encodedData = encodeURIComponent(encryptedData); //encode encrypted data to make it url-safe
    return encodedData;
};

/**
 * This method decrypts the encoded encrypted data and converts it back to human-readable text
 * @param encryptedData encrypted data to decrypt
 */
const decryptData = (encryptedData) => {
    const decodedData = decodeURIComponent(encryptedData); //decode the encoded encrypted data
    const decryptedData = CryptoJS.AES.decrypt(decodedData, secretKey).toString(CryptoJS.enc.Utf8);
    return JSON.parse(decryptedData);
};

module.exports = { generateSecretKey, encryptData, decryptData };
