import { NextPage } from 'next'
import styles from '../styles/Home.module.css'
import { AppBar } from '../components/AppBar'
import Head from 'next/head'
import { PingButton } from '../components/PingButton'
import { ChangeAction } from '../components/ChangeAction'
import WalletContextProvider from '../components/WalletContextProvider'
import { useState } from 'react'
import { SendTransaction } from '../components/SendTransaction'

const Home: NextPage = (props) => {
  const [action, setAction] = useState('ping')

  function changeAction(action : string) {
    setAction(action)
  }

  return (
    <div className={styles.App}>
      <Head>
        <title>Wallet-Adapter Example</title>
        <meta
          name="description"
          content="Wallet-Adapter Example"
        />
      </Head>
      <WalletContextProvider>
        <AppBar />
        <div className={styles.AppBody}>
          <ChangeAction changeAction={changeAction}/>
          {action == 'ping' ? (
            <PingButton/>
          ) : (
            <SendTransaction />
          )}
        </div>
      </WalletContextProvider>
    </div>
  );
}

export default Home;