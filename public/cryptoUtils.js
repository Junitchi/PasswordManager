const CryptoJS = require("crypto-js");

// Your secret key (keep this safe!)
// const secretKey = "mySecretKey123";

// Function to encrypt text
function encryptText(text) {
  const ciphertext = CryptoJS.AES.encrypt(text, secretKey).toString();
  return ciphertext;
}

function encryptTextKey(text, secretKey) {
  const ciphertext = CryptoJS.AES.encrypt(text, secretKey).toString();
  return ciphertext;
}

// Function to decrypt text
function decryptText(ciphertext) {
  const bytes = CryptoJS.AES.decrypt(ciphertext, secretKey);
  const decryptedText = bytes.toString(CryptoJS.enc.Utf8);
  console.log("decrypting")
  return decryptedText;
}

function decryptTextKey(ciphertext, secretKey){
  const bytes = CryptoJS.AES.decrypt(ciphertext, secretKey);
  const decryptedText = bytes.toString(CryptoJS.enc.Utf8);
  return decryptedText;
}

// Export the functions for use in other modules
module.exports = {
  encryptTextKey,
  decryptTextKey,
};
