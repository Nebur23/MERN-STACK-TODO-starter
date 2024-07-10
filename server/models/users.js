import mongoose from "mongoose"
const userSchema=mongoose.Schema({
    name:{
        type:String,
        
    },
    email:{
        type:String
    },
    password:{
        type:String
    },
    refreshToken:{
        type:String
    }

}
)
export const userModel=mongoose.model("user",userSchema)