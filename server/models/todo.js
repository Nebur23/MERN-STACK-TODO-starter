import mongoose from "mongoose"
const todoSchema=mongoose.Schema({
  
  
    


},
{timestamps:true}
)
export const todoModel=mongoose.model("todo",todoSchema)