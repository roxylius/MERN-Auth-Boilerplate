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

const encryptData = (data) => {
    const encryptedData = CryptoJS.AES.encrypt(JSON.stringify(data), secretKey).toString();
    return encryptedData;
};

const decryptData = (encryptedData) => {
    const decryptedData = CryptoJS.AES.decrypt(encryptedData, secretKey).toString(CryptoJS.enc.Utf8);
    return JSON.parse(decryptedData);
};

module.exports = { generateSecretKey, encryptData, decryptData };
