import { useState, useRef } from 'react';
// import { signIn } from 'next-auth/client';
import { useRouter } from 'next/router';

import classes from './auth-form.module.css';

async function createGame(game) {
  // const game = {
  //   "id": "unstable-unicorns",
  //   "title": "Unstables Unicorns",
  //   "type": "imprimibles",
  //   "description": "CONSTRUYE UN EJÉRCITO DE UNICORNIOS.TRAICIONA A TUS AMIGOS.LOS UNICORNIOS SON AHORA TUS AMIGOS.",
  //   "image": "https://cf.geekdo-images.com/8_5xvpsrrX5JVzO7eBLSgw__itemrep/img/kT4sb4fba2KTsd2IODcZCjq75YQ=/fit-in/246x300/filters:strip_icc()/pic3912914.jpg",
  //   "categories":[]
  // }
 const {id,title,type,description,image,categories} = game;


  const response = await fetch('/api/db-manager', {
    method: 'POST',
    body: JSON.stringify({ id,title,type,description,image,categories }),
    headers: {
      'Content-Type': 'application/json',
    },
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || 'Something went wrong!');
  }

  return data;
}

function AuthForm() {
  const titleInputRef = useRef();
  const typeInputRef = useRef();
  const descInputRef = useRef();
  const imgInputRef = useRef();
  const catInputRef = useRef();
  
  const [isLogin, setIsLogin] = useState(true);
  const [isError, setIsError] = useState(false);
  const [justInserted, setJustInserted] = useState(false);
  const router = useRouter();

  function switchAuthModeHandler() {
    setIsLogin((prevState) => !prevState);
  }

  async function submitHandler(event) {
    event.preventDefault();

    const enteredTitle = titleInputRef.current.value;
    const enteredType = typeInputRef.current.value;
    const enteredDesc = descInputRef.current.value;
    const enteredImg = imgInputRef.current.value;
    const enteredCat = catInputRef.current.value;

    const enteredData = {id:enteredTitle,title: enteredTitle,type: enteredType,description: enteredDesc,image: enteredImg,categories: enteredCat} 

      try {
        const result = await createGame(enteredData);
        titleInputRef.current.value = "";
        typeInputRef.current.value = "";
        descInputRef.current.value = "";
        imgInputRef.current.value = "";
        catInputRef.current.value = "";
        setJustInserted(true);
        console.log(result);
      } catch (error) {
        setIsError(true);
        console.log(error);
      }

  }

  return (
    <section className={classes.auth}>
      <h1>{isLogin ? 'New Game' : 'New Event'}</h1>
      <form onSubmit={submitHandler}>
        <div className={classes.control}>
          <label htmlFor='title'>Title</label>
          <input type='text' id='title' required ref={titleInputRef} />
        </div>
        <div className={classes.control}>
          <label htmlFor='desc'>Description</label>
          <input
            type='text'
            id='desc'
            required
            ref={descInputRef}
          />
         </div>
        <div className={classes.control}>
          <label htmlFor='type'>Type</label>
          <input
            type='text'
            id='type'
            required
            ref={typeInputRef}
          />
        </div>
        <div className={classes.control}>
          <label htmlFor='img'>Image</label>
          <input
            type='text'
            id='img'
            required
            ref={imgInputRef}
          />
        </div>
        <div className={classes.control}>
          <label htmlFor='cat'>Categories</label>
          <input
            type='text'
            id='cat'
            required
            ref={catInputRef}
          />
        </div>
        <div className={classes.actions}>
          <button>{isLogin ? 'Insert' : 'Create Account'}</button>
          {/* <button
            type='button'
            className={classes.toggle}
            onClick={switchAuthModeHandler}
          >
            {isLogin ? 'Create new account' : 'Login with existing account'}
          </button> 
          */}
            {justInserted ? 'You Just inserted a game!' : ''}
            {isError ? 'Some Error ocurred...' : ''}
          </div>  
      </form>
    </section>
  );
}

export default AuthForm;