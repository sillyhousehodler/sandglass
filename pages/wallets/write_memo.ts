import { Connection, Keypair, PublicKey, sendAndConfirmTransaction, SystemProgram, Transaction, TransactionInstruction } from "@solana/web3.js";
import { encrypt } from './cipherManager';

const QUICKNODE_RPC = 'https://shy-light-replica.solana-devnet.quiknode.pro/030e1771d9e00e663f3acdba87cfd6d494b7214a/';
const SOLANA_CONNECTION = new Connection(QUICKNODE_RPC);

const secret = [77,185,241,187,51,78,106,44,83,164,194,231,52,51,32,205,150,205,214,234,215,6,158,68,218,114,8,160,218,172,25,176,13,196,140,49,21,90,237,196,34,239,175,21,59,87,112,19,185,45,91,36,136,6,89,222,247,223,140,230,145,92,164,83]; // Replace with your secret
const fromKeypair = Keypair.fromSecretKey(new Uint8Array(secret));

export async function logMemo (message: string){
	//1. Create solana transaction
	let tx = new Transaction();

	//2. Encrypt message
	let encryptedMessage = await encrypt(message);
	// let encryptedMessage = "x";
	// encrypt(message).then((result) => {
	// 	encryptedMessage = result;
	// 	console.log(encryptedMessage);
	//   });

	//3. Add memo instruction
	await tx.add(
		new TransactionInstruction({
			keys: [{ pubkey: fromKeypair.publicKey, isSigner: true, isWritable: true }],
			data: Buffer.from(encryptedMessage, "utf-8"),
			programId: new PublicKey("MemoSq4gqABAXKb96qnH8TysNcWxMyWCqXgDLGmfcHr"),
		})
	)

	//3. Send transaction
	let result = await sendAndConfirmTransaction(SOLANA_CONNECTION, tx, [fromKeypair]);

	//4. Log tx URL
	console.log("complete: ", `https://explorer.solana.com/tx/${result}?cluster=devnet`);
	return result;
}

