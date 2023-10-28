import { FC, useState } from 'react';
import styles from '../styles/ChangeAction.module.css';

export const ChangeAction: FC = ({ changeAction }) => {

    function setActiveButton(event) {
        const buttons = document.querySelectorAll('button');
        for (const button of buttons) {
            button.removeAttribute('active');
        }
        event.target.setAttribute('active', 'true');
    }
    return (
        <div class={styles.changeActionCtn}>
            <button 
                className={styles.changeButton}
                active='true'
                onClick={(event) => {
                    changeAction('ping');
                    setActiveButton(event);
                }}
            >Ping</button>
            <button 
                className={styles.changeButton}
                onClick={(event) => {
                    changeAction('transaction');
                    setActiveButton(event);
                }}
                >Send Sol</button>
        </div>
    );
}