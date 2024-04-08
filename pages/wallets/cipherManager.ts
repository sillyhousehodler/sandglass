// export default function EmptyPage() { 
//     return null;
//   }
// import * as fs from 'fs';
import * as crypto from 'crypto';

// let rawData = fs.readFileSync('encryptedKey.json', 'utf8');
// let jsonData = JSON.parse(rawData);
// const algorithm = 'aes-256-cbc';
// let iv_buffer = Buffer.from(jsonData['iv'].data);
// let key_buffer = Buffer.from(jsonData['key'].data);
// console.log(jsonData['iv'].data);
// console.log(jsonData['key'].data);
const test_iv = "638621152f595d98d952f237eeeca2d5";
const test_key = "d54a627c56fbadf53f7c5b821d05992b2aaaa4c695e4d54116b6cb30827af9f7";

async function loadDecryptData(acquiredKey: string) {
    const algorithm = 'aes-256-cbc';
    let iv_buffer = Buffer.from(test_iv, 'hex');
    let key_buffer = Buffer.from(acquiredKey, 'hex');
    
    return {algorithm, key_buffer, iv_buffer};
}

async function loadEncryptData() {
    const algorithm = 'aes-256-cbc';
    let iv_buffer = Buffer.from(test_iv, 'hex');
    let key_buffer = Buffer.from(test_key, 'hex');

    console.log("IV Buffer : " + iv_buffer);
    console.log("KEY_Buffer : " + key_buffer);

    return {algorithm, key_buffer, iv_buffer};
}

export function getTestKey(){
    return test_key;
}

export async function encrypt(text: string): Promise<string> {
    const data = await loadEncryptData();
    const cipher = crypto.createCipheriv(data.algorithm, data.key_buffer, data.iv_buffer);
    let encrypted = cipher.update(text, 'utf8', 'hex');
    encrypted += cipher.final('hex');
    return encrypted;
}

export async function decrypt(encryptedText: string, key: string): Promise<string> {
    // const decipher = crypto.createDecipheriv(algorithm, key_buffer, iv_buffer);
    if (key == ''){
        return encryptedText;
    }else{
        const data = await loadDecryptData(key);
        const decipher = crypto.createCipheriv(data.algorithm, data.key_buffer, data.iv_buffer);
        let decrypted = decipher.update(encryptedText, 'hex', 'utf8');
        decrypted += decipher.final('utf-8');
        return decrypted;
    }
}