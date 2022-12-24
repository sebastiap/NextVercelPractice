import Head from 'next/head'

import { Inter } from '@next/font/google'
import styles from '../styles/Home.module.css'

import Main from '../src/main/home/home'

const inter = Inter({ subsets: ['latin'] })

export default function Home({data}) {
  return (
    <div className={styles.container}>
      <Head>
        <title>Next Events</title>
        <meta name="description" content="Generated bwy create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Main data={data}/>
    </div>
  )
}

export async function getServerSideProps () {
  // this import is a promise that is resolved with async and await
  const {events_categories} = await import ('../data/data.json');

  return {
      props: {
          data: events_categories,
      }
  }
}