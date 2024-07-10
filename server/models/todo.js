import mongoose from "mongoose"
const todoSchema=mongoose.Schema({
  
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