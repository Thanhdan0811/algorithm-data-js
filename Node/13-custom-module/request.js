function encrypt(data) {
    return 'encrypted data';
}

module.exports.send = function (url, data) {
    const encryptedData = encrypt(data);
    console.log(`sending ${encryptedData} to ${url}`);
}

module.exports.sendTwo = function sendTwo() {
    console.log("Send two");
}

console.log(module);

// module.exports = {
//     send,
// }