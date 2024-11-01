## About this project

### Objective

This site was developed as an event-oriented version of the Spika Games store, developed with Next and Mongo DB. A previous version was created in React and can be consulted on GitHub. The idea of ​​this project was to test Next routing and server side rendering. I have no plans to continue this project beyond visual fixes.

Spika Games was born as an educational, recreational and personal project. Games have always been a safe place for me to develop socially and at the same time an oasis of tranquility in an increasingly chaoitic world. Now as an adult, I appreciate moments of relaxation with friends, sitting at a table, enjoying a new experience that isolates us for a while from the world around us.

### Tech Stack

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

This project uses JSON for events and Mongo DB for the games.


## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.js`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.js`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.


## Directory Structure

### Styles
In this directory, the styles are located.

### Public
In this directory, the public resources like images and fonts are located. All the static files are stored here.
Only files in this directory are accessible to Next.

### Pages
All the pages that will be routed and used in our app. Inside on the "api" folder, the backend files are stored.
Next route the directories and pages inside this folder automatically.

## Dynamic Routing

### Dynamic Files
When called with brackets , we can create a dynamic file. For example [id].js
This files will be called with different routes and paths.

### Dynamic Directory
We can also create dynamic directories naming a directory with brackets. The routing will follow the same principle as for static files in Next.

### getServerSideProps function
If you export a function called getServerSideProps (Server-Side Rendering) from a page, Next.js will pre-render this page on each request using the data returned by getServerSideProps.
The props returned in this function will be passed to the page component as props.
https://nextjs.org/docs/basic-features/data-fetching/get-server-side-props

### getStaticProps function
If you export a function called getStaticProps (Static Site Generation) from a page, Next.js will pre-render this page at build time using the props returned by getStaticProps.
The props returned in this function will be passed to the page component as props.
https://nextjs.org/docs/basic-features/data-fetching/get-static-props

## API & Backend

## api folder
Next provides us with a feature that allows us to use any file in the api folder as an endpoint.
This feature can help us to create a backend for our applications in the same project. The api folder must be inside of the pages folder for Next to work this files as API's.

Important:
The files in this folder will render server side code and will not deploy React components!

For example:
To access the endpoint on hello.js you can go to the path : http://localhost:3000/api/hello

### Operations on Files
Since Next operates with Node, we can use the built in library "fs" to make syncronous and asyncronous operations with files.

### Operations on MongoBD
With MongoClient we can use the mongodb site to connect to our own MongoDB database. See db-manager.js .You need an .env file to connect to mongoDB.

## Next/Head
Next provides a special JSX tag for adding head elements to each page, which will change the title and info about that page. This is for helping the SEO.