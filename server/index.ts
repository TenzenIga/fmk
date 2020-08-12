import express from "express";
import path from 'path';
import db from './startup/db';
import routes from './startup/routes';
import bodyParser from 'body-parser';
import prod from './startup/prod';
import logging from './startup/logging';
const app = express();

const port = process.env.PORT || 5000;

app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json());

prod(app);
logging(app);
db();
routes(app);


if(process.env.NODE_ENV === 'production'){
    app.use(express.static('client/build'));

    app.get('*', (req, res)=>{
        res.sendFile(path.resolve(__dirname, '../../client', 'build', 'index.html'))
    });

}
const server = app.listen(port, ()=>{
    console.log('Started server');
})


export default server;