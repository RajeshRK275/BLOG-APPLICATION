import mongoose from "mongoose";

const Connection = async (username, password) => {
    const URL =`mongodb://${username}:${password}@ac-mi4iora-shard-00-00.plyraid.mongodb.net:27017,ac-mi4iora-shard-00-01.plyraid.mongodb.net:27017,ac-mi4iora-shard-00-02.plyraid.mongodb.net:27017/?ssl=true&replicaSet=atlas-94fyj5-shard-0&authSource=admin&retryWrites=true&w=majority`;
    try{
        await mongoose.connect(URL, { useNewUrlParser : true  });
        console.log('Database connected Successfully');
    } catch(error){
        console.log('Error while connecting with the database', error);
    }
}

export default Connection;