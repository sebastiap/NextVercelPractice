import Styles from '/styles/Events.module.css'
import { MongoClient } from 'mongodb';

import Link from 'next/link';
import Image from 'next/image';
import { Fragment } from 'react';
import Head from 'next/head';


const GamesPage = ({data}) => {
    return (
    <Fragment>
      <Head>
      <title>Coleccion de Juegos</title>
      <meta name="description" content="Coleccion de Juegos"/>
      </Head>
        <div >
                {data.map((ev) => (
                    <Link key={ev.id} href={`/games/${ev.id}`} className={Styles.mainEvents}>
                        <div className="image">
                        <Image width={600} height={400} alt={ev.title} src={ev.image} />
                        </div>
                        <div className={Styles.content}>
                        <h2> {ev.title} </h2>
                        <p> {ev.description} </p>
                        </div>
                
                    </Link>
                ))}
        </div>
        </Fragment>
    )
}

export default GamesPage;

export async function getStaticProps() {
  // this import is a promise that is resolved with async and await
//   const {allGames} = await import ('/data/games.json');
const client = await new MongoClient("mongodb+srv://prueba:prueba@cluster0.mpljszi.mongodb.net/events?retryWrites=true&w=majority");
const db = client.db()

const GamesColection = db.collection('gametypes');
const typedata = await GamesColection.find().toArray();
const allGameTypes = typedata.map(game => ({...game,_id:game._id.toString()}))


  return {
      props: {
          data: allGameTypes,
      }
  }
}