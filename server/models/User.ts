import mongoose, { Schema, model} from "mongoose";


interface IUser extends mongoose.Document{
    _id:string
    name:string
    email:string
    password:string
}

const UserSchema = new Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    role:{
        type:String,
        default:"user",
        enum:["user", "admin"]
    }
   
})


export default model<IUser>('Users', UserSchema);