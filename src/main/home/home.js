import Styles from '/styles/Home.module.css'

import Image from 'next/image'
import Link from 'next/link'


const Home = ({data}) => {
    return (
        <main className={Styles.main}>
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
        </main>
    )
}
export default Home;