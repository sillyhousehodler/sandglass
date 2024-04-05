import * as React from 'react';
import * as web3 from '@solana/web3.js';
import * as walletAdapterReact from '@solana/wallet-adapter-react';
import * as walletAdapterWallets from '@solana/wallet-adapter-wallets';
import { useConnection, useWallet } from '@solana/wallet-adapter-react';
import { WalletModalProvider, WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import { logMemo } from './write_memo';
import { fetchMemo } from './read_memo';

const Starter = () => {
    const [balance, setBalance] = React.useState<number | null>(0);
    const endpoint = web3.clusterApiUrl('devnet');
    const [inputValue, setInputValue] = React.useState<string>("");
    // const [input, setInput] = React.useState("");
    
    const wallets = [
        new walletAdapterWallets.PhantomWalletAdapter(),
        new walletAdapterWallets.SolflareWalletAdapter()
    ];

    const handleInputChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        setInputValue(event.target.value);
    };
    
    const {connection} = useConnection();
    const {publicKey} = useWallet();

    React.useEffect(() => {
        const getInfo = async () => {
            if (connection && publicKey) {
                const info = await connection.getAccountInfo(publicKey);
                setBalance(info!.lamports / web3.LAMPORTS_PER_SOL);
            }
        };
        getInfo();
    }, [connection, publicKey]);

    function handleButtonOnClick(){
        logMemo(inputValue);
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
                                    <div className='flex justify-between items-center'>
                                        <h2 className='text-3xl font-semibold'>
                                            Account Info
                                        </h2>
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
                                            <p className='tracking-wider' style={{textAlign: 'center'}}>write your message here</p>
                                            <li className='text-sm mt-4 flex '>
                                                    <textarea name="message" style={
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
                                            <p className='tracking-wider' style={
                                                {
                                                    textAlign: 'right',
                                                    color: 'grey',
                                                    fontSize: '15px'
                                                }}>{inputValue.length}/300</p>
                                            <div style={{ display: 'flex', justifyContent: 'center'}}>
                                                <button onClick={handleButtonOnClick}>SEND</button>
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