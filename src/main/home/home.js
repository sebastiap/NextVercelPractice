import Styles from '/styles/Home.module.css'

import Image from 'next/image'
import Link from 'next/link'
import { Fragment } from 'react'
import Head from 'next/head'


const Home = ({data}) => {
    return (
        <Fragment>
        <Head>
            <title>Coleccion de experiencias</title>
            <meta name="description" content="Una coleccion de mis experiencias"/>
        </Head>
        <main className={Styles.main}>
        <div >
                {data.map((ev,index) => (
                    <Link key={ev.id} href={`/events/${ev.id}`} className={Styles.mainEvents}>
                    
                        <div className={index % 2?"image animate__animated animate__fadeInLeft":"image animate__animated animate__fadeInRight"}>
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
        </Fragment>
    )
}
export default Home;