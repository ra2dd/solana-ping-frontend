import { FC, useState, useEffect } from 'react';
import { useConnection, useWallet } from '@solana/wallet-adapter-react';
import * as web3 from '@solana/web3.js'
import { SignatureLink } from './SignatureLink'

export const SendTransaction: FC = () => {
    const { connection } = useConnection();
    const { publicKey, sendTransaction } = useWallet();
    const [ sendAddress, setSendAddress ] = useState('');
    const [ sendAmount, setSendAmount ] = useState(0);
    const [ signature, setSignature ] = useState('');
    const [ balance, setBalance ] = useState(0);

    function changeAddress(event : Object) {
        setSendAddress(event.target.value);
    }

    function changeAmount(event : Object) {
        setSendAmount(event.target.value);
    }

    function handleSubmit(event) {
        event.preventDefault();
        if (sendAddress == '') {
            alert('You need to type in solana address');
        } 
        else if (sendAmount <= 0) {
            alert('Amount must be greater than 0');
        }

        if (!connection || !publicKey) {
            return;
        }

        const transaction = new web3.Transaction();

        const sendInstruction = web3.SystemProgram.transfer({
            fromPubkey: publicKey,
            toPubkey: new web3.PublicKey(sendAddress),
            lamports: sendAmount * web3.LAMPORTS_PER_SOL,
        });

        transaction.add(sendInstruction);

        sendTransaction(transaction, connection).then((sig) => {
            console.log(sig);
            setSignature(sig);
            setSendAddress('');
            setSendAmount(0);
        });
    }

    const displayBalance = async () => {
        console.log(balance);
        return balance;
    }

    useEffect(() => {
        if (!connection || !publicKey) {
            return;
        }
        async function fetchBalance() {
            try {
                const balance = await connection.getBalance(publicKey);
                // setTimeout(() => {console.log('delayed for 20sec');}, 5000);
                setBalance(balance / web3.LAMPORTS_PER_SOL);
            }
            catch (error) {
                console.log(error);
            }
        }

        fetchBalance();
    }, [connection, publicKey]);

    return (
        <div>
            {publicKey ? (
                <form onSubmit={handleSubmit}>
                    <p>Sol balance: {balance}</p>
                    <label htmlFor="sol-address">Solana wallet address</label>
                    <input type="text" id="sol-address" onChange={changeAddress}/>

                    <label htmlFor="sol-amount">Sol</label>
                    <input type="number" id="sol-amount" step="any" onChange={changeAmount} />

                    <button type="submit">Send transaction</button>
                </form>
            ) : (
                <p>Connect sol wallet to send transaction.</p>
            )}
            <SignatureLink signature={signature} />
        </div>
    );
}