import {useState,useRef, Fragment} from 'react';
import Head from 'next/head';
import Image from 'next/image';
import Eventstyles from '../../../styles/Events.module.css'
import { useRouter } from 'next/router';

import { MongoClient } from 'mongodb';

const EventsPage = ({data}) => {
  const inputemail = useRef();
  const router = useRouter();
  const [message,setMessage] = useState('');

  const onSubmit = async (SubmitEvent) => {
    // This method comunicate with the internal endpoint email-registration
    // Next provide us with an endpoint for each file in the API folder. 
    // the endpoint is called like the file without the extension. 
    // in this case email-registration.js is accesed by the path /api/email-registration 
    SubmitEvent.preventDefault();



    const emailValue = inputemail.current.value;
    const eventId = router?.query.id;

    const validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    
    // The match() method is used to match email addresses .
    if (!emailValue.match(validRegex)) {
      setMessage('Please introduce a correct email address');
    }

    try {
      //Each time we do a submit we make a fetch with a POST method to insert the new email
      const response = await fetch('/api/email-registration',
       {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: emailValue, eventId }),
      });
      const data = await response.json();
      setMessage(data.message)
      if (!response.ok) throw new Error(`Error: ${response.status}`);
      inputemail.current.value = ''
      
    } catch (error) {
      console.log(error)
    }
  };
    return (
      <Fragment>
      <Head>
      <title>{data.title}</title>
      <meta name="description" content={data.title}/>
      </Head>
        <div className={Eventstyles.registrationPage}>
            <div>
                <h1> {data.title}</h1>
                <div className="image">
                  <Image width={1000} height={600} alt={data.title} src={data.image} />
                </div>
                <div className={Eventstyles.content}>
                  <h2> {data.title} </h2>
                  <p> {data.description} </p>
                </div>
                {/* <div className={Eventstyles.registrationForm}> */}
                
                <form onSubmit={onSubmit} className={Eventstyles.registrationForm}>
                  <p>GET A COPY OF THIS GAME</p>
                  <label htmlFor="email"/>
                  <input
                    ref={inputemail}
                    type="email"
                    id="email"
                    placeholder="Please insert your email here"
                  />
                  {/* The button has to be type=submit */}
                  <button className="">Submit</button>
                </form>
                <p>{message}</p>
            </div>
          
        </div>
      </Fragment>
    )
}

export default EventsPage;

// Generates `/posts/1` and `/posts/2`
let thisgame ={} ;
let alldbGames =[];

export async function getStaticPaths() {
  const {allEvents} = await import ('/data/data.json');

  const client = await new MongoClient("mongodb+srv://prueba:prueba@cluster0.mpljszi.mongodb.net/events?retryWrites=true&w=majority");
  const db = client.db()
  const GamesColection = db.collection('mygames');
  const gamedata = await GamesColection.find().toArray();
  alldbGames = gamedata.map(game => ({...game,_id:game._id.toString()}));
  //console.log(alldbGames);
  // const Games = alldbGames.filter((ev) => id === ev.type);
  
  const allPaths = alldbGames.map(path => 
    {
        return {
        params: {
          type:path.type,
          id: path.id
        }
  };
});
    return {
      paths: allPaths,
      fallback: false, // can also be true or 'blocking'
    }
  }

export async function getStaticProps(context) {
  // this import is a promise that is resolved with async and await
  const id = context.params.id;
  //const id = context.params.id;
  const client = await new MongoClient("mongodb+srv://prueba:prueba@cluster0.mpljszi.mongodb.net/events?retryWrites=true&w=majority");
  const db = client.db()
  const GamesColection = db.collection('mygames');
  const gamedata = await GamesColection.find().toArray();
  alldbGames = gamedata.map(game => ({...game,_id:game._id.toString()}));
  thisgame = alldbGames.find(game => (game.id === id));
  //console.log(alldbGames);
  //console.log(thisgame);
  //console.log(id);
  return {
      props: {
          data: thisgame,
      }
  }
}