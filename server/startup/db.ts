import mongoose from 'mongoose';
import env from 'dotenv';

env.config();



const {
    MONGO_HOSTNAME,
    MONGO_DB,
    MONGO_PORT
} = process.env;




const dbConnectionURL = {
    'LOCALURL': `mongodb://${MONGO_HOSTNAME}:${MONGO_PORT}/${MONGO_DB}`
};

export default function(){
    mongoose.connect(dbConnectionURL.LOCALURL, { useUnifiedTopology:true, useNewUrlParser: true })
    .then(()=> console.log('Connected to database'))
    mongoose.set('useFindAndModify', false);
}