import Link from 'next/link';
import Image from 'next/image';
import styles from '../../../styles/Events.module.css'

const EventsCatPage = ({data,city}) => {
    return (
        <div className={styles.eventContainer}>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css"/>
        <h1>Events in {city.toUpperCase()}</h1>
        {data?.map((ev,index) => (
          <Link key={ev.id} href={`/events/${city}/${ev.id}`} className={styles.link} >
            {/* <Link legacyBehavior key={ev.id} href={`/events/${ev.id}`} passHref>
              <a> */}
                <div className={index % 2?"image animate__animated animate__fadeInLeft":"image animate__animated animate__fadeInRight"}>
                  <Image width={600} height={400} alt={ev.title} src={ev.image} />
                </div>
                <div className="content">
                  <h2> {ev.title} </h2>
                  <p> {ev.description} </p>
                </div>
                {/* </a> */}
           
            </Link>
          ))}
        </div>
    )
}

export default EventsCatPage;

//This function is provided by Next to create static paths for a database or a JSON object
// This function return the params object that has two fixed atribbutes, paths and fallback.
// In this case the paths are 3 , london,barcelona and san Francisco
// the DB can changes, but at the moment that the server render, the paths are static
export async function getStaticPaths() {
 // this import is a promise that is resolved with async and await
 const {events_categories} = await import ('/data/data.json');
 const allPaths = events_categories.map ((ev) => {

  return { 
    params: { cat:ev.id,
 },
 };
 });

 return {
         paths:allPaths,
         fallback: false
 }
}

export async function getStaticProps(context) {
// In this case we use the context :
// {
//   params: { cat: 'london' },
//   locales: undefined,
//   locale: undefined,
//   defaultLocale: undefined
// }
 const {allEvents} = await import ('/data/data.json');
 const id = context.params.cat;
 const localEvents = allEvents.filter((ev) => id === ev.city);
//  console.log(localEvents);

 return {props:{
   data:localEvents,
   city:id,
 }
 }
}