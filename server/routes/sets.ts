import express from 'express';
import { Request, Response } from 'express';
import asyncWrapper from '../middlewares/asyncWrapper';
import GameSet from '../models/set';
import upload from '../middlewares/upload';



const router = express.Router();


/*
    get all sets
*/
router.get('/', asyncWrapper(
    async (req:Request, res:Response)=>{
        const sets = await GameSet.find();
        res.send(sets);
    }
))


router.post('/', upload.fields([
    {name:'photo1', maxCount: 1},
    {name:'photo2', maxCount: 1},
    {name:'photo3', maxCount: 1}
]), asyncWrapper(

  async (req:any, res:Response)=>{

    let set = new GameSet({
        title:req.body.title,
        category:req.body.category,
        gender:req.body.gender,
        persons: [{
            name:req.body.name1,
            description:req.body.description1,
            image:req.files['photo1'][0].path
        },
        {
            name:req.body.name2,
            description:req.body.description3,
            image:req.files['photo2'][0].path
        },
        {
            name:req.body.name3,
            description:req.body.description3,
            image:req.files['photo3'][0].path
        }]
    })
    
    set = await set.save();
    res.status(200).send(set)
    
  }  
))

router.put('/:id', asyncWrapper(
    async (req:Request, res:Response)=>{

        const ids = req.body.ids;
        const vote = req.body.vote; 
        switch (vote) {
            case 'fmk':
                  await GameSet.update({_id: req.params.id, 'persons._id': ids[0]},{$inc:{'persons.$.fuck':1}})
                  await GameSet.update({_id: req.params.id, 'persons._id': ids[1]},{$inc:{'persons.$.marry':1}})
                  await GameSet.update({_id: req.params.id, 'persons._id': ids[2]},{$inc:{'persons.$.kill':1}})
                break;
            case 'fkm':
                  await GameSet.update({_id: req.params.id, 'persons._id': ids[0]},{$inc:{'persons.$.fuck':1}})
                  await GameSet.update({_id: req.params.id, 'persons._id': ids[1]},{$inc:{'persons.$.kill':1}})
                  await GameSet.update({_id: req.params.id, 'persons._id': ids[2]},{$inc:{'persons.$.marry':1}})
                break;
            case 'mfk':
                  await GameSet.update({_id: req.params.id, 'persons._id': ids[0]},{$inc:{'persons.$.marry':1}})
                  await GameSet.update({_id: req.params.id, 'persons._id': ids[1]},{$inc:{'persons.$.fuck':1}})
                  await GameSet.update({_id: req.params.id, 'persons._id': ids[2]},{$inc:{'persons.$.kill':1}})
                break;
            case 'mkf':
                  await GameSet.update({_id: req.params.id, 'persons._id': ids[0]},{$inc:{'persons.$.marry':1}})
                  await GameSet.update({_id: req.params.id, 'persons._id': ids[1]},{$inc:{'persons.$.kill':1}})
                  await GameSet.update({_id: req.params.id, 'persons._id': ids[2]},{$inc:{'persons.$.fuck':1}})
                break;
            case 'kfm':
                  await GameSet.update({_id: req.params.id, 'persons._id': ids[0]},{$inc:{'persons.$.kill':1}})
                  await GameSet.update({_id: req.params.id, 'persons._id': ids[1]},{$inc:{'persons.$.fuck':1}})
                  await GameSet.update({_id: req.params.id, 'persons._id': ids[2]},{$inc:{'persons.$.marry':1}})
                break;
            case 'kmf':
                  await GameSet.update({_id: req.params.id, 'persons._id': ids[0]},{$inc:{'persons.$.kill':1}})
                  await GameSet.update({_id: req.params.id, 'persons._id': ids[1]},{$inc:{'persons.$.marry':1}})
                  await GameSet.update({_id: req.params.id, 'persons._id': ids[2]},{$inc:{'persons.$.fuck':1}})
                break;
            default:
                break;
        }
        res.status(200).send({msg:'Vote added'})
    }
  
))

export default router;