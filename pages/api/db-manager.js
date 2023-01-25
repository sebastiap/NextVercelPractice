import { MongoClient } from "mongodb";

async function handler(req, res) {
    if (req.method === "POST") {

        const data = req.body;
        // const {id,title,type,description,image,categories} = data;
        console.log("PASE POR ACA",data);

    const client = await new MongoClient("mongodb+srv://prueba:prueba@cluster0.mpljszi.mongodb.net/events?retryWrites=true&w=majority");
    const db = client.db()

    const EventColection = db.collection('mygames');
    const result = await EventColection.insertOne(data);
    console.log(result);

    client.close();
    res.status(201).json({message: 'event inserted'});
    }
}

export default handler;