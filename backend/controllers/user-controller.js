import Name from "../models/name.model";

export const getAlluser=async(req,res,next)=>{
    let names;
    try{
    names=await Name.find();
    }catch(err){
        console.log(err)
    }
    if(!names){
        return res.status(404).json({message:"No users Found"})
    }
    return res.status(200).json({names});
}