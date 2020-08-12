import {Application } from 'express';
import express from 'express';
import sets from '../routes/sets';
import users from '../routes/users';
import error from '../middlewares/error';


export default function(app:Application){
    app.use(express.json());

    app.use('/api/sets', sets);
    app.use('/users', users);

    // Error handle
     app.use(error)
}


