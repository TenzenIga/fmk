import express from 'express';
import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/User';
import asyncWrapper from '../middlewares/asyncWrapper';
import bcrypt from 'bcryptjs';
import key from '../startup/config';

const router = express.Router();

//Users Register Route

router.post('/register', asyncWrapper(
    async (req:Request, res:Response) =>{
        const {name, email, password    } = req.body;
        let user = await User.findOne({
            email: email
        })
        if(user) return res.status(400).send('User already registered');
        
        user = new User({
            name,
            email,
            password
        })
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(user.password, salt);
        await user.save();
        res.status(200).send(user);
    }
))
// Admin Register Route

// Users login route

router.post('/login', asyncWrapper(
    async (req:Request, res:Response) =>{
        const { email, password    } = req.body;
        let user = await User.findOne({
            email: email
        })
        if(!user) return res.status(400).send('Invalid email or password');
        
        const validPassword = await bcrypt.compare(password, user.password);
        if(!validPassword) return res.status(400).send('Invalid email or password');
        const token = jwt.sign({_id:user._id}, key);
        
        res.send(token);
    }
))

// Admin register route


export default router;