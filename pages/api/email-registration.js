import path from 'path';
import fs from 'fs';

function buildPath() {
    //The process.cwd() method is an inbuilt application programming interface of the process module
    // This method returns a string specifying the current working directory of the node.js process. 

    //The path.join() method joins the specified path segments into one path.
    //You can specify as many path segments as you like.
    //This methos normalize the path for every OS and make sure to avoid errors
    // more info https://blog.logrocket.com/mastering-node-js-path-module/
    return path.join(process.cwd(), 'data', 'data.json');
  }

// Had created the path and now i read the file to feed the API
  function extractData(filePath) {
      //this extract the data of the json file
    const jsonData = fs.readFileSync(filePath);
    const data = JSON.parse(jsonData);
    return data;
  }

export default function handler (req,res) {
    const { method } = req;

    const filePath = buildPath();
    const { events_categories, allEvents } = extractData(filePath);

    if (!allEvents) {
        return res.status(404).json({
          message: 'Events data not found',
        });
      }
    


    if (method === 'POST'){
        const {email,eventId} = req.body;

        if (!email | !email.includes('@')) {
            res.status(422).json({ message: 'Invalid email address' });
        }

        const newAllEvents = allEvents.map((ev) => {
            //This is like an if-else .
            //after a return, no code is executed
            if (ev.id === eventId) {
              if (ev.emails_registered.includes(email)) {
                res.status(409).json({ message: 'This email has already been registered' });
                return ev;
              }
              //if the id exist and isnt repeated , return the event with the changes.
              return {
                ...ev,
                emails_registered: [...ev.emails_registered, email],
              };
            }
            //else , return the event without changes.
            return ev;
          });
        // with this we overwrite the file with or without changes
        fs.writeFileSync(filePath, JSON.stringify({ events_categories, allEvents: newAllEvents }));

        res.status(200).json({message:`You have been successfully authenticated with ${email} for this event.`});
    }
    // if (method === 'GET'){
        
    // }
}

// export default function handler(req, res) {
//     res.status(200).json({ name: 'John Doe' })
//   }