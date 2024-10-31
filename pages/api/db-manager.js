import { MongoClient } from "mongodb";

async function handler(req, res) {
    if (req.method === "POST") {

        const data = req.body;

    const client = await new MongoClient("mongodb+srv://"+process.env.DB_USER +":"+process.env.DB_PASS +"@"+ process.env.CLUSTER +"/events?retryWrites=true&w=majority");
    const db = client.db()

    const EventColection = db.collection('mygames');
    const result = await EventColection.insertOne(data);

    client.close();
    res.status(201).json({message: 'event inserted'});
    }
}

export default handler;