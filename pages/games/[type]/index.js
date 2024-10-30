import Link from 'next/link';
import Head from 'next/head';
import { MongoClient } from 'mongodb';
import Image from 'next/image';
import styles from '../../../styles/Games.module.css'
import { Fragment } from 'react';

const EventsCatPage = ({data,type}) => {
    return (
      <Fragment>
      <Head>
      <title>Juegos {type}</title>
      <meta name="description" content={data.description}/>
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css"/>
      </Head>
        <h1> {type.toUpperCase() } GAMES</h1>
        <div className={data.length % 2 ?styles.GameGrid : styles.GameGrid4}>
         {data?.map((ev,index) => (
          <Link key={ev.id} href={`/games/${type}/${ev.id}`} >
            {/* <Link legacyBehavior key={ev.id} href={`/events/${ev.id}`} passHref>
              <a> */}
                <div className={index % 2?"image animate__animated animate__fadeInLeft":"image animate__animated animate__fadeInRight"}>
                  <Image width={600} height={400} alt={ev.title} src={ev.image} />
                </div>
                <div className={styles.content}>
                  <h2> {ev.title} </h2>
                  <p> {ev.description} </p>
                </div>
                {/* </a> */}
           
            </Link>
          ))}
        </div>
      </Fragment>
    )
}

export default EventsCatPage;

//This function is provided by Next to create static paths for a database or a JSON object
// This function return the params object that has two fixed atribbutes, paths and fallback.
// In this case the paths are 3 , london,barcelona and san Francisco
// the DB can changes, but at the moment that the server render, the paths are static
export async function getStaticPaths() {
 // this import is a promise that is resolved with async and await
//  const {events_categories} = await import ('/data/data.json');
const client = await new MongoClient("mongodb+srv://prueba:prueba@cluster0.mpljszi.mongodb.net/events?retryWrites=true&w=majority");
const db = client.db()
const GamesColection = db.collection('gametypes');
const typedata = await GamesColection.find().toArray();
const allGameTypes = typedata.map(game => ({...game,_id:game._id.toString()}))


 const allPaths = allGameTypes.map ((ty) => {

  return { 
    params: { type:ty.id,
 },
 };
 });

 return {
         paths:allPaths,
         fallback: false
 }
}

export async function getStaticProps(context) {
  // this import is a promise that is resolved with async and await
//   const {allGames} = await import ('/data/games.json');
const client = await new MongoClient("mongodb+srv://prueba:prueba@cluster0.mpljszi.mongodb.net/events?retryWrites=true&w=majority");
const db = client.db()

const GamesColection = db.collection('mygames');
const gamedata = await GamesColection.find().toArray();
const alldbGames = gamedata.map(game => ({...game,_id:game._id.toString()}))
const id = context.params.type;
const Games = alldbGames.filter((ev) => id === ev.type);


  return {
      props: {
          data: Games,
          type:id
      }
  }
}