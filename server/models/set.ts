import mongoose, { Schema, model} from "mongoose";


interface IPerson{
    _id:string
    name:string
    description:string
    image:string
    fuck:number
    marry:number
    kill:number
}

interface IGameSet{
    _id:string
    title:string
    gender:string
    category:string
    persons:IPerson[]
}

type TpGroupDocument = IGameSet & mongoose.Document & { set: mongoose.Types.Array<IPerson> }



const PersonSchema = new Schema({
    name:String,
    description:String,
    image:String,    
    fuck:{type:Number, default:0},
    marry:{type:Number, default:0},
    kill:{type:Number, default:0}
})

const GameSetSchema = new Schema({
    title:String,
    gender:String,
    category:String,
    persons:[PersonSchema]
})

export default model<TpGroupDocument>('GameSet', GameSetSchema);