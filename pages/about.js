import { Fragment } from 'react';
import Head from 'next/head';
import Styles from '/styles/About.module.css'

const About = () => {
    return (
    <Fragment>
      <Head>
      <title>Acerca de</title>
      <meta name="description" content="Acerca de"/>
      </Head>
    <div className={Styles.aboutdiv}>
        <h1>
        This is the about page
        </h1>
        <p>
        {''}
        This site was developed as an event-oriented version of the Spika Games store, developed with Next and Mongo DB. A previous version was created in React and can be consulted on GitHub.
        The idea of ​​this project was to test Next routing and server side rendering. I have no plans to continue this project beyond visual fixes.
        </p>
        <p>
        {''}
        Spika Games was born as an educational, recreational and personal project. Games have always been a safe place for me to develop socially and at the same time an oasis of tranquility in an increasingly chaoitic world. Now as an adult, I appreciate moments of relaxation with friends, sitting at a table, enjoying a new experience that isolates us for a while from the world around us.
        </p>
    </div>
    </Fragment>
    )
}

export default About;