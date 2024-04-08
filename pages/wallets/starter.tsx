import * as React from 'react';
import * as crypto from 'crypto';
import * as web3 from '@solana/web3.js';
import * as walletAdapterReact from '@solana/wallet-adapter-react';
import * as walletAdapterWallets from '@solana/wallet-adapter-wallets';
import * as cm from './cipherManager';
import { useConnection, useWallet } from '@solana/wallet-adapter-react';
import { WalletModalProvider, WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import { toast } from 'react-toastify';
const result = require('dotenv').config();
// import { logMemo } from './write_memo';
// import { fetchMemo } from './read_memo';

const quicknode_rpc = 'https://shy-light-replica.solana-devnet.quiknode.pro/030e1771d9e00e663f3acdba87cfd6d494b7214a/';
const quicknode_connection = new web3.Connection(quicknode_rpc);

interface messageDataObject {
    pKey: web3.PublicKey;
    unlockTime: number;
}

const Starter = () => {
    const endpoint = web3.clusterApiUrl('devnet');
    const [balance, setBalance] = React.useState<number | null>(0);
    const [inputValue, setInputValue] = React.useState<string>("");
    // const [writerAddress, setWriterAddress] = React.useState<string>("");
    const [readerAddress, setReaderAddress] = React.useState<string>("");
    // const [confirmedReaderAddress, setConfirmedReaderAddress] = React.useState<string>("");
    const [timeAfter, setTimeAfter] = React.useState<number>();
    // const [account, setAccount] = React.useState('');
    const [txSig, setTxSig] = React.useState('');
    const [displayTime, setDisplayTime] = React.useState(new Date());

    let readerKey = 's'; //key for reader to decrypt message.
    let messageMap: Map<string, messageDataObject> = new Map<string, messageDataObject>();
    let readerMessageBox = document.getElementById('reader-message-box');
    
    const wallets = [
        new walletAdapterWallets.PhantomWalletAdapter(),
        new walletAdapterWallets.SolflareWalletAdapter()
    ];

    const handleInputChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        setInputValue(event.target.value);
    };

    const handleReaderAddressChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setReaderAddress(event.target.value);
    };

    const handleTimeAfterChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        let timeValue = event.target.valueAsNumber;
        if (timeValue < 0) timeValue = 0;
        setTimeAfter(timeValue);
    };
    
    // const {connection} = useConnection();
    const {publicKey, sendTransaction} = useWallet();

    React.useEffect(() => {
        const getInfo = async () => {
            if (quicknode_connection && publicKey) {
                const info = await quicknode_connection.getAccountInfo(publicKey);
                setBalance(info!.lamports / web3.LAMPORTS_PER_SOL);
            }
        };

        const timer = setInterval(() => {
            setDisplayTime(new Date());
        }, 1000);

        getInfo();
        return () => clearInterval(timer);
    }, [quicknode_connection, publicKey]);

    async function handleTransaction(){
        // console.log(process.env.PUBLIC_IV_TEST_KEY);
        // console.log(process.env.PUBLIC_SYM_TEST_KEY);
        // logMemo(inputValue);
        
        if (!quicknode_connection || !publicKey) {
            toast.error('Please connect your wallet.');
            return;
        }

        try {
            new web3.PublicKey(readerAddress);  //verify valid sol address
        } catch (error){
            console.log("Not a valid solana address");
            return;
        }
        
        if (typeof timeAfter === 'undefined') setTimeAfter(0);

        const transaction = new web3.Transaction();
        const instruction = new web3.TransactionInstruction({
            keys: [{ pubkey: publicKey, isSigner: true, isWritable: true }],
            data: Buffer.from(await cm.encrypt(inputValue), "utf-8"),
            programId: new web3.PublicKey("MemoSq4gqABAXKb96qnH8TysNcWxMyWCqXgDLGmfcHr"),
        });

        transaction.add(instruction);

        try{
            const signature = await sendTransaction(transaction, quicknode_connection);
            setTxSig(signature);
            console.log(signature);
        }
        catch (error){
            console.log(error);
            toast.error('Writing failed!');
        }
        finally {
            
        }

        let targetTime = timeAfter? timeAfter:0;
        targetTime += Date.now();
        let newMessageObject: messageDataObject = {
            pKey: publicKey,
            unlockTime: targetTime
        }
        // setWriterAddress(publicKey.toString());
        // setConfirmedReaderAddress(readerAddress);
        // messageMap.set(readerAddress, publicKey.toString());
        messageMap.set(readerAddress, newMessageObject);
        console.log("Writing time is : " + newMessageObject.unlockTime);
    }

    async function checkMessage(){
        if (!quicknode_connection || !publicKey) {
            toast.error('Please connect your wallet.');
            return;
        }

        let currentWalletAddr = publicKey?.toString();

        if (currentWalletAddr === undefined){
            toast.error('Wallet address reading issue');
            return;
        }else{
            if (messageMap.get(currentWalletAddr) === undefined) {
                //no message for this address
                if (readerMessageBox){
                    readerMessageBox.innerText = "Message box is empty..."
                }
            }else{
                //there is message for this address, check time for eligibility
                // let writerPubKeyForFetching = new web3.PublicKey(Buffer.from(messageMap.get(currentWalletAddr), "hex"));
                let msgObject = messageMap.get(currentWalletAddr);
                if (msgObject === undefined) return;
                let signatureDetail = await quicknode_connection.getSignaturesForAddress(msgObject.pKey);
                let fetchedMemo = signatureDetail[0].memo?.slice(5);

                if (fetchedMemo){
                    console.log("Fetched encrypted memo text : " + fetchedMemo);
                }else{
                    throw new Error("Empty string");
                }
                
                if (msgObject.unlockTime >= Date.now()){
                    //Send sym key to reader
                    readerKey = cm.getTestKey();
                }

                fetchedMemo = (await (cm.decrypt(fetchedMemo, readerKey))).toString();

                if (readerMessageBox){
                    readerMessageBox.innerText = fetchedMemo;
                }
            }
        }
    }
    
    return (
        <>
            <walletAdapterReact.ConnectionProvider endpoint={endpoint}>
                <walletAdapterReact.WalletProvider wallets={wallets}>
                    <WalletModalProvider>
                        <main className='min-h-screen text-white'>
                            <div className='grid grid-cols-1 lg:grid-cols-4 gap-4 p-4'>
                                <div className='col-span-1 lg:col-start-2 lg:col-end-4 rounded-lg bg-[#2a302f] h-250 p-4'>
                                    {/* HEADER */}
                                    <div>
                                        <h1 className='text-4xl font-semibold' style={{textAlign: 'center'}}>
                                            Keepsake
                                        </h1>
                                        <p className='tracking-wider' style={{textAlign: 'center'}}>{displayTime.toLocaleTimeString()}</p>
                                        {/* <WalletMultiButton className='!bg-helius-orange !rounded-xl hover:!bg-[#161b19] transition-all duration-200'/> */}
                                    </div>

                                    {/* BODY */}
                                    <div className='mt-8 bg-[#222524] border-2 border-gray-500 rounded-lg p-2'>
                                        <ul className='p-2'>
                                            <li className='flex justify-between'>
                                                <p className='tracking-wider'>Wallet is connected...</p>
                                                <p className='text-helius-orange italic font-semibold'>
                                                    {publicKey ? 'yes' : 'no'}
                                                </p>
                                            </li>
                                            <li className='text-sm mt-4 flex justify-between'>
                                                <p className='tracking-wider'>Balance...</p>
                                                <p className='text-helius-orange italic font-semibold'>
                                                {publicKey ? balance : ' '}
                                                </p>
                                            </li>
                                            <br />
                                            <hr />
                                            <br />
                                            {/* <p className='tracking-wider' style={{textAlign: 'center'}}>Writer's message</p> */}
                                            <h2 className='text-2xl font-semibold' style={{textAlign: 'center'}}>Writer's message</h2>
                                            <li className='text-sm mt-4 flex '>
                                                    <textarea name="message" placeholder='write your message here...' style={
                                                            {
                                                                color: 'black',
                                                                width: '100%',
                                                                height: '100px',
                                                                padding: '10px',
                                                            }
                                                        }
                                                        maxLength={300}
                                                        value={inputValue}
                                                        onChange={handleInputChange}
                                                        // value={inputValue}
                                                        // onChange={e => setInputValue(e.target.value)}
                                                    />
                                            </li>
                                            <li>
                                                <p className='tracking-wider' style={
                                                    {
                                                        textAlign: 'right',
                                                        color: 'grey',
                                                        fontSize: '15px'
                                                    }}>{inputValue.length}/300</p>
                                            </li>
                                            <li className='text-sm flex '>
                                                <div style={{paddingRight: '10px'}}>To</div>
                                                <div style={{paddingRight: '10px'}}>
                                                    {/* <label>Reader's address</label><br/> */}
                                                    <input
                                                        type="text"
                                                        value={readerAddress}
                                                        placeholder=" reader's address"
                                                        onChange={handleReaderAddressChange}
                                                        style={{width: '100%', color: 'black'}}
                                                    />
                                                </div>
                                                <div style={{paddingRight: '10px'}}>in</div>
                                                <div>
                                                    {/* <label>Time in seconds</label><br/> */}
                                                    <input
                                                        type="number"
                                                        value={timeAfter}
                                                        placeholder=" secs"
                                                        onChange={handleTimeAfterChange}
                                                        style={{width: '30%', color: 'black'}}
                                                    />
                                                </div>
                                            </li>
                                            <br />
                                            <div style={{ display: 'flex', justifyContent: 'center'}}>
                                                <button onClick={handleTransaction}>SEND</button>
                                            </div>
                                            <br />
                                            <hr />
                                            <br />
                                            {/* <p className='tracking-wider' style={{textAlign: 'center'}}>Reader's box</p> */}
                                            <h2 className='text-2xl font-semibold' style={{textAlign: 'center'}}>Reader's box</h2>
                                            <br />
                                                <div style={{ display: 'flex', justifyContent: 'center'}}>
                                                    <button onClick={checkMessage}>CHECK MESSAGE</button>
                                                </div>
                                            <div className='mt-8 bg-[#222524] border-2 border-gray-500 rounded-lg p-2'>
                                                <ul className='p-2'>
                                                    <li className='flex justify-between'>
                                                        <p className='tracking-wider' id='reader-message-box'
                                                            style={
                                                                {
                                                                    minHeight: '100px',
                                                                    
                                                                }
                                                            }
                                                        >
                                                            Receiving message...
                                                        </p>
                                                    </li>
                                                    {/* <li className='text-sm mt-4 flex justify-between'>
                                                        <p className='tracking-wider'>Balance...</p>
                                                    </li> */}
                                                </ul>
                                            </div>
                                        </ul>
                                    </div>
                                </div>

                                {/* BODY */}
                                {/* <div className='mt-8 bg-[#222524] border-2 border-gray-500 rounded-lg p-2'>
                                    <ul className='p-2'>
                                        DD
                                    </ul>
                                </div> */}
                            </div>
                        </main>
                    </WalletModalProvider>
                </walletAdapterReact.WalletProvider>
            </walletAdapterReact.ConnectionProvider>
        </>
    );
};

export default Starter;