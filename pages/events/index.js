import Styles from '/styles/Events.module.css'

import Link from 'next/link';
import Image from 'next/image';


const EventsPage = ({data}) => {
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

export default EventsPage;

export async function getStaticProps() {
  // this import is a promise that is resolved with async and await
  const {events_categories} = await import ('/data/data.json');

  return {
      props: {
          data: events_categories,
      }
  }
}