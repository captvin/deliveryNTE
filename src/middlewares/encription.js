import CryptoJS from 'crypto-js';

const secret = 'T3lk0m_ram'

// Fungsi untuk mengenkripsi id
const encryptId = (id) => {
    return CryptoJS.AES.encrypt(id, secret).toString();
};

// Fungsi untuk mendekripsi id
const decryptId = (encryptedId) => {
    const bytes = CryptoJS.AES.decrypt(encryptedId, secret);
    return bytes.toString(CryptoJS.enc.Utf8);
};

export { encryptId, decryptId };