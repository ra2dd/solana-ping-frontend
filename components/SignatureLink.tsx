import { FC } from "react";

export const SignatureLink: FC = ({ signature }) => {

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
    );		
}