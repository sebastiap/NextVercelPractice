import Styles from '/styles/Events.module.css'
import { MongoClient } from 'mongodb';

import Link from 'next/link';
import Image from 'next/image';


const GamesPage = ({data}) => {
    return (
        <>
        {/* <h1>Eventos</h1> */}
        <div >
                {data.map((ev) => (
                    <Link key={ev.id} href={`/events/${ev.id}`} className={Styles.mainEvents}>
                    
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
        </>
    )
}

export default GamesPage;

export async function getStaticProps() {
  // this import is a promise that is resolved with async and await
//   const {allGames} = await import ('/data/games.json');
const client = await new MongoClient("mongodb+srv://prueba:prueba@cluster0.mpljszi.mongodb.net/events?retryWrites=true&w=majority");
const db = client.db()

const GamesColection = db.collection('mygames');
const gamedata = await GamesColection.find().toArray();
// const alldbGames = JSON.stringify(gamedata);
// console.log ("El tipo de dato es " , typeof allGames);
// I need to convert the _id into an string to make this work properly.
const alldbGames = gamedata.map(game => ({...game,_id:game._id.toString()}))
console.log ("El contenido es " ,  gamedata);


  return {
      props: {
          data: alldbGames,
      }
  }
}