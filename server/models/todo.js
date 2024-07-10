import mongoose from "mongoose"
const todoSchema=mongoose.Schema({
    User:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:'user',
    },
    title:{
        type:String
    },
    content:{
        type:String
    },
    tags:{
        type:[String],
        default:[]
    }, 
    isPinned:{
        type:Boolean,
        default:false
    },
    


},
{timestamps:true}
)
export const todoModel=mongoose.model("todo",todoSchema)