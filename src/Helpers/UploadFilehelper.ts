import { createResponse } from "./createResponse";
export const uploadFileHelper=async(file:any,path:any,res:any)=>{
    await file?.mv(path+file?.name,(err:any)=>{
     if(err){
        return  createResponse(res, 500,"Error during file upload",[], false, true);  
     }
     })
     return file?.name
 }