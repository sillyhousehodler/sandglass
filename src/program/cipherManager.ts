import * as fs from 'fs';
import * as crypto from 'crypto';

let rawData = fs.readFileSync('encryptedKey.json', 'utf8');
let jsonData = JSON.parse(rawData);
const algorithm = 'aes-256-cbc';
let iv_buffer = Buffer.from(jsonData['iv'].data);
let key_buffer = Buffer.from(jsonData['key'].data);
// console.log(jsonData['iv'].data);
// console.log(jsonData['key'].data);

export function encrypt(text: string): string {
    const cipher = crypto.createCipheriv(algorithm, key_buffer, iv_buffer);
    let encrypted = cipher.update(text, 'utf8', 'hex');
    encrypted += cipher.final('hex');
    return encrypted;
}

export function decrypt(encryptedText: string): string {
    const decipher = crypto.createDecipheriv(algorithm, key_buffer, iv_buffer);
    let decrypted = decipher.update(encryptedText, 'hex', 'utf8');
    decrypted += decipher.final('utf-8');
    return decrypted;
}