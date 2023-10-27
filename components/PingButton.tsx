import { FC, useState } from 'react'
import styles from '../styles/PingButton.module.css'
import { useConnection, useWallet } from '@solana/wallet-adapter-react'
import * as web3 from '@solana/web3.js'

export const PingButton: FC = () => {
	const { connection } = useConnection();
	const { publicKey, sendTransaction } = useWallet();
	const [signature, setSignature] = useState('');
	
    const onClick = () => {
        if (!connection || !publicKey) {
			return;
		}

		const programId = new web3.PublicKey('ChT1B39WKLS8qUrkLvFDXMhEJ4F1XZzwUNHUt4AU9aVa');
		const programDataAccount = new web3.PublicKey('Ah9K7dQ8EHaZqcAsgBW8w37yN2eAy3koFmUn4x3CJtod');
		const transaction = new web3.Transaction();

		const instruction = new web3.TransactionInstruction({
			keys: [
				{
					pubkey: programDataAccount,
					isSigner: false,
					isWritable: true,
				},
			],
			programId,
		});

		transaction.add(instruction);
		sendTransaction(transaction, connection).then((sig) => {
			console.log(sig);
			setSignature(sig);
		});
    };

	function sigLink() {
		if (signature == '') {
			return;
		}

		const link = `https://explorer.solana.com/tx/${signature}?cluster=devnet`;
		return (
			<div>
				<p>
					Check transaction <a href={link}>on sol explorer</a>
				</p>
			</div>
		)				
	}
    
	return (
		<div className={styles.buttonContainer}>
			{publicKey ? (
				<>
					<button className={styles.button} onClick={onClick}>Ping!</button>
				</>
			) : (
				<>
					<p>Connect sol wallet to ping account.</p>
				</>
			)}
			{sigLink()}
		</div>
	);
}

