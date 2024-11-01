import {useState,useRef} from 'react';

import Image from 'next/image';
import Eventstyles from '../../../styles/Events.module.css'
import { useRouter } from 'next/router';

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
        <div className={Eventstyles.registrationPage}>
            <div>
              
                <div className="image">
                  <Image  alt={data.title} src={data.image} />
                </div>
                <div className={Eventstyles.content2}>
                  <h2> {data.title} </h2>
                  <p> {data.description} </p>
                </div>
                {/* <div className={Eventstyles.registrationForm}> */}
                
                <form onSubmit={onSubmit} className={Eventstyles.registrationForm}>
                  <p>GET REGISTERED FOR THIS EVENT</p>
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
    )
}

export default EventsPage;

// Generates `/posts/1` and `/posts/2`
export async function getStaticPaths() {
  const {allEvents} = await import ('/data/data.json');
  const allPaths = allEvents.map(path => 
      {return {
        params: {
          cat:path.city,
          id: path.id,
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
  const {allEvents} =  await import ('/data/data.json');
  const EventData = allEvents.find(event => event.id === id)

  return {
      props: {
          data: EventData,
      }
  }
}