import * as fs from 'fs';

export default function handler(req: any, res: any){
    let rawData = fs.readFileSync('encryptedKey.json', 'utf8');
    let jsonData = JSON.parse(rawData);
    res.status(200).json(jsonData);
}