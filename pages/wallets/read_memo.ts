export {};
// import { Connection, Keypair, PublicKey, sendAndConfirmTransaction, SystemProgram, Transaction, TransactionInstruction } from "@solana/web3.js";
// import { decrypt } from './cipherManager';

// const QUICKNODE_RPC = 'https://shy-light-replica.solana-devnet.quiknode.pro/030e1771d9e00e663f3acdba87cfd6d494b7214a/';
// const SOLANA_CONNECTION = new Connection(QUICKNODE_RPC);

// const secret = [77,185,241,187,51,78,106,44,83,164,194,231,52,51,32,205,150,205,214,234,215,6,158,68,218,114,8,160,218,172,25,176,13,196,140,49,21,90,237,196,34,239,175,21,59,87,112,19,185,45,91,36,136,6,89,222,247,223,140,230,145,92,164,83]; // Replace with your secret
// const fromKeypair = Keypair.fromSecretKey(new Uint8Array(secret));
// // Should I just provide pub key directly instead of providing seed phrase to fetch the pub key above?

// export async function fetchMemo(){
// 	const wallet = fromKeypair.publicKey;
// 	let signatureDetail = await SOLANA_CONNECTION.getSignaturesForAddress(wallet);
// 	let fetchedMemo = signatureDetail[0].memo?.slice(5);
// 	if (!fetchedMemo){
// 		throw new Error("Empty string");
// 	}
// 	console.log(decrypt(fetchedMemo));
// }

// fetchMemo();