export default function EmptyPage() { 
    return null;
  }
// // import * as fs from 'fs';
// import * as crypto from 'crypto';

// // let rawData = fs.readFileSync('encryptedKey.json', 'utf8');
// // let jsonData = JSON.parse(rawData);
// // const algorithm = 'aes-256-cbc';
// // let iv_buffer = Buffer.from(jsonData['iv'].data);
// // let key_buffer = Buffer.from(jsonData['key'].data);
// // console.log(jsonData['iv'].data);
// // console.log(jsonData['key'].data);

// async function loadData() {
//     const res = await fetch('./api/loadCipherKey');
//     const jsonData = await res.json();
//     const algorithm = 'aes-256-cdc';
//     let iv_buffer = Buffer.from(jsonData['iv'].data);
//     let key_buffer = Buffer.from(jsonData['key'].data);

//     return {algorithm, key_buffer, iv_buffer};
// }

// export async function encrypt(text: string): Promise<string> {
//     const data = await loadData();
//     const cipher = crypto.createCipheriv(data.algorithm, data.key_buffer, data.iv_buffer);
//     let encrypted = cipher.update(text, 'utf8', 'hex');
//     encrypted += cipher.final('hex');
//     return encrypted;
// }

// export async function decrypt(encryptedText: string): Promise<string> {
//     // const decipher = crypto.createDecipheriv(algorithm, key_buffer, iv_buffer);
//     const data = await loadData();
//     const decipher = crypto.createCipheriv(data.algorithm, data.key_buffer, data.iv_buffer);
//     let decrypted = decipher.update(encryptedText, 'hex', 'utf8');
//     decrypted += decipher.final('utf-8');
//     return decrypted;
// }